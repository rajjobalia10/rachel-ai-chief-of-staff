import assert from "node:assert/strict";
import test from "node:test";
import { createInviteHandler } from "../api/invite.js";

const validBody = { name: "Test Applicant", email: "applicant@example.com", message: "Help with my calendar", requestId: "19dbd376-b584-47ba-a66b-f65d7f8cce26", website: "" };
function setup({ env = { RESEND_API_KEY: "test-key", RESEND_FROM_EMAIL: "Rachel <invites@example.com>" }, send, now } = {}) {
  const calls = [];
  const handler = createInviteHandler({ env, now, rateLimits: new Map(), send: send ?? (async (url, options) => { calls.push({ url, options }); return { ok: true, json: async () => ({ id: "test-receipt" }) }; }) });
  async function request(body = validBody, overrides = {}) {
    const res = { headers: {}, code: 200, setHeader(key, value) { this.headers[key] = value; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
    await handler({ method: "POST", headers: { host: "heyrachel.ai", origin: "https://heyrachel.ai", "content-type": "application/json", "x-real-ip": "192.0.2.1" }, body, ...overrides }, res);
    return res;
  }
  return { calls, request };
}

test("sends invitation details only to the owner and uses the applicant as reply-to", async () => {
  const { calls, request } = setup();
  const result = await request({ ...validBody, to: "intruder@example.com", email: " Applicant@Example.com " });
  assert.equal(result.code, 200);
  assert.deepEqual(result.body, { ok: true });
  const email = JSON.parse(calls[0].options.body);
  assert.deepEqual(email.to, ["raj@rivesa.ai"]);
  assert.equal(email.reply_to, "applicant@example.com");
  assert.match(email.text, /Test Applicant/);
  assert.match(email.text, /Help with my calendar/);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(result.headers["Cache-Control"], "no-store");
});

test("identical retries use the same provider idempotency key", async () => {
  const { calls, request } = setup();
  await request(); await request();
  assert.equal(calls[0].options.headers["Idempotency-Key"], calls[1].options.headers["Idempotency-Key"]);
});

test("invalid fields, header injection, oversized data and bots never send email", async () => {
  const { calls, request } = setup();
  for (const body of [null, [], "{broken", { ...validBody, email: "bad" }, { ...validBody, email: "x@example.com\r\nBcc: other@example.com" }, { ...validBody, name: " " }, { ...validBody, name: "A\nB" }, { ...validBody, message: "a".repeat(2001) }, { ...validBody, website: "bot.example" }, { ...validBody, requestId: "bad" }]) {
    assert.equal((await request(body)).code, 400);
  }
  assert.equal((await request({ ...validBody, message: "a".repeat(13000) })).code, 413);
  assert.equal(calls.length, 0);
});

test("rejects unsupported methods, content types and cross-origin requests", async () => {
  const { calls, request } = setup();
  assert.equal((await request(validBody, { method: "GET" })).code, 405);
  assert.equal((await request(validBody, { headers: { "content-type": "text/plain" } })).code, 415);
  assert.equal((await request(validBody, { headers: { origin: "https://elsewhere.example", host: "heyrachel.ai" } })).code, 403);
  assert.equal(calls.length, 0);
});

test("missing credentials and provider failures never produce success", async () => {
  const missing = setup({ env: {} });
  assert.equal((await missing.request()).code, 503);
  assert.equal(missing.calls.length, 0);
  for (const send of [async () => ({ ok: false, json: async () => ({ message: "private provider error" }) }), async () => ({ ok: true, json: async () => ({}) }), async () => { throw new Error("timeout"); }]) {
    const { request } = setup({ send });
    const res = await request();
    assert.equal(res.code, 502);
    assert.doesNotMatch(JSON.stringify(res.body), /private|test-key/);
  }
});

test("throttles repeated submissions and permits requests after expiry", async () => {
  let time = 100;
  const { request, calls } = setup({ now: () => time });
  for (let i = 0; i < 5; i++) assert.equal((await request()).code, 200);
  assert.equal((await request()).code, 429);
  assert.equal(calls.length, 5);
  time += 600001;
  assert.equal((await request()).code, 200);
});

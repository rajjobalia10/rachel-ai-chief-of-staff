import { createHash } from "node:crypto";

const RECIPIENT = "raj@rivesa.ai";
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const attempts = new Map();

export function createInviteHandler({ env = process.env, send = fetch, now = Date.now, rateLimits = attempts } = {}) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }
    const origin = req.headers.origin;
    if (origin) {
      let host;
      try { host = new URL(origin).host; } catch { return res.status(403).json({ error: "Invalid origin" }); }
      if (host !== req.headers.host) return res.status(403).json({ error: "Invalid origin" });
    }
    if (!req.headers["content-type"]?.startsWith("application/json")) return res.status(415).json({ error: "JSON required" });
    if (Number(req.headers["content-length"]) > 12000) return res.status(413).json({ error: "Request too large" });
    let body;
    try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body; } catch { return res.status(400).json({ error: "Invalid request" }); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return res.status(400).json({ error: "Invalid request" });
    if (JSON.stringify(body).length > 12000) return res.status(413).json({ error: "Request too large" });
    if (body.website) return res.status(400).json({ error: "Invalid request" });
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const requestId = typeof body.requestId === "string" ? body.requestId : "";
    if (!name || name.length > 100 || /[\r\n\x00]/.test(name) || email.length > 254 || !EMAIL.test(email) || message.length > 2000 || !/^[0-9a-f-]{36}$/i.test(requestId)) {
      return res.status(400).json({ error: "Please check your name, email, and message" });
    }
    const time = now();
    // Best-effort instance-local throttling, in addition to the honeypot and provider idempotency.
    for (const [key, value] of rateLimits) if (value.expires <= time) rateLimits.delete(key);
    const address = String(req.headers["x-real-ip"] || "unknown");
    const rateKey = createHash("sha256").update(address).digest("hex");
    const limit = rateLimits.get(rateKey) ?? { count: 0, expires: time + 600000 };
    if (limit.count >= 5) { res.setHeader("Retry-After", "600"); return res.status(429).json({ error: "Please try again later" }); }
    if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return res.status(503).json({ error: "Invitations are temporarily unavailable" });
    limit.count += 1;
    if (rateLimits.size < 10000 || rateLimits.has(rateKey)) rateLimits.set(rateKey, limit);
    const payload = {
      from: env.RESEND_FROM_EMAIL,
      to: [RECIPIENT],
      reply_to: email,
      subject: "HeyRachel — new invite request",
      text: `New HeyRachel invitation request\n\nName: ${name}\nEmail: ${email}\n\nWhat they would like help with:\n${message || "Not provided"}\n\nSubmitted through the HeyRachel invite-only website.`,
    };
    const idempotencyKey = createHash("sha256").update(requestId + JSON.stringify(payload)).digest("hex");
    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `invite-${idempotencyKey}` },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      const result = await response.json();
      if (!response.ok || !result.id) return res.status(502).json({ error: "Your request could not be sent. Please try again" });
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(502).json({ error: "Your request could not be sent. Please try again" });
    }
  };
}

export default createInviteHandler();

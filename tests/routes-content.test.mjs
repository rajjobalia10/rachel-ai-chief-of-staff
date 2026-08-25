import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { scrollToRouteLocation } from "../src/route-scroll.js";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("homepage, pricing, and docs are rendered from real pathname routes", async () => {
  const source = await readFile(projectFile("src/App.jsx"), "utf8");

  assert.match(source, /pathname === "\/pricing"/);
  assert.match(source, /pathname === "\/docs"/);
  assert.match(source, /return <HomePage \/>/);
  assert.match(source, /Predictable pricing<br \/>for a calmer day\./);
  assert.match(source, /Delegate from iMessage\.<br \/>Stay in control\./);
});

test("global navigation exposes the requested Rachel routes", async () => {
  const source = await readFile(projectFile("src/App.jsx"), "utf8");
  const styles = await readFile(projectFile("src/styles.css"), "utf8");

  for (const label of ["Product", "Workflows", "Use Cases", "Docs", "Pricing"]) {
    assert.match(source, new RegExp(`>${label}<`));
  }
  assert.match(styles, /rachel-header-signal-v1\.png/);

  const headerStyles = styles.match(/\.site-header \{[\s\S]*?\n\}/)?.[0] ?? "";
  const navigationStyles = styles.match(/\.desktop-nav \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(headerStyles, /background:\s*rgba\(247, 247, 247, \.86\)/);
  assert.doesNotMatch(headerStyles, /background-image/);
  assert.match(navigationStyles, /font-family:\s*"Google Sans"/);
  assert.doesNotMatch(navigationStyles, /text-transform:\s*uppercase/);
});

test("pricing preserves public prices and early-access boundaries", async () => {
  const source = await readFile(projectFile("src/App.jsx"), "utf8");

  assert.match(source, /pro && yearly \? "\$24" : pro \? "\$29" : "\$0"/);
  assert.match(source, /Connected tools are enabled account by account/);
  assert.match(source, /important external actions always require your approval/);
  assert.doesNotMatch(source, /10\+ Integrations/);
  assert.doesNotMatch(source, /"All tools"/);
});

test("docs state the approval and connected-tool contract", async () => {
  const source = await readFile(projectFile("src/App.jsx"), "utf8");

  assert.match(source, /Core conversation and reminders are available first/);
  assert.match(source, /Important external actions/);
  assert.match(source, /Connections are explicit, not assumed/);
  assert.match(source, /You choose each connection/);
});

test("homepage avoids unsupported live usage metrics", async () => {
  const source = await readFile(projectFile("src/App.jsx"), "utf8");

  assert.doesNotMatch(source, /Emails processed/);
  assert.doesNotMatch(source, /Actions logged/);
  assert.match(source, /Familiar by design/);
  assert.match(source, /Your approval/);
});

test("cross-page home anchors scroll to the rendered target", () => {
  let requestedId = null;
  let options = null;
  let topScrolls = 0;
  const target = { scrollIntoView(value) { options = value; } };

  const result = scrollToRouteLocation({
    documentRef: { getElementById(id) { requestedId = id; return target; } },
    windowRef: { location: { hash: "#features" }, scrollTo() { topScrolls += 1; } },
  });

  assert.equal(result, "features");
  assert.equal(requestedId, "features");
  assert.deepEqual(options, { block: "start" });
  assert.equal(topScrolls, 0);
});

test("routes without a valid hash start at the top", () => {
  let topScrolls = 0;
  const result = scrollToRouteLocation({
    documentRef: { getElementById() { return null; } },
    windowRef: { location: { hash: "" }, scrollTo(x, y) { assert.deepEqual([x, y], [0, 0]); topScrolls += 1; } },
  });

  assert.equal(result, null);
  assert.equal(topScrolls, 1);
});

test("pricing FAQ and comparison expose accessible structure", async () => {
  const source = await readFile(projectFile("src/App.jsx"), "utf8");

  assert.match(source, /aria-controls=\{answerId\}/);
  assert.match(source, /\{open && \(/);
  assert.match(source, /<table>/);
  assert.match(source, /<th scope="row">/);
  assert.doesNotMatch(source, /annual total is shown/);
});

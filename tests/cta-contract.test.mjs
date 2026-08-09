import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("every SMS conversion surface uses the shared Rivesa CTA", async () => {
  const source = await readFile(projectFile("src/App.jsx"), "utf8");

  assert.match(source, /const RACHEL_CTA_LABEL = "Text your chief of staff";/);
  assert.match(source, /src="\/assets\/imessage-icon\.png"/);
  assert.equal(source.match(/<MessagesCta(?:\s|\/|>)/g)?.length, 6);
  assert.equal(source.match(/getRachelSmsHref\(\)/g)?.length, 1);
  assert.doesNotMatch(source, /Get Started/);
  assert.doesNotMatch(source, />Text Rachel<\/a>/);
});

test("the shared CTA keeps the image-2 geometry and visual tokens", async () => {
  const styles = await readFile(projectFile("src/styles.css"), "utf8");
  const rule = styles.match(/\.messages-cta\s*\{(?<body>[^}]*)\}/)?.groups?.body ?? "";

  assert.match(rule, /width:\s*212px;/);
  assert.match(rule, /height:\s*40px;/);
  assert.match(rule, /padding:\s*10px 16px;/);
  assert.match(rule, /gap:\s*8px;/);
  assert.match(rule, /border-radius:\s*999px;/);
  assert.match(rule, /background:\s*#f5f6f8;/);
  assert.match(rule, /font-size:\s*14px;/);
  assert.match(rule, /font-weight:\s*500;/);
  assert.match(rule, /line-height:\s*20px;/);
  assert.match(rule, /font-family:\s*"Inter CTA"/);
  assert.match(rule, /inset 0 0 0 1px rgba\(8, 21, 46, \.07\)/);
  assert.doesNotMatch(styles, /\.black-button/);
});

test("the CTA ships the exact Rivesa Messages icon", async () => {
  const icon = await readFile(projectFile("public/assets/imessage-icon.png"));
  const digest = createHash("sha256").update(icon).digest("hex");

  assert.equal(digest, "6900ce655caa4fb93416c66fd65efa92fdea6a566e05024f7d34e44359578d19");
});

test("the CTA ships the exact Rivesa Inter variable font", async () => {
  const font = await readFile(projectFile("public/fonts/rivesa-inter-variable.ttf"));
  const digest = createHash("sha256").update(font).digest("hex");

  assert.equal(digest, "29160a80ff49ddcab2c97711247e08b1fab27a484a329ce8b813d820dc559031");
});

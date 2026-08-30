import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("the site stays in its light appearance when the device prefers dark mode", async () => {
  const [html, styles] = await Promise.all([
    readFile(projectFile("index.html"), "utf8"),
    readFile(projectFile("src/styles.css"), "utf8"),
  ]);

  assert.match(html, /<meta name="color-scheme" content="light" \/>/);
  assert.match(html, /<meta name="supported-color-schemes" content="light" \/>/);

  const rootRule = styles.match(/:root\s*\{(?<body>[^}]*)\}/)?.groups?.body ?? "";
  assert.match(rootRule, /color-scheme:\s*only light;/);
  assert.match(rootRule, /--page:\s*#f7f7f7;/);
  assert.match(rootRule, /--ink:\s*#000;/);
});

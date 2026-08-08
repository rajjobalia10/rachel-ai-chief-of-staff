import assert from "node:assert/strict";
import test from "node:test";
import {
  buildRachelSmsHref,
  getRachelSmsHref,
  RACHEL_PHONE_E164,
  RACHEL_START_MESSAGE,
} from "../src/sms-link.js";

test("targets Rachel's production number with the onboarding message", () => {
  assert.equal(RACHEL_PHONE_E164, "+16282646604");
  assert.equal(RACHEL_START_MESSAGE, "Hi Rachel");
});

test("uses the Apple-compatible body separator on iPhone, iPad, and macOS", () => {
  const appleNavigators = [
    { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)", platform: "iPhone" },
    { userAgent: "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)", platform: "iPad" },
    { userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 15_0)", platform: "MacIntel" },
  ];

  for (const navigatorLike of appleNavigators) {
    assert.equal(
      getRachelSmsHref(navigatorLike),
      "sms:+16282646604&body=Hi%20Rachel",
    );
  }
});

test("uses the standard query separator on Android and other platforms", () => {
  assert.equal(
    buildRachelSmsHref({ userAgent: "Mozilla/5.0 (Linux; Android 16)", platform: "Linux armv8l" }),
    "sms:+16282646604?body=Hi%20Rachel",
  );
  assert.equal(
    buildRachelSmsHref({ userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", platform: "Win32" }),
    "sms:+16282646604?body=Hi%20Rachel",
  );
});

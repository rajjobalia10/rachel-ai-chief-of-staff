export const RACHEL_PHONE_E164 = "+16283099286";
export const RACHEL_START_MESSAGE = "Hi Rachel";

const APPLE_MESSAGING_PLATFORM = /Macintosh|MacIntel|MacPPC|Mac68K|iPhone|iPad|iPod/i;

export function buildRachelSmsHref({ userAgent = "", platform = "" } = {}) {
  const isApplePlatform = APPLE_MESSAGING_PLATFORM.test(`${userAgent} ${platform}`);
  const bodySeparator = isApplePlatform ? "&" : "?";

  return `sms:${RACHEL_PHONE_E164}${bodySeparator}body=${encodeURIComponent(RACHEL_START_MESSAGE)}`;
}

export function getRachelSmsHref(navigatorLike = globalThis.navigator) {
  return buildRachelSmsHref({
    userAgent: navigatorLike?.userAgent ?? "",
    platform: navigatorLike?.platform ?? "",
  });
}

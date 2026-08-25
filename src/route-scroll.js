export function scrollToRouteLocation({ documentRef = document, windowRef = window } = {}) {
  const rawHash = windowRef.location.hash.slice(1);
  const targetId = rawHash ? decodeURIComponent(rawHash) : "";
  const target = targetId ? documentRef.getElementById(targetId) : null;

  if (target) {
    target.scrollIntoView({ block: "start" });
    return targetId;
  }

  windowRef.scrollTo(0, 0);
  return null;
}

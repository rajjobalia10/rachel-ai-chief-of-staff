# Rachel landing page — design QA

## Comparison target

- Source visual truth:
  - `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/TemporaryItems/NSIRD_screencaptureui_hbFYkO/Screenshot 2026-08-08 at 7.16.35 PM.png` — compact iMessage CTA.
  - `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/TemporaryItems/NSIRD_screencaptureui_eRV1o6/Screenshot 2026-08-08 at 7.16.56 PM.png` — live metrics composition.
  - `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/TemporaryItems/NSIRD_screencaptureui_YfMi3w/Screenshot 2026-08-08 at 7.17.34 PM.png` — 820 × 460 CSS-pixel closing panel after 2× density normalization.
  - `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/codex-clipboard-694357f4-4e1f-43e4-8153-80c12610b257.webp` — supplied moving-team background.
- Implementation: `https://rachel-ai-chief-of-staff.vercel.app/`.
- Intended desktop viewport: 1280 × 800 CSS px at device scale factor 1.
- Intended mobile viewport: 390 × 844 CSS px at device scale factor 1.
- State: production deployment `dpl_3PNtQqgHyQL5VZg19ViTZLEXbsif`, READY.

## Implementation evidence available

- Production document: HTTP 200.
- Generated closing image: HTTP 200, PNG, 1633 × 963 px, 2,002,029 bytes.
- Local build: passed.
- Sites worker tests: 4/4 passed.
- Diff whitespace check: passed.
- Source implementation preserves the reference 820 × 460 desktop closing-card geometry.
- Every conversion button renders a green iMessage tile, the label `Get Started`, and the `sms:?body=Hi%20Rachel` destination.
- Live metrics use `848195 / 10000` and `1775484 / 10000`, rendered to two decimals as `84.82` and `177.55` after the entrance count-up.
- Vercel error-log scan: no logs found.

## Full-view comparison evidence

Blocked. The in-app browser refused both the localhost preview and the production navigation during this run because the tab was left on its browser-generated connection-error document. The browser safety policy prohibited retrying through another browser surface. No current browser-rendered implementation screenshot could therefore be captured for a normalized side-by-side comparison.

## Focused comparison evidence

Blocked for the same reason. The compact CTA, metrics block, and final 820 × 460 panel could not be captured from the current production render. Source assets and computed CSS were inspected, but code inspection is not a substitute for the required visible comparison.

## Findings

- [P1] Current production render lacks browser-captured visual evidence.
  - Location: production desktop and mobile layouts.
  - Evidence: source references are available, but the browser-rendered implementation artifact is unavailable in this run.
  - Impact: exact crop, typography, CTA fit, responsive wrapping, and visual parity cannot be signed off pixel-perfectly.
  - Fix: open the production URL in the in-app browser, then recapture desktop and mobile states and compare them with the normalized source references.

## Comparison history

1. Earlier build QA passed against the previous hero, community, metrics-principles, closing-panel, and signature references.
2. This iteration changed the metrics content and scale, all conversion CTAs, and the closing background image; those changed surfaces require fresh visual evidence.
3. Build, asset delivery, deployment readiness, and static implementation checks passed, but the fresh browser comparison is blocked as described above.

## Required fidelity surfaces

- Fonts and typography: unchanged Slate-derived Google Sans/Inter system; fresh rendered comparison blocked.
- Spacing and layout rhythm: 820 × 460 desktop closing geometry and responsive CSS preserved; fresh rendered comparison blocked.
- Colors and tokens: warm-white CTA, `#35e85a` iMessage tile, existing Rachel navy/cream tokens; fresh rendered comparison blocked.
- Image quality and fidelity: supplied image edited only to remove its baked headline; output inspected locally at full resolution; rendered crop comparison blocked.
- Copy and content: all conversion buttons say `Get Started`; metrics and Rachel closing copy are present in source.

final result: blocked

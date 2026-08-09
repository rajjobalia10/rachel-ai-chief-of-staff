# Rachel `rivesa.ai` CTA design QA

## Comparison target

- Source visual truth: `/Users/rivesainc/PKD RACHEL D1/rachel-ai-chief-of-staff/qa/reference-rivesa-cta-image-2.png`.
- Normalized source: `qa/reference-rivesa-cta-normalized-239x68.png`.
- Implementation: `http://127.0.0.1:5173/`.
- Focused implementation capture: `qa/implementation-rivesa-cta-desktop-239x68.jpg`.
- Context captures: `qa/implementation-rachel-hero-1458x1102.jpg` and `qa/implementation-rachel-hero-390x844.jpg`.
- Viewports: 1458 × 1102 desktop, 1024 × 900 tablet, and 390 × 844 mobile CSS px.
- State: resting CTA across header, hero, both pricing cards, closing panel, and footer; mobile-menu CTA also inspected in its open state.

## Density normalization

- The source crop is 478 × 136 px at macOS screenshot density. It was downsampled exactly 2:1 to 239 × 68 px.
- The focused implementation capture is 239 × 68 px at device pixel ratio 1.
- Both contain the same 212 × 40 CSS-pixel button with equal normalized density. Browser chrome and page-scale differences are excluded.

## Findings

- No actionable P0, P1, or P2 differences remain.
- The source crop sits on the neutral `rivesa.ai` page surface while the hero instance sits above Rachel's approved Golden Gate atmosphere. This is expected placement context, not CTA drift; all computed component tokens match the reference.

## Full-view comparison evidence

- The complete normalized source crop and complete implementation crop were opened together in one comparison input at 239 × 68 px.
- The pill silhouette, label hierarchy, icon scale, internal spacing, ink color, surface, inset ring, and soft elevation align visibly.
- Desktop and mobile hero captures confirm that the wider label remains centered, does not wrap, and preserves the approved single-action hero composition.
- Tablet and mobile layout audits report 0 px horizontal overflow.

## Focused region evidence

- Every rendered CTA measures 212 × 40 CSS px.
- The exact Rivesa Messages PNG is rendered at 20 × 20 px from a 256 × 256 source. SHA-256: `6900ce655caa4fb93416c66fd65efa92fdea6a566e05024f7d34e44359578d19`.
- The exact Rivesa Inter variable font is bundled locally. SHA-256: `29160a80ff49ddcab2c97711247e08b1fab27a484a329ce8b813d820dc559031`.
- Browser-computed CTA tokens: 10 px × 16 px padding, 8 px gap, 999 px radius, `#f5f6f8` background, `#08152e` text, 14 px/20 px weight-500 typography, `0 2px 12px rgba(8, 21, 46, .1)` shadow, and a 1 px inset ink ring.

## Required fidelity surfaces

- Fonts and typography: passed. The implementation uses the exact reference Inter variable face at 14/20 medium, zero added letter spacing, and one-line copy.
- Spacing and layout rhythm: passed. The 212 × 40 frame, 20 px icon, 8 px gap, 10/16 padding, and fully rounded pill match at all inspected breakpoints.
- Colors and visual tokens: passed. Surface, ink, inset ring, and shadow match the browser-computed `rivesa.ai` values.
- Image quality and asset fidelity: passed. The real `rivesa.ai` Messages PNG is bundled and displayed without an SVG, CSS drawing, emoji, or substitute glyph.
- Copy and content: passed. Every SMS conversion surface reads `Text your chief of staff`.

## Responsive and interaction verification

- Desktop closed-menu DOM: six SMS conversion links, all with the shared component and identical computed styling.
- Mobile: five visible page CTAs plus the conditional mobile-menu CTA; the desktop header CTA is correctly hidden.
- Mobile-menu open/close interaction passed. Its CTA measured 212 × 40 px and remained inside the 390 px viewport.
- Every inspected CTA retained `sms:+16282646604&body=Hi%20Rachel` on Apple/macOS. The link was not launched, so no Messages handoff or send was triggered.
- Browser console errors: 0.

## Comparison history

1. [P1] The previous site used `Get Started`, a 134.43 × 50 px pill, and a Phosphor approximation, with a separately implemented closing CTA and a plain footer text link. Evidence: `qa/exact-one-button-hero-1458x1102.png` and the pre-change production DOM/style audit.
2. Fix: replaced all SMS conversion call sites with one shared component, adopted the exact selected label, 212 × 40 geometry, Rivesa Messages asset, exact Rivesa Inter face, and source shadow/ring tokens.
3. Post-fix evidence: the normalized focused comparison plus desktop, tablet, mobile, mobile-menu, href, overflow, build, test, and console checks show no remaining P0/P1/P2 issue.

## Implementation checklist

- [x] Shared component used by every SMS conversion surface.
- [x] Exact label, icon, font, geometry, spacing, colors, and elevation.
- [x] Production number and `Hi Rachel` prefill preserved.
- [x] Desktop, tablet, mobile, and mobile-menu layouts verified.
- [x] Build, automated tests, and browser console verified.

## Follow-up polish

- None required for the selected CTA target.

final result: passed

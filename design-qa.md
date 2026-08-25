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

---

# Rachel website design QA

## Result

PASS — the homepage header, standalone pricing page, and standalone docs page match the selected reference structure while retaining Rachel's typography, blue/black palette, product imagery, and exact iMessage CTA contract.

## Source truth

- User-supplied header crop: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/TemporaryItems/NSIRD_screencaptureui_jSXuJ7/Screenshot 2026-08-25 at 11.38.33 PM.png`
- Captured Composio pricing top: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/composio-pricing-desktop-top.png`
- Captured Composio pricing full page: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/composio-pricing-desktop-full.png`
- Existing Rachel brand and product guidance: `BRAND_IDENTITY.md` and `AGENTS.md`

## Final implementation evidence

- Homepage desktop: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/rachel-local-home-desktop-final.jpg`
- Homepage product-truth section: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/rachel-local-home-product-truth.jpg`
- Pricing desktop: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/rachel-local-pricing-desktop-compact.jpg`
- Pricing mobile: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/rachel-local-pricing-mobile-final.jpg`
- Pricing section contact sheet: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/rachel-local-pricing-contact-sheet.png`
- Docs desktop: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/rachel-local-docs-top.jpg`
- Docs mobile: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/rachel-local-docs-mobile.jpg`
- Mobile navigation: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/rachel-local-mobile-menu.jpg`

## Same-input visual comparisons

- Header reference over Rachel implementation: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/qa-header-reference-vs-rachel-final.png`
- Pricing reference over Rachel implementation: `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/rachel-site-capture/qa-pricing-reference-vs-rachel-final.png`

The first pass placed the pricing cards too low and let the signal artwork crowd the brand mark. The second pass aligned the hero and card start with the 1440×900 reference and inset the header content. The final pass reduced standalone plan-card height so prices, features, and the CTA remain visible together, matching the reference's first-screen hierarchy.

## Viewports and interactions

- Desktop: 1440×900 at device pixel ratio 1.
- Mobile: 390×844 at device pixel ratio 1.
- Verified the mobile menu opens to the full viewport and closes correctly.
- Verified Docs in-page navigation lands `#approvals` at the sticky-header offset.
- Verified header navigation reaches `/pricing` and updates the route title and H1.
- Verified cross-page `/#features` navigation lands the target 72 px below the sticky header.
- Verified the Pro annual switch changes `$29` to `$24` and sets `aria-checked="true"`.
- Verified the pricing FAQ expands and exposes its answer.
- Verified collapsed FAQ answers are absent from the focus order and expanded answers are linked by `aria-controls`.
- Verified the feature comparison uses semantic table, row-header, and column-header markup.
- Verified the production SMS link remains `sms:+16282646604&body=Hi%20Rachel` on the Apple test environment.

## Runtime checks

- No browser console errors.
- The development console reports only the expected React DevTools message and Framer Motion's reduced-motion informational warning.
- DOM inspection confirms one comparison section, one FAQ section, one final CTA, and one footer. A stitched full-page browser capture duplicated sticky/animated segments, so final visual judgment used stable same-viewport section captures plus DOM counts.

## Product-truth check

- Removed unsourced live usage counters.
- Preserved the public Free `$0`, Pro `$29` monthly, and Pro `$24` yearly prices.
- Connected tools are described as early access and account-by-account.
- Important external actions remain explicitly approval-first.
- No enterprise tier or broad integration promise was invented.

final result: passed

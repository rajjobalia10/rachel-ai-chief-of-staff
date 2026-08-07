# Rachel design QA

## Scope and visual truth

The completed Slate clone remains the system source for Rachel's typography, tokens, navigation, later-section geometry, responsive breakpoints, shadows, and motion. The supplied Rachel concept is the selected visual target for the first screen's centered composition, phone placement, coastal atmosphere, paired CTAs, bottom coda, and eight-ray identity mark. Its serif font and black presentation frame are intentionally excluded because the user explicitly asked to retain Rachel's current Google Sans and Inter families. Shantanu Kumar's Quick Brown Fox case study was inspected as brand-process context only: its discipline of using one mark, one lockup, a documented palette, and consistent applications informs Rachel, while none of its coffee palette, fox mark, type, packaging, or layouts are imported.

Source visual:

- `qa/hero-v2-reference-1458x1102.png`
- Source pixels: 1458 × 1102 RGBA

Rendered implementation:

- `qa/hero-v2-rachel-1458x1102.png`
- Implementation pixels: 1458 × 1102 RGB
- CSS viewport: 1458 × 1102
- Device pixel ratio: 1
- State: desktop header closed, hero entrance settled, no focused control

Responsive implementation evidence:

- `qa/hero-v2-tablet-1024x900.png`
- `qa/hero-v2-mobile-390x844.png`
- `qa/hero-v2-mobile-320x844.png`
- `qa/brand-identity-mobile-390x844.png`
- `qa/brand-identity-feature-320x844.png`
- `qa/brand-identity-steps-320x844.png`

## Side-by-side evidence

- Full hero comparison: `qa/hero-v2-comparison.png` — 1600 × 610 px
- Focused copy, CTA, phone, and crop comparison: `qa/hero-v2-comparison-focused.png` — 1600 × 610 px

The full view confirms the same centered hierarchy, phone-first silhouette, coast weighting, and coda transition. The focused view confirms headline wrapping, CTA baseline, phone top/width, message content, and the intentional contemporary font substitution.

## Required fidelity surfaces

- Fonts and typography: Google Sans Medium remains the display face and Inter remains the body/UI face. Desktop hero is 64/64 px with -2.6 px tracking, tablet is 60/60 px with -2.4 px tracking, and mobile is 44/44 px with -1.8 px tracking. This is the requested retained Rachel type system rather than the reference serif.
- Spacing and layout: at 1458 px, the announcement begins at y=165, headline at y=236, actions at y=464, phone at y=536 with a 396 px width, and coda at y=978. These coordinates match the reference's major-region proportions. Tablet uses a 370 px phone at hero y=454; mobile uses a 300 px phone at hero y=420.
- Colors and tokens: the existing `#f7f7f7`, black, `#0086ff`, source shadow tokens, and 12 px hero CTA radii remain intact. The hero paragraph uses `#666666` for stronger normal-text contrast over the warm image field.
- Image quality: the hero uses separately art-directed, locally bundled coast and phone assets with responsive `srcSet` delivery. The 1× WebPs are 1535 × 1024 at 59,360 bytes and 618 × 1274 at 57,784 bytes. The 2× WebPs are 3070 × 2048 at 142,952 bytes and 1236 × 2548 at 160,908 bytes. A DPR-2 load is therefore about 304 KB instead of the former 1.8 MB eager PNG payload. The phone has transparent edges with no visible chroma fringe, all iMessage copy is legible, and only the coast retains high fetch priority.
- Copy and content: “Meet Rachel, your day already handled.” and the supporting line clearly position Rachel as an iMessage-native chief of staff. The phone conversation demonstrates briefing, calendar coordination, follow-through, and explicit approval.

## Brand identity verification

- The eight-ray Rachel mark is now the single signature used by the header and footer lockup, favicon, product contact/avatar moments, and social preview. The former six-arm generic asterisk, `R` avatar, gray contact dot, and generic Rachel person avatar are no longer visible in these identity roles.
- The lockup has an explicit Inter wordmark treatment with fixed sizing, weight, tracking, and spacing; the site continues to use Google Sans for display copy.
- Existing color values were preserved and given semantic aliases: paper `#F7F7F7`, warm hero surface `#F7F7F4`, ink `#000000`, Rachel blue `#0086FF`, deep product blue `#0075FA`, success `#07DC71`, and focus `rgba(0, 134, 255, .65)`.
- `BRAND_IDENTITY.md` documents Rachel's promise, personality, mark rules, type, palette, image modes, motion, voice, and cross-surface application boundaries.
- Browser/share identity is complete: 64 × 64 local favicon/touch mark and 1200 × 630 local social card, with Open Graph and Twitter metadata pointing at the Rachel production domain.
- Desktop workflow and feature checks, plus `qa/brand-identity-mobile-390x844.png`, confirm that the branded mark overlays cover only Rachel-owned contact indicators. Tool, user, permission, and action icons remain semantically unchanged.

## Interaction and responsive verification

- Desktop 1458 × 1102: no horizontal overflow, no broken images, document height 9527 px.
- Tablet 1024 × 900: no horizontal overflow, no broken images, document height 11196 px.
- Mobile 390 × 844: no horizontal overflow, no broken images, document height 12694 px.
- Narrow mobile 320 × 844: document width remains 320 px with no page overflow, no broken images, and document height 12822 px. Hero actions stack to a 280 px column and the phone remains fully visible at 280 px. The altered feature and step artwork also retain the source `512 / 411` aspect ratio (measured 1.2457 and 1.2458) instead of cropping their product UI; focused evidence is in `qa/brand-identity-feature-320x844.png` and `qa/brand-identity-steps-320x844.png`.
- Mobile menu opens to 844 px, remains above the phone scene (`z-index: 99` versus `1`), and closes normally.
- “Text Rachel” retains the functional `sms:?body=Hi%20Rachel` destination.
- “See how it works” navigates to `#steps`; tested result placed the section at viewport top with `scrollY=6159`.
- Exactly one `h1` is present. The decorative coast is hidden from assistive technology, while the phone has meaningful alt text.
- Global focus-visible treatment is present for links and buttons.
- No browser console errors were observed. Development mode emitted only Framer Motion's expected notice that the device-level reduced-motion preference was enabled; the UI correctly settled without animation.
- Feature, workflow, and step identity placements were visually checked on desktop and mobile. Existing pricing, FAQ, testimonial, navigation, and responsive behavior remain covered by the earlier full-site QA.

## Comparison history

1. P2 — A single baked phone/landscape composite rendered a roughly 396 px phone on mobile and clipped both device rails. Fix: generated separate coast and high-resolution phone assets, removed the chroma key, validated alpha coverage, and positioned the phone independently at 396/370/300 px. Post-fix evidence: all three final implementation captures show the full rails with no overlap or overflow.
2. P2 — The first desktop pass placed the copy cluster about 50–60 px above the selected reference. Fix: tuned hero copy top and internal margins. Post-fix evidence: announcement y=165, headline y=236, actions y=464–512, phone y=536, and coda y=978 align with the source composition.
3. P2 — The inherited muted hero text and absent global keyboard focus treatment reduced accessibility polish. Fix: darkened only the hero supporting text to `#666666` and added a consistent blue focus-visible outline without changing the visual resting state.
4. P2 — The first separated hero files were 1× PNGs totaling roughly 1.8 MB, risking soft text and a slow first load on Retina screens. Fix: delivered optimized 1×/2× WebP `srcSet` pairs. Post-fix evidence: 3070 px coast, 1236 px phone, and about 304 KB total at DPR 2.
5. P2 — Mobile geometry originally retained fixed 350 px rails below 350 px. Fix: viewport-bounded section widths, stacked narrow CTAs, and a 280 px phone. Post-fix evidence: the 320 × 844 capture and computed 320 px document width.
6. P1 — Identity audit found a generic six-arm header asterisk and inconsistent `R`, person, and dot contact markers across product art. Fix: exported the selected eight-ray Rachel mark from the supplied identity reference, applied it to the formal lockup and Rachel-owned avatar moments, added the favicon/social card, and documented the complete system. Post-fix evidence: desktop feature/workflow/step visual checks and the mobile brand-identity capture.
7. P2 — Independent review found that the 320 px width clamp could stretch the 512 × 411 feature and step artwork inside inherited fixed-height slots, with possible drift in the percentage-positioned Rachel marks. Fix: preserved the exact source aspect ratio at the narrow breakpoint, made the narrow step image grid track its intrinsic height, and rechecked both altered surfaces. Post-fix evidence: 280 × 224.77 px feature art, 254 × 203.89 px step art, an exact 16 px image-to-copy gap, no broken images, no document overflow, and the two focused 320 px captures listed above.

## Final verification

- `npm run build`: passed
- `npm run test:sites`: 4/4 passed
- Remaining P0/P1/P2 findings: none
- Intentional differences: current Google Sans/Inter typography, existing Slate-derived header treatment, omission of the hero reference's black outer presentation frame, and no import of the Quick Brown Fox visual style.

final result: passed

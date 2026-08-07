# Rachel final design QA

## Acceptance target

Rachel preserves the completed Slate clone as the visual and motion source of truth: Google Sans/Inter typography, 820 px desktop container, measured section geometry, black and warm-white conversion surfaces, card radii, shadows, breakpoints, sticky navigation, reveal rhythm, and interaction quality. Poke and Pally informed only the product story and copy framing.

The user-supplied references were translated as follows:

- Golden Gate panorama and centered phone hierarchy in the hero.
- Premium paired CTA treatment.
- Moving community/workflow rail near the close.
- Large two-column product-principles treatment without invented usage data.
- Rounded product-led closing panel.
- Oversized softly fading Rachel signature.

Competitor photography, serif typography, fabricated testimonials, fabricated operating metrics, and generic AI/lifestyle imagery were not imported.

## Brand and asset verification

- Primary mark: `public/assets/rachel-mark-v2.png`, a unique tapered eight-ray signal with a conversational lower-right gesture.
- Hero atmosphere: `public/assets/rachel-hero-golden-gate-clouds.webp`, converted from the user-supplied 1280 × 482 image.
- Product hero: local transparent iMessage phone art at 1× and 2×.
- Social card: local 1200 × 630 render at `public/assets/rachel-social-card.jpg`.
- The favicon, header, product-avatar moments, closing CTA, footer, and visual mood board use the same v2 mark.
- Unused testimonial portraits, former coastal assets, old marks, and rejected/legacy hero images were removed from `public/`; they cannot ship in the production bundle.
- `BRAND_IDENTITY.md`, `BRAND_MOODBOARD.md`, and `public/brand/rachel-moodboard.html` document the system and its guardrails.

Image generation was used only for the original Rachel identity mark. The prompt was constrained to a clean, ownable, flat brand symbol with tapered radial awareness and a subtle conversation gesture; it was not used to generate people, stock-style scenes, or editorial filler.

## Visual comparison evidence

The source references and final captures were inspected together, not as isolated screenshots. The browser-readable comparison board is `qa/final-reference-comparison.html`.

- Hero: `qa/reference-hero-layout.png` + `qa/final-hero-1458x1102.jpg`.
- Golden Gate source: `qa/reference-hero-golden-gate.png`.
- Community rail: `qa/reference-community.png` + `qa/final-community-1200x630.jpg`.
- Principles treatment: `qa/reference-live-metrics.png` + `qa/final-principles-1200x630.jpg`.
- Product close: `qa/reference-product-cta.png` + `qa/final-closing-1200x630.jpg`.
- Signature: `qa/reference-signature.png` + `qa/final-signature-1200x630.jpg`.

The comparisons confirm the intended composition, density, spacing rhythm, section sequencing, rounded surfaces, and fade effects while retaining Rachel's Slate-derived fonts and original product artwork.

## Responsive evidence

- Desktop hero: `qa/final-hero-1458x1102.jpg`.
- Tablet hero: `qa/final-tablet-hero-1024x900.jpg`.
- Mobile hero: `qa/final-mobile-hero-390x844.jpg`.
- Mobile product close: `qa/final-mobile-closing-390x844.jpg`.
- Existing focused 320 px identity/product captures remain in `qa/` for the narrow breakpoint.

At the active 1200 × 630 browser viewport, the current document reported one `h1`, no broken images, a 1200 px document width, a 1200 px client width, and a 10,519 px document height. The final desktop, tablet, 390 px, and 320 px captures show no clipped primary content or page-level horizontal overflow. Narrow rules keep hero actions stacked, the phone viewport-bounded, workflow cards scrollable, the two principle values stacked, and the closing CTA/footer within a 20 px edge gutter.

## Motion and interaction verification

- Hero entrance is staged: background, announcement, headline, copy, actions, and low-bounce phone settle.
- Desktop/tablet hero uses restrained background/phone scroll depth; mobile and reduced-motion paths remove spatial travel.
- Section headings and grouped cards reveal once with measured stagger.
- Workflow tabs move directionally with small translation and blur; arrow-key, Home, and End behavior is implemented.
- Sticky header changes blur and shadow after 16 px without changing height.
- Primary and secondary CTAs have restrained lift/press motion and visible focus treatment.
- Pricing switch updates `aria-checked` and the displayed annual price.
- FAQ rows update `aria-expanded` and animate content without collapsing focus visibility.
- Mobile navigation opens as a full-height blurred sheet with staggered links and closes with Escape or navigation.
- Community rail moves continuously, pauses on hover/focus, and exposes a keyboard/touch-accessible `Pause motion` control. The control was tested: `aria-pressed` changed to `true`, its label changed to `Play motion`, and the track's computed animation state changed to `paused`.
- The current macOS reduced-motion preference was tested in-browser. Spatial loops and transforms stop while short opacity/color fades remain; the former blanket 0.01 ms animation kill switch is gone.

## Accessibility and truthfulness

- Exactly one page-level `h1` is present.
- The atmospheric hero image is decorative; the phone and product-proof imagery have meaningful descriptions where needed.
- Links, buttons, tabs, switches, and FAQ controls have keyboard-visible focus states.
- Duplicate workflow-rail cards are hidden from assistive technology.
- No dead Privacy/Terms anchors are presented as legal destinations.
- Unsupported encryption, data-sale, export, and deletion guarantees were removed. Pre-launch security/data-control wording is explicit rather than presented as shipped capability.
- The reference metrics structure is reframed as product principles (`Ready` and `Your call`) instead of simulated live activity or unsourced counters.
- Browser console inspection found no application errors. Development output contained only Vite connection messages, the React DevTools notice, and Framer Motion's expected reduced-motion notice.

## Fix history

1. Separated the phone from the background so device sizing and crop could be art-directed independently at every breakpoint.
2. Replaced the earlier coast with the exact user-supplied Golden Gate panorama and preserved the Slate-derived font system.
3. Replaced the generic asterisk and inconsistent avatars with one unique Rachel mark across identity moments.
4. Removed fake testimonial names, portraits, quotes, and every unused stock-style image from the shipping bundle.
5. Rebuilt motion around restrained springs, directional transitions, staggered reveals, tactile controls, and a real reduced-motion fallback.
6. Added the requested closing rail, large principles section, rounded product CTA, and faded signature.
7. Added an explicit rail pause control after accessibility review.
8. Replaced unsourced live counters with product principles, removed dead legal links, and softened unsupported privacy/security promises after independent review.

## Automated verification

- `npm run build`: passed after the final source changes.
- `npm run test:sites`: 4/4 passed after the final source changes.
- `git diff --check`: passed after the final source changes.
- Remaining P0/P1 findings after final independent review: none.

final result: passed

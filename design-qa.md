# Rachel design QA

## Scope and source of truth

Rachel was evaluated only against the completed local Slate clone for visual design, layout, responsiveness, and motion. Poke and Pally informed product positioning and copy only. The supplied Rachel concept influenced the restrained brand voice, star cue, and iMessage product context; its serif typography and scenic composition were not used as layout direction.

Source captures:

- Desktop: `/Users/rivesainc/PKD RACHEL D1/qa/local-desktop-1440-final.png`
- Tablet: `/Users/rivesainc/PKD RACHEL D1/qa/local-tablet-1024-final.png`
- Mobile: `/Users/rivesainc/PKD RACHEL D1/qa/local-mobile-390-final.png`
- Settled, visible focused regions: `https://slate-framer-clone.vercel.app/`

Implementation captures:

- `qa/desktop-rachel-1440x900.png`
- `qa/tablet-rachel-1024x900.png`
- `qa/mobile-rachel-390x844.png`

## Comparison setup

All screenshots were captured at device-pixel ratio 1 after fonts, images, and reveal motion settled. The compared state used a closed mobile menu, the first workflow tab, monthly pricing, and collapsed FAQ items.

| Viewport | Source capture | Rachel capture | Combined comparison |
| --- | --- | --- | --- |
| Desktop | 1440 × 900 CSS px | 1440 × 900 CSS px | `qa/desktop-comparison.png` — 1912 × 600 px, equal normalized panels |
| Tablet | 1024 × 900 CSS px | 1024 × 900 CSS px | `qa/tablet-comparison.png` — 1600 × 698 px, equal normalized panels |
| Mobile | 390 × 844 CSS px | 390 × 844 CSS px | `qa/mobile-comparison.png` — 792 × 844 px, two exact 390 px panels |

Focused comparisons:

- `qa/focus-comparison-features.png`
- `qa/focus-comparison-workflow.png`
- `qa/focus-comparison-pricing.png`
- `qa/focus-comparison-faq.png`

## Measured visual parity

- Typography: Google Sans Medium display headings and Inter body/UI families match the Slate clone's bundled font files. Desktop hero is 56/58 px with -2 px tracking; section display headings are 40/42 px with -0.8 px tracking; body defaults to Inter 16/24 px with -0.2 px tracking.
- Color: page `#f7f7f7`, text `#000000`, secondary text `#7a7a7a`, and brand/action blue `#0086ff` match the source tokens.
- Geometry: the 1440, 1024, and 390 layouts use the same container widths, section bounds, padding, grid changes, and 1200/810 responsive breakpoints as Slate. Measured document heights match at 9527 px, 11154 px, and 12501 px respectively.
- Surfaces: 268 × 168 px feature cards, 12 px radii, source-matched layered shadows, 780 × 449.4 px workflow panel, 454 px FAQ column, and 24 px FAQ padding were confirmed from computed styles.
- Assets: Rachel product visuals are original, locally bundled, high-resolution iMessage-oriented renders. Slate's exact decorative backgrounds, fonts, and testimonial treatment are preserved locally; there are no placeholders or hotlinks.
- Copy: all Rachel sections form one coherent product story covering proactive follow-through, memory, tool connections, approvals, security, pricing, and iMessage-native operation.

## Motion and interaction parity

- Header and mobile menu use the source spring timing, two-bar menu treatment, responsive height animation, and focusable navigation.
- Scroll reveals use the source blur, opacity, transform, threshold, and reduced-motion handling.
- Workflow tabs reproduce the source panel-height spring, per-state text/image transition, keyboard arrow navigation, and mobile overflow behavior.
- Pricing switch animates between monthly and annual states and updates displayed prices.
- FAQ items reproduce the source layout spring, blur/opacity answer reveal, persistent divider bars, and collapsed/expanded geometry.
- Testimonials use the source-style three-second progression and visibility-aware queueing without an added hover pause.
- Primary conversion actions launch an SMS draft containing “Hi Rachel”; navigation anchors and all core controls work.

## Iterations resolved

1. P2 — FAQ wrapping caused breakpoint-specific height drift. Question lengths and source min-heights were tuned until the card wrapping pattern and total document geometry matched at all three viewports.
2. P2 — Tablet cards had a 3 px overflow caused by the default inline SVG baseline after Tailwind preflight was removed. A global block SVG rule restored the source behavior; every audited card now has equal client and scroll heights.
3. P2 — Testimonial timing and reveal thresholds had drifted from the measured source. Visibility queueing, the three-second interval, workflow transitions, and the 0.5 reveal threshold were restored to source behavior.

## Final verification

- `npm run build`: passed
- `npm run test:sites`: 4/4 passed
- Desktop/tablet/mobile horizontal overflow: none
- Broken image scan: none
- Desktop/tablet/mobile console warning/error scan: clean
- Mobile menu, workflow mouse and keyboard controls, pricing switch, FAQ expansion, nav anchors, and SMS CTA: passed
- Remaining P0/P1/P2 issues: none
- Intentional difference: Slate's template promotion/edit overlays are omitted, while Rachel branding, product copy, and product imagery are original as required.

final result: passed

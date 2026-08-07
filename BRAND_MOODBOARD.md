# Rachel brand mood board

The visual board is available at [`/brand/rachel-moodboard.html`](public/brand/rachel-moodboard.html). It is a responsive, self-contained HTML presentation that uses only Rachel's current local assets and bundled Google Sans/Inter font files.

## Purpose

This board turns the existing Rachel identity into one reviewable system. It is an application guide, not a new design direction.

- Brand idea: **calm command**
- Promise: **Your day, already handled.**
- Product descriptor: **Your AI chief of staff in iMessage.**
- Character: composed, perceptive, discreet, proactive, and human
- Experience: warm editorial atmosphere paired with precise product proof

## System source

- Slate remains the source for interface geometry, spacing, component treatment, shadows, breakpoints, and motion.
- Rachel retains Google Sans Medium for display and Inter for body, UI, and the wordmark.
- The selected Rachel hero supplies the Golden Gate cloudscape, centered phone, paired actions, and tapered eight-ray identity mark.
- Poke and Pally remain positioning and copy context only.
- Shantanu Kumar's Quick Brown Fox work contributes identity-system discipline only. None of its typography, palette, fox mark, packaging, or layouts is part of Rachel.

## Mark and lockup

- Primary mark: the tapered eight-ray Rachel star in Rachel blue, finished with a subtle lower-right conversational gesture.
- Primary lockup: star followed by the Inter wordmark.
- Contained mark: star centered in a pale-blue circular contact/avatar field.
- The tapered rays create a precise, active center; the restrained lower-right gesture suggests conversation without becoming a literal chat bubble.
- Minimum digital size: 16 px for the mark, 72 px for the complete lockup.
- Clear space: at least half the rendered mark width on all sides.
- Use the mark at identity moments: header, footer, favicon, social card, and Rachel-owned contact indicators.
- Do not turn the mark into a decorative pattern or replace semantic user/tool/action icons with it.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| Rachel blue | `#0086FF` | Mark, product state, connection, and confirmation |
| Deep product blue | `#0075FA` | Product-art depth and active-state support |
| Ink | `#000000` | Primary typography and conversion surfaces |
| Paper | `#F7F7F7` | Main page canvas |
| Warm hero | `#F7F7F4` | Editorial hero surface |
| White | `#FFFFFF` | Product cards and elevated surfaces |
| Muted | `#7A7A7A` | Secondary copy outside the hero |
| Hero supporting text | `#666666` | Supporting copy on warm photographic fields |
| Success | `#07DC71` | Confirmed, connected, and completed states |
| Focus | `rgba(0, 134, 255, .65)` | Keyboard focus outline |

Warmth belongs to photography and neutral surfaces. Rachel blue remains the only primary digital accent.

## Typography

| Role | Face | Size / line height | Tracking |
| --- | --- | --- | --- |
| Hero display | Google Sans 500 | `64 / 64` px | `-2.6px` |
| Tablet hero | Google Sans 500 | `60 / 60` px | `-2.4px` |
| Mobile hero | Google Sans 500 | `44 / 44` px | `-1.8px` |
| Section display | Google Sans 500 | `40 / 42` px | `-0.8px` |
| Product title | Google Sans 500 | `20 / 28` px | `-0.6px` |
| Coda | Google Sans 500 | `24 / 32` px | `-0.7px` |
| Body | Inter 400 | `16 / 24` px | `-0.2px` |
| Navigation | Inter 400 | `14 / 17` px | `-0.14px` |
| Wordmark | Inter 400 | `20 / 24` px | `-0.4px` |

Use sentence case, compact display wrapping, short paragraphs, and language that sounds like a precise person rather than a dashboard.

## Image system

### Warm editorial atmosphere

- Golden Gate cloud cover, soft coastal daylight, paper neutrals, generous negative space, and human calm.
- Used for the hero, social story, and high-level brand moments.
- Use only Rachel-owned, commissioned, or explicitly licensed photography and imagery.
- No stock imagery, generic lifestyle scenes, generated people, placeholder portraits, neon AI motifs, robots, abstract brains, or over-processed futurism.

### Rachel-blue product proof

- Bright, legible interface renders with clear hierarchy and realistic content.
- Every visual should demonstrate one of three product truths: Rachel remembers, coordinates, or asks before acting.
- The star identifies Rachel only; user, tool, permission, and action symbols stay semantic.

## Motion

- Interaction spring: stiffness `420`, damping `34`, mass `0.75`.
- Layout spring: stiffness `300`, damping `32`, mass `0.85`.
- Feature reveal: `0.56s` with the `0.16, 1, 0.3, 1` luxury ease.
- Flow reveal: `0.68s` with the same luxury ease.
- Reduced-motion fade: `0.15s` linear, with spatial travel removed.
- Motion communicates readiness and follow-through; it never loops for decoration.
- The phone may settle once and should never float continuously.
- The workflow rail is the one continuous narrative motion; it pauses on pointer/keyboard attention and exposes an explicit play/pause control.
- `prefers-reduced-motion` removes non-essential motion.

## Usage guardrails

### Use

- One mark, one lockup, and one primary blue.
- Black conversion buttons and blue product-state signals.
- Warm photography for narrative moments; clean UI renders for proof.
- Approval-first language: Rachel prepares, asks, then acts.
- The same identity treatment from browser icon through product contact UI.

### Avoid

- A new font, serif substitution, or alternate wordmark.
- Star patterns, decorative logo repetition, or mark-shaped dividers.
- Additional primary accents or a general warm recoloring of the product UI.
- Generic AI imagery, stock photography, stock-style lifestyle scenes, generated people, and unsourced portraits.
- Importing Quick Brown Fox visual assets or style cues.
- Restyling Slate-derived grids, cards, spacing, shadows, or motion in the name of branding.

## Application modules

### Community proof

- Use real, permissioned customer names, company marks, and quotes only.
- Layout: lead with one concise outcome in Google Sans, then place the verified name, role/company, and optional permissioned logo in a compact Inter attribution row.
- Preserve the established card geometry, Google Sans hierarchy, Inter detail text, and restrained blue signal.
- Never invent names, companies, affiliations, quotes, outcomes, or claims; never use generated people, stock headshots, or placeholder logos.

### Product principles and verified metrics

- Use large principle-led typography when verified operating data is unavailable.
- Show numeric product-backed values only with a clear source, timeframe, and plain-language label.
- Layout: lead with one large Google Sans value, follow with an Inter label/timeframe/source line, and reserve Rachel blue for the active or confirmed state.
- Use whitespace, thin rules, and direct comparisons instead of ornamental dashboards or invented charts.
- Never invent customer names, activity, values, comparisons, or claims; do not publish simulated activity, vanity counters, or numbers that imply usage without evidence.

### Product-led close

- End with a real Rachel workflow or iMessage outcome, followed by one primary `Text Rachel` action.
- Repeat the established black conversion surface and blue product-state signal; do not introduce a campaign color.
- Keep the promise outcome-led and approval-first: Rachel prepares the next step, and the user decides what happens.
- Avoid generic lifestyle imagery, abstract AI art, or a closing section that is visually louder than the product proof.

## Mood-board asset manifest

- `public/assets/rachel-mark-v2.png`
- `public/assets/rachel-hero-golden-gate-clouds.webp`
- `public/assets/rachel-hero-phone-cutout-v4.webp`
- `public/assets/rachel-social-card.jpg`
- `public/assets/rachel-feature-memory.png`
- `public/assets/rachel-feature-tools.png`
- `public/assets/rachel-feature-thread.png`
- `public/assets/rachel-workflow-connect.png`
- `public/assets/rachel-workflow-text.png`
- `public/assets/rachel-workflow-done.png`
- `public/assets/rachel-context.png`
- `public/assets/rachel-step-text.png`
- `public/assets/rachel-step-connect.png`
- `public/assets/rachel-step-handoff.png`

# Rachel brand identity

Rachel is built around **calm command**: the feeling that a trusted chief of staff is quietly keeping the day moving, while every consequential decision remains with the user.

The responsive visual mood board is available at [`/brand/rachel-moodboard.html`](public/brand/rachel-moodboard.html). The concise usage guide is in [`BRAND_MOODBOARD.md`](BRAND_MOODBOARD.md).

## Strategic core

- Brand promise: **Your day, already handled.**
- Product descriptor: **Your AI chief of staff in iMessage.**
- Functional promise: Rachel remembers, prepares, coordinates, and follows through.
- Trust promise: Rachel asks before important external actions.
- Personality: composed, perceptive, discreet, proactive, and human.
- Voice: short, specific, reassuring, and never theatrical.

## Identity system

### Mark

The primary mark is a tapered eight-ray signal. Seven rays describe awareness radiating around the user; the lower-right ray bends into a subtle conversational gesture, connecting the ideas of attention, dialogue, and follow-through without becoming a literal speech bubble or letterform.

- Primary asset: `public/assets/rachel-mark-v2.png`
- Primary lockup: mark followed by the `Rachel` wordmark in Inter.
- Contained mark: the mark centered in a pale-blue circular contact/avatar surface.
- Minimum digital size: 16 px for the mark and 72 px for the complete lockup.
- Clear space: at least half the rendered mark width on every side.
- Use the mark at identity moments: header, footer, favicon, social preview, Rachel-owned contact avatars, and the closing signature.
- Do not turn the mark into a pattern, replace semantic product icons with it, or pair it with alternate marks.

### Wordmark

The wordmark is `Rachel` in Inter 400 with compact tracking. It is intentionally quiet beside the more expressive signal mark. Google Sans remains the display face for headlines; it is not substituted into the formal wordmark.

### Color

| Token | Value | Role |
| --- | --- | --- |
| Rachel blue | `#0086FF` | Mark, connection, confirmation, and active product state |
| Deep product blue | `#0075FA` | Product-art depth and supporting active states |
| Ink | `#000000` | Primary typography and conversion surfaces |
| Paper | `#F7F7F7` | Page canvas and quiet negative space |
| Warm hero | `#F7F7F4` | Editorial hero and signature surfaces |
| White | `#FFFFFF` | Product cards and elevated surfaces |
| Muted | `#7A7A7A` | Supporting information outside the hero |
| Hero copy | `#666666` | Supporting copy over the atmospheric hero |
| Success | `#07DC71` | Connected and completed product states |
| Focus | `rgba(0, 134, 255, .65)` | Keyboard focus outline |

Rachel blue is the only primary digital accent. Warmth belongs to light, atmosphere, and neutral surfaces rather than a competing brand color.

### Typography

- Display: Google Sans Medium, weight 500.
- Body and UI: Inter, weights 400–700.
- Mobile navigation: Inter Display.
- Desktop hero: `64 / 64` px with `-2.6px` tracking.
- Tablet hero: `60 / 60` px with `-2.4px` tracking.
- Mobile hero: `44 / 44` px with `-1.8px` tracking.
- Section display: `40 / 42` px with `-0.8px` tracking.

Display copy stays compact, balanced, and sentence case. Body copy should sound like a precise person rather than a dashboard or an AI demo.

## Image system

### Atmospheric hero

The user-supplied Golden Gate cloud panorama establishes Rachel's editorial world: California light, open negative space, calm scale, and a sense of rising above the noise. The centered iPhone supplies the product proof and remains independently art-directed at every breakpoint.

- Hero atmosphere: `public/assets/rachel-hero-golden-gate-clouds.webp`
- Product phone: `public/assets/rachel-hero-phone-cutout-v4.webp`
- The phone always shows a real Rachel/iMessage exchange.
- Poke imagery is not copied; its reference is used only to understand centered hierarchy and storytelling rhythm.

### Product proof

Bright, legible interface renders use Rachel blue to connect context, requests, approvals, and completed work. Every visual must support one of three truths: Rachel remembers, Rachel coordinates, or Rachel asks before acting.

### Prohibited imagery

Do not use generic AI art, stock or stock-style lifestyle photography, generated people, placeholder portraits, robots, neon grids, abstract brains, or unrelated still-lifes. When a real customer story is unavailable, use an explicitly framed workflow or product scenario rather than inventing a person, company, quote, outcome, or metric.

## Motion system

Motion communicates readiness and follow-through.

- Hero: atmosphere fades and settles first, followed by announcement, headline, supporting copy, paired actions, and a low-bounce phone entrance.
- Scroll depth: the hero background and phone move at restrained, separate rates on desktop and tablet.
- Sections: headings and content groups enter once with short staggered reveals.
- Product state: workflow changes move directionally with a small blur and no theatrical transition.
- Controls: buttons lift one pixel, compress on press, and deepen their existing shadow.
- Community: the use-case rail moves continuously, pauses for pointer or keyboard attention, and includes an explicit play/pause control.
- Principles and metrics: large typographic values reveal only after the section enters the viewport. Numeric activity may animate only when it is verified and paired with a source and timeframe.
- Closing signature: the oversized lockup rises softly and fades into the warm footer surface.
- Reduced motion: spatial travel and autoplay stop, while short opacity and color fades remain.

The phone never floats perpetually. Decorative looping glow, cursor tracking, tilt, and gratuitous logo animation are not part of the system.

## Conversion surfaces

Hero and closing actions use substantial rounded rectangles with a black primary surface, warm-white secondary surface, inset light, soft elevation, and restrained tactile motion. Header and pricing controls remain proportionally smaller to protect hierarchy.

## Closing narrative

The final story always resolves in this order:

1. A moving rail of clearly labeled Rachel workflows.
2. A large product-principles or verified-metrics section that avoids fabricated vanity metrics.
3. A rounded, product-led “Meet your new chief of staff” CTA using real Rachel interface art.
4. An oversized, softly fading Rachel signature lockup.

## Source boundaries

- Slate remains the source of truth for fonts, weights, colors, container widths, spacing, radii, shadows, breakpoints, component treatment, and motion quality.
- Poke and Pally inform positioning, feature framing, integrations, use cases, and copy only.
- Shantanu Kumar's Quick Brown Fox work informs the rigor of building one coherent system, not Rachel's palette, type, mark, packaging, or layout.
- The Rachel repository and Vercel project remain independent from the Slate clone.

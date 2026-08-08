# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable Rachel design direction

- Use the existing local Slate clone as the visual-system master: preserve its font files, colors, post-hero section geometry, responsive breakpoints, component treatment, and motion language.
- Use Poke and Pally only as product-positioning and copy references for Rachel, an AI chief of staff that lives in iMessage.
- Rachel product artwork must be original and tailored to the iMessage chief-of-staff experience while fitting the exact measured Slate image slots.
- The supplied Rachel concept governs the first screen's centered copy, paired CTA group, coastal atmosphere, independently sized iPhone, and bottom coda. Retain Rachel's Google Sans/Inter typography and Slate-derived header; do not import the concept's serif type or black presentation frame. Keep every later section in the established Slate-derived system.
- The final hero atmosphere is the user-supplied Golden Gate-in-clouds panorama at `public/assets/rachel-hero-golden-gate-clouds.webp`. Use the Poke hero only to understand the centered announcement/headline/actions rhythm; never copy or hotlink Poke's photography.
- Treat Rachel as one complete identity system, informed by Shantanu Kumar's Quick Brown Fox case-study discipline: one ownable star mark, one wordmark treatment, one restrained palette, one editorial image language, and consistent application from browser metadata through product UI, header, body, and footer. Use that project as identity-process context only; do not import its coffee palette, typography, fox mark, packaging layouts, or visual direction.
- Rachel's identity character is calm command: warm human atmosphere, precise product proof, quiet confidence, and approval-first language. Repeat the star mark purposefully at identity moments rather than as decoration, keep the existing Rachel blue as the active accent, and avoid generic avatar letters wherever a Rachel-branded mark is available.
- Strictly avoid generic AI-generated or stock-style editorial imagery. Use Rachel's real product UI, phone, identity assets, and verified customer-story material instead. Do not ship generic lifestyle still-lifes or filler people.
- The closing sequence must include: a moving community/workflow rail with an explicit pause control, a large editorial principles/verified-metrics section, and a rounded product-led “Meet Rachel” CTA. Never simulate product activity or animate unsourced usage values; verified metrics require a source and timeframe. These sections should inherit Rachel's current Google Sans/Inter type and Slate-derived spacing rather than copying serif typography from references.
- Hero and closing CTAs use a substantial premium button language: black primary and warm-white secondary surfaces, larger rounded corners, inset light, soft elevation, and restrained lift/press motion. Keep header and dense pricing controls proportionally smaller.
- Motion should make the site feel alive without loops that look gimmicky: choreographed hero entrance and scroll depth, staggered section reveals, tactile controls, directional product-state transitions, animated community proof and metrics, and softened reduced-motion fades rather than a blanket zero-duration kill switch.
- The product-led closing card retains the reference 820 × 460 px desktop geometry. Its single CTA is the compact reference treatment: a 102 × 34 px warm-white pill with a 26 px green iMessage tile and the label “Get Started.”
- The live activity section uses the reference values divided by 10,000 and displayed to two decimals: `848195 / 10000` emails processed and `1775484 / 10000` actions logged.
- Keep this prototype independent from the Slate clone. Publish it to a new GitHub repository and a new Vercel project.

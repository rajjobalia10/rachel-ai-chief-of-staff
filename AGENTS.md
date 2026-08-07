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
- Treat Rachel as one complete identity system, informed by Shantanu Kumar's Quick Brown Fox case-study discipline: one ownable star mark, one wordmark treatment, one restrained palette, one editorial image language, and consistent application from browser metadata through product UI, header, body, and footer. Use that project as identity-process context only; do not import its coffee palette, typography, fox mark, packaging layouts, or visual direction.
- Rachel's identity character is calm command: warm human atmosphere, precise product proof, quiet confidence, and approval-first language. Repeat the star mark purposefully at identity moments rather than as decoration, keep the existing Rachel blue as the active accent, and avoid generic avatar letters wherever a Rachel-branded mark is available.
- Keep this prototype independent from the Slate clone. Publish it to a new GitHub repository and a new Vercel project.

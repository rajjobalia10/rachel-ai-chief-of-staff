# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable Rachel design direction

- Use the existing local Slate clone as the exact visual master: preserve its font files, colors, spacing, section geometry, responsive behavior, and motion language.
- Use Poke and Pally only as product-positioning and copy references for Rachel, an AI chief of staff that lives in iMessage.
- Rachel product artwork must be original and tailored to the iMessage chief-of-staff experience while fitting the exact measured Slate image slots.
- The supplied Rachel concept contributes only its calm chief-of-staff voice, star-like brand cue, and iMessage product feel; do not import its serif type, scenic hero, navigation density, palette, or layout.
- Keep this prototype independent from the Slate clone. Publish it to a new GitHub repository and a new Vercel project.

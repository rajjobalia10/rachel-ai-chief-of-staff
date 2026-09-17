# Rachel — AI chief of staff in iMessage

Rachel is a responsive product website for an AI chief of staff that works inside iMessage. The site uses the completed Slate clone as its visual and motion system while introducing original Rachel positioning, copy, and product imagery.

- Production: [rachel-ai-chief-of-staff.vercel.app](https://rachel-ai-chief-of-staff.vercel.app/)
- Repository: [github.com/rajjobalia10/rachel-ai-chief-of-staff](https://github.com/rajjobalia10/rachel-ai-chief-of-staff)

## Stack

- React 19
- Vite 6
- Framer Motion
- Phosphor Icons

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run build
npm run test:sites
```

The visual QA record and source-to-implementation comparisons are documented in `design-qa.md` and `qa/`.

## Brand system

- `BRAND_IDENTITY.md` defines Rachel's strategy, mark, wordmark, exact palette, typography, image rules, voice, motion, and conversion surfaces.
- `BRAND_MOODBOARD.md` is the concise implementation guide.
- `public/brand/rachel-moodboard.html` is the responsive visual mood board.
- The site uses only local Rachel product artwork, the user-supplied Golden Gate panorama, and the original Rachel mark. No stock portraits, generic AI lifestyle imagery, or competitor photography ship with the build.

## Invite requests (Vercel + Resend)

All conversion CTAs open `/invite`. The small form submits to `/api/invite`, a Vercel Node function that emails `raj@rivesa.ai` through Resend and sets the applicant as Reply-To. It does not activate accounts or start subscriptions.

Configure these **server-side Production environment variables** on the linked `heyrachel` Vercel project before enabling email delivery:

- `RESEND_API_KEY`: a Resend sending key; never use a `VITE_` prefix or commit its value.
- `RESEND_FROM_EMAIL`: a sender on a verified Resend domain, optionally formatted as `Rachel <invites@your-verified-domain>`.

Redeploy after configuring the variables. Plain `npm run dev` previews the frontend; use `npx vercel dev` for the real local API. Run `npm test` for the API validation, recipient/reply-to, retry, and provider-failure checks. Tests mock Resend and never send mail.

The endpoint includes input limits, a honeypot, provider idempotency, and best-effort per-instance throttling. The UI reports success only after Resend returns an email ID. Verify a clearly labeled test submission in Resend for delivered status before claiming mailbox delivery. Missing credentials return 503 without pretending a request was saved.

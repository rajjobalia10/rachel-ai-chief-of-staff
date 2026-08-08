# Rachel exact CTA and closing-card design QA

## Comparison target

- Source visual truth:
  - `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/TemporaryItems/NSIRD_screencaptureui_6hd3oM/Screenshot 2026-08-08 at 7.48.36 PM.png` — single clean iMessage CTA appearance.
  - `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/TemporaryItems/NSIRD_screencaptureui_m4UXK3/Screenshot 2026-08-08 at 7.48.50 PM.png` — DevTools measurement of the Orchid CTA at exactly 134.43 × 50 CSS px with a 20 × 20 px icon.
  - `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/TemporaryItems/NSIRD_screencaptureui_E2mzbN/Screenshot 2026-08-08 at 7.49.38 PM.png` — large 16:9 Orchid closing-card composition.
  - `/var/folders/j9/h4zlz2kx5yx2z6dhcf9ntnfc0000gn/T/TemporaryItems/NSIRD_screencaptureui_MppCZm/Screenshot 2026-08-08 at 7.49.43 PM.png` — prior Rachel closing card showing the scale mismatch.
- Implementation: `http://127.0.0.1:5173/`.
- Desktop viewport: 1458 × 1102 CSS px.
- Mobile viewport: 390 × 844 CSS px.
- State: hero at rest; closing card at `#final-cta`; hover state also inspected.

## Browser-rendered implementation evidence

- Desktop hero: `qa/exact-one-button-hero-1458x1102.png` — 1458 × 1102 output pixels, normalized by the in-app browser capture to the CSS viewport.
- Desktop closing card: `qa/exact-closing-cta-1458x1102.png` — 1458 × 1102 output pixels, normalized to the CSS viewport.
- Mobile hero: `qa/exact-one-button-hero-390x844.png` — 390 × 844 output pixels at DPR 1.
- Mobile closing card: `qa/exact-closing-cta-390x844.png` — 390 × 844 output pixels at DPR 1.
- Source screenshots are 2940 × 1912 px Chrome captures. Density and browser chrome were not used for guessed measurements; the reference DevTools tooltip supplies the authoritative 134.43 × 50 CSS-pixel target.

## Full-view comparison evidence

The two source screenshots and the two current desktop implementation captures were opened together in one comparison input. The resulting composition confirms:

- The hero now has one primary action rather than the earlier two-button group.
- The closing panel now fills the same dominant desktop width as the Orchid reference: 1200 × 675 CSS px at 1458 px viewport width, with 129 px side gutters.
- The closing panel preserves the reference 16:9 ratio, centered heading/button composition, 32 px radius, dark photographic treatment, and generous surrounding whitespace.
- Rachel intentionally retains its established Google Sans display typography and the user-supplied moving-team image; those are product-content substitutions rather than reference drift.

## Focused component evidence

Browser-computed geometry and styles for both the hero and closing CTA:

- Button: 134.4296875 × 50 px (the browser representation of 134.43 × 50 CSS px).
- Messages tile: 20 × 20 px.
- Font: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Label: 14 px size, 14 px line height, weight 500, no letter spacing, no wrapping.
- Layout: 8 px gap, 16 px horizontal padding, fully rounded pill.
- Rest state: white background, `rgba(8, 21, 46, .1)` one-pixel ring, `0 2px 8px rgba(8, 21, 46, .06)` shadow.
- Hover state: `0 4px 16px rgba(8, 21, 46, .1)` shadow.
- Press state: 0.97 scale over 150 ms.
- Destination: `sms:?body=Hi%20Rachel`.

## Responsive and interaction verification

- Desktop hero action count: 1; text: `Get Started`.
- Mobile hero action count: 1; button remains 134.43 × 50 px and centered.
- Desktop closing card: 1200 × 675 px; CTA remains 134.43 × 50 px.
- Mobile closing card: 350 × 500 px; CTA remains 134.43 × 50 px.
- Desktop and mobile document overflow: 0 px.
- CTA hover shadow and SMS destination verified without triggering the external SMS handoff.
- Console error count: 0. The only console notices are Framer Motion's expected reduced-motion development warnings.

## Required fidelity surfaces

- Fonts and typography: passed. The button uses the reference system stack, 14/14 medium optical size, one-line label, and zero letter spacing. Rachel display copy retains the previously approved Slate-derived family.
- Spacing and layout rhythm: passed. One hero action, exact CTA dimensions, 20 px icon, 8 px gap, 16 px padding, 1200 × 675 closing panel, 32 px radius, centered hierarchy, and no overflow.
- Colors and visual tokens: passed. White card surface, #08152e label, #32e85a Messages tile, subtle ink ring, and reference shadows are implemented.
- Image quality and asset fidelity: passed. The user-supplied moving-team image remains local, full-bleed, naturally cropped, and text-free; no placeholder or generic AI image was introduced.
- Copy and content: passed. The hero exposes only `Get Started`; the closing panel contains only `Meet your new chief of staff.` and `Get Started`.

## Comparison history

1. [P1] Earlier hero had two actions and failed the user's single-CTA direction. Fixed by removing `Explore`.
2. [P1] Earlier closing panel was 820 × 460 px and visibly underscaled next to the full-width Orchid reference. Fixed to a 1200 × 675 px large-desktop target with fluid 80 px total gutter behavior.
3. [P2] Earlier closing composition included a brand mark and supporting paragraph absent from the selected reference. Both were removed.
4. [P2] First exact-width pass used a 16 px label, causing `Get Started` to wrap inside 134.43 px. Corrected to the reference 14/14 medium label with `white-space: nowrap`.
5. Post-fix desktop and mobile captures show no remaining actionable P0/P1/P2 issue.

final result: passed

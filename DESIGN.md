# DESIGN.md — bond (seed, clickable rung)

Direction: **Lampă de veghe** (D1, chosen 2026-11-20). Feeling: calm, present, quiet.

## Colour roles (light default; dark follows the device setting)
| Role | Light | Dark | Use |
|---|---|---|---|
| ground | #ffffff | #0f0f10 | page |
| surface | #f6f6f7 | #18181a | incoming bubbles, notices, selected rows |
| ink | #111111 | #f4f4f5 | text, primary button fill |
| muted | #55555c | #a1a1aa | secondary text |
| line | #e4e4e7 | #2a2a2d | hairlines, field borders |
| lamp | #b9a4f5 | #b9a4f5 | the signature only |
| accent | #5b3fb0 | #c9b8fa | links, focus ring, switch |
| danger | #b42318 | #ff8a7a | 112 button, crisis pills, errors |
| success | #1f7a4d | #6fd3a0 | confirmations |

Lilac never fills a ground, never forms a gradient and is never used for body text.

## Type
Bricolage Grotesque 600 (display, headings) / DM Sans 400–600 (text), Google Fonts, latin-ext for ș ț ă â î. Body 16 px / 1.5; h1 clamp(30–44 px).

## Shape and spacing
Radius 16 (buttons, panels), 10 (fields, rows). Touch targets ≥ 48 px. Spacing in steps of 4. One primary (ink) button per screen.

## Signature: the lamp
- Idea: a small lilac light that says "someone is here".
- Rules: a circle, lit (fill + soft glow + 5 s breathing) only when the psychologist is really online; otherwise an unlit 1.5 px outline. Sizes: 12–16 px in headers, 40 px on success, 56 px on the crisis sheet (8 s breath, used as a breathing guide).
- Appears: wordmark, presence line, success screen, crisis sheet. Never inside lists, tables or chat bubbles.
- Accessibility: decorative (`aria-hidden`); its meaning is always said in text; no animation with `prefers-reduced-motion`.

## Motion
Tokens in app/globals.css. Curves: appear cubic-bezier(0.32, 0.72, 0, 1); leave cubic-bezier(0.55, 0, 1, 0.45); move on screen cubic-bezier(0.77, 0, 0.175, 1).
- Press 150 ms, scale 0.96 (tab icons 0.88). Hover only on real pointers.
- Page entrance: blocks rise 12 px and fade in over 420 ms, 80 ms apart (max 6). Rows and tiles 45 ms apart.
- New chat messages and alerts arrive (320 ms, from the sender's side); what was already there stays still. A new crisis alert rings twice in danger red.
- Crisis sheet: 260 ms in, 190 ms out, scrim fades with it. Tab indicator slides 340 ms. The lamp lights and dims in 340 ms instead of switching.
- Report sent: lamp ignites, then heading, text and button (0/120/200/280 ms).
- A blocked message shakes the field once (360 ms).
- Breathing stays only on the lamp. prefers-reduced-motion turns every animation and transition off; end states are identical.

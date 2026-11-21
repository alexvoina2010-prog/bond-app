# DESIGN.md: bond v2 (clickable rung, Visage 1.1)

Direction: **Linie de cerneală (Ink line)**, D1, chosen by Alex on 2026-11-21. Feeling: gentle, clear, safe. It replaces v1's "Lampă de veghe" in this folder only; v1 stays in `../bond-app`.
Inspiration anchors (D0, via Designeer): the animated spot illustration by Roshan (@rolledpipe) and the oil-pastel brand exploration by Yashi Singh (@yashisinghh). Precision references: claude and oura.

## Colour roles (light by default; dark follows the device)
| Role | Light | Dark | Use | shadcn variable |
|---|---|---|---|---|
| ground | #ffffff | #121212 | page | `--background`, `--popover` |
| surface | #f7f6f3 | #1c1c1e | incoming bubbles, notices, selected rows, hover | `--card`, `--secondary` |
| ink | #141414 | #f2f2f0 | text, primary button fill, drawing line | `--foreground`, `--primary` |
| muted | #55555c | #a5a5ad | secondary text | `--muted-foreground` |
| line | #e6e6ea | #2c2c2f | hairlines | `--border` |
| field | #8a8a93 | #77777f | control borders (3:1) | `--input` |
| tint | #c4b2f7 at 0.85 | #c4b2f7 at 0.32 | the drawing patch only | (none) |
| accent | #5a3ea8 | #c9b8fa | links, focus ring, switch, radio, checkbox | `--ring`, `--color-accent` |
| danger | #b42318 | #ff8a7a | 112 button, danger badges, errors | `--destructive` |
| success | #1f7a4d | #6fd3a0 | confirmations, the presence dot | (none) |

The signal (lilac) is used only for illustration, so shadcn's `--primary` maps to ink and not to lilac. This is a deliberate deviation from stack.md's default mapping. Lilac never fills a ground, a button or a gradient, and it is never used for text.

## Type
- Fonts: Fraunces with variable optical size (display and headings) and Figtree (text), both from Google Fonts through next/font, latin-ext for ș ț ă â î.
- Scale (1.25): 13 / 14 / 16 / 20 / 25 / 34 px, plus h1 at clamp(32–40 px).
- Weights: Fraunces 300 only at 32 px and up (h1); 400 for h2 and stats; 500 for the wordmark and door titles. Body text is 16 px with 1.5 line height. Serif carries feeling and sans carries facts.

## Shape, spacing, targets
- Radius: 14 for buttons and panels, 12 for fields and rows, 6 for small tags, 22 for the sheet.
- Spacing: steps of 4.
- Touch targets are 48 px. The `sm` button is 40 px only in the laptop layout (860 px and wider).
- Each screen has at most one primary (ink) button.

## Components
shadcn/ui is the base, with source copied into `components/ui/` and restyled to these tokens. Nothing was installed through the shadcn CLI. Packages are pinned exactly, and none is newer than two weeks.
- Button: default (ink), secondary (outline), ghost, destructive and link variants; sizes default, sm and block; press scale 0.96.
- Input, Textarea, NativeSelect (a real `<select>` so phones use their own picker), Label.
- Switch, RadioGroup and Checkbox (Radix). Choices are set as full-width 48 px rows, and a selected row gets an ink border.
- Dialog (Radix), restyled as the crisis sheet. Focus starts on the heading, never on a call button. Escape closes it, and focus goes back to the message field.
- Badge: outline, new (ink) and danger.
- Icons: hand-drawn 24 px SVG with a 1.8 stroke in the tab bar. lucide-react is not used.

## Signature: ink-line drawings
- Idea: one person drew something small for you.
- Rules: viewBox 240×160; one 2.2 px stroke in ink (`currentColor`); round caps and joins; one shared wobble filter (`#ink-rough`: feTurbulence 0.04, 2 octaves, seed 3, displacement 1.4, filter region 120%); exactly one flat lilac patch behind the line; no fills, no faces, no text inside a drawing.
- Set (components/ink.tsx): `note` (a folded note on its way), `door` (a door left open with light on the floor), `chairs` (two chairs facing, a plant between them), `cup` (a mug with steam), `circle` (three speech marks), `breath` (a loose double ring). The reference sheet is `.visage/signature/sheet.html` and `.png`; rebuild it with `python .visage/signature/make-sheet.py`.
- Where it appears: the entry screen (note), the student home header (note), the booking confirmation (chairs), report sent (door), the crisis sheet (breath, its patch used as the breathing guide), and empty states (cup, chairs, circle).
- Where it never appears: inside threads, lists, tables, the dashboard's data, or the psychologist's working views except empty states.
- Accessibility: every drawing is `aria-hidden`, and its meaning is always written in the text next to it. In dark mode the line turns light and the patch drops to 0.32 opacity.

## Presence (precise layer, not the signature)
A 10 px dot followed by words. The dot is filled green when the psychologist is online and an outline when not. The words always carry the meaning; the dot never does it alone.

## Motion
Tokens are in `app/globals.css`. Curves: appear cubic-bezier(0.32, 0.72, 0, 1); leave cubic-bezier(0.55, 0, 1, 0.45); move on screen cubic-bezier(0.77, 0, 0.175, 1).
- Press: 150 ms, scale 0.96 (tab icons 0.88). Hover effects only on real pointers (`hover-fine` variant).
- Page entrance: blocks rise 12 px over 420 ms, 80 ms apart (at most 6). Rows and tiles are 45 ms apart.
- Signature draw-on (only where `draw` is set): each line draws in 900 ms, 120 ms apart, and the patch fades and scales in under it. Then heading, text and action rise at 120, 200 and 280 ms.
- Crisis sheet: 260 ms in and 190 ms out (Radix data-state), with the scrim fading. The breath patch scales between 0.9 and 1.08 over 8 s, the guide to breathe with.
- New chat messages and alerts arrive in 320 ms; messages already on screen stay still. A new crisis alert rings twice in danger red. A blocked message shakes the field once (360 ms, WAAPI, focus kept). The tab indicator slides in 340 ms. Chart bars grow one after another.
- prefers-reduced-motion turns off every animation and transition. End states stay the same, and the drawings show fully drawn.

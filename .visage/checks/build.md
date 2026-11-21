# Floor, build column: bond demo (2026-11-21)

Scope: all 11 routes of the clickable demo (fake back end in localStorage, made-up data labelled "date demo").
Method: an automated DOM audit run in the browser on every route at 320 and 1280 px (headings, landmarks, labels, accessible names, target sizes, horizontal scroll, computed text contrast), token math for dark mode, manual keyboard and focus checks, and screenshots at 390, 768, 1280 and 1440, light and dark.
The screenshots are in the session scratchpad, outside the project.

## Accessibility

| Item | Result | Evidence |
|---|---|---|
| Text contrast 4.5:1 / 3:1 | pass | Audit: 0 text contrast fails on 11 routes at 320 and 1280 (light). Dark mode by token math: muted #a1a1aa on #0f0f10 is about 7.6:1, accent #c9b8fa about 10:1, danger #ff8a7a about 7:1. |
| UI parts 3:1 | **fixed** | Inputs, choices and the switch track used `--line` (#e4e4e7, about 1.3:1). They now use a new `--field` token (#8a8a93 light, #75757e dark, about 3.5:1). globals.css tokens. |
| Keyboard reachable, logical order, no trap | pass | Tab order follows DOM; native controls only; dialog is native `<dialog>` with showModal. |
| Visible :focus-visible | pass | Global 3 px accent outline (globals.css). Programmatic focus targets (headings) use `.focus-target` without a ring on purpose. |
| Labels; errors say what and how, linked | pass | Audit: 0 unlabelled fields. Composer error is `role=alert`, linked by `aria-describedby` and tells the user to rephrase. |
| Images alt / decorative hidden | pass | No `<img>`; all SVG icons and lamps `aria-hidden`. |
| Target size ≥ 24 px | **fixed** | The "Ieși" link was 20×20. It now has the `.exit` class with a 44 px minimum. "Sună la 112." is an inline link in a sentence, so the inline exception applies. |
| Reduced motion; no flashing | pass | Lamp breathing and switch transitions are off under `prefers-reduced-motion`. The breathing is 5–8 s, far below 3 flashes a second. |
| 200% zoom / 320 px, no horizontal scroll | pass | Audit at 320 px: no overflow on any route. |
| Landmarks, one h1, heading order, lang | pass | 1 h1 per route, no skipped levels, `lang="ro"`, main, nav and header present. The two navs on Conversații carry different labels. |
| Dialogs trap and return focus; Escape; live status | pass, after fixes | Crisis sheet: focus lands on the heading, Escape closes it, and focus goes back to the composer (checked in browser). **Fixed:** after a report is sent, focus moves to the thank-you heading; it used to stay on body. **Fixed:** the booking state line is `role=status`. |
| Current page exposed | **fixed (bug)** | `aria-current` was never set on the tab bar or sidebar, because of the trailing slash in the URL. The path is now normalised in both layouts. |

## Honesty and privacy

| Item | Result | Evidence |
|---|---|---|
| No invented number, quote, logo | pass | Every count comes from the sample data, and the dashboard and resources are tagged "date demo". No logos, testimonials or awards. |
| Nothing shown the MVP will not do | pass, with a note | Every feature on screen works in the demo. Moderation is a keyword list; README says so. |
| Sign-up: email only, consent, privacy notice | n/a for the demo | Nothing is collected or sent; the prefilled email is fictional and the page says so. Binds at the MVP rung, when real accounts exist. |
| No trackers | pass | No analytics, no cookies. |
| No dossier personal data | pass | No names; personas are described by class only. |
| Stand-in photos | n/a | No photos. |

## Craft

| Item | Result | Evidence |
|---|---|---|
| Lead skill's checker | not run | The build was hand-written under DESIGN.md, without an impeccable run (logged as a shortcut in log.md). The finish reviewer stands in for it; see the review section. |
| Anti-slop list and taste dislikes | pass, with a note | No gradients, feature boxes or eyebrows. Lilac is the client team's brand colour and is used only on the lamp signature. |
| Every colour/size/radius/duration from a token | **fixed** | Inline font sizes became `.h-sm` and `.wordmark-sm`. New tokens: `--radius-xs`, `--radius-sheet`, `--dur-fast`, `--dur`, `--text-sm`, `--text-lg`. The danger button uses `--on-ink`. Layout-only inline styles (gap, margin) remain. |
| One primary action per screen | **fixed** | The reviewer found 0 primaries on the student home and 2 or more on the crisis sheet, Programări and Panou. Now ≤ 1 per route, counted by script on all 11 routes at 320 and 390. |
| Copy through humanizer | not run | The Romanian copy was written directly. Humanizer is English-oriented; a native read by the team is the right check. |
| Rendered at 390, 768, 1280, 1440, dark | pass | Screenshots taken. |
| Empty, loading, error, success states | pass, with a note | Empty states exist for alerts, bookings and reports. Errors: composer filter. Success: report and resource publish. Loading: none needed (synchronous local store). Conversations and Cercul can't be empty with the seeded data. |
| Signature only in declared places | **fixed** | The reviewer found the lamp lit on the success screen and the crisis sheet even when the psychologist was offline, which is false presence. Both now follow `psyOnline`; the unlit outline still breathes as the guide on the crisis sheet. |

## Layout bugs found and fixed while checking

- Psychologist chat at 375 px: the last message sat under the sticky composer. Fixed with `scroll-margin-bottom` on the thread end; measured 22 px clear on both sides.
- Psychologist screens below 860 px: grid rows stretched to the viewport height, which left empty bands. Fixed with `.psy { align-content: start }` and `.split { min-height: 0 }`.

## Performance

| Item | Result | Evidence |
|---|---|---|
| LCP < 2.5 s, CLS < 0.1 on mobile 4G | not checked | No throttled measurement was run. The site is static HTML with system-fallback fonts and no images, so the risk is low. Measure with Lighthouse once it is deployed. |
| INP < 200 ms; first-route JS < 200 KB gz | pass (JS) / not checked (INP) | First route: 8 scripts, 176.6 KB gzipped. |
| Fonts subset, ≤ 2 families | pass | Bricolage Grotesque and DM Sans through next/font: latin and latin-ext subsets, self-hosted. |

## Security

| Item | Result | Evidence |
|---|---|---|
| No secret in client or repo; no abusable form endpoint | pass | Grep is clean; there is no `.env` and no endpoint. |
| security.md Defaults | mostly n/a | There is no server, auth or database yet. `npm audit --omit=dev`: 0 vulnerabilities. Headers (CSP and others) bind at deploy and are not set yet. The defaults bind fully when Supabase replaces localStorage (the `shortcut:` in lib/store.ts). |

## Finish review (impeccable-finish-reviewer, 2026-11-21)

The first two rounds came back as "recapture": no captures at first, then headless Edge cut the 390 shots off at its ~500 px minimum window width. The third round reviewed true-390 captures and returned 8 material fixes. All 8 are applied:

1. Student home had no primary action and the headline had lost the comp's promise. Now a full-width ink button "Vorbește cu psihologul" with the other two as rows. The headline is "Aici te ascultă cineva.", a gender-neutral version of the promise.
2. Lamp lit regardless of presence on the success screen and crisis sheet. Now it follows `psyOnline`. The breathing copy says "cercul" when the lamp is unlit.
3. Several filled buttons per screen (crisis sheet, Programări, Panou). 112 is now the only filled action on the sheet; the row actions are secondary.
4. Active tab shown by colour only (~2.6:1). It now also gets an ink top rule (WCAG 1.4.1).
5. Targets under DESIGN.md's 48 px. "Raportează", "Ieși", the wordmark link, choices, the switch and sidebar links are now ≥ 48 px, and `.btn-sm` is 48 px below 860 px. All 0 under 48 by script on the student routes and the narrow psychologist routes.
6. Untokened values. A full type scale is now in tokens (`--text-body` … `--text-stat`), plus `--dur-breath`, `--dur-breath-slow`, `--scrim`, `--tabbar-h` and `--target`; the inline styles are moved to classes.
7. Closed resource cards had an empty band. Fixed with `details.panel:not([open]) { gap: 0 }`; closed cards are now 62 px.
8. A text "→" was used as an icon. Replaced with an SVG chevron from the tab bar's stroke set.

Kept from the review: the lamp's restraint (one small dot, always paired with its meaning in text, never in lists or bubbles).
Not built (ceiling note): a "waiting" lamp state after a student writes while the psychologist is offline. It is a feature, not a fix.

## Not checked

- Screen-reader pass (NVDA or VoiceOver). The floor binds it at launch, not build.
- Safari / iOS rendering.
- LCP and INP under throttling (needs a deployed URL).
- The reviewer did not re-review after the 8 fixes. They were verified by script and screenshots in this session.

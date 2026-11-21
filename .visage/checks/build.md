# Floor, build column: bond v2 (2026-11-21)

Scope: all 11 routes of the clickable demo (fake back end in localStorage, made-up data labelled "date demo"), v2 "Linie de cerneală".
Method: `node .visage/checks/shoot.mjs` (headless Edge over CDP, reduced motion, end states). It produces 88 route captures (390/768/1280/1440, light and dark) and 8 state captures (report sent, crisis sheet, filter blocked, booking sent). The same run audits the DOM on each route: horizontal overflow, one h1, targets, labels, primaries. Flows were also clicked by hand in the browser pane. v1's floor (previous version of this file) is in `../bond-app/.visage/checks/build.md`.

## Accessibility
| Item | Result | Evidence |
|---|---|---|
| Text contrast 4.5:1 / 3:1 | pass (token math) | ink #141414 / muted #55555c / accent #5a3ea8 on white; dark muted #a5a5ad, accent #c9b8fa, danger #ff8a7a on #121212. Pixel sampling was not run. |
| UI parts 3:1 | pass | Control borders use `--field` (#8a8a93 / #77777f); the selected radio/checkbox uses accent. |
| Keyboard, focus visible, no trap | pass | Radix primitives; global 3 px accent `:focus-visible`. |
| Labels; errors linked | pass | Audit: 0 unlabelled fields. The composer error is `role=alert`, linked with `aria-describedby`. |
| Decorative drawings hidden | pass | Every `.ink` has `aria-hidden`; its meaning is in the text next to it. |
| Targets | pass | Audit: 0 under 48 px below 860 px; the `sm` button is 40 px only at 860 px and wider (WCAG 2.5.8 needs 24). |
| Reduced motion | pass | A global rule turns animation off; drawings show fully drawn. |
| 320/390 px, no horizontal scroll | pass | Audit: overflow false on every capture. |
| Landmarks, one h1, lang | pass | Audit h1 = 1 on all routes once hydrated (the capture waits for `main h1`); `lang="ro"`. |
| Dialog | pass | Crisis sheet (Radix Dialog): focus on the heading, Escape closes it, focus returns to `#msg`, titled and described. |
| Current page | pass | `aria-current` on the tab bar and the sidebar. |

## Honesty and privacy
| Item | Result | Evidence |
|---|---|---|
| No invented number, quote or logo | pass | Counts come from the sample data; "date demo" tags. |
| No false promise | **fixed** | The greeting promised secrecy; it now says what happens in danger. Cercul and crisis copy say the psychologist is told. |
| No trackers, no data leaves the browser | pass | Static export, localStorage only. |

## Craft
| Item | Result | Evidence |
|---|---|---|
| Signature only in declared places | pass | Entry, home header, booking confirmed, report sent, crisis sheet, empty states. None in threads, lists or the dashboard's data. |
| Signature sheet consistent | pass, after fix | `signature/sheet.png`; wobble lowered so no stroke breaks. |
| One primary per screen | pass | Audit primaries ≤ 1 on every route. |
| Tokens only | pass | Colours and sizes come from `globals.css` tokens; primitives use token utilities. |
| Anti-slop list | pass | No gradients, feature boxes or eyebrows; lilac only as a drawing patch. |
| Copy through humanizer | not run | Romanian; the team's native read is the check. |

## Performance and security
| Item | Result | Evidence |
|---|---|---|
| First-route JS < 200 KB gz | pass | 9 scripts, 187.6 KB gzipped (v1: 176.9 KB). Close to the limit: add no more client libraries without measuring. |
| LCP / INP | not checked | Needs a deployed URL. |
| Dependencies | pass | Exact pins, `npm audit --omit=dev`: 0 vulnerabilities, no install scripts. |

## Finish review (impeccable-finish-reviewer, 1 round)
8 material fixes: 7 applied (see log.md); #3 (server-render page content) deferred to the MVP rung.

## Not checked
Motion timing live, screen reader, Safari/iOS, throttled LCP/INP, re-review after fixes.

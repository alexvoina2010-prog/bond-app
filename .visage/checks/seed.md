# Floor, seed column: bond S3.10 demand page (2026-11-22)

Scope: `/` (demand page), `/confidentialitate/`, and the demo banner on `/demo/`, `/elev/`, `/psiholog/`.
Method: `shoot.mjs` at 390/768/1280/1440, light and dark (40 captures in `.visage/shots-s310`, contact sheets in `contact/`), with the DOM audit; the form was clicked in the browser pane at 390 px; `impeccable-finish-reviewer` ran once, and 7 of its 8 fixes were applied.

## Accessibility
| Item | Result | Evidence |
|---|---|---|
| Contrast 4.5:1 / 3:1 | pass (token math) | Same tokens as v2 (`checks/build.md`). New: the 112 button uses `--destructive` as DESIGN.md defines it. Pixels not sampled |
| Keyboard, order, no trap | pass | Native links and buttons, Radix radio and checkbox; no dialogs |
| Visible focus | pass | The global 3 px accent `:focus-visible` |
| Labels; errors linked | pass | Audit: 0 unlabelled. The email error has `aria-invalid` + `aria-describedby`; the age error sits on the radiogroup (reviewer fix 4); focus goes to the first bad field; send errors keep the input and are `aria-live` |
| Decorative images hidden | pass | The Ink drawings and Steps are `aria-hidden`; their meaning is in the text |
| Targets ≥ 24 px | pass | Audit: 0 small targets after the fixes. Footer links and helpline buttons are 48 px |
| Reduced motion | pass | Existing tokens; captures run with reduce |
| 320 px / 200% zoom, no sideways scroll | pass at 390 (audit `overflow:false`); 320 px not captured | Grid columns `minmax(0,1fr)` |
| Landmarks, one h1, heading order, lang | pass | main/footer, one h1, h2/h3 in order, `lang="ro"`, "made by ttaavo" marked `lang="en"` |

## Honesty and privacy
| Item | Result | Evidence |
|---|---|---|
| No invented number, quote, logo | pass | No figures. Phrases from simulated interviews appear only as headings, never as quotes from people |
| Nothing the MVP will not do | pass | Every claim maps to US1–US5 and exists in the v3 demo (anonymous report, status, reply, "Am văzut la altcineva", the psychologist's guide in `app/psiholog/rapoarte`). "Not live yet" sits in the first viewport and in the notice |
| Email-only, unticked consent, privacy linked, timestamp | pass with deviation | Age group added (Alex: 14–15 via a parent). Updates box unticked. Netlify stores the timestamp (unverified until deployed) |
| No trackers | pass | No analytics script yet. Counting is pending Alex's account |
| No dossier personal data | pass | No codes, names or emails |
| Stand-in photos | n/a | None |

## Craft
| Item | Result | Evidence |
|---|---|---|
| Lead checker | reviewer instead of a lead checker | No lead skill: hallmark is excluded on a locked design. Finish reviewer: no slop patterns; fixes applied except #2 (wrong: the guide exists) and #7 (see below) |
| Anti-slop / dislikes | pass | No gradients, no cards; lilac only in the drawing |
| Tokens only | pass | The Landing block uses `var(--…)` tokens; 4 px spacing steps |
| One primary per screen; hero visible at 1280×800 | **open (Alex)** | Two ink buttons, the hero anchor and Trimite, are two doors to one action, never in the same viewport. The reviewer says DESIGN.md's rule is broken unless "screen" means viewport. Alex decides; the fallback is to make the hero anchor secondary. Hero headline, sentence and action are visible at 1280×800 |
| Humanizer | self-applied, not the skill | Short sentences, no stock phrasing; customer phrasing kept |
| Looked at 4 widths, both schemes | pass | Contact sheets |

## Performance
| Item | Result | Evidence |
|---|---|---|
| LCP < 2.5 s, CLS < 0.1 on mobile 4G | not checked | No throttled run. The page is static, its hero is SVG, fonts are subset with next/font |
| Images and fonts | pass | No raster images; two families |

## Security
| Item | Result | Evidence |
|---|---|---|
| No secret; the form cannot send mail | pass | No keys in code. Netlify Forms only stores entries, with a honeypot. `src` is cleaned to `[a-z0-9-]`, 30 chars |

Not checked: a real phone, a screen reader, Safari/iOS, the Netlify form registration and timestamp (needs a deploy), 320 px width, throttled LCP.

## Journey addendum (2026-11-22)
| Item | Result | Evidence |
|---|---|---|
| Rendered at 4 widths in light and dark (production build) | pass | `.visage/shots-journey`, contact sheet |
| Reduced motion | pass | End state: full thread, note at the form, no flight or pulse |
| Decorative and hidden | pass | Scene and thread are `aria-hidden`; the meaning is in the text |
| One lilac patch | pass | The door light only. Dark is 0.55 (recorded exception) |
| Motion budget | pass | Intro ≈2.7 s (motion-craft); scroll is direct manipulation |
| Not checked | — | Real phone, iOS Safari (SMIL), scroll performance on low-end hardware, the success state's end point |

## Final pass (2026-11-22, after Alex moved the helplines to the bottom)
| Item | Result | Evidence |
|---|---|---|
| 320 px, no sideways scroll | pass | `.visage/shots-final`: 50 route captures at 320/390/768/1280/1440, light and dark, all `overflow:false` |
| Targets, labels, one h1 | pass | Audit: 0 small, 0 unlabelled, h1 = 1 on every route |
| Error and success states | pass | `states-landing.mjs`: form errors (focus on the first radio, both errors shown), sent 16+, sent 14–15 (fetch stubbed); contact sheets `state-*` |
| Keyboard order | pass | Help link → hero CTA → demo → age → email → updates → privacy → Trimite → 112 / 116 111 / 119 → footer |
| Humanizer | pass | Skill run on all page copy: one repeat removed (benefit 1 no longer echoes the lede) |
| Helplines | moved, kept | Now after the sign-up (`#ajutor`), with a small „Numere de ajutor” link in the hero line. Kept because the page draws students in trouble and tells them they cannot report here |
| Not checked | — | Real phone, iOS Safari, throttled LCP, screen reader |

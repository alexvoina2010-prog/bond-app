# Visage log — bond

## 2026-11-20 · build (clickable rung, competition demo) · directions
- Lead: visage · reviewers: independent direction reviewer (subagent, brief and cards only)
- Decided alone: phase = build at the clickable rung (fake back end, sample data labelled "date demo"), because the demo needs working screens and the dossier is at S0.1; brief marked unvalidated; kept Next.js (Alex approved it in chat, although stack.md's default is Vite, so no D5 needed); Vercel Hobby is acceptable because bond is non-commercial (stack.md note); lilac used only as a signal, never as a ground or gradient (taste profile).
- Asked Alex: D1 + D2 → Lampă de veghe (recommended), with both guard rules; D3 → full flow; pitch deck → not in scope.
- Waivers: none.
- Floor: not run yet (nothing built).
- Not checked: competitors' look (brief field); 116 111 helpline number; directions at 390 px and in dark mode.
- Next: build once D1–D3 are answered.

## 2026-11-20 · build (clickable rung) · all demo screens
- Lead: visage (impeccable not invoked: DESIGN.md written by hand from the chosen card, to save time before 26 Nov) · reviewers: none yet
- Decided alone: static export with a localStorage fake back end synced across tabs (no accounts needed); keyword filter that blocks profanity anywhere and insults only when aimed ("ești prost"), so victims can quote what was said; crisis messages in Cercul go to the psychologist only, not to peers; crisis sheet focuses its heading, not the 112 button; helplines 112, 116 111 (daily 8–20), 119 (non-stop), checked by web search on 2026-11-20; doors on the home screen as a list, not feature boxes.
- Floor: not run. Checked by hand: 375 px and desktop, light and dark, no horizontal scroll, no console errors, labels on every field, visible focus, reduced motion.
- Not checked: floor.md top to bottom; impeccable-finish-reviewer; screen reader pass; 768/1440 widths; Safari; the psychologist composer overlaps the last bubble at 375 px (laptop-first screen); security.md (no real data, no server).
- Next: Alex runs the demo; deploy only with his OK (D6).

## 2026-11-21 · build (clickable rung) · floor + finish review
- Lead: visage · reviewers: impeccable-finish-reviewer (3 rounds; the first two asked for recaptures)
- Floor: build column run on all 11 routes; results in checks/build.md. Fixed:
  - control border contrast (new `--field` token);
  - target sizes (48 px everywhere on touch);
  - `aria-current` never set (trailing-slash bug);
  - focus after sending a report;
  - booking status announced;
  - narrow psychologist layout stretching;
  - last chat message hidden under the composer.
- Review: 8 material fixes, all applied (checks/build.md).
- Decided alone:
  - student headline "Aici te ascultă cineva." (gender-neutral form of the comp's promise);
  - unlit lamp still breathes on the crisis sheet;
  - psychologist row actions secondary, so no screen has more than one primary;
  - the "waiting" lamp state deferred.
- Not checked: screen reader, Safari, throttled LCP/INP, re-review after fixes.
- Next: deploy only with Alex's OK (D6); a native Romanian read of the copy by the team.

## 2026-11-21 · build (clickable rung) · motion pass
- Lead: charles-ux-animation (CSS only, no new library). Alex asked for the app to be "way more fluid and animated".
- Added:
  - one set of motion tokens;
  - staggered page entrances;
  - row and tile stagger;
  - chart bars growing;
  - arrivals for new messages and alerts, with a crisis-alert ring;
  - a sliding tab indicator;
  - the crisis sheet animating in and out (@starting-style plus allow-discrete);
  - the lamp fading on and off;
  - the report-sent choreography;
  - a shake for a blocked message (WAAPI, so focus is kept);
  - smooth scrolling to new messages;
  - resource cards expanding (::details-content, where the browser supports it);
  - pointer-only hover.
- Decided alone:
  - existing messages and alerts don't animate on load; only new ones arrive;
  - the shake uses WAAPI rather than remounting the field.
  - DESIGN.md Motion section rewritten to match.
- Checked: build and types pass. End states were verified in the browser by finishing every animation: the sheet opens with focus on its heading and closes to display:none; the indicator moves 1 tab = 25%; a new bubble ends visible.
- Not checked:
  - the motion itself (timing and feel): the browser pane was hidden, so animations were frozen;
  - reduced motion live (rule is global and !important);
  - Safari, where the ::details-content expander and @starting-style exit may fall back to instant.

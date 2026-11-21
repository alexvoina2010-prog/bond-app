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

## 2026-11-21 · build (clickable rung) · v2 rerun with Visage 1.1, all demo screens
- Folder: `bond-app-v2` (copied from `bond-app`, which is untouched), port 3101. Entries above this one are v1 history.
- Lead: visage (screens hand-built on shadcn/ui primitives; impeccable not invoked as a skill, same shortcut as v1) · reviewers: independent direction reviewer (brief + cards only), impeccable-finish-reviewer (1 round, 8 fixes).
- Asked Alex:
  - scope → full rerun from D0;
  - D0 → Roshan's spot illustration + Yashi Singh's oil-pastel brand (via Designeer; terms checked 2026-11-21);
  - D1 → A "Linie de cerneală", against the reviewer's and Visage's pick of C "Bilet împăturit";
  - D2 → illustration system, drawn (Claude-authored SVG);
  - D3 → unchanged from v1;
  - D5 → new packages, pinned set approved: tailwindcss and @tailwindcss/postcss 4.3.5, radix-ui 1.8.1, class-variance-authority 0.7.1, clsx 2.1.1, tailwind-merge 3.7.0, tw-animate-css 1.4.0; no shadcn CLI, no lucide-react.
- scan-before-install: skillspector failed to connect, so the check was npm metadata only (licences MIT/ISC/Apache-2.0, no install scripts, every version at least 2 weeks old). Verdict: install with caution.
- Decided alone:
  - shadcn source copied by hand into components/ui and restyled;
  - `--primary` mapped to ink, not lilac (lilac is illustration-only);
  - presence became a plain dot plus words (the lamp is gone);
  - drawings only on entry, home header, booking confirmed, report sent, crisis sheet and empty states, never on Cercul or working views;
  - the breath patch is the crisis breathing guide;
  - Fraunces 300 only at 32 px and above;
  - the `sm` button is 40 px only at 860 px and wider;
  - logic, store, filter and flows reused from v1 unchanged, except the seed greeting text and the storage key (`bond-demo-v2`).
- Finish review fixes applied (7 of 8):
  - greeting no longer promises secrecy ("Ce îmi scrii aici citesc doar eu. Dacă ești în pericol, căutăm ajutor împreună.");
  - sidebar side-stripe removed;
  - Romanian closing quotes (5 places);
  - Conversații composer pinned to the bottom of the pane;
  - entry reset link on its own line;
  - ink wobble 2.2 → 1.4 with a larger filter region (no broken strokes);
  - chart bars scaled to max(5, largest).
- Not applied: #3, server-render page content. It is the same client-only store as v1; the gating stays until Supabase replaces localStorage at the MVP rung (`shortcut:` in lib/store.ts).
- Floor: `checks/build.md` (v2). 88 route captures at 390/768/1280/1440 in light and dark, plus 8 state captures; DOM audit 0 issues; tests 3/3; build passes.
- Flows clicked live: booking, report, crisis sheet (focus on the heading, Escape, focus back to the field), filter, Cercul report → Panou alert, availability switch. No console errors.
- Not checked:
  - motion timing and feel live (captures use reduced motion; the pane freezes animations);
  - screen reader;
  - Safari/iOS;
  - throttled LCP/INP (first-route JS measured: 187.6 KB gz, v1 176.9 KB);
  - no re-review by the finish reviewer after the fixes (verified by recapture and audit);
  - the 116 111 / 119 numbers were not re-verified (last checked 2026-11-20).
- Next: Alex compares v1 (:3100) and v2 (:3101) and picks one for the 26 Nov demo; deploy only with his OK (D6).

## 2026-11-21 · decision
- Alex: **v2 stays** as the bond demo version (Linie de cerneală). v1 in `../bond-app` is kept as history. Deploy still needs his OK (D6).

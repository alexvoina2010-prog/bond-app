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

## 2026-11-22 · seed · S3.10 demand page (Visage 1.3)
- Scope (Alex): waitlist + demo button, in bond-app-v3. `/` is now the demand page; the old entry moved to `/demo/`.
- D0-D2 not re-asked: the page belongs to the same product, so it reuses the locked Linie de cerneală contract (DESIGN.md) and the ink-note signature. Taste rule "related projects may share a system".
- Route: no hallmark. Its rule is "never on an existing design unless Alex names it", and DESIGN.md is locked. The page was built inside the contract with the house components (Button, RadioGroup/RadioRow, CheckRow, Input, Label, Steps, Ink).
- Stack deviation from stack.md § Seed (static index.html): the page is a route in the existing Next static export, because Alex asked for it on his website. It is still plain files; any static host works.
- Form backend: Netlify Forms (stack.md default; no third-party script on the page; timestamp stored by Netlify). Static twin in `public/__forms.html`; the page POSTs urlencoded there. Fields: age (16+ / 14-15), email (own, or a parent's for 14-15), updates (da/nu, from an unticked box), src (from `?src=`, cleaned to a-z0-9-), honeypot bot-field. Locally the POST returns 405 (no Netlify), and the page shows its error and keeps the input. Success was checked with fetch mocked.
- Small decisions: the hero CTA and the submit button are both ink, as two doors to one action (sign-up), on different viewports; benefits are a numbered list, not cards (taste: no three feature boxes); the simulated-interview phrases are used as headings, never as attributed quotes (they are not real people's words); the real Steps component shows the report status line; footer links padded to 26 px; 116 111 hours (8-20) from the 2026-11-20 check.
- Demo banner on every student and psychologist screen: „Demo. Nimic din ce scrii aici nu ajunge la un psiholog.” The demo entry has the same notice plus 112.
- Fixes during look: grid columns overflowed at 390 (minmax(0,1fr)); benefit-list selectors leaked into the Steps list (scoped with `>`); headline balanced.
- Blocking publish (D6): the privacy notice's contact address is a placeholder (`CONTACT` in app/confidentialitate/page.tsx); lawyer point 1 (minors, parental consent by email reply, Netlify as processor outside the EU); admin permissions per source; visitor counting (Cloudflare Web Analytics or GoatCounter) needs Alex's account; the helpline re-check.

## 2026-11-22 · seed · S3.10 journey (D2)
- Alex wanted the landing "way more animated" with a cooler element. Three live previews were made (`.visage/previews/d2-elements.html`): an animated corridor scene, an ink thread, and a drifting field. Alex chose a mix of the scene and the thread: the note goes from a phone past a classroom door into the open door with light, and from there the thread follows as you scroll. He also kept both ink buttons (DESIGN.md "one primary per screen" read as one per viewport for this page).
- Built in `components/journey.tsx` with no new dependency: SVG, SMIL animateMotion for the one flight (Safari-safe), a CSS draw-on, rAF scroll for the thread. Knots sit on [data-knot] elements; the end is [data-thread-end].
- motion-craft review (as its own pass): the intro was cut from ~4.8 s to ~2.7 s (flight 2.4 s → 1.2 s, start 1.5 s → 1.0 s), the flight now uses ease-move, and the light pulse went 900 → 500 ms. Scroll stays direct (no easing). Reduced motion shows the end state. transitions-agent was not run: it downloads an unvetted npm package.
- Fixes found by looking: the thread SVG was a grid item (made absolute); knots and the note read a stale path on the first render (now measured after mount); the note gets a minimum size on phones.
- Not checked: scroll performance of the filtered thread on a low-end phone, Safari/iOS (SMIL and getPointAtLength should work but weren't seen), screen reader (all of it is aria-hidden).
- Finish review on the journey (3 rounds; the first two asked for valid recaptures). The cold-load glitch was real: the thread now also re-lays out when the drawing resizes, and the ResizeObserver runs on the next frame. Captures are now taken from the production build (`out/` served on :3103, launch config `bond-app-v3-static`), so the dev indicator is gone.
- Applied 7 of the 8 fixes: the flight route no longer crosses the board (its trail fades after landing); a faint guide shows the whole thread from the start; knots are measured with offsetTop (immune to the entrance rise); door light 0.55 in dark (DESIGN.md exception); the phone is in the foreground, cut by the frame; a landing fallback in case endEvent never fires (Safari); a 34 px note gap. Not applied: #8 (the thread end on the success state); the note still lands beside "Gata…".
- Scroll test in the pane: 33 ms frames both with and without the thread. The pane is hidden, so it is throttled to 30 fps; the thread adds nothing measurable. A real phone was not tested.

# Directions (v2 rerun, Visage 1.1) — bond

v1 baseline: "Lampă de veghe", chosen 2026-11-20, built in `../bond-app` (files kept here as `directions-v1.md` / `directions-v1.html`). This rerun starts fresh from D0 so v1 and v2 can be compared.

Given: lilac, white and black (team). Taste profile: no purple themes or gradients, so lilac stays a signal or a tint on white with black ink, never a ground or gradient, never text on white.

## Inspiration anchors (D0, 2026-11-21)
- **Animated spot illustration** by Roshan (@rolledpipe), https://designeer.xyz/finds/rolledpipe-2114439853777748178, via Designeer. Borrowed: one mono line drawing with one tint above calm text and a single action.
- **Oil-pastel brand exploration** by Yashi Singh (@yashisinghh), https://designeer.xyz/finds/yashisinghh-2111366605443854378, via Designeer. Borrowed: a loud hand-made layer only at the edges, framing a strict, untouched UI.

Precision references (`~/design-md-library`): claude (line art on a calm canvas, radius hierarchy), oura (serif for feeling, sans for facts; colour kept off buttons).

### A. Linie de cerneală (Ink line) — expected, made excellent
- Feeling, in three words: gentle, clear, safe.
- Why it fits this segment: a frightened student on a phone needs reassurance before text; one small drawing on the feeling screens (privacy, crisis, success, empty) says "a person made this for you" without being childish, and the working screens stay plain.
- Type: Fraunces 300, high optical size (display) / Figtree (text), both latin-ext · scale 1.25.
- Colour: ground #FFFFFF, ink #141414, signal lilac #C4B2F7 (flat tint patches only), deep lilac #5A3EA8 (links, focus).
- Shape and density: radius 14, spacing base 4, airy.
- Signature: ink line drawings (hands, a note passing, a door left open, two chairs) in one 2.2 px stroke with a slight wobble and one flat lilac patch behind · medium: drawn (Claude-authored SVG, one shared roughness filter).
- Precise layer: chat, lists, dashboard and bookings are white with hairlines; drawings only on home header, privacy, empty, success and crisis.
- Risk: drawings that are weak or inconsistent look amateur; needs a small, strict set (6–8) drawn to one spec.
- References used for precision: claude, oura.
- Inspiration anchor: Roshan, the pairing of one line drawing + one tint above calm text.

### B. Pastel pe hârtie (Pastel on paper) — boldest that still fits
- Feeling, in three words: brave, warm, hand-made.
- Why it fits this segment: 10–14-year-olds draw with crayons and pastels; a rough, hand-made band says "this is ours, not the school's", and a heavy expanded headline speaks up for a student who is afraid to.
- Type: Archivo Expanded 800 (display) / Archivo (text), latin-ext · scale 1.333.
- Colour: ground #FFFFFF, ink #0E0E0E, signal pastel lilac #B79CF2, paper #FBFAF7 behind the bands only.
- Shape and density: radius 10, spacing base 4, balanced.
- Signature: oil-pastel bands and marks with visible grain (lilac and black strokes) across the top of feeling screens · medium: material (SVG turbulence texture, rendered to static SVG for low-end phones).
- Precise layer: under the band everything is strict white UI; the band never enters chat, lists or the psychologist side (which gets a thin pastel rule only).
- Risk: grain can look noisy or childish to 16–18-year-olds; SVG filters cost on cheap phones; the crisis screen must drop the band.
- References used for precision: oura (accent bands kept off buttons).
- Inspiration anchor: Yashi Singh, the loud hand-made layer at the edges of a quiet UI.

### C. Bilet împăturit (Folded note) — a step away from the category
- Feeling, in three words: discreet, direct, grown-up.
- Why it fits this segment: passing a folded note under the desk is how students already tell something privately; wellbeing apps are usually soft and round, this one is a plain paper note with a serif voice that takes them seriously.
- Type: Newsreader (display, messages) / Public Sans (text), latin-ext · scale 1.25.
- Colour: ground #FFFFFF, ink #111111, signal lilac #C9B8FA (the underside of the fold only), deep lilac #5B3FB0 (links, focus).
- Shape and density: radius 6, 1.5 px ink outlines on notes, spacing base 4, balanced-dense.
- Signature: the folded corner on every note (a message to the psychologist, a report, the success card) plus a fold-and-send motion when a note is sent · medium: shape motif + motion.
- Precise layer: the fold appears only on the note being written or sent and on the success card; the thread, lists and dashboard are plain.
- Risk: the fold can turn into a gimmick or skeuomorphism if it spreads past notes; the serif must stay readable at 16 px on cheap screens.
- References used for precision: claude (radius hierarchy, hairline outlines).
- Inspiration anchor: Roshan, the calm single-action screen (the note is the one object, like his spot illustration).

Rendered: `checks/directions-1280.png`.

## Independent ranking
Independent reviewer (saw only the brief, the three cards and the 1280 render), 2026-11-21: **1. C Bilet împăturit, 2. A Linie de cerneală, 3. B Pastel pe hârtie.**
- C: matches what students already do (it reads as theirs, not the school's); the serif treats 17-year-olds as adults; easiest to make well by 26 Nov; survives the crisis screen unchanged.
- A: warm but the most common wellbeing signature, so least ownable; needs 6–8 matching drawings and the sample already looks weak; Fraunces 300 is thin on cheap phones.
- B: the grain reads as noise, childish to 16–18; filters are costly on cheap phones; the band has to leave the crisis screen, where it matters most.
- Biggest risk of C: can feel cold, like office stationery, to a frightened 10-year-old at night; the note metaphor is unclear for Cercul (a group chat).
- Its change: make success the one warm moment (the note slides under a door, one ink line, lilac fold); keep Cercul and report as plain rows under the note.
- Copy flags: "fără numele tău" is false for the psychologist path (it is not anonymous; only Cercul is); "Nimeni altcineva nu vede" overpromises when crisis alerts reach the psychologist; "12 colegi online" needs the "date demo" label.

## Recommendation
**C, Bilet împăturit**, mixed with one line from A: a small set of ink-line drawings (one stroke, one lilac fold patch) only on the success card, the empty states and the crisis sheet, so the night-time 10-year-old gets warmth where it counts. Guard rules: the fold appears only on a note being written, sent or confirmed (never in the thread, lists or dashboard); in Cercul each peer message is a plain bubble and only the student's own unsent draft is a note; copy never promises anonymity on the psychologist path. D2: shape motif + motion (fold-and-send), secondary: drawn ink line. D3 carries over from v1 (Alex, 2026-11-20): student Acasă, Psiholog, Cercul, Resurse; psychologist Panou, Conversații, Programări, Rapoarte, Resurse.

## Alex's choice and reason
2026-11-21: **A, Linie de cerneală** (against the reviewer's and Visage's pick of C; no reason given). D2: illustration system, drawn medium (Claude-authored SVG, one shared roughness filter). D3 unchanged from v1.
Guards taken from the review: the drawing set is small and strict (one spec, reference sheet before showing); Fraunces 300 only at 32 px and above, 400 below; no copy promises that "nobody else sees" (crisis alerts reach the psychologist); every count carries "date demo".

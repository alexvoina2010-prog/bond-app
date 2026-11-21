# bond v3: demo (FIX Cluj, 26 Nov 2026)

Version 3 is version 2 ("Linie de cerneală", Visage) changed by the Idea-to-Launch sprint at S3.5. The dossier is in `../business-team/dossier/bond/`: see `07-solution/solution-options.md` (option O2) and `07-solution/sketch.md`. **This folder is a git repo with every version as a tag (`v1`, `v2`, `v3`). Version 2 is the fallback for the demo:**

```
git stash -u        # only if you have unsaved changes
git checkout v2     # same dependencies, runs on port 3101
npm run dev
git checkout main   # back to v3 (then `git stash pop` if you stashed)
```

Clickable demo with made-up data. No server: everything lives in the browser (localStorage) and syncs between windows of the same browser.

## What changed from v2, and why
- **Removed: Cercul, the anonymous peer chat.** No recorded pain needs it. 0 of 14 simulated students looked for strangers to talk to. Anonymous teen chats also have a public record of turning into bullying channels. The language filter went with it, because messages now go only to the psychologist and a student must be able to quote what was said.
- **Added: a report with a status and a reply.** Received → Seen → Acting → Closed, plus a reply thread inside the report. This is the USP: *tell an adult at school without being named, then see that something is being done*. Today's reporting box gives no reply.
- **Added: "Mie" / "Am văzut la altcineva"**, evidence upload (file names only in the demo) with a warning that screenshots can show who you are, and a toggle for whether the report may go to the school's violence-prevention commission (CPCV), without a name.
- **Added for the psychologist:** status buttons, a reply box, a card on "how to act without showing who wrote", and **Export for CPCV** (a CSV of permitted reports, no names). bond feeds the confidential channel schools must have under OME 4200/2025, instead of adding another one.
- **Safer screens:** "Rapoartele mele (n)" shows only a count on the home screen, a calmer crisis line, "Ieși repede" (quick exit to google.ro, replacing the page in history), and a booking note that it does not appear in the class timetable.
- **Audience:** high school only (grades 9–12), as Gate 1 decided.

## Run
```
npm install
npm run dev        # http://localhost:3102
npm test           # crisis detection (and the old language filter, still in lib/)
npm run build      # static site in out/
```

## Demo script (2 windows side by side, same browser)
1. Left window: `/` → **Intră ca elev** (shrink it to phone width). Right window: `/` → **Intră ca psiholog**.
2. Student → **Ceva nu e ok? Spune-i cuiva** → "Am văzut la altcineva", leave **anonim** on → Trimite.
3. Psychologist → **Rapoarte**: the new report says "anonim", with no name anywhere. Open it → **Se ocupă** → write a reply.
4. Student → **Rapoarte**: "mesaj nou", the status line on "Se ocupă", and the reply. The student can answer back, still anonymous.
5. Psychologist → open **Cum acționezi fără să arăți cine a scris** → **Export pentru comisia… (CPCV)**: a CSV with only the permitted reports and no names.
6. Student → Psiholog: write "nu mai vreau să trăiesc" → crisis sheet with 112, 116 111 and 119, and a red alert on the **Panou**. The same works inside a report reply, and the alert says "Anonim".
7. Psychologist: switch **Disponibil** off. The student's presence line changes.
8. Before presenting: **Resetează datele demo** on the entry screen. "Ieși repede" leaves the demo; open `/` again to switch roles.

## Limits (say them if the jury asks)
- Demo only: no real accounts, no server, no data leaves the browser. In the real version, anonymity is enforced by the database: the link between a report and its author sits in a table the psychologist cannot read. This was tested in a spike (9/9 checks; `07-solution/spike/spike.mjs` in the dossier).
- Before any real student data, a lawyer must check three things: consent for minors (digital consent age 16), whether reports are sensitive data, and whether bond may serve as the school's official OME 4200 channel. A privacy notice is also needed.
- The evidence behind these changes comes mostly from simulated interviews, plus public surveys and news. Real interviews with students at the school are owed after the demo.
- Helplines checked 2026-11-20 (116 111 daily 8–20, 119 non-stop, 112); re-check before any real use.

made by ttaavo

# bond v2: demo (FIX Cluj, 26 Nov 2026)

Version 2, rebuilt with Visage 1.1 in the "Linie de cerneală" (ink line) direction on shadcn/ui and Tailwind. Version 1 ("Lampă de veghe") is unchanged in `../bond-app` and runs on port 3100. Same flows, same demo data.

Clickable demo with made-up data. No server: everything lives in the browser (localStorage) and syncs between windows of the same browser.

## Run
```
npm install
npm run dev        # http://localhost:3101
npm test           # language filter and crisis detection
npm run build      # static site in out/
```

## Demo script (2 windows side by side, same browser)
1. Left window: `/` → **Intră ca elev** (shrink it to phone width). Right window: `/` → **Intră ca psiholog**.
2. Student → Psiholog: write a message. It appears in the psychologist's **Conversații**; answer from there.
3. Psychologist: switch **Disponibil** off. The student's presence dot empties and the line says when they will get an answer.
4. Student → Cercul: write "ești prost" → blocked by the filter. Report someone's message → hidden, alert on the **Panou**.
5. Student → Cercul: write "nu mai vreau să trăiesc" → not posted to peers; crisis sheet with 112, 116 111 and 119; red alert on the **Panou**.
6. Student → Acasă → **Am văzut ceva**: send an anonymous report → appears in **Rapoarte** and in the chart.
7. Student → Psiholog → **Programează-te** → psychologist confirms in **Programări**.
8. Before presenting: **Resetează datele demo** on the entry screen.

## Limits (say them if the jury asks)
- Keyword filter only: misses misspellings and slang; a real version needs human moderation.
- No real accounts, no server, no data leaves the browser. A real version needs Supabase auth, row-level security, a privacy notice and legal advice (children's and health data).
- Helplines checked 2026-11-20 (116 111 daily 8–20, 119 non-stop, 112); re-check before any real use.

made by ttaavo

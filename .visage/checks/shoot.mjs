// Floor captures: every route at 390/768/1280/1440, light and dark, through headless Edge over CDP.
// Reduced motion is emulated so captures show end states (animations are separately checked live).
// Also runs a small DOM audit per capture: horizontal overflow, targets under 48 px, one h1, unlabelled fields, primaries.
// Usage: node .visage/checks/shoot.mjs [baseUrl] [outDir]   (dev server must be running)
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = process.argv[2] || 'http://localhost:3101';
const OUT = process.argv[3] || '.visage/checks/shots';
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ROUTES = ['/', '/elev/', '/elev/psiholog/', '/elev/cercul/', '/elev/raport/', '/elev/resurse/', '/psiholog/', '/psiholog/conversatii/', '/psiholog/programari/', '/psiholog/rapoarte/', '/psiholog/resurse/'];
const WIDTHS = (process.env.WIDTHS || '390,768,1280,1440').split(',').map(Number);
const SCHEMES = (process.env.SCHEMES || 'light,dark').split(',');
const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null;
const PORT = 9333;

mkdirSync(OUT, { recursive: true });
const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`, `--user-data-dir=${join(tmpdir(), 'bond-shoot')}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let targets;
for (let i = 0; i < 40 && !targets; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); } catch { await sleep(250); }
}
if (!targets) { edge.kill(); throw new Error('Edge did not start'); }
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const waiting = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const n = ++id; waiting.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });

await send('Page.enable');
const AUDIT = `(() => {
  const W = document.documentElement.clientWidth;
  const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden'; };
  const ctl = [...document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=radio], [role=checkbox], [role=switch]')].filter(vis);
  const small = ctl.filter((e) => { if (e.closest('p') && e.tagName === 'A') return false; const r = e.getBoundingClientRect(); const lab = e.closest('label'); const rr = lab ? lab.getBoundingClientRect() : r; return Math.max(r.height, rr.height) < (W >= 860 ? 39.5 : 47.5) || Math.max(r.width, rr.width) < 24; }).map((e) => (e.textContent || e.id || e.tagName).trim().slice(0, 30));
  const unl = [...document.querySelectorAll('input:not([type=hidden]):not([aria-hidden=true]), textarea, select')].filter((e) => !(e.labels && e.labels.length) && !e.getAttribute('aria-label')).map((e) => e.id || e.name);
  const prim = [...document.querySelectorAll('[data-slot=button]')].filter((e) => vis(e) && !e.closest('[hidden]') && /bg-primary/.test(e.className)).length;
  return { overflow: document.documentElement.scrollWidth > W, h1: document.querySelectorAll('h1').length, small, unlabelled: unl, primaries: prim };
})()`;

const report = [];
for (const scheme of SCHEMES) {
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const w of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: w < 600 ? 844 : 900, deviceScaleFactor: 1, mobile: w < 600 });
    for (const route of ROUTES) {
      if (ONLY && !ONLY.includes(route)) continue;
      await send('Page.navigate', { url: BASE + route });
      await sleep(600);
      // Pages render after hydration (client-only demo store): wait for the h1, up to 8 s.
      await send('Runtime.evaluate', { expression: `new Promise((r) => { const t = Date.now(); (function w() { document.querySelector('main h1') || Date.now() - t > 8000 ? setTimeout(r, 400) : setTimeout(w, 100); })(); })`, awaitPromise: true });
      const a = (await send('Runtime.evaluate', { expression: AUDIT, returnByValue: true })).result.result.value;
      const name = `${route.replace(/\//g, '_').replace(/^_|_$/g, '') || 'entry'}-${w}-${scheme}.png`;
      const lm = (await send('Page.getLayoutMetrics')).result;
      const h = Math.ceil((lm.cssContentSize || lm.contentSize).height);
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
      writeFileSync(join(OUT, name), Buffer.from(shot.result.data, 'base64'));
      report.push({ route, w, scheme, ...a });
    }
  }
}
// Feeling moments that only exist after an action (390 px, both schemes). Fresh demo data first.
const typeAndSend = (text) => `(() => { const t = document.getElementById('msg'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(t, ${JSON.stringify(text)}); t.dispatchEvent(new Event('input', { bubbles: true })); setTimeout(() => t.form.requestSubmit(), 50); })()`;
const STATES = [
  ['state-report-sent', '/elev/raport/', `document.querySelector('form button[type=submit]').click()`],
  ['state-crisis-sheet', '/elev/cercul/', typeAndSend('nu mai vreau să trăiesc')],
  ['state-filter-blocked', '/elev/cercul/', typeAndSend('ești prost')],
  ['state-booking-sent', '/elev/psiholog/', `(() => { [...document.querySelectorAll('button')].find(b => b.textContent.includes('Programează'))?.click(); setTimeout(() => { document.querySelector('[role=radio]:not([disabled]), input[type=radio]:not([disabled])').click(); setTimeout(() => document.querySelector('form.stack button[type=submit]').click(), 100); }, 200); })()`],
];
if (!ONLY) for (const scheme of SCHEMES) {
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  for (const [name, route, script] of STATES) {
    await send('Page.navigate', { url: BASE + '/' });
    await sleep(800);
    await send('Runtime.evaluate', { expression: `localStorage.removeItem('bond-demo-v2')` });
    await send('Page.navigate', { url: BASE + route });
    await sleep(1600);
    await send('Runtime.evaluate', { expression: script });
    await sleep(900);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(OUT, `${name}-390-${scheme}.png`), Buffer.from(shot.result.data, 'base64'));
  }
}
ws.close(); edge.kill();
writeFileSync(join(OUT, 'audit.json'), JSON.stringify(report, null, 1));
const bad = report.filter((r) => r.overflow || r.h1 !== 1 || r.small.length || r.unlabelled.length || r.primaries > 1);
console.log(`${report.length} captures, ${bad.length} with issues`);
for (const r of bad) console.log(r.route, r.w, r.scheme, JSON.stringify({ overflow: r.overflow, h1: r.h1, small: r.small, unlabelled: r.unlabelled, primaries: r.primaries }));

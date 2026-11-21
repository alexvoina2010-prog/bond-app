'use client';
// Fake back end for the demo: all data lives in this browser's localStorage and syncs between tabs,
// so a student window and a psychologist window side by side talk to each other.
// shortcut: no server, no auth, one browser only; replace with Supabase (auth + RLS + realtime) at the MVP rung.
// The anonymity design for the real version is tested in the dossier: business-team/dossier/bond/07-solution/spike/spike.mjs.
import { useSyncExternalStore } from 'react';

export type Msg = { id: string; from: 'elev' | 'psiholog'; text: string; at: number };
export type Thread = { id: string; who: string; msgs: Msg[]; live?: boolean };
export type Alert = { id: string; kind: 'criza'; where: string; who: string; text: string; at: number; seen: boolean };
export type Status = 'primit' | 'văzut' | 'se ocupă' | 'închis';
export type Report = {
  id: string; no: number; kind: string; place: string; when: string; text: string;
  self: boolean;        // happened to them (true) or they saw it (false)
  anon: boolean;        // the psychologist never sees who sent it
  who: string;          // the sender's name, only when not anonymous
  cpcv: boolean;        // the student allows it to go to the school's violence-prevention commission, without a name
  evidence: string[];   // shortcut: file names only, nothing is uploaded in the demo
  mine: boolean;        // shortcut: stands in for the owner table of the real version (sent from this demo's student side)
  at: number; status: Status; msgs: Msg[];
};
export type Booking = { id: string; slot: string; who: string; note: string; status: 'cerută' | 'confirmată' };
export type Article = { id: string; title: string; minutes: number; body: string };

export type State = {
  psyOnline: boolean;
  threads: Thread[];
  alerts: Alert[];
  reports: Report[];
  bookings: Booking[];
  articles: Article[];
};

export const ME = 'Elev, clasa a X-a (tu, în demo)';
export const SLOTS = ['Luni, 10:00', 'Luni, 12:00', 'Marți, 11:00', 'Miercuri, 9:00', 'Joi, 13:00', 'Vineri, 10:00'];
export const KINDS = ['Jigniri sau porecle', 'Lovituri sau îmbrânceli', 'Online (grupuri, story-uri, poze)', 'Excludere din grup', 'Altceva'];
export const STATUSES: Status[] = ['primit', 'văzut', 'se ocupă', 'închis'];
export const STATUS_LABEL: Record<Status, string> = { primit: 'Primit', văzut: 'Văzut', 'se ocupă': 'Se ocupă', închis: 'Închis' };

const KEY = 'bond-demo-v3'; // bumped when the seed changes, so old demo data is not kept
const min = 60_000;
const day = 24 * 60 * min;
export const uid = () => Math.random().toString(36).slice(2, 10);

function seed(): State {
  const now = Date.now();
  return {
    psyOnline: true,
    threads: [
      { id: 'live', who: ME, live: true, msgs: [
        { id: uid(), from: 'psiholog', text: 'Bună! Sunt psihologul școlii. Poți să-mi scrii oricând despre ce te frământă. Ce îmi scrii aici citesc doar eu. Dacă ești în pericol, căutăm ajutor împreună.', at: now - 50 * min },
      ] },
      { id: 's1', who: 'Elevă, clasa a X-a', msgs: [
        { id: uid(), from: 'elev', text: 'Într-un grup de pe Instagram au pus o poză cu mine și râd de ea.', at: now - 180 * min },
        { id: uid(), from: 'psiholog', text: 'Îmi pare rău că treci prin asta. Ai salvat poza sau mesajele? Ne putem vedea mâine la 12?', at: now - 170 * min },
      ] },
      { id: 's2', who: 'Elev, clasa a IX-a', msgs: [
        { id: uid(), from: 'elev', text: 'Niște băieți din a XI-a îmi iau telefonul în pauză și se uită prin el.', at: now - day },
      ] },
    ],
    alerts: [],
    reports: [
      { id: uid(), no: 14, kind: KINDS[2], place: 'Online', when: 'Săptămâna asta', text: 'Pe grupul clasei fără dirigintă circulă un sticker făcut dintr-o poză cu mine.', self: true, anon: true, who: '', cpcv: false, evidence: ['captura-grup.png'], mine: true, at: now - 2 * day, status: 'se ocupă', msgs: [
        { id: uid(), from: 'psiholog', text: 'Am citit și m-am uitat la captură. Mă ocup fără să spun cine a scris: nu vorbesc cu clasa despre tine. Îți scriu aici ce urmează.', at: now - 1.5 * day },
      ] },
      { id: uid(), no: 13, kind: KINDS[1], place: 'La toaletă', when: 'Săptămâna asta', text: 'Doi băieți din a XII-a au împins un coleg de a IX-a de ușă și unul a filmat.', self: false, anon: false, who: 'Elev, clasa a XI-a', cpcv: true, evidence: [], mine: false, at: now - 20 * 60 * min, status: 'văzut', msgs: [] },
      { id: uid(), no: 12, kind: KINDS[0], place: 'Pe hol', when: 'Ieri', text: 'Un elev mai mare strigă porecle la cei din a IX-a în fiecare pauză.', self: false, anon: true, who: '', cpcv: true, evidence: [], mine: false, at: now - 30 * 60 * min, status: 'primit', msgs: [] },
    ],
    bookings: [{ id: uid(), slot: 'Marți, 11:00', who: 'Elevă, clasa a X-a', note: 'Despre poza din grup', status: 'confirmată' }],
    articles: [
      { id: 'a1', title: 'Ce e bullying-ul și ce nu e', minutes: 3, body: 'Bullying înseamnă că cineva te rănește intenționat, de mai multe ori, și îi e mai ușor lui decât ție să se oprească. O ceartă o dată nu e bullying. Dacă se repetă, nu e vina ta și merită să spui cuiva.' },
      { id: 'a2', title: 'Cum spui unui adult de încredere', minutes: 2, body: 'Alege un moment liniștit. Poți începe cu „Vreau să-ți spun ceva greu". Spune ce s-a întâmplat, unde și cât de des. Dacă primul adult nu te ascultă, încearcă altul.' },
      { id: 'a3', title: 'Când vezi că altcuiva i se întâmplă', minutes: 2, body: 'Nu trebuie să fii erou. Poți sta lângă colegul respectiv, îl poți chema de acolo sau poți raporta, chiar anonim, din bond.' },
      { id: 'a4', title: 'Bullying online: ce poți face acum', minutes: 3, body: 'Fă capturi de ecran înainte să ștergi ceva. Dacă le trimiți, taie numele tău din ele. Blochează și raportează contul pe platformă. Nu răspunde pe loc. Nu da mai departe filmări cu alți elevi.' },
    ],
  };
}

const listeners = new Set<() => void>();
let cacheRaw: string | null | undefined;
let cache: State;

function read(): State {
  let raw: string | null = null;
  try { raw = localStorage.getItem(KEY); } catch { /* private mode: keep in memory */ }
  if (cache && raw === cacheRaw) return cache;
  cacheRaw = raw;
  try { cache = raw ? JSON.parse(raw) : seed(); } catch { cache = seed(); }
  return cache;
}

function write(s: State) {
  cache = s;
  try { cacheRaw = JSON.stringify(s); localStorage.setItem(KEY, cacheRaw); } catch { cacheRaw = undefined; }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY || e.key === null) l(); };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(l); window.removeEventListener('storage', onStorage); };
}

export function useDemo(): State {
  return useSyncExternalStore(subscribe, read, read);
}

export function update(fn: (s: State) => void) {
  const s = structuredClone(read());
  fn(s);
  write(s);
}

export function resetDemo() {
  write(seed());
}

export function useMounted() {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

export function time(at: number) {
  return new Date(at).toLocaleString('ro-RO', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
}

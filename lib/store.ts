'use client';
// Fake back end for the demo: all data lives in this browser's localStorage and syncs between tabs,
// so a student window and a psychologist window side by side talk to each other.
// shortcut: no server, no auth, one browser only; replace with Supabase (auth + RLS + realtime) at the MVP rung.
import { useSyncExternalStore } from 'react';

export type Msg = { id: string; from: 'elev' | 'psiholog'; text: string; at: number };
export type Thread = { id: string; who: string; msgs: Msg[]; live?: boolean };
export type CircleMsg = { id: string; alias: string; text: string; at: number; reported?: boolean };
export type Alert = { id: string; kind: 'criza' | 'raportare'; where: string; who: string; text: string; at: number; seen: boolean };
export type Report = { id: string; kind: string; place: string; when: string; text: string; anon: boolean; at: number; seen: boolean };
export type Booking = { id: string; slot: string; who: string; note: string; status: 'cerută' | 'confirmată' };
export type Article = { id: string; title: string; minutes: number; body: string };

export type State = {
  psyOnline: boolean;
  myAlias: string;
  threads: Thread[];
  circle: CircleMsg[];
  alerts: Alert[];
  reports: Report[];
  bookings: Booking[];
  articles: Article[];
};

export const ME = 'Elev, clasa a VII-a (tu, în demo)';
export const SLOTS = ['Luni, 10:00', 'Luni, 12:00', 'Marți, 11:00', 'Miercuri, 9:00', 'Joi, 13:00', 'Vineri, 10:00'];
export const KINDS = ['Jigniri sau porecle', 'Lovituri sau îmbrânceli', 'Online (mesaje, poze, grupuri)', 'Excludere din grup', 'Altceva'];

const KEY = 'bond-demo-v1';
const min = 60_000;
export const uid = () => Math.random().toString(36).slice(2, 10);

function seed(): State {
  const now = Date.now();
  return {
    psyOnline: true,
    myAlias: `Nor-${10 + Math.floor(Math.random() * 89)}`,
    threads: [
      { id: 'live', who: ME, live: true, msgs: [
        { id: uid(), from: 'psiholog', text: 'Bună! Sunt psihologul școlii. Poți să-mi scrii oricând despre ce te frământă. Ce vorbim aici rămâne între noi.', at: now - 50 * min },
      ] },
      { id: 's1', who: 'Elevă, clasa a X-a', msgs: [
        { id: uid(), from: 'elev', text: 'Într-un grup de pe Instagram au pus o poză cu mine și râd de ea.', at: now - 180 * min },
        { id: uid(), from: 'psiholog', text: 'Îmi pare rău că treci prin asta. Ai salvat poza sau mesajele? Ne putem vedea mâine la 12?', at: now - 170 * min },
      ] },
      { id: 's2', who: 'Elev, clasa a V-a', msgs: [
        { id: uid(), from: 'elev', text: 'Niște băieți din a VII-a îmi iau mâncarea în pauză.', at: now - 26 * 60 * min },
      ] },
    ],
    circle: [
      { id: uid(), alias: 'Arțar-41', text: 'Mie mi-au zis toată săptămâna că sunt ciudată pentru că stau singură în pauză.', at: now - 95 * min },
      { id: uid(), alias: 'Far-07', text: 'Și mie mi s-a întâmplat anul trecut. M-a ajutat să stau cu o colegă din altă clasă.', at: now - 80 * min },
      { id: uid(), alias: 'Ploaie-63', text: 'Eu am vorbit cu diriginta și s-a mai calmat. Nu a fost ușor să încep.', at: now - 41 * min },
    ],
    alerts: [],
    reports: [
      { id: uid(), kind: KINDS[2], place: 'Online', when: 'Săptămâna asta', text: 'Un grup de WhatsApp al clasei în care se râde de un coleg.', anon: true, at: now - 30 * 60 * min, seen: true },
      { id: uid(), kind: KINDS[0], place: 'Pe hol', when: 'Ieri', text: 'Un elev mai mare strigă porecle la cei din a V-a.', anon: true, at: now - 20 * 60 * min, seen: false },
    ],
    bookings: [{ id: uid(), slot: 'Marți, 11:00', who: 'Elevă, clasa a X-a', note: 'Despre poza din grup', status: 'confirmată' }],
    articles: [
      { id: 'a1', title: 'Ce e bullying-ul și ce nu e', minutes: 3, body: 'Bullying înseamnă că cineva te rănește intenționat, de mai multe ori, și îi e mai ușor lui decât ție să se oprească. O ceartă o dată nu e bullying. Dacă se repetă, nu e vina ta și merită să spui cuiva.' },
      { id: 'a2', title: 'Cum spui unui adult de încredere', minutes: 2, body: 'Alege un moment liniștit. Poți începe cu „Vreau să-ți spun ceva greu". Spune ce s-a întâmplat, unde și cât de des. Dacă primul adult nu te ascultă, încearcă altul.' },
      { id: 'a3', title: 'Când vezi că altcuiva i se întâmplă', minutes: 2, body: 'Nu trebuie să fii erou. Poți sta lângă colegul respectiv, îl poți chema de acolo sau poți raporta, chiar anonim, din bond.' },
      { id: 'a4', title: 'Bullying online: ce poți face acum', minutes: 3, body: 'Fă capturi de ecran înainte să ștergi ceva. Blochează și raportează contul pe platformă. Nu răspunde pe loc. Arată capturile unui adult de încredere.' },
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

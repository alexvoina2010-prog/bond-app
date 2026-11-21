'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Ink } from '@/components/ink';
import { Button } from '@/components/ui/button';
import { CheckRow, RadioGroup, RadioRow } from '@/components/ui/choice';
import { NativeSelect, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KINDS, ME, uid, update } from '@/lib/store';

const PLACES = ['În clasă', 'Pe hol', 'În curte', 'La toaletă', 'Pe drum spre școală', 'Online'];
const WHEN = ['Azi', 'Ieri', 'Săptămâna asta', 'Mai demult'];

export default function Report() {
  const [sent, setSent] = useState(0);
  const [files, setFiles] = useState<string[]>([]);
  const thanks = useRef<HTMLHeadingElement>(null);
  // Move focus to the thank-you heading so screen readers announce that the report was sent.
  useEffect(() => { if (sent) thanks.current?.focus(); }, [sent]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const anon = f.get('anon') === 'on';
    let no = 0;
    update((d) => {
      no = Math.max(0, ...d.reports.map((r) => r.no)) + 1;
      d.reports.unshift({
        id: uid(), no, kind: String(f.get('kind')), place: String(f.get('place')), when: String(f.get('when')),
        text: String(f.get('text') || '').trim(), self: f.get('self') === 'eu', anon, who: anon ? '' : ME,
        cpcv: f.get('cpcv') === 'on', evidence: files, mine: true, at: Date.now(), status: 'primit', msgs: [],
      });
    });
    setSent(no);
  }

  if (sent) {
    return (
      <div className="moment">
        <Ink name="door" width={210} draw />
        <h1 ref={thanks} tabIndex={-1} className="focus-target">Mulțumim că ai spus.</h1>
        <p className="muted">Raportul #{sent} a ajuns la psihologul școlii. Îți răspunde în raport, în cel mult 2 zile de școală.</p>
        <div className="row">
          <Button asChild><Link href="/elev/rapoarte">Urmărește raportul</Link></Button>
          <Button asChild variant="ghost"><Link href="/elev">Acasă</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="stack">
        <h1>Spune ce s-a întâmplat</h1>
        <p className="muted">Durează un minut. Nu e nevoie de nume.</p>
      </div>
      <form className="stack" onSubmit={submit}>
        <fieldset>
          <legend>Cui i s-a întâmplat?</legend>
          <RadioGroup name="self" required defaultValue="eu">
            <RadioRow id="self-eu" value="eu">Mie</RadioRow>
            <RadioRow id="self-altcineva" value="altcineva">Am văzut la altcineva</RadioRow>
          </RadioGroup>
        </fieldset>
        <fieldset>
          <legend>Ce s-a întâmplat?</legend>
          <RadioGroup name="kind" required defaultValue={KINDS[0]}>
            {KINDS.map((k, i) => <RadioRow key={k} id={`kind-${i}`} value={k}>{k}</RadioRow>)}
          </RadioGroup>
        </fieldset>
        <div className="two">
          <div>
            <Label htmlFor="place">Unde?</Label>
            <NativeSelect id="place" name="place">{PLACES.map((p) => <option key={p}>{p}</option>)}</NativeSelect>
          </div>
          <div>
            <Label htmlFor="when">Când?</Label>
            <NativeSelect id="when" name="when">{WHEN.map((w) => <option key={w}>{w}</option>)}</NativeSelect>
          </div>
        </div>
        <div>
          <Label htmlFor="text">Câteva cuvinte (opțional)</Label>
          <Textarea id="text" name="text" rows={4} maxLength={1000} placeholder="Spune ce s-a întâmplat. Poți scrie exact ce s-a zis." />
        </div>
        <div className="stack-tight">
          <Label htmlFor="ev">Adaugă dovezi: poză sau captură (opțional)</Label>
          <input id="ev" type="file" accept="image/*" multiple className="file" aria-describedby="ev-hint"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((x) => x.name))} />
          <p id="ev-hint" className="muted small">Atenție: o captură poate arăta cine ești (numele tău, grupul). Taie-o sau descrie în cuvinte. Filmări cu alți elevi nu le da mai departe: descrie ce ai văzut. În demo se păstrează doar numele fișierului.</p>
        </div>
        <CheckRow id="anon" name="anon" defaultChecked>Trimite anonim: psihologul nu vede cine ești. Raportul e legat de contul tău doar ca să-l poți urmări tu.</CheckRow>
        <CheckRow id="cpcv" name="cpcv">Poate ajunge la comisia școlii împotriva violenței (CPCV), fără numele meu</CheckRow>
        <p className="notice">Ce urmează: psihologul citește și îți răspunde aici. Nu vorbește cu clasa despre tine. Nu anunță părinții sau dirigintele fără să-ți spună întâi, în afară de cazul în care ești în pericol.</p>
        <Button type="submit">Trimite</Button>
      </form>
    </>
  );
}

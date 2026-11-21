'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Ink } from '@/components/ink';
import { Button } from '@/components/ui/button';
import { CheckRow, RadioGroup, RadioRow } from '@/components/ui/choice';
import { NativeSelect, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KINDS, uid, update } from '@/lib/store';

const PLACES = ['În clasă', 'Pe hol', 'În curte', 'La toaletă', 'Pe drum spre școală', 'Online'];
const WHEN = ['Azi', 'Ieri', 'Săptămâna asta', 'Mai demult'];

export default function Report() {
  const [done, setDone] = useState(false);
  const thanks = useRef<HTMLHeadingElement>(null);
  // Move focus to the thank-you heading so screen readers announce that the report was sent.
  useEffect(() => { if (done) thanks.current?.focus(); }, [done]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    update((d) => {
      d.reports.unshift({
        id: uid(), kind: String(f.get('kind')), place: String(f.get('place')), when: String(f.get('when')),
        text: String(f.get('text') || '').trim(), anon: f.get('anon') === 'on', at: Date.now(), seen: false,
      });
    });
    setDone(true);
  }

  if (done) {
    return (
      <div className="moment">
        <Ink name="door" width={210} draw />
        <h1 ref={thanks} tabIndex={-1} className="focus-target">Mulțumim că ai spus.</h1>
        <p className="muted">Psihologul școlii a primit raportul. Ce ai văzut poate schimba ceva pentru cineva.</p>
        <Button asChild><Link href="/elev">Înapoi acasă</Link></Button>
      </div>
    );
  }

  return (
    <>
      <div className="stack">
        <h1>Am văzut ceva</h1>
        <p className="muted">Spune ce s-a întâmplat cu altcineva. Durează un minut.</p>
      </div>
      <form className="stack" onSubmit={submit}>
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
          <Label htmlFor="text">Câteva cuvinte despre ce ai văzut (opțional)</Label>
          <Textarea id="text" name="text" rows={4} maxLength={1000} placeholder="Nu e nevoie de nume. Spune doar ce ai văzut." />
        </div>
        <CheckRow id="anon" name="anon" defaultChecked>Trimite anonim (nici psihologul nu vede cine ești)</CheckRow>
        <Button type="submit">Trimite raportul</Button>
      </form>
    </>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Ink } from '@/components/ink';
import { Steps } from '@/components/bond';
import { Journey } from '@/components/journey';
import { Button } from '@/components/ui/button';
import { CheckRow, RadioGroup, RadioRow } from '@/components/ui/choice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// S3.10 demand page. Sign-ups go to Netlify Forms; the static twin of this form is public/__forms.html.
const FORM = 'waitlist';

/** Source from the per-channel link (?src=cje), cleaned so nothing odd is stored. */
function source() {
  const s = new URLSearchParams(location.search).get('src') ?? 'direct';
  return s.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30) || 'direct';
}

type Sent = { minor: boolean } | null;

export default function Landing() {
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<{ age?: string; email?: string; send?: string }>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<Sent>(null);
  const done = useRef<HTMLHeadingElement>(null);
  const minor = age === '14-15';
  useEffect(() => { if (sent) done.current?.focus(); }, [sent]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    const next: typeof errors = {};
    if (!age) next.age = 'Alege câți ani ai.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = minor ? 'Scrie emailul părintelui, de forma nume@exemplu.ro.' : 'Scrie un email de forma nume@exemplu.ro.';
    setErrors(next);
    if (next.age) return form.querySelector<HTMLElement>('#age-16')?.focus();
    if (next.email) return form.querySelector<HTMLElement>('#email')?.focus();

    data.set('form-name', FORM);
    data.set('src', source());
    data.set('updates', data.get('updates') ? 'da' : 'nu');
    setBusy(true);
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSent({ minor });
    } catch {
      // Keep everything the visitor typed; only say what failed.
      setErrors({ send: 'Nu am putut trimite. Verifică internetul și încearcă din nou.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <main className="landing">
        <p className="wordmark wordmark-lg">bond</p>
        <Journey>
        <section className="hero">
          <h1>Spune unui adult de la școală. Fără să fii numit.</h1>
          <p className="lede">bond e canalul privat către psihologul școlii. Îi scrii de pe telefon, fără numele tău dacă vrei, și vezi pas cu pas că se face ceva.</p>
          <p className="small muted">Încă nu funcționează la nicio școală. Acum strângem elevii care îl vor la liceul lor. În pericol acum? <a href="#ajutor">Numere de ajutor</a></p>
          <div className="row">
            <Button asChild><a href="#inscriere">Vreau bond la liceul meu</a></Button>
            <Button asChild variant="secondary"><Link href="/demo/">Vezi demo-ul</Link></Button>
          </div>
        </section>

        <section className="why" aria-labelledby="why-h">
          <h2 id="why-h">Ce face altfel</h2>
          <ol>
            <li>
              <h3 data-knot>Nimeni nu te vede mergând la cabinet.</h3>
              <p className="muted">Nu mai intri la cabinet în pauză, cu toți văzând. Dacă trimiți anonim, nici psihologul nu vede numele tău.</p>
            </li>
            <li>
              <h3 data-knot>Nu rămâne la „lasă că vorbesc eu cu ei”.</h3>
              <p className="muted">Fiecare raport are o stare, iar psihologul îți răspunde chiar în raport.</p>
              <div className="why-steps" aria-hidden="true"><Steps status="se ocupă" /></div>
            </li>
            <li>
              <h3 data-knot>Poți spune și ce ai văzut la altcineva.</h3>
              <p className="muted">Alegi „Am văzut la altcineva”. Psihologul are un ghid ca să intervină fără să arate cine a spus.</p>
            </li>
          </ol>
        </section>

        <section className="next" aria-labelledby="next-h">
          <h2 id="next-h" data-knot>Ce urmează dacă te înscrii</h2>
          <p className="muted">Căutăm un liceu din Cluj care să pornească bond. Echipa s-ar putea să-ți scrie o singură dată, ca să te întrebe ce crezi. Dacă bifezi mai jos, îți scriem și când pornește bond la o școală. Altfel, îți ștergem emailul când se termină testul.</p>
        </section>

        <section id="inscriere" className="signup" aria-labelledby="signup-h">
          {sent ? (
            <div className="moment" aria-live="polite">
              <div data-thread-end="96"><Ink name="door" width={180} draw /></div>
              <h2 id="signup-h" ref={done} tabIndex={-1} className="focus-target">
                {sent.minor ? 'Gata. Îi scriem părintelui tău.' : 'Gata, ești pe listă.'}
              </h2>
              <p className="muted">
                {sent.minor ? 'Te trecem pe listă doar dacă părintele ne răspunde că e de acord.' : 'Îți scriem doar dacă pornește bond sau dacă avem o întrebare.'}
              </p>
              <Referral />
            </div>
          ) : (
            <form name={FORM} className="stack" noValidate onSubmit={submit}>
              <h2 id="signup-h" data-thread-end>Vreau bond la liceul meu</h2>
              {/* Honeypot: people never see it; bots fill it and Netlify drops the entry. */}
              <p hidden><label>Nu completa: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <fieldset>
                <legend>Câți ani ai?</legend>
                <RadioGroup name="age" required aria-label="Câți ani ai?" aria-invalid={!!errors.age || undefined} aria-describedby={errors.age ? 'age-err' : undefined} value={age} onValueChange={(v) => { setAge(v); setErrors((x) => ({ ...x, age: undefined })); }}>
                  <RadioRow id="age-16" value="16+">16 ani sau mai mult</RadioRow>
                  <RadioRow id="age-14" value="14-15">14 sau 15 ani</RadioRow>
                </RadioGroup>
                {errors.age && <p id="age-err" className="error">{errors.age}</p>}
              </fieldset>
              <div className="stack-tight">
                <Label htmlFor="email">{minor ? 'Emailul unui părinte' : 'Emailul tău'}</Label>
                <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" required
                  aria-invalid={!!errors.email || undefined}
                  aria-describedby={[minor && 'email-hint', errors.email && 'email-err'].filter(Boolean).join(' ') || undefined} />
                {minor && <p id="email-hint" className="small muted">La 14 sau 15 ani te înscrie un părinte. Îi scriem și te trecem pe listă doar dacă ne răspunde că e de acord.</p>}
                {errors.email && <p id="email-err" className="error">{errors.email}</p>}
              </div>
              <CheckRow id="updates" name="updates">Scrieți-mi când pornește bond la o școală.</CheckRow>
              <p className="small muted">Când trimiți, ești de acord cu <Link href="/confidentialitate/">nota de confidențialitate</Link>.</p>
              <Button type="submit" disabled={busy}>{busy ? 'Se trimite…' : 'Trimite'}</Button>
              <p aria-live="polite" className="error">{errors.send}</p>
            </form>
          )}
        </section>
        </Journey>
        <section id="ajutor" className="notice stack-tight help" aria-labelledby="help-h">
          <h2 id="help-h" className="h-sm">Dacă ești în pericol acum</h2>
          <p>De aici nu poți raporta nimic: bond nu e pornit încă. Sună direct.</p>
          <div className="row">
            <Button asChild variant="destructive"><a href="tel:112">Sună la 112</a></Button>
            <Button asChild variant="secondary"><a href="tel:116111">116 111 · Telefonul copilului</a></Button>
            <Button asChild variant="secondary"><a href="tel:119">119 · Abuz asupra copiilor</a></Button>
          </div>
          <p className="small muted">116 111 răspunde zilnic între 8 și 20. 112 și 119, oricând.</p>
        </section>
      </main>
      <footer className="made">
        <Link href="/confidentialitate/">Confidențialitate</Link> · <Link href="/demo/">Demo</Link> · bond · <span lang="en">made by ttaavo</span>
      </footer>
    </>
  );
}

/** The referral line from S3.11: its own link, so referred sign-ups count as their own source. */
function Referral() {
  const [copied, setCopied] = useState('');
  const link = `${location.origin}/?src=referral`;
  return (
    <div className="stack-tight">
      <p>Știi pe cineva căruia i-ar folosi? Trimite-i linkul:</p>
      <p className="small"><a href={link}>{link}</a></p>
      <div><Button variant="secondary" type="button" onClick={() => Promise.resolve(navigator.clipboard?.writeText(link)).then(() => { if (!navigator.clipboard) throw 0; setCopied('Linkul e copiat.'); }).catch(() => setCopied('Nu am putut copia. Ține apăsat pe link și alege Copiază.'))}>Copiază linkul</Button></div>
      <p aria-live="polite" className="small">{copied}</p>
    </div>
  );
}

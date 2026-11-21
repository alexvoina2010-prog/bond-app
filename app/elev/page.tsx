'use client';
import Link from 'next/link';
import { Presence } from '@/components/bond';
import { Ink } from '@/components/ink';
import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/store';

export default function StudentHome() {
  const s = useDemo();
  const mine = s.reports.filter((r) => r.mine);
  const unread = mine.filter((r) => r.msgs.at(-1)?.from === 'psiholog').length;
  // No titles on the home screen: a friend looking at the phone sees only a count.
  const doors = [
    { href: '/elev/raport', title: 'Ceva nu e ok? Spune-i cuiva', text: 'Ți s-a întâmplat ție sau ai văzut la altcineva. Poți rămâne anonim.' },
    { href: '/elev/rapoarte', title: `Rapoartele mele (${mine.length})`, text: unread ? 'Ai un mesaj nou.' : 'Vezi ce s-a întâmplat după ce ai spus.' },
  ];
  return (
    <>
      <div className="stack">
        <Ink name="note" width={190} draw />
        <h1>Aici te ascultă cineva.</h1>
        <Presence on={s.psyOnline} />
      </div>
      <div className="stack-tight">
        <Button asChild size="block"><Link href="/elev/psiholog">Vorbește cu psihologul</Link></Button>
        <p className="muted small">Doar psihologul școlii citește ce scrii.</p>
      </div>
      <ul className="doors">
        {doors.map((d) => (
          <li key={d.href}>
            <Link href={d.href}>
              <span><strong>{d.title}</strong><span className="muted">{d.text}</span></span>
              <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
          </li>
        ))}
      </ul>
      {/* Numbers checked 2026-11-20; re-verify before any real launch. */}
      <p className="notice">Dacă ești în pericol: <a href="tel:112"><b>112</b></a> · Telefonul Copilului <a href="tel:116111"><b>116 111</b></a> · abuz <a href="tel:119"><b>119</b></a></p>
    </>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lamp } from '../../components/ui';
import { update, useDemo, useMounted } from '../../lib/store';

export default function PsyLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname().replace(/\/$/, '') || '/'; // trailingSlash export: '/elev/' must match '/elev'
  const mounted = useMounted();
  const s = useDemo();
  const counts: Record<string, number> = mounted ? {
    '/psiholog': s.alerts.filter((a) => !a.seen).length,
    '/psiholog/conversatii': s.threads.filter((t) => t.msgs.at(-1)?.from === 'elev').length,
    '/psiholog/programari': s.bookings.filter((b) => b.status === 'cerută').length,
    '/psiholog/rapoarte': s.reports.filter((r) => !r.seen).length,
  } : {};
  const NAV = [
    ['/psiholog', 'Panou'], ['/psiholog/conversatii', 'Conversații'], ['/psiholog/programari', 'Programări'],
    ['/psiholog/rapoarte', 'Rapoarte'], ['/psiholog/resurse', 'Resurse'],
  ];
  return (
    <div className="psy">
      <aside className="sidebar">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <Link href="/psiholog" className="wordmark wordmark-sm">
            <Lamp on={mounted && s.psyOnline} size={12} />bond
          </Link>
          <Link href="/" className="exit">Ieși</Link>
        </div>
        <label className="switch">
          <input type="checkbox" role="switch" checked={mounted && s.psyOnline}
            onChange={(e) => update((d) => { d.psyOnline = e.target.checked; })} />
          {mounted && s.psyOnline ? 'Disponibil pentru elevi' : 'Indisponibil'}
        </label>
        <nav aria-label="Meniu psiholog">
          <ul>
            {NAV.map(([href, label]) => (
              <li key={href}>
                <Link href={href} aria-current={path === href ? 'page' : undefined}>
                  {label}
                  {!!counts[href] && <span key={counts[href]} className="count bump" aria-label={`${counts[href]} noi`}>{counts[href]}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="small muted" style={{ marginTop: 'auto' }}>Psiholog școlar · Școala demo</p>
      </aside>
      <main>{mounted ? children : null}</main>
    </div>
  );
}

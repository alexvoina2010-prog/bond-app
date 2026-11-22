'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { update, useDemo, useMounted } from '@/lib/store';
import { DemoBanner } from '@/components/demo-banner';

const NAV = [
  ['/psiholog', 'Panou'], ['/psiholog/conversatii', 'Conversații'], ['/psiholog/programari', 'Programări'],
  ['/psiholog/rapoarte', 'Rapoarte'], ['/psiholog/resurse', 'Resurse'],
];

export default function PsyLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname().replace(/\/$/, '') || '/'; // trailingSlash export: '/elev/' must match '/elev'
  const mounted = useMounted();
  const s = useDemo();
  const online = mounted && s.psyOnline;
  const counts: Record<string, number> = mounted ? {
    '/psiholog': s.alerts.filter((a) => !a.seen).length,
    '/psiholog/conversatii': s.threads.filter((t) => t.msgs.at(-1)?.from === 'elev').length,
    '/psiholog/programari': s.bookings.filter((b) => b.status === 'cerută').length,
    '/psiholog/rapoarte': s.reports.filter((r) => r.status === 'primit').length,
  } : {};
  return (
    <div className="psy">
      <aside className="sidebar">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <Link href="/psiholog" className="wordmark">bond</Link>
          <Link href="/demo/" className="exit">Ieși</Link>
        </div>
        <label className="switch-row" htmlFor="avail">
          <Switch id="avail" checked={online} onCheckedChange={(v) => update((d) => { d.psyOnline = v; })} />
          {online ? 'Disponibil pentru elevi' : 'Indisponibil'}
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
      <main><DemoBanner />{mounted ? children : null}</main>
    </div>
  );
}

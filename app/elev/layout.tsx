'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMounted } from '@/lib/store';
import { DemoBanner } from '@/components/demo-banner';

const TABS = [
  { href: '/elev', label: 'Acasă', icon: <path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" /> },
  { href: '/elev/psiholog', label: 'Psiholog', icon: <path d="M5 5h14v10H9l-4 4z" /> },
  { href: '/elev/rapoarte', label: 'Rapoarte', icon: <path d="M6 20V4h9l-1.5 3.5L15 11H6" /> },
  { href: '/elev/resurse', label: 'Resurse', icon: <path d="M5 4h10l4 4v12H5zM9 12h6M9 16h6" /> },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname().replace(/\/$/, '') || '/'; // trailingSlash export: '/elev/' must match '/elev'
  const mounted = useMounted();
  const active = TABS.findIndex((t) => t.href === path);
  return (
    <div className="student">
      <header className="topbar">
        <Link href="/elev" className="wordmark">bond</Link>
        {/* Quick exit: replaces this page in history, so Back does not return to bond. */}
        <button type="button" className="exit" onClick={() => location.replace('https://www.google.ro/')}>Ieși repede</button>
      </header>
      <DemoBanner />
      <main>{mounted ? children : null}</main>
      <nav className="tabbar" aria-label="Meniu">
        <ul>
          {TABS.map((t) => (
            <li key={t.href}>
              <Link href={t.href} aria-current={path === t.href ? 'page' : undefined}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">{t.icon}</svg>
                {t.label}
              </Link>
            </li>
          ))}
          {/* One indicator that slides between tabs, so the move says where you went. */}
          <li className="tab-ind" aria-hidden="true" data-hidden={active < 0 || undefined} style={{ '--i': Math.max(0, active) } as React.CSSProperties} />
        </ul>
      </nav>
    </div>
  );
}

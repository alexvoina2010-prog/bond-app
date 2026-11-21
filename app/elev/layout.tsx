'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMounted } from '@/lib/store';

const TABS = [
  { href: '/elev', label: 'Acasă', icon: <path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" /> },
  { href: '/elev/psiholog', label: 'Psiholog', icon: <path d="M5 5h14v10H9l-4 4z" /> },
  { href: '/elev/cercul', label: 'Cercul', icon: <><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></> },
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
        <Link href="/" className="exit">Ieși</Link>
      </header>
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

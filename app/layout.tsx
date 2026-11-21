import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin', 'latin-ext'], variable: '--font-display', display: 'swap' });
const text = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-text', display: 'swap' });

export const metadata: Metadata = {
  title: 'bond',
  description: 'Un loc sigur în care elevii vorbesc despre bullying: cu psihologul școlii sau anonim, cu alți elevi. Demo.',
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f10' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${display.variable} ${text.variable}`}>
      <body>{children}</body>
    </html>
  );
}

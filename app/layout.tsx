import type { Metadata, Viewport } from 'next';
import { Fraunces, Figtree } from 'next/font/google';
import { InkDefs } from '@/components/ink';
import './globals.css';

const display = Fraunces({ subsets: ['latin', 'latin-ext'], axes: ['opsz'], variable: '--font-fraunces', display: 'swap' });
const text = Figtree({ subsets: ['latin', 'latin-ext'], variable: '--font-figtree', display: 'swap' });

export const metadata: Metadata = {
  title: 'bond',
  description: 'Un loc sigur în care elevii vorbesc despre bullying: cu psihologul școlii sau anonim, cu alți elevi. Demo.',
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${display.variable} ${text.variable}`}>
      <body>
        <InkDefs />
        {children}
      </body>
    </html>
  );
}

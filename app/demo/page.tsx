'use client';
import { useRouter } from 'next/navigation';
import { Ink } from '@/components/ink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetDemo } from '@/lib/store';

export default function Entry() {
  const router = useRouter();
  return (
    <>
      <main className="entry">
        <div className="ink-head">
          <p className="wordmark wordmark-lg">bond</p>
          <Ink name="note" width={220} draw />
        </div>
        <div className="stack">
          <h1>Un loc sigur în care spui ce se întâmplă la școală.</h1>
          <p className="muted">Scrii psihologului școlii sau spui, anonim, ce ți s-a întâmplat ori ce ai văzut. Apoi vezi ce se face.</p>
        </div>
        <form className="stack" onSubmit={(e) => { e.preventDefault(); router.push('/elev'); }}>
          <div>
            <Label htmlFor="code">Codul școlii</Label>
            <Input id="code" defaultValue="CLJ-DEMO" autoComplete="off" />
          </div>
          <div>
            <Label htmlFor="email">Emailul de la școală</Label>
            <Input id="email" type="email" defaultValue="elev.demo@scoala-demo.ro" autoComplete="off" />
          </div>
          <p className="notice"><strong>Demo.</strong> Nimic din ce scrii aici nu ajunge la un psiholog. Datele sunt fictive și rămân în browserul tău. Dacă ești în pericol acum, sună la <a href="tel:112">112</a>.</p>
          <Button type="submit">Intră ca elev</Button>
          <Button variant="secondary" type="button" onClick={() => router.push('/psiholog')}>Intră ca psiholog</Button>
        </form>
        <div className="stack-tight justify-items-start">
          <p className="small muted">Pentru prezentare: deschide elevul și psihologul în două ferestre alăturate.</p>
          <Button variant="link" type="button" onClick={resetDemo}>Resetează datele demo</Button>
        </div>
      </main>
      <footer className="made">bond · made by ttaavo</footer>
    </>
  );
}

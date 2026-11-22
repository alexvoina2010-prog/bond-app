import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Confidențialitate · bond' };

// shortcut: CONTACT is a placeholder; Alex fills in the team's address before publishing (D6).
const CONTACT = 'alex.voina2010@gmail.com';

export default function Privacy() {
  return (
    <>
      <main className="prose-page">
        <p><Link href="/" className="wordmark">bond</Link></p>
        <h1>Nota de confidențialitate</h1>
        <p className="muted small">Pentru lista de așteptare bond. Ultima actualizare: 22 noiembrie 2026.</p>

        <h2>Cine suntem</h2>
        <p>bond e un proiect al unei echipe de cinci elevi din programul FIX Cluj. Echipa păstrează datele de mai jos. Contact: {CONTACT}.</p>

        <h2>Ce păstrăm</h2>
        <ul>
          <li>emailul tău, sau al unui părinte dacă ai 14 ori 15 ani;</li>
          <li>grupa de vârstă pe care ai ales-o (16+ sau 14–15);</li>
          <li>dacă ai bifat să-ți scriem când pornește bond;</li>
          <li>de unde ai venit pe pagină (de exemplu un link de la consiliul elevilor) și data și ora înscrierii;</li>
          <li>adresa IP și tipul de browser, pe care serviciul de formulare le salvează automat odată cu înscrierea.</li>
        </ul>
        <p>Nu îți cerem numele, școala sau ce ți s-a întâmplat. Pagina nu folosește cookie-uri de urmărire.</p>

        <h2>De ce</h2>
        <p>Ca să aflăm câți elevi vor bond la școala lor înainte să-l construim. S-ar putea să-ți scriem o singură dată, ca să te întrebăm ce crezi. Dacă ai bifat, îți scriem și când pornește bond la o școală.</p>

        <h2>Dacă ai 14 sau 15 ani</h2>
        <p>Te înscrie un părinte, cu emailul lui. Îi scriem părintelui și te trecem pe listă doar dacă ne răspunde că e de acord. Dacă nu răspunde, ștergem emailul.</p>

        <h2>Cât timp</h2>
        <p>Testul durează două săptămâni. La final ștergem toate emailurile, în afară de cele ale celor care au bifat să le scriem când pornește bond. Pe acelea le păstrăm până atunci, dar cel mult 12 luni.</p>

        <h2>Unde</h2>
        <p>Înscrierile sunt stocate prin serviciul de formulare al Netlify, firma din SUA care găzduiește pagina, deci datele pot ajunge pe servere din afara Uniunii Europene. Nu le dăm nimănui altcuiva și nu le folosim pentru reclame.</p>

        <h2>Drepturile tale</h2>
        <p>Poți cere oricând să vezi, să corectezi sau să ștergem datele, scriindu-ne la {CONTACT}. Te poți plânge și la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), dataprotection.ro.</p>
      </main>
      <footer className="made"><Link href="/">Înapoi la bond</Link> · <span lang="en">made by ttaavo</span></footer>
    </>
  );
}

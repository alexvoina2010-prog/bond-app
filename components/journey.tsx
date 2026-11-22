'use client';
/**
 * The landing's signature moment (DESIGN.md, Signature → journey).
 * A corridor in ink: the note leaves a phone, passes the closed classroom door and goes into the open door with light
 * on the floor (the one lilac patch). From that threshold an ink thread runs down the page; the note rides it as you
 * scroll and lands at the sign-up. Decorative only (aria-hidden): the meaning is in the text beside it.
 */
import * as React from 'react';

const W = 640;
const H = 270;
const DOOR = { x: 46, y: 236 }; // the open door's threshold: the note lands here and the thread starts here
const FLIGHT = 'M569 62 C548 36 480 30 400 38 C340 42 300 40 260 48 C200 60 120 66 62 104 C44 124 44 190 46 236';
// A rare, one-time milestone: the whole intro stays near 2.5 s (motion-craft). The phone is drawn by 1 s.
const FLY_AT = 1000;
const FLY_FOR = 1200;
// The note from components/ink.tsx, anchored at its bottom-middle so it stands on a point.
const NOTE = ['M96 52 L154 43 L176 60 L182 110 L108 122 Z', 'M154 43 L158 63 L176 60', 'M112 70 L160 62 M115 84 L163 76 M118 98 L148 93'];
const NOTE_C = { x: 139, y: 116 };
const NOTE_S = 0.5; // note size in scene units: about 43 px wide on a full 640 px scene

// Drawn in this order: the phone (where it starts), the floor, the classroom, the notice board, the open door.
const SCENE: string[] = [
  'M524 270 L524 84 C524 74 532 66 542 66 L596 66 C606 66 614 74 614 84 L614 270', // phone, close to us: the frame cuts its bottom
  'M556 78 L582 78', // speaker
  'M540 108 L598 108 M540 124 L590 124 M540 140 L594 140', // the message on its screen
  'M6 236 C120 235 240 237 360 236 C440 235 490 237 520 236', // corridor floor, behind the phone
  'M300 236 L300 62 L372 62 L372 236', // classroom doorway
  'M306 236 L306 68 L366 68 L366 236', // its door, closed
  'M318 86 L354 86 L354 128 L318 128 Z M336 86 L336 128', // door window
  'M312 158 L322 158 M318 44 L354 44 L354 54 L318 54 Z', // handle, class plate (no text)
  'M158 92 L232 90 L234 150 L160 152 Z', // notice board
  'M170 104 L196 103 L197 124 L171 125 Z M206 106 L222 106 M206 114 L224 113 M206 122 L218 122', // pinned paper
  'M14 236 L14 66 L78 66 L78 236', // the psychologist's doorway
  'M78 66 L104 56 L104 248 L78 236 M97 150 L97 158', // its door, open towards us, and handle
];

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The note at a point; `px` is how many screen px one unit is, so the line stays 2.2 px at any size. */
function Note({ x, y, s, px, className }: { x: number; y: number; s: number; px: number; className?: string }) {
  return (
    <g className={className} transform={`translate(${x} ${y}) scale(${s}) translate(${-NOTE_C.x} ${-NOTE_C.y})`}>
      <g className="ink-lines" filter="url(#ink-rough)" style={{ strokeWidth: 2.2 / (s * px) }}>
        {NOTE.map((d) => <path key={d} d={d} />)}
      </g>
    </g>
  );
}

type Geo = { d: string; w: number; h: number; x0: number; y0: number; end: number; knots: number[] };

export function Journey({ children }: { children: React.ReactNode }) {
  const scene = React.useRef<SVGSVGElement>(null);
  const rail = React.useRef<HTMLDivElement>(null);
  const fly = React.useRef<SVGAnimateMotionElement>(null);
  const path = React.useRef<SVGPathElement>(null);
  const [k, setK] = React.useState(1); // screen px per scene unit
  const [stage, setStage] = React.useState<'wait' | 'fly' | 'landed'>('wait');
  const [geo, setGeo] = React.useState<Geo | null>(null);
  const [p, setP] = React.useState(0);
  const [len, setLen] = React.useState(0); // measured after the thread mounts, so points never come from a stale path

  // Lay the thread from the door's threshold down through each [data-knot] to [data-thread-end].
  const layout = React.useCallback(() => {
    const sv = scene.current, box = rail.current;
    if (!sv || !box) return;
    const r = sv.getBoundingClientRect(), b = box.getBoundingClientRect();
    const kk = r.width / W;
    setK(kk);
    const x0 = r.left + DOOR.x * kk - b.left, y0 = r.top + DOOR.y * kk - b.top;
    // offsetTop ignores the 12 px entrance rise that getBoundingClientRect would catch mid-animation.
    const ys = [...box.querySelectorAll<HTMLElement>('[data-knot], [data-thread-end]')].map((el) => {
      let y = 0;
      for (let n: HTMLElement | null = el; n && n !== box; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
      return y + Math.min(el.offsetHeight / 2, 16);
    });
    if (!ys.length) return;
    // Hand-drawn: each stretch bows a little to alternate sides and passes exactly through each knot.
    let d = `M${x0} ${y0}`, prev = y0;
    ys.forEach((y, i) => {
      const bow = (i % 2 ? -1 : 1) * Math.min(10, (y - prev) * 0.03 + 3);
      d += ` C${x0 + bow} ${prev + (y - prev) * 0.35} ${x0 - bow * 0.6} ${prev + (y - prev) * 0.7} ${x0} ${y}`;
      prev = y;
    });
    const end = ys[ys.length - 1];
    setGeo({ d, w: b.width, h: b.height, x0, y0, end, knots: ys.slice(0, -1).map((y) => (y - y0) / (end - y0)) });
  }, []);

  React.useLayoutEffect(() => {
    layout();
    let raf = 0; // lay out on the next frame, so a resize never re-enters the observer ("ResizeObserver loop")
    const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(layout); });
    // Both: the thread starts at the drawing's door, so it must follow the drawing if that settles late (cold load).
    if (rail.current) ro.observe(rail.current);
    if (scene.current) ro.observe(scene.current);
    document.fonts?.ready.then(layout);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, [layout]);

  // The flight plays once, after the corridor has drawn itself. Scrolling first, or reduced motion, skips it.
  React.useEffect(() => {
    if (reduced()) { setStage('landed'); return; }
    const land = () => setStage('landed');
    const a = fly.current;
    a?.addEventListener('endEvent', land);
    const t = setTimeout(() => { setStage((s) => (s === 'wait' ? 'fly' : s)); a?.beginElement(); }, FLY_AT);
    const t2 = setTimeout(land, FLY_AT + FLY_FOR + 50); // fallback if endEvent never fires
    const skip = () => { if (scrollY > 8) land(); };
    addEventListener('scroll', skip, { passive: true });
    return () => { clearTimeout(t); clearTimeout(t2); a?.removeEventListener('endEvent', land); removeEventListener('scroll', skip); };
  }, []);

  // Scroll moves the note along the thread: at the top it waits at the door; it lands as the form comes into view.
  React.useEffect(() => {
    if (!geo) return;
    if (reduced()) { setP(1); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!rail.current) return;
      const endPage = rail.current.getBoundingClientRect().top + scrollY + geo.end;
      setP(Math.min(1, Math.max(0, scrollY / Math.max(1, endPage - innerHeight * 0.62))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [geo]);

  React.useLayoutEffect(() => { setLen(path.current?.getTotalLength() ?? 0); }, [geo]);
  const point = (f: number) => (path.current && len ? path.current.getPointAtLength(len * f) : geo ? { x: geo.x0, y: geo.y0 } : null);
  const at = point(p);
  const landed = stage === 'landed';
  const ns = Math.max(NOTE_S * k, 0.4); // note scale on screen: never smaller than about 34 px wide

  return (
    <>
      <svg ref={scene} className="ink ink-draw scene" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false"
        style={{ '--sw': `${2.2 / k}px` } as React.CSSProperties}>
        <g className="door-light" data-lit={landed || undefined}>
          <path className="ink-patch" d="M16 236 L76 236 L102 268 L-6 268 Z" />
        </g>
        <g className="ink-lines" filter="url(#ink-rough)">
          {SCENE.map((d, i) => <path key={i} d={d} pathLength={1} style={{ '--n': i * 0.7 } as React.CSSProperties} />)}
        </g>
        <path className="trail" d={FLIGHT} data-on={landed || undefined} style={{ strokeWidth: 1.6 / k }} />
        <g style={{ opacity: stage === 'fly' ? 1 : 0 }}>
          <animateMotion ref={fly} path={FLIGHT} begin="indefinite" dur={`${FLY_FOR}ms`} fill="freeze" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.77 0 0.175 1" />
          <Note x={0} y={0} s={ns / k} px={k} />
        </g>
      </svg>
      <div ref={rail} className="railed">
        {geo && (
          <svg className="thread" viewBox={`0 0 ${geo.w} ${geo.h}`} width={geo.w} height={geo.h} aria-hidden="true" focusable="false">
            <path className="guide" d={geo.d} />
            <g className="ink-lines" filter="url(#ink-rough)">
              <path ref={path} d={geo.d} pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: landed ? 1 - p : 1 }} />
            </g>
            {geo.knots.map((f, i) => {
              const pt = point(f);
              return pt && <circle key={i} className="knot" cx={pt.x} cy={pt.y} r={4.5} data-on={(landed && p >= f) || undefined} />;
            })}
            {at && landed && <Note x={at.x} y={at.y} s={ns} px={1} className="rider" />}
          </svg>
        )}
        {children}
      </div>
    </>
  );
}

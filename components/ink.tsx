/**
 * The signature: ink-line drawings (DESIGN.md, Signature).
 * Spec: viewBox 240×160 · one 2.2 px ink stroke (currentColor), round caps and joins · one shared wobble
 * filter (#ink-rough) · exactly one flat lilac patch behind the line (--tint) · no fills, no text, no faces.
 * Only on feeling screens: entry, home header, success, empty states, crisis. Never in threads, lists or tables.
 */
import * as React from 'react';

type Drawing = { patch: string; lines: string[] };

const DRAWINGS = {
  // A folded note on its way: what the student is about to send.
  note: {
    patch: 'M70 58 C92 30 160 34 178 62 C196 92 160 124 118 120 C78 116 52 88 70 58 Z',
    lines: [
      'M96 52 L154 43 L176 60 L182 110 L108 122 Z', // the note, top corner folded down
      'M154 43 L158 63 L176 60', // the fold
      'M112 70 L160 62 M115 84 L163 76 M118 98 L148 93', // writing
      'M20 132 C40 128 52 116 62 104 M28 118 C36 114 42 108 46 100', // trail behind it
    ],
  },
  // A door left open, light on the floor: the report reached someone.
  door: {
    patch: 'M90 128 L162 128 L222 156 L96 156 Z',
    lines: [
      'M88 128 L88 26 L164 26 L164 128', // doorway
      'M88 26 L60 16 L60 140 L88 128', // the door, swung open towards us
      'M68 80 L68 86', // handle
      'M30 128 L60 128 M164 128 L214 128', // floor
    ],
  },
  // Two chairs facing each other: a face-to-face talk.
  chairs: {
    patch: 'M76 96 C90 72 152 72 166 96 C178 118 150 136 120 134 C88 132 64 118 76 96 Z',
    lines: [
      'M38 40 L46 136 M50 40 L56 96 M38 40 L50 40 M40 62 L52 62 M44 96 L96 96 L96 103 L45 103 M90 103 L94 136', // left chair: back with slats, thick seat, legs
      'M202 40 L194 136 M190 40 L184 96 M202 40 L190 40 M200 62 L188 62 M196 96 L144 96 L144 103 L195 103 M150 103 L146 136', // right chair, facing it
      'M112 112 L128 112 L124 136 L116 136 Z M120 112 C114 98 112 90 120 82 C128 90 126 98 120 112', // small plant between
    ],
  },
  // A mug with steam: nothing urgent right now.
  cup: {
    patch: 'M82 96 C84 70 150 66 160 92 C170 120 138 136 112 132 C90 128 80 116 82 96 Z',
    lines: [
      'M92 76 L96 128 C98 136 138 136 140 128 L144 76 Z', // mug
      'M144 90 C162 88 164 112 142 114', // handle
      'M106 62 C100 52 112 46 106 36 M122 60 C116 50 128 44 122 34', // steam
    ],
  },
  // Three speech marks leaning together: the Cercul.
  circle: {
    patch: 'M60 80 C66 46 170 40 184 76 C196 108 160 128 120 126 C78 124 54 108 60 80 Z',
    lines: [
      'M44 62 C44 46 100 46 100 62 C100 78 70 80 58 78 L46 90 L50 76 C46 72 44 68 44 62 Z',
      'M140 50 C140 34 196 34 196 50 C196 66 182 68 172 66 L186 80 L164 66 C150 66 140 62 140 50 Z',
      'M88 104 C88 88 152 88 152 104 C152 120 122 122 110 120 L96 132 L100 118 C92 114 88 110 88 104 Z',
    ],
  },
  // A loose double ring: the breathing guide on the crisis sheet.
  breath: {
    patch: 'M120 40 C162 40 176 66 176 82 C176 110 150 124 120 124 C88 124 64 110 64 82 C64 58 88 40 120 40 Z',
    lines: [
      'M120 30 C170 30 186 60 186 82 C186 114 154 134 120 134 C84 134 54 114 54 82 C54 52 84 30 124 32',
      'M118 38 C160 36 180 62 180 84',
    ],
  },
} satisfies Record<string, Drawing>;

export type InkName = keyof typeof DRAWINGS;

/** One shared filter for every drawing on the page, so all lines wobble alike. */
export function InkDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <filter id="ink-rough" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={2} seed={3} />
        <feDisplacementMap in="SourceGraphic" scale={1.4} />
      </filter>
    </svg>
  );
}

/** Decorative (aria-hidden): the meaning is always in the text next to it. `draw` plays the draw-on once. */
export function Ink({ name, width = 240, draw = false, className = '' }: { name: InkName; width?: number; draw?: boolean; className?: string }) {
  const d: Drawing = DRAWINGS[name];
  return (
    <svg className={`ink ${draw ? 'ink-draw' : ''} ${className}`} viewBox="0 0 240 160" width={width} height={(width * 2) / 3} aria-hidden="true" focusable="false">
      <path className="ink-patch" d={d.patch} />
      <g className="ink-lines" filter="url(#ink-rough)">
        {d.lines.map((p, i) => <path key={i} d={p} pathLength={1} style={{ '--n': i } as React.CSSProperties} />)}
      </g>
    </svg>
  );
}

export const INK_NAMES = Object.keys(DRAWINGS) as InkName[];

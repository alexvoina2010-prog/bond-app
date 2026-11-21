# Builds sheet.html from components/ink.tsx so every signature drawing can be checked side by side.
import re
src = open('components/ink.tsx', encoding='utf-8').read()
body = src.split('const DRAWINGS = {')[1].split('} satisfies')[0]
items = re.findall(r"\n  (\w+): \{\s*patch: '([^']+)',\s*lines: \[(.*?)\],\s*\}", body, re.S)
assert items, 'no drawings parsed'
cards = []
for name, patch, lines in items:
    g = ''.join(f'<path d="{p}"/>' for p in re.findall(r"'([^']+)'", lines))
    svg = (f'<svg viewBox="0 0 240 160" width="240" height="160"><path d="{patch}" fill="#C4B2F7" opacity=".85"/>'
           f'<g fill="none" stroke="#141414" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" filter="url(#r)">{g}</g></svg>')
    cards.append(f'<figure>{svg}<figcaption>{name}</figcaption></figure>')
html = ('<!doctype html><meta charset="utf-8"><title>bond ink sheet</title>'
        '<style>body{margin:0;padding:24px;background:#fff;font:13px system-ui}.g{display:grid;grid-template-columns:repeat(3,260px);gap:16px}'
        'figure{margin:0;border:1px solid #e6e6ea;border-radius:14px;padding:10px}figcaption{color:#55555c}</style>'
        '<svg width="0" height="0" style="position:absolute"><filter id="r" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3"/>'
        '<feDisplacementMap in="SourceGraphic" scale="1.4"/></filter></svg>'
        '<h1 style="font-size:15px">bond signature sheet (ink line): every drawing side by side</h1><div class="g">' + ''.join(cards) + '</div>')
open('.visage/signature/sheet.html', 'w', encoding='utf-8').write(html)
print(len(items), 'drawings')

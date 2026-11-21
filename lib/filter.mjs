// Language filter and crisis detection for chat messages (Romanian).
// shortcut: keyword lists only, so they miss misspellings, slang and context; a real launch needs human moderation and a reviewed list.

export function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strips ă â î ș ț (comma and cedilla forms)
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Profanity and slurs: blocked anywhere.
const PROFANITY = ['muie', 'pula', 'pizda', 'curva', 'futu', 'fut', 'futut', 'handicapat', 'handicapata', 'retardat', 'retardata', 'jegos', 'jegoasa'];
// Insults: blocked only when aimed at someone ("ești prost"), so a student can still quote what was said to them.
const INSULTS = ['prost', 'proasta', 'idiot', 'idioata', 'cretin', 'cretina', 'tampit', 'tampita', 'ratat', 'ratata', 'urat', 'urata', 'gras', 'grasa', 'bou', 'vaca', 'nimeni', 'penibil', 'penibila'];
const AIMED = new RegExp(`\\b(esti|sunteti|esti un|esti o|ba|fa|tu)\\s+(un |o )?(${INSULTS.join('|')})\\b`);

// Self-harm and immediate danger. Checked before the filter.
const CRISIS = [
  'vreau sa mor', 'sa mor', 'ma omor', 'sa ma omor', 'ma sinucid', 'sinucid', 'sinucidere',
  'nu mai vreau sa traiesc', 'nu mai vreau sa exist', 'sa nu mai exist', 'nu mai pot sa traiesc',
  'ma tai', 'ma ranesc', 'imi fac rau', 'sa mi fac rau', 'ma arunc',
  'ma bate', 'ma bat', 'm a batut', 'm au batut', 'm a lovit', 'm au lovit', 'ma ameninta', 'ma bata',
];

export function isCrisis(text) {
  const t = ` ${normalize(text)} `;
  return CRISIS.some((p) => t.includes(` ${p} `));
}

export function isOffensive(text) {
  const t = normalize(text);
  const words = t.split(' ');
  return words.some((w) => PROFANITY.includes(w)) || AIMED.test(t);
}

/** @returns {'crisis' | 'offensive' | 'ok'} */
export function checkMessage(text) {
  if (isCrisis(text)) return 'crisis';
  if (isOffensive(text)) return 'offensive';
  return 'ok';
}

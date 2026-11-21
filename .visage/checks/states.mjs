// bond-app-v2 after-action states for shoot.mjs --states (moved here from the v1.1 shoot.mjs, unchanged).
// Each state starts from fresh demo data: `reset` runs on the base first.
export const reset = `localStorage.removeItem('bond-demo-v2')`;
const typeAndSend = (text) => `(() => { const t = document.getElementById('msg'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(t, ${JSON.stringify(text)}); t.dispatchEvent(new Event('input', { bubbles: true })); setTimeout(() => t.form.requestSubmit(), 50); })()`;
export default [
  { name: 'state-report-sent', route: 'elev/raport/', run: `document.querySelector('form button[type=submit]').click()` },
  { name: 'state-crisis-sheet', route: 'elev/cercul/', run: typeAndSend('nu mai vreau să trăiesc') },
  { name: 'state-filter-blocked', route: 'elev/cercul/', run: typeAndSend('ești prost') },
  { name: 'state-booking-sent', route: 'elev/psiholog/', run: `(() => { [...document.querySelectorAll('button')].find(b => b.textContent.includes('Programează'))?.click(); setTimeout(() => { document.querySelector('[role=radio]:not([disabled]), input[type=radio]:not([disabled])').click(); setTimeout(() => document.querySelector('form.stack button[type=submit]').click(), 100); }, 200); })()` },
];

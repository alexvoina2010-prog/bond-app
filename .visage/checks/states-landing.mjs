// S3.10 landing states for shoot.mjs --states (captured at 390 px, both schemes, reduced motion).
// The form posts to Netlify, which does not exist locally, so success states stub fetch with a 200.
const fill = (age, email) => `(() => {
  document.getElementById(${JSON.stringify(age)}).click();
  setTimeout(() => { const i = document.getElementById('email'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(i, ${JSON.stringify(email)}); i.dispatchEvent(new Event('input', { bubbles: true }));
    window.fetch = async () => new Response('', { status: 200 });
    document.querySelector('form[name=waitlist]').requestSubmit(); }, 150);
})()`;
export default [
  { name: 'state-form-errors', route: '.', run: `document.querySelector('form[name=waitlist]').requestSubmit()` },
  { name: 'state-sent-16', route: '.', run: fill('age-16', 'elev.test@example.com') },
  { name: 'state-sent-14', route: '.', run: fill('age-14', 'parinte.test@example.com') },
];

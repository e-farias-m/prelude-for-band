// test-app.js
// Loads js/app.js in a stubbed browser environment and checks app-level
// behaviour that is otherwise only reachable through the UI.

const fs = require('fs');
const path = require('path');

const read = f => fs.readFileSync(path.join(__dirname, 'js', f), 'utf8');

function makeEl() {
  return {
    textContent: '', innerHTML: '', value: '', style: {}, dataset: {},
    classList: { add() {}, remove() {}, contains() { return false; } },
    appendChild() {}, addEventListener() {}, focus() {}, remove() {},
    querySelector() { return null; }, querySelectorAll() { return []; },
    setAttribute() {}, hasAttribute() { return false; },
  };
}
const document = {
  addEventListener() {},
  getElementById() { return makeEl(); },
  createElement() { return makeEl(); },
  body: makeEl(),
};
const store = { preludeBandName: 'Test' };
const localStorage = {
  getItem(k) { return k in store ? store[k] : null; },
  setItem(k, v) { store[k] = String(v); },
  removeItem(k) { delete store[k]; },
};

const sandbox = new Function('document', 'localStorage', 'window', `
${read('curriculum.js')}
${read('graphics.js')}
${read('app.js')}
return { handleAction, renderCompletePhase, CURRICULUM, APP, IMPORTED_SONGS_KEY };
`);
const api = sandbox(document, localStorage, {});

let pass = 0;
let fail = 0;
const failures = [];
function check(cond, msg) {
  if (cond) { pass++; } else { fail++; failures.push(msg); }
}

const flute = api.CURRICULUM.flute;
api.APP.instrumentId = 'flute';

// ── 1. Song completion hides the per-note mastery badge ────────────────────
{
  const song = flute.lessons.find(l => l.type === 'song');
  api.APP.lastStars = 3;
  api.APP.lastXp = 25;
  api.APP.completedBefore = false;
  const songHtml = api.renderCompletePhase(flute, song);
  check(songHtml.includes('Song complete!'), 'song completion should say "Song complete!"');
  check(!songHtml.includes('correct'),
    'song completion should NOT show a per-note mastery badge');

  const note = flute.lessons.find(l => !l.type);
  const noteHtml = api.renderCompletePhase(flute, note);
  check(noteHtml.includes('correct'),
    'note completion should still show the mastery badge');
}

// ── 2. Deleting an imported song clears its saved progress ─────────────────
{
  const song = { id: 'imported-123', type: 'song', noteName: 'Imported', prerequisiteIds: [], noteIds: ['fl-1'], durations: [1], prompt: '', description: '' };
  store[api.IMPORTED_SONGS_KEY] = JSON.stringify({ flute: [song] });
  api.APP.progress = { flute: { completed: { [song.id]: { stars: 2 } }, xp: 40, mastery: {} } };

  api.handleAction('delete-imported-song', { dataset: { importedIndex: '0' } });

  const left = JSON.parse(store[api.IMPORTED_SONGS_KEY] || '{}').flute || [];
  check(left.length === 0, 'deleted song should be removed from the imported list');
  check(!api.APP.progress.flute.completed[song.id],
    'deleted song progress should be cleared from memory');
  const saved = JSON.parse(store['preludeBandProgress'] || '{}');
  check(!saved.flute || !saved.flute.completed || !saved.flute.completed[song.id],
    'deleted song progress should not be persisted to localStorage');
}

// ── 3. Deleting a missing song does not throw ──────────────────────────────
{
  store[api.IMPORTED_SONGS_KEY] = JSON.stringify({ flute: [] });
  api.handleAction('delete-imported-song', { dataset: { importedIndex: '5' } });
  check(true, 'deleting an out-of-range imported song should not throw');
}

if (failures.length) console.log(failures.join('\n'));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

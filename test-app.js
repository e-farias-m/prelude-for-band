// test-app.js
// Loads js/app.js in a stubbed browser environment and checks app-level
// behaviour that is otherwise only reachable through the UI.

const fs = require('fs');
const path = require('path');

const read = f => fs.readFileSync(path.join(__dirname, 'js', f), 'utf8');

global.confirm = () => true;

function makeEl() {
  const el = {
    value: '', style: {}, dataset: {}, _text: '', _html: '',
    classList: { add() {}, remove() {}, contains() { return false; } },
    appendChild() {}, addEventListener() {}, focus() {}, remove() {},
    querySelector() { return null; }, querySelectorAll() { return []; },
    setAttribute() {}, hasAttribute() { return false; },
  };
  // Mirror the DOM contract used by escapeHtml(): writing textContent makes the
  // same string readable back through innerHTML.
  Object.defineProperty(el, 'textContent', {
    get() { return el._text; },
    set(v) { el._text = String(v); el._html = String(v); },
  });
  Object.defineProperty(el, 'innerHTML', {
    get() { return el._html; },
    set(v) { el._html = String(v); },
  });
  return el;
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

// Controllable microphone/recorder stubs for the record-and-compare feature.
const fakeTracks = [];
const fakeStream = { getTracks: () => fakeTracks };
const navigator = { mediaDevices: { getUserMedia: () => Promise.resolve(fakeStream) } };
let revoked = [];
class FakeMediaRecorder {
  constructor(stream) { this.stream = stream; this.state = 'inactive'; this.mimeType = 'audio/webm'; FakeMediaRecorder.instance = this; }
  start() { this.state = 'recording'; }
  stop() { this.state = 'inactive'; if (this.onstop) this.onstop(); }
}
const URL = { createObjectURL: () => 'blob:fake', revokeObjectURL: (u) => revoked.push(u) };
const Blob = class { constructor(chunks, opts) { this.chunks = chunks; this.opts = opts; } };
const Audio = class { constructor(src) { this.src = src; Audio.last = this; } play() { return Promise.resolve(); } };

const sandbox = new Function('document', 'localStorage', 'window', 'navigator', 'MediaRecorder', 'URL', 'Blob', 'Audio', `
${read('curriculum.js')}
${read('graphics.js')}
${read('app.js')}
return { handleAction, renderCompletePhase, CURRICULUM, APP, IMPORTED_SONGS_KEY,
  buildSprintQuestion, getSprintBest, setSprintBest, finishSprint, startSprint,
  renderPracticeScreen, getLearnedNotes, SPRINT_MODES,
  getMotivation, addPracticeSeconds, getTotalPracticeSeconds, getCurrentStreak,
  getTotalXp, getLevel, getAvatar, getStats, evaluateBadges, hasBadge, todayKey,
  endSession, renderStudentCard, renderBadgeShelf, renderSelectScreen, BADGES,
  canRecord, startRecording, stopRecording, playRecording, cleanupRecording, renderPlayPhase };
`);
const api = sandbox(document, localStorage, {}, navigator, FakeMediaRecorder, URL, Blob, Audio);

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

// ── 4. Sprint questions draw only from learned notes ───────────────────────
{
  const fluteLessons = flute.lessons.filter(l => !l.type);
  const learnedIds = fluteLessons.slice(0, 3).map(l => l.id);
  api.APP.instrumentId = 'flute';
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  learnedIds.forEach(id => { api.APP.progress.flute.completed[id] = { stars: 3 }; });

  for (let i = 0; i < 20; i++) {
    const q = api.buildSprintQuestion('flute', api.SPRINT_MODES.SIGHT);
    check(q.options.some(o => o.id === q.correctId), 'sprint options include the correct note');
    check(q.options.every(o => learnedIds.includes(o.id)), 'sprint options only use learned notes');
    check(new Set(q.options.map(o => o.id)).size === q.options.length, 'sprint options are unique');
  }
}

// ── 5. Sprint personal best only moves upward ──────────────────────────────
{
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {}, sprints: {} } };
  check(api.getSprintBest('flute', api.SPRINT_MODES.SIGHT) === 0, 'no sprint best initially');
  check(api.setSprintBest('flute', api.SPRINT_MODES.SIGHT, 5) === true, 'first score sets a best');
  check(api.setSprintBest('flute', api.SPRINT_MODES.SIGHT, 3) === false, 'lower score is not a best');
  check(api.getSprintBest('flute', api.SPRINT_MODES.SIGHT) === 5, 'best stays at the higher score');
  check(api.setSprintBest('flute', api.SPRINT_MODES.SIGHT, 7) === true, 'higher score sets a new best');
}

// ── 6. Sprint answering scores correct taps and flags wrong ones ───────────
{
  api.APP.instrumentId = 'flute';
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  flute.lessons.filter(l => !l.type).slice(0, 3).forEach(l => { api.APP.progress.flute.completed[l.id] = { stars: 3 }; });
  api.APP.sprint = {
    mode: api.SPRINT_MODES.SIGHT, endsAt: Date.now() + 30000, score: 0,
    finished: false, isBest: false, xp: 0,
    question: api.buildSprintQuestion('flute', api.SPRINT_MODES.SIGHT),
  };
  const correct = api.APP.sprint.question.correctId;
  api.handleAction('sprint-answer', { dataset: { id: correct } });
  check(api.APP.sprint.score === 1, 'correct answer increments the score');
  const before = api.APP.sprint.score;
  const wrong = api.APP.sprint.question.options.find(o => o.id !== api.APP.sprint.question.correctId);
  api.handleAction('sprint-answer', { dataset: { id: wrong.id } });
  check(api.APP.sprint.score === before, 'wrong answer does not increment the score');
  check(api.APP.sprint.question.wrongId === wrong.id, 'wrong answer is flagged for feedback');
}

// ── 7. Finishing a sprint awards XP and records the best ───────────────────
{
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {}, sprints: {} } };
  api.APP.instrumentId = 'flute';
  api.APP.sprint = {
    mode: api.SPRINT_MODES.SIGHT, endsAt: Date.now(), score: 6,
    finished: false, isBest: false, xp: 0, question: {},
  };
  api.finishSprint();
  check(api.APP.sprint.finished === true, 'sprint is marked finished');
  check(api.APP.sprint.isBest === true, 'first score is a new best');
  check(api.APP.sprint.xp === 12, 'sprint awards 2 XP per correct answer');
  check(api.getSprintBest('flute', api.SPRINT_MODES.SIGHT) === 6, 'finish records the personal best');
  check(api.APP.progress.flute.xp === 12, 'sprint XP is added to instrument progress');
}

// ── 8. Practice screen gates drills until two notes are learned ────────────
{
  api.APP.instrumentId = 'flute';
  api.APP.sprint = null;
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  api.APP.progress.flute.completed['fl-1'] = { stars: 3 };
  let html = api.renderPracticeScreen();
  check(html.includes('unlock'), 'practice screen stays locked with fewer than two notes');
  check(html.includes('disabled'), 'locked practice screen disables the sprint cards');
  api.APP.progress.flute.completed['fl-2'] = { stars: 3 };
  html = api.renderPracticeScreen();
  check(!html.includes('unlock'), 'practice screen unlocks once two notes are learned');
  check(html.includes('data-action="start-sprint"'), 'practice screen offers sprints once ready');
  check(html.includes('sight') && html.includes('finger'), 'practice screen lists both sprint modes');
}

// ── 9. Sprint view renders prompt, HUD and result cleanly ─────────────────
{
  api.APP.instrumentId = 'flute';
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  flute.lessons.filter(l => !l.type).slice(0, 3).forEach(l => { api.APP.progress.flute.completed[l.id] = { stars: 3 }; });
  api.APP.sprint = {
    mode: api.SPRINT_MODES.FINGER, endsAt: Date.now() + 30000, score: 2,
    finished: false, isBest: false, xp: 0,
    question: api.buildSprintQuestion('flute', api.SPRINT_MODES.FINGER),
  };
  const live = api.renderPracticeScreen();
  check(live.includes('sprint-timer') && live.includes('sprint-score'), 'sprint view shows the HUD');
  check(live.includes('data-action="sprint-answer"'), 'sprint view offers answer options');
  check(!live.includes('undefined') && !live.includes('NaN'), 'live sprint view has no undefined/NaN');

  api.APP.sprint.finished = true;
  api.APP.sprint.xp = 4;
  const done = api.renderPracticeScreen();
  check(done.includes('sprint-result-score') && done.includes('Play again'), 'finished sprint shows the result');
  check(done.includes('+4 XP'), 'finished sprint shows XP earned');
  check(!done.includes('undefined') && !done.includes('NaN'), 'sprint result has no undefined/NaN');
}

// ── 10. Practice time accumulates and drives the streak ───────────────────
{
  api.APP.motivation = { days: {}, badges: {} };
  api.addPracticeSeconds(60);
  check(api.getTotalPracticeSeconds() === 60, 'practice seconds accumulate');
  api.addPracticeSeconds(90);
  check(api.getTotalPracticeSeconds() === 150, 'practice seconds keep accumulating');

  api.APP.motivation = { days: {}, badges: {} };
  const now = new Date('2026-10-08T10:00:00');
  for (let i = 0; i < 3; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    api.APP.motivation.days[api.todayKey(d)] = 30;
  }
  check(api.getCurrentStreak(now) === 3, 'three consecutive days is a 3-day streak');
  const d5 = new Date(now);
  d5.setDate(d5.getDate() - 5);
  api.APP.motivation.days[api.todayKey(d5)] = 30;
  check(api.getCurrentStreak(now) === 3, 'a gap breaks the streak');
}

// ── 11. Levels and avatars scale with XP ──────────────────────────────────
{
  check(api.getLevel(0) === 1, 'zero XP is level 1');
  check(api.getLevel(99) === 1, 'under 100 XP is level 1');
  check(api.getLevel(100) === 2, '100 XP is level 2');
  check(api.getLevel(550) === 6, '550 XP is level 6');
  check(api.getAvatar(1) !== api.getAvatar(12), 'avatar changes across levels');
}

// ── 12. Badges unlock from milestones and only once ───────────────────────
{
  api.APP.motivation = { days: {}, badges: {} };
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  check(api.evaluateBadges().length === 0, 'no badges are earned with no progress');

  const note = flute.lessons.find(l => !l.type);
  api.APP.progress.flute.completed[note.id] = { stars: 3 };
  const earned = api.evaluateBadges();
  check(earned.some(b => b.id === 'first-steps'), 'completing a lesson unlocks First Steps');
  check(api.hasBadge('first-steps'), 'the earned badge is stored');
  check(api.evaluateBadges().length === 0, 'badges are not re-awarded');
}

// ── 13. A strong finger sprint unlocks Quick Fingers ──────────────────────
{
  api.APP.motivation = { days: {}, badges: {} };
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {}, sprints: { [api.SPRINT_MODES.FINGER]: 15 } } };
  const earned = api.evaluateBadges();
  check(earned.some(b => b.id === 'quick-fingers'), 'a 15-point finger sprint unlocks Quick Fingers');
}

// ── 14. Session timing records practice time ──────────────────────────────
{
  api.APP.motivation = { days: {}, badges: {} };
  api.APP.sessionStart = Date.now() - 60000;
  api.endSession();
  check(api.getTotalPracticeSeconds() >= 55, 'ending a session records practice time');
  check(api.APP.sessionStart === null, 'session start is cleared after ending');
  const afterFirst = api.getTotalPracticeSeconds();
  api.endSession();
  check(api.getTotalPracticeSeconds() === afterFirst, 'ending with no active session is a no-op');
}

// ── 15. Student card and badge shelf render on the home screen ────────────
{
  api.APP.motivation = { days: {}, badges: {} };
  api.APP.progress = { flute: { completed: {}, xp: 250, mastery: {} } };
  const card = api.renderStudentCard('Ada');
  check(card.includes('Ada') && card.includes('Lv 3'), 'student card shows name and level');
  check(card.includes('streak') || card.includes('Practice today'), 'student card shows streak state');
  const shelf = api.renderBadgeShelf();
  check(shelf.includes('Badges'), 'badge shelf renders');
  check(shelf.includes('First Steps'), 'badge shelf lists badge names');
  const home = api.renderSelectScreen();
  check(home.includes('student-card') && home.includes('badges-shelf'), 'home shows card and badges');
}

// ── 16. Resetting progress also clears motivation ─────────────────────────
{
  api.APP.progress = { flute: { completed: { 'fl-1': { stars: 3 } }, xp: 10, mastery: {} } };
  api.APP.motivation = { days: { '2026-01-01': 60 }, badges: { 'first-steps': 'x' } };
  api.handleAction('reset-progress', { dataset: {} });
  check(Object.keys(api.APP.progress).length === 0, 'reset clears instrument progress');
  check(Object.keys(api.APP.motivation.badges).length === 0, 'reset clears badges');
  check(Object.keys(api.APP.motivation.days).length === 0, 'reset clears practice days');
}

(async () => {
  // ── 17. The record control only appears when the mic API exists ─────────
  {
    api.APP.recorder = null;
    api.APP.recordingUrl = null;
    api.APP.instrumentId = 'flute';
    const note = flute.lessons.find(l => !l.type);

    const withMic = api.renderPlayPhase(flute, note);
    check(withMic.includes('data-action="record-toggle"'), 'play phase offers a record control with mic support');

    const mediaDevices = navigator.mediaDevices;
    delete navigator.mediaDevices;
    check(api.canRecord() === false, 'canRecord is false without mediaDevices');
    const noMic = api.renderPlayPhase(flute, note);
    check(!noMic.includes('data-action="record-toggle"'), 'no record control without mic support');
    navigator.mediaDevices = mediaDevices;
  }

  // ── 18. Recording round-trip: start then stop yields a playable take ────
  {
    api.APP.recorder = null;
    api.APP.recordingUrl = null;
    await api.startRecording();
    check(!!api.APP.recorder, 'startRecording opens a recorder');
    check(api.APP.recorder.mediaRecorder.state === 'recording', 'the recorder is running');
    api.APP.recorder.mediaRecorder.ondataavailable({ data: { size: 10 } });
    api.stopRecording();
    check(api.APP.recordingUrl === 'blob:fake', 'stopping creates a playback URL');
    check(api.APP.recorder === null, 'the recorder is cleared after stopping');
    api.playRecording();
    check(Audio.last && Audio.last.src === 'blob:fake', 'playRecording plays the captured take');
  }

  // ── 19. Cleaning up a recording revokes its object URL ──────────────────
  {
    revoked = [];
    api.cleanupRecording();
    check(api.APP.recordingUrl === null, 'cleanup clears the recording URL');
    check(revoked.includes('blob:fake'), 'cleanup revokes the object URL');
  }

  if (failures.length) console.log(failures.join('\n'));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
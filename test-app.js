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
  canRecord, startRecording, stopRecording, playRecording, cleanupRecording, renderPlayPhase,
  getSkill, recordSkill, noteWeakness, generatePlan, getTodayPlan, markPlanItemDone,
  isPlanComplete, renderPlanCard, getNoteAccuracy, getWeakestNotes, pickWeightedNote,
  renderWeakSpots, earPhraseLength, buildEarPhrase, gradeEarResponse, earScore,
  startEarRound, submitEarPick, finishEarRound, renderEarScreen,
  clampBpm, bpmToIntervalMs, createMetronome, advanceMetronome, tapTempo,
  bpmToTickMs, metronomeTick, metronomeClickOpts, METRONOME_SUBDIVISIONS,
  TEMPO_PRESETS, METRONOME_SOUNDS, METRONOME_DEFAULT_VOLUME,
  detectPitch, freqToNoteInfo, centsLabel, getNoteLessons, TIME_SIGNATURES,
  renderMetronomePanel, renderTunerPanel, renderToolWidget,
  getInstrumentReport, buildPracticeReport, formatReportText, renderReportScreen,
  getWeekStart, getWeekKey, getWeekDays, buildWeeklyDigest, formatDigestText,
  renderDigestCard, renderDigestScreen, DEFAULT_WEEKLY_GOAL, WEEKLY_GOAL_OPTIONS,
  getWeeklyGoalMinutes, setWeeklyGoalMinutes, shouldRemindDigest, markDigestReminded,
  maybeRemindDigest, getTheme, setTheme, applyTheme, toggleTheme, instAccent, Graphics,
  getSavedInstrument, setSavedInstrument, clearSavedInstrument, renderFocusCard, renderInstrumentGrid,
  showFingeringHelp, hideFingeringHelp, FINGERING_HELP,
  getTutorialSeen, markTutorialSeen, buildTutorialSlides, renderTutorialScreen, renderMapScreen };
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

// Helper: mark every non-song flute lesson complete.
function completeFluteNotes() {
  const prog = { completed: {}, xp: 0, mastery: {}, skills: {} };
  flute.lessons.forEach(l => {
    if (!l.type || l.type === 'review') prog.completed[l.id] = { stars: 3 };
  });
  api.APP.progress = { flute: prog };
  api.APP.instrumentId = 'flute';
  return prog;
}
const fluteNotes = flute.lessons.filter(l => !l.type);

// ── 17. Per-note skill tracking records accuracy and streaks ──────────────
{
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  const ok = api.recordSkill('flute', 'fl-1', true);
  check(ok.correct === 1 && ok.wrong === 0 && ok.streak === 1, 'recordSkill logs a correct answer');
  const miss = api.recordSkill('flute', 'fl-1', false);
  check(miss.correct === 1 && miss.wrong === 1 && miss.streak === 0, 'recordSkill logs a miss and resets the streak');
  check(api.getSkill('flute', 'fl-2').correct === 0, 'getSkill initialises unseen notes');
}

// ── 18. Weakness favours low accuracy and long-overdue notes ──────────────
{
  const prog = { completed: {}, xp: 0, mastery: {}, skills: {} };
  api.APP.progress = { flute: prog };
  api.APP.instrumentId = 'flute';
  const now = Date.parse('2026-03-01T10:00:00');
  prog.skills[fluteNotes[0].id] = { correct: 0, wrong: 5, lastSeen: now };
  prog.skills[fluteNotes[1].id] = { correct: 5, wrong: 0, lastSeen: now };
  prog.skills[fluteNotes[2].id] = { correct: 5, wrong: 0, lastSeen: now - 30 * 86400000 };
  check(
    api.noteWeakness('flute', fluteNotes[0].id, now) > api.noteWeakness('flute', fluteNotes[1].id, now),
    'a low-accuracy note scores weaker than an accurate one'
  );
  check(
    api.noteWeakness('flute', fluteNotes[2].id, now) > api.noteWeakness('flute', fluteNotes[1].id, now),
    'a long-unseen note scores weaker than a fresh one'
  );
}

// ── 19. Generated plan prioritises the weakest note, then a sprint and song
{
  const prog = completeFluteNotes();
  const now = Date.parse('2026-03-01T10:00:00');
  prog.skills[fluteNotes[0].id] = { correct: 0, wrong: 5, lastSeen: now };
  fluteNotes.slice(1).forEach(n => { prog.skills[n.id] = { correct: 9, wrong: 0, lastSeen: now }; });
  const plan = api.generatePlan('flute', now);
  check(plan.items[0].type === 'note' && plan.items[0].targetId === fluteNotes[0].id, 'plan starts with the weakest note');
  check(plan.items.some(i => i.type === 'sprint'), 'plan includes a sprint');
  check(plan.items.some(i => i.type === 'song'), 'plan includes an unlocked song');
}

// ── 20. Today's plan persists, then regenerates on a new day ──────────────
{
  completeFluteNotes();
  const day1 = Date.parse('2026-03-01T10:00:00');
  const p1 = api.getTodayPlan('flute', day1);
  p1.items[0].done = true;
  const p2 = api.getTodayPlan('flute', day1);
  check(p2.items[0].done === true, 'plan progress persists within the same day');
  const day2 = Date.parse('2026-03-02T10:00:00');
  const p3 = api.getTodayPlan('flute', day2);
  check(p3.items.every(i => !i.done), 'a fresh plan is generated on a new day');
  check(p3.date === api.todayKey(new Date(day2)), 'the regenerated plan is dated for the new day');
}

// ── 21. Completing every plan item awards bonus XP and the badge once ─────
{
  completeFluteNotes();
  api.APP.motivation = { days: {}, badges: {} };
  const plan = api.getTodayPlan('flute');
  plan.items.forEach(it => {
    if (it.type === 'sprint') api.markPlanItemDone('flute', 'sprint', it.mode);
    else api.markPlanItemDone('flute', it.type, it.targetId);
  });
  check(api.isPlanComplete('flute'), 'the plan reads complete once all items are done');
  check(api.APP.progress.flute.xp >= 20, 'completing the plan awards bonus XP');
  check(api.hasBadge('plan-complete'), 'completing the plan earns the Planner badge');
  const xpAfter = api.APP.progress.flute.xp;
  api.markPlanItemDone('flute', 'note', plan.items[0].targetId);
  check(api.APP.progress.flute.xp === xpAfter, 'the plan bonus is only awarded once');
}

// ── 22. The plan card renders items with start controls ──────────────────
{
  completeFluteNotes();
  const html = api.renderPlanCard('flute');
  check(html.includes('Today') && html.includes('plan-item'), 'plan card renders a headed item list');
  check(html.includes('data-action="plan-start"'), 'plan card offers a start control');
}

// ── 23. Accuracy is null until a note is attempted ────────────────────────
{
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  check(api.getNoteAccuracy('flute', 'fl-1').accuracy === null, 'accuracy is null with no attempts');
  api.recordSkill('flute', 'fl-1', true);
  api.recordSkill('flute', 'fl-1', false);
  const acc = api.getNoteAccuracy('flute', 'fl-1');
  check(acc.attempts === 2 && acc.accuracy === 0.5, 'accuracy reflects correct over attempts');
}

// ── 24. Weakest-notes list is ordered by weakness ─────────────────────────
{
  const prog = completeFluteNotes();
  const now = Date.now();
  prog.skills[fluteNotes[0].id] = { correct: 0, wrong: 6, lastSeen: now };
  fluteNotes.slice(1).forEach(n => { prog.skills[n.id] = { correct: 6, wrong: 0, lastSeen: now }; });
  const weak = api.getWeakestNotes('flute', 3);
  check(weak.length === 3, 'weakest-notes list is capped at the requested count');
  check(weak[0].lesson.id === fluteNotes[0].id, 'the weakest note is listed first');
}

// ── 25. Weighted picking favours weak notes ───────────────────────────────
{
  const prog = completeFluteNotes();
  const now = Date.now();
  const weakId = fluteNotes[0].id;
  prog.skills[weakId] = { correct: 0, wrong: 10, lastSeen: now - 30 * 86400000 };
  fluteNotes.slice(1).forEach(n => { prog.skills[n.id] = { correct: 8, wrong: 0, lastSeen: now }; });
  const pool = api.getLearnedNotes('flute');
  let weakPicked = 0;
  for (let i = 0; i < 200; i++) {
    if (api.pickWeightedNote('flute', pool).id === weakId) weakPicked++;
  }
  check(weakPicked > 80, 'a weak note is chosen far more often than strong ones');
  check(api.pickWeightedNote('flute', pool.slice(0, 1)).id === weakId, 'picking from a single-note pool is safe');
}

// ── 26. Focus-areas panel shows weak notes with accuracy ──────────────────
{
  const prog = completeFluteNotes();
  const now = Date.now();
  prog.skills[fluteNotes[0].id] = { correct: 1, wrong: 3, lastSeen: now };
  const html = api.renderWeakSpots('flute');
  check(html.includes('Focus areas'), 'focus-areas panel renders a heading');
  check(html.includes(fluteNotes[0].noteName), 'focus-areas panel names a weak note');
  check(html.includes('25%'), 'focus-areas panel shows the accuracy percentage');
}

// ── 27. Ear phrases are the right length and avoid repeats ────────────────
{
  completeFluteNotes();
  const phrase = api.buildEarPhrase('flute');
  check(phrase.length === api.earPhraseLength('flute'), 'phrase length matches the learned-note tier');
  check(phrase.every(id => api.getLearnedNotes('flute').some(l => l.id === id)), 'phrase draws only from learned notes');
  let repeats = 0;
  for (let i = 1; i < phrase.length; i++) if (phrase[i] === phrase[i - 1]) repeats++;
  check(repeats === 0, 'phrase does not repeat a note back-to-back');
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  check(api.buildEarPhrase('flute').length === 0, 'no phrase is built without two learned notes');
}

// ── 28. Grading scores each position correctly ────────────────────────────
{
  const graded = api.gradeEarResponse(['a', 'b', 'c'], ['a', 'x', 'c']);
  check(graded.length === 3 && graded[0] && !graded[1] && graded[2], 'grading flags each position');
  check(api.earScore(graded) === 2, 'score counts correct positions');
}

// ── 29. A perfect echo awards XP and the Golden Ear badge ─────────────────
{
  completeFluteNotes();
  api.APP.motivation = { days: {}, badges: {} };
  const e = api.startEarRound('flute');
  const xpBefore = api.APP.progress.flute.xp;
  e.phrase.forEach(id => api.submitEarPick('flute', id));
  check(api.APP.ear.finished === true, 'the round finishes once every slot is filled');
  check(api.earScore(api.APP.ear.graded) === e.phrase.length, 'echoing the exact phrase scores full marks');
  check(api.APP.progress.flute.xp > xpBefore, 'a completed round awards XP');
  check(api.hasBadge('golden-ear'), 'a perfect phrase earns the Golden Ear badge');
  check(api.APP.progress.flute.earBest === e.phrase.length, 'the best score is recorded');
}

// ── 30. Ear screen renders slots and a note palette ───────────────────────
{
  completeFluteNotes();
  api.startEarRound('flute');
  const html = api.renderEarScreen();
  check(html.includes('ear-slot') && html.includes('ear-key'), 'ear screen renders slots and note keys');
  check(html.includes('data-action="ear-pick"'), 'ear keys are interactive');
  check(html.includes(fluteNotes[0].noteName), 'the palette names learned notes');
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };
  const locked = api.renderEarScreen();
  check(locked.includes('unlock ear training'), 'ear screen shows a locked message with too few notes');
}

// ── 31. Tempo helpers clamp and convert sensibly ──────────────────────────
{
  check(api.clampBpm(5) === 30 && api.clampBpm(999) === 220, 'BPM clamps to the allowed range');
  check(api.clampBpm(80.6) === 81, 'BPM rounds to a whole number');
  check(api.bpmToIntervalMs(60) === 1000, '60 BPM is one beat per second');
  check(api.bpmToIntervalMs(120) === 500, '120 BPM is two beats per second');
}

// ── 32. Beats advance, wrap, and accent the downbeat ──────────────────────
{
  const m = api.createMetronome(90, 4);
  const first = api.advanceMetronome(m);
  check(first.beat === 0 && first.accent === true, 'the first beat of a bar is accented');
  api.advanceMetronome(m);
  api.advanceMetronome(m);
  const fourth = api.advanceMetronome(m);
  check(fourth.beat === 3 && fourth.accent === false, 'beats count up within the bar');
  const wrap = api.advanceMetronome(m);
  check(wrap.beat === 0 && wrap.accent === true, 'the bar wraps back to an accented downbeat');
}

// ── 33. Tap tempo averages recent taps ────────────────────────────────────
{
  check(api.tapTempo([1000]) === null, 'tap tempo needs at least two taps');
  check(api.tapTempo([0, 500, 1000, 1500]) === 120, 'even 500ms taps give 120 BPM');
}

// ── 33b. Subdivisions, presets, count-in, volume and sound ────────────────
{
  check(api.bpmToTickMs(120, 1) === 500, 'no subdivision ticks at the beat rate');
  check(api.bpmToTickMs(120, 2) === 250, 'eighths tick twice per beat');
  check(api.bpmToTickMs(120, 4) === 125, 'sixteenths tick four times per beat');
  check(api.bpmToTickMs(120, 3) === 167, 'triplets round to the nearest millisecond');

  const m = api.createMetronome(120, 4);
  m.subdivision = 2;
  const t1 = api.metronomeTick(m);
  const t2 = api.metronomeTick(m);
  const t3 = api.metronomeTick(m);
  check(t1.beat === 0 && t1.isBeat === true && t1.accent === true, 'the first tick is an accented downbeat');
  check(t2.beat === 0 && t2.isBeat === false && t2.sub === 1 && t2.accent === false, 'the subdivision between beats does not accent');
  check(t3.beat === 1 && t3.isBeat === true, 'the next beat follows the subdivision');

  const trip = api.createMetronome(120, 2);
  trip.subdivision = 3;
  api.metronomeTick(trip);
  api.metronomeTick(trip);
  const tripThird = api.metronomeTick(trip);
  const tripNext = api.metronomeTick(trip);
  check(tripThird.beat === 0 && tripThird.isBeat === false && tripThird.sub === 2, 'triplets place two subdivisions between beats');
  check(tripNext.beat === 1 && tripNext.isBeat === true, 'the following beat lands after a triplet');

  const vol = api.metronomeClickOpts(m, false).volume;
  const subVol = api.metronomeClickOpts(m, true).volume;
  check(Math.abs(vol - api.METRONOME_DEFAULT_VOLUME) < 1e-9, 'beat clicks carry the set volume');
  check(subVol < vol && subVol > 0, 'subdivisions click softer than the beat');
  const loud = api.createMetronome();
  loud.volume = 1; loud.sound = 'wood';
  check(api.metronomeClickOpts(loud).sound === 'wood' && api.metronomeClickOpts(loud).volume === 1, 'sound choice and full volume pass through');

  const d = api.createMetronome();
  check(d.subdivision === 1 && d.countIn === false && d.sound === 'click', 'metronome starts on plain beats with no count-in');
  check(d.volume === api.METRONOME_DEFAULT_VOLUME && d.countInLeft === 0, 'default volume is applied and count-in is idle');
  check(api.METRONOME_SUBDIVISIONS.map(s => s.value).join(',') === '1,2,3,4', 'four subdivision choices are offered');
  check(api.TEMPO_PRESETS.map(p => p.bpm).join(',') === '60,80,100,120,160', 'tempo presets run slow to fast');
  check(api.METRONOME_SOUNDS.map(s => s.value).join(',') === 'click,wood,beep', 'three click sounds are offered');
}

// ── 34. Pitch detection finds a known sine frequency ──────────────────────
{
  const sampleRate = 44100;
  const n = 2048;
  function sine(freq) {
    const b = new Float32Array(n);
    for (let i = 0; i < n; i++) b[i] = 0.6 * Math.sin(2 * Math.PI * freq * i / sampleRate);
    return b;
  }
  const a4 = api.detectPitch(sine(440), sampleRate);
  check(Math.abs(a4 - 440) < 15, 'detects A4 near 440 Hz');
  const d4 = api.detectPitch(sine(293.66), sampleRate);
  check(Math.abs(d4 - 293.66) < 15, 'detects D4 near 293.66 Hz');
  const silence = new Float32Array(n);
  check(api.detectPitch(silence, sampleRate) === -1, 'silence yields no pitch');
}

// ── 35. Frequency maps to the nearest note and cents ──────────────────────
{
  const notes = api.getNoteLessons('flute');
  const exact = api.freqToNoteInfo(261.63, notes);
  check(exact.note.id === 'fl-1' && Math.abs(exact.cents) < 1, 'an exact frequency maps to its note, in tune');
  const sharp = api.freqToNoteInfo(261.63 * Math.pow(2, 10 / 1200), notes);
  check(sharp.note.id === 'fl-1' && Math.abs(sharp.cents - 10) < 1, 'a sharp frequency reports positive cents');
  check(api.centsLabel(0) === 'in tune', 'near-zero cents reads as in tune');
  check(api.centsLabel(12) === '+12 cents sharp', 'positive cents label as sharp');
  check(api.centsLabel(-18) === '-18 cents flat', 'negative cents label as flat');
}

// ── 36. Metronome and tuner panels render their controls ──────────────────
{
  api.APP.metronome = null;
  const metro = api.renderMetronomePanel();
  check(metro.includes('BPM') && metro.includes('80'), 'metronome panel shows the tempo');
  check(metro.includes('data-action="metronome-toggle"') && metro.includes('data-action="metronome-tap"'), 'metronome panel has play and tap controls');
  check(metro.includes('id="tool-preset"') && metro.includes('id="tool-timesig"'), 'metronome panel has preset and time-signature selects');
  check(metro.includes('id="tool-subdivision"') && metro.includes('id="tool-sound"'), 'metronome panel has subdivision and sound selects');
  check(metro.includes('data-action="metronome-countin"') && metro.includes('id="metronome-volume"'), 'metronome panel has count-in and volume controls');
  api.APP.instrumentId = 'flute';
  api.APP.tuner = null;
  const tuner = api.renderTunerPanel();
  check(tuner.includes('data-action="tuner-toggle"'), 'tuner panel shows a listening control');

  const widget = api.renderToolWidget();
  check(typeof widget === 'undefined', 'renderToolWidget tolerates a missing host');
}


// ── 37–40. Teacher / parent practice report ───────────────────────────────
{
  const savedProgress = JSON.parse(JSON.stringify(api.APP.progress));
  const savedMotivation = JSON.parse(JSON.stringify(api.APP.motivation));
  api.APP.progress = {
    flute: {
      completed: { 'fl-1': { stars: 3 }, 'fl-2': { stars: 1 } },
      xp: 120,
      mastery: { 'fl-1': 7, 'fl-2': 3 },
      skills: {
        'fl-1': { correct: 9, wrong: 1, streak: 3, lastSeen: Date.now() },
        'fl-2': { correct: 2, wrong: 8, streak: 0, lastSeen: Date.now() },
      },
    },
  };
  api.APP.motivation = { days: { [api.todayKey()]: 600 }, badges: { 'first-steps': 'x' } };

  // 37. A single-instrument report summarizes notes, XP and focus.
  const ir = api.getInstrumentReport('flute');
  check(ir.notesLearned === 2 && ir.xp === 120, 'instrument report counts learned notes and XP');
  check(ir.notesTotal > 2 && ir.songsTotal >= 1, 'instrument report knows the totals');
  check(ir.mastery.mastered === 1 && ir.mastery.practiced === 1, 'mastery buckets use quiz counts');
  check(ir.weak.length >= 1 && ir.weak[0].name === 'D' && ir.weak[0].accuracy === 20, 'the weakest note is surfaced first');

  // 38. The whole report aggregates time, level and badges.
  const rep = api.buildPracticeReport('Test');
  check(rep.student === 'Test' && rep.totalMinutes === 10, 'report totals practice minutes');
  check(rep.xp === 120 && rep.level === 2, 'report reports XP and level');
  check(rep.notesLearned === 2, 'report sums learned notes');
  check(rep.badges.length === 1 && rep.badgeTotal === api.BADGES.length, 'report lists earned badges');

  // 39. The copyable text version is plain, readable English.
  const text = api.formatReportText(rep);
  check(text.includes('Practice report — Test'), 'text report has a title');
  check(text.includes('10 min practiced'), 'text report shows minutes');
  check(text.includes('2/' + rep.instruments[0].notesTotal + ' notes'), 'text report lists instrument progress');
  check(text.includes('Focus: D (20%)'), 'text report names the focus note');

  // 40. The report screen renders and the select screen links to it.
  const html = api.renderReportScreen();
  check(html.includes('Practice report') && html.includes('Test'), 'report screen shows the student');
  check(html.includes('data-action="copy-report"') && html.includes('data-action="print-report"'), 'report screen has share actions');
  check(html.includes('data-action="close-report"') && html.includes('Flute'), 'report screen lists instruments and can go back');
  check(api.renderSelectScreen().includes('data-action="open-report"'), 'select screen offers the report');

  api.APP.progress = savedProgress;
  api.APP.motivation = savedMotivation;
}

// ── 41–44. Auto-generated weekly digest ───────────────────────────────────
{
  const savedProgress = JSON.parse(JSON.stringify(api.APP.progress));
  const savedMotivation = JSON.parse(JSON.stringify(api.APP.motivation));
  const now = new Date('2024-03-06T12:00:00'); // a Wednesday
  api.APP.progress = { flute: { completed: {}, xp: 40, mastery: {} } };
  api.APP.motivation = {
    days: { '2024-03-04': 120, '2024-03-06': 600, '2024-03-07': 60 },
    badges: { 'first-steps': '2024-03-05T10:00:00Z', 'first-song': '2023-01-01T00:00:00Z' },
  };

  // 41. The week runs Monday to Sunday.
  const start = api.getWeekStart(now);
  check(start.getDay() === 1, 'the week starts on Monday');
  check(api.getWeekKey(now) === '2024-03-04', 'the week key is the Monday date');
  const days = api.getWeekDays(now);
  check(days.length === 7 && days[0].label === 'Mon' && days[6].label === 'Sun', 'seven labelled days, Mon–Sun');
  check(days[0].key === '2024-03-04' && days[6].key === '2024-03-10', 'the week spans Monday to Sunday');

  // 42. The digest aggregates the stored day history.
  const d = api.buildWeeklyDigest('Test', now);
  check(d.weekKey === '2024-03-04' && d.totalMinutes === 13, 'digest totals the week minutes');
  check(d.activeDays === 3, 'digest counts active days');
  check(d.bestDayLabel === 'Wed' && d.bestDayMinutes === 10, 'digest finds the best day');
  check(d.headline.includes('3 days'), 'digest writes a headline for the week');
  check(d.badges.length === 1 && d.badges[0].id === 'first-steps', 'digest lists only badges earned this week');

  // 43. The recap text is plain, readable English.
  const text = api.formatDigestText(d);
  check(text.includes('This week in music — Test'), 'digest text has a title');
  check(text.includes('13 min across 3 days'), 'digest text summarizes minutes and days');
  check(text.includes('Best day: Wed (10 min)'), 'digest text names the best day');
  check(text.includes('Daily: Mon 2') && text.includes('Wed 10'), 'digest text shows the daily values');
  check(text.includes('First Steps'), 'digest text lists new badges');

  // 44. The card and screen render, and opening marks the week seen.
  const card = api.renderDigestCard('Test', now);
  check(card.includes('This week in music') && card.includes('data-action="open-digest"'), 'select card links to the digest');
  check(card.includes('13 min') && card.includes('digest-new'), 'the card shows minutes and a New pill');
  check(card.includes('data-action="dismiss-digest"'), 'the card offers a dismiss button');
  api.APP.digestDismissed = false;
  api.handleAction('dismiss-digest');
  check(api.APP.digestDismissed === true, 'dismissing the card records the choice');
  check(api.renderDigestCard('Test', now) === '', 'the card is hidden once dismissed');
  api.APP.digestDismissed = false;
  const screen = api.renderDigestScreen(now);
  check(screen.includes('Weekly digest') && screen.includes('data-action="close-digest"'), 'digest screen renders with a back button');
  check(screen.includes('data-action="copy-digest"') && screen.includes('data-action="print-digest"'), 'digest screen has share actions');
  check(screen.includes('Active days'), 'digest screen shows activity stats');
  api.APP.motivation.digestSeen = '2024-03-04';
  check(!api.renderDigestCard('Test', now).includes('digest-new'), 'a seen digest drops the New pill');
  api.APP.motivation.digestSeen = undefined;
  api.APP.screen = 'select';
  api.handleAction('open-digest');
  check(api.APP.motivation.digestSeen === api.getWeekKey(), 'opening the digest marks this week seen');
  api.APP.screen = 'select';

  api.APP.progress = savedProgress;
  api.APP.motivation = savedMotivation;
}

// ── 45. Weekly goal progress and the once-a-week reminder ─────────────────
{
  const savedMotivation = JSON.parse(JSON.stringify(api.APP.motivation));
  const now = new Date('2024-03-06T12:00:00');
  api.APP.motivation = { days: { '2024-03-04': 120, '2024-03-06': 600, '2024-03-07': 60 }, badges: {} };

  check(api.getWeeklyGoalMinutes() === 60 && api.DEFAULT_WEEKLY_GOAL === 60, 'weekly goal defaults to 60 minutes');
  check(api.setWeeklyGoalMinutes(5) === 10, 'goal clamps to a sensible minimum');
  check(api.setWeeklyGoalMinutes(9999) === 600, 'goal clamps to a sensible maximum');
  api.setWeeklyGoalMinutes(60);

  const d = api.buildWeeklyDigest('Test', now);
  check(d.goalMinutes === 60 && d.totalMinutes === 13, 'digest carries the goal and the week total');
  check(d.goalMet === false && d.goalRemaining === 47, 'an unfinished goal reports the minutes remaining');
  check(d.goalPct === 22, 'goal progress is a percentage of the target');

  api.setWeeklyGoalMinutes(10);
  const hit = api.buildWeeklyDigest('Test', now);
  check(hit.goalMet === true && hit.goalRemaining === 0 && hit.goalPct === 100, 'a met goal caps at 100% and reports success');

  const screen = api.renderDigestScreen(now);
  check(screen.includes('Weekly goal') && screen.includes('data-action="set-weekly-goal"'), 'digest screen offers goal controls');
  check(screen.includes('data-goal="120"'), 'goal options are selectable');
  check(api.renderDigestCard('Test', now).includes('min goal'), 'the select card shows goal progress');

  api.setWeeklyGoalMinutes(60);
  api.APP.motivation.digestSeen = undefined;
  api.APP.motivation.digestReminded = undefined;
  check(api.shouldRemindDigest(now) === true, 'an unseen active week wants a reminder');
  check(api.maybeRemindDigest(now) === true, 'the weekly reminder fires');
  check(api.shouldRemindDigest(now) === false, 'the reminder does not fire twice');
  api.APP.motivation.digestSeen = '2024-03-04';
  check(api.shouldRemindDigest(now) === false, 'a week already seen needs no reminder');

  api.APP.motivation = savedMotivation;
}

// ── 46. Reaching the weekly goal unlocks a badge ──────────────────────────
{
  const savedProgress = JSON.parse(JSON.stringify(api.APP.progress));
  const savedMotivation = JSON.parse(JSON.stringify(api.APP.motivation));
  const today = api.todayKey();
  api.APP.progress = { flute: { completed: {}, xp: 0, mastery: {} } };

  api.APP.motivation = { days: { [today]: 20 * 60 }, badges: {} };
  api.setWeeklyGoalMinutes(15);
  const won = api.evaluateBadges();
  check(won.some(b => b.id === 'goal-getter'), 'meeting the weekly goal unlocks Goal Getter');
  check(api.hasBadge('goal-getter'), 'the Goal Getter badge is recorded');

  api.APP.motivation = { days: { [today]: 5 * 60 }, badges: {} };
  api.setWeeklyGoalMinutes(30);
  const none = api.evaluateBadges();
  check(!none.some(b => b.id === 'goal-getter'), 'falling short of the goal awards no badge');

  api.APP.progress = savedProgress;
  api.APP.motivation = savedMotivation;
}

// ── 50. Theme preference defaults to light and toggles ───────────────────
{
  const saved = store['preludeBandTheme'];
  delete store['preludeBandTheme'];
  check(api.getTheme() === 'light', 'theme defaults to light');
  api.setTheme('dark');
  check(store['preludeBandTheme'] === 'dark', 'setTheme persists the choice');
  check(api.getTheme() === 'dark', 'getTheme reads the saved choice');
  api.toggleTheme();
  check(api.getTheme() === 'light', 'toggleTheme flips dark back to light');
  api.toggleTheme();
  check(api.getTheme() === 'dark', 'toggleTheme flips light to dark');

  api.APP.screen = 'select';
  api.setTheme('light');
  api.handleAction('toggle-theme', { dataset: {} });
  check(api.getTheme() === 'dark', 'the toggle-theme action flips the theme');

  // Instrument accents resolve to theme variables, not baked hex
  const fluteAccent = api.instAccent(flute);
  check(fluteAccent === 'var(--accent-flute)', 'instrument accent resolves to a CSS variable');
  check(!/#/.test(fluteAccent), 'accent is not a hard-coded hex');

  const staff = api.Graphics.staffSVG({ pos: 0, clef: 'treble', accentColor: api.instAccent(flute), width: 96 });
  check(staff.includes('var(--dg-ink)'), 'staff ink uses a theme variable');
  check(staff.includes('var(--dg-open)'), 'notehead halo uses a theme variable');

  const fing = api.Graphics.fingeringSVG('flute', flute.lessons.find(l => !l.type).fingeringState, api.instAccent(flute), 84);
  check(fing.includes('var(--dg-housing)'), 'instrument body uses the theme housing variable');
  check(!/#[0-9A-Fa-f]{6}/.test(fing), 'fingering SVG has no baked hex colors');

  api.getMotivation();
  check(api.renderSelectScreen().includes('data-action="toggle-theme"'),
    'the home screen exposes a theme toggle');

  if (saved === undefined) delete store['preludeBandTheme']; else store['preludeBandTheme'] = saved;
}

(async () => {
  // ── 47. The record control only appears when the mic API exists ─────────
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

  // ── 48. Recording round-trip: start then stop yields a playable take ────
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

  // ── 49. Cleaning up a recording revokes its object URL ──────────────────
  {
    revoked = [];
    api.cleanupRecording();
    check(api.APP.recordingUrl === null, 'cleanup clears the recording URL');
    check(revoked.includes('blob:fake'), 'cleanup revokes the object URL');
  }

  // ── 50. The home screen focuses on a single instrument once chosen ──────
  {
    const saved = store['preludeBandInstrument'];
    const savedTutorials = store['preludeBandTutorials'];
    delete store['preludeBandInstrument'];
    store['preludeBandTutorials'] = JSON.stringify(['flute']);
    api.APP.pickingInstrument = false;

    const picker = api.renderSelectScreen();
    check(picker.includes('instrument-grid'), 'home shows every instrument before one is chosen');
    check(!picker.includes('focus-card'), 'no focus card before an instrument is chosen');

    api.handleAction('select-instrument', { dataset: { id: 'flute' } });
    check(api.getSavedInstrument() === 'flute', 'opening an instrument remembers it');
    check(api.APP.screen === 'map', 'opening an instrument goes to its lesson map');

    api.APP.screen = 'select';
    api.APP.pickingInstrument = false;
    const home = api.renderSelectScreen();
    check(home.includes('focus-card') && home.includes('data-id="flute"'),
      'home focuses on the chosen instrument');
    check(!home.includes('instrument-grid'), 'the full instrument grid is hidden in the focused view');
    check(home.includes('data-action="switch-instrument"'), 'the focused view offers a switch control');

    if (saved === undefined) delete store['preludeBandInstrument']; else store['preludeBandInstrument'] = saved;
    if (savedTutorials === undefined) delete store['preludeBandTutorials']; else store['preludeBandTutorials'] = savedTutorials;
  }

  // ── 51. Switching instruments reveals the picker with a way back ────────
  {
    const saved = store['preludeBandInstrument'];
    store['preludeBandInstrument'] = 'trumpet';
    api.APP.pickingInstrument = false;

    api.handleAction('switch-instrument', { dataset: {} });
    check(api.APP.pickingInstrument === true, 'switch-instrument enters picking mode');
    const picker = api.renderSelectScreen();
    check(picker.includes('instrument-grid'), 'picking mode shows every instrument');
    check(picker.includes('data-action="cancel-instrument-pick"'), 'picking mode offers a way back');

    api.handleAction('cancel-instrument-pick', { dataset: {} });
    check(api.APP.pickingInstrument === false, 'cancelling returns to the focused view');
    check(api.renderSelectScreen().includes('focus-card'), 'the focused view is restored after cancel');

    if (saved === undefined) delete store['preludeBandInstrument']; else store['preludeBandInstrument'] = saved;
  }

  // ── 52. Fingering-chart abbreviations open an explainer ─────────────────
  {
    check(api.FINGERING_HELP.TH && api.FINGERING_HELP.TH.label.toLowerCase().includes('thumb'),
      'TH is explained as the thumb key');
    check(!!api.FINGERING_HELP.R && !!api.FINGERING_HELP.L,
      'register and little-finger keys each have an explanation');

    api.APP.fingeringHelp = null;
    api.handleAction('fingering-key', { dataset: { key: 'TH' } });
    check(api.APP.fingeringHelp === 'TH', 'tapping a labelled key opens its explanation');

    api.handleAction('close-fingering-help', { dataset: {} });
    check(api.APP.fingeringHelp === null, 'the explainer can be dismissed');
  }

  // ── 53. The app tour opens the first time an instrument is chosen ───────
  {
    const savedInst = store['preludeBandInstrument'];
    const savedTut = store['preludeBandTutorials'];
    delete store['preludeBandInstrument'];
    delete store['preludeBandTutorials'];
    api.APP.pickingInstrument = false;

    const slides = api.buildTutorialSlides(api.CURRICULUM.flute);
    check(slides.length >= 4, 'the tour has several slides');
    check(slides.every(s => s.title && s.body), 'every tour slide has a title and body');
    check(api.renderTutorialScreen().includes('tutorial-dot'), 'the tour renders progress dots');

    api.handleAction('select-instrument', { dataset: { id: 'flute' } });
    check(api.APP.screen === 'tutorial', 'first time on an instrument opens the tour');
    check(api.getTutorialSeen('flute') === false, 'the tour is only marked seen once finished');

    for (let n = 0; n < slides.length + 1; n++) api.handleAction('tutorial-next', { dataset: {} });
    check(api.APP.screen === 'map', 'finishing the tour drops into the lesson map');
    check(api.getTutorialSeen('flute') === true, 'finishing the tour records it as seen');

    if (savedInst === undefined) delete store['preludeBandInstrument']; else store['preludeBandInstrument'] = savedInst;
    if (savedTut === undefined) delete store['preludeBandTutorials']; else store['preludeBandTutorials'] = savedTut;
  }

  // ── 54. A seen instrument skips the tour, which can be replayed ─────────
  {
    const savedInst = store['preludeBandInstrument'];
    const savedTut = store['preludeBandTutorials'];
    store['preludeBandTutorials'] = JSON.stringify(['trumpet']);

    api.handleAction('select-instrument', { dataset: { id: 'trumpet' } });
    check(api.APP.screen === 'map', 'a seen instrument skips straight to the map');
    check(api.renderMapScreen().includes('data-action="open-tutorial"'),
      'the lesson map offers to replay the tour');

    api.handleAction('open-tutorial', { dataset: {} });
    check(api.APP.screen === 'tutorial' && api.APP.tutorialIndex === 0, 'the map can replay the tour');

    api.handleAction('tutorial-back', { dataset: {} });
    check(api.APP.tutorialIndex === 0, 'back stays on the first slide');

    api.handleAction('tutorial-finish', { dataset: {} });
    check(api.APP.screen === 'map', 'finishing a replay returns to the map');

    if (savedInst === undefined) delete store['preludeBandInstrument']; else store['preludeBandInstrument'] = savedInst;
    if (savedTut === undefined) delete store['preludeBandTutorials']; else store['preludeBandTutorials'] = savedTut;
  }

// ── 55. Floating metronome/tuner widget works from every screen ───────────
{
  const savedInst = store['preludeBandInstrument'];
  api.APP.instrumentId = 'flute';
  store['preludeBandInstrument'] = 'flute';

  api.APP.screen = 'map';
  check(api.APP.toolsOpen === false, 'the widget starts collapsed');

  api.handleAction('toggle-tools', { dataset: {} });
  check(api.APP.toolsOpen === true, 'tapping the launcher opens the widget');

  api.handleAction('tools-tab', { dataset: { tab: 'tuner' } });
  check(api.APP.toolTab === 'tuner', 'the tuner tab can be selected');
  check(api.APP.toolsOpen === true, 'selecting a tab keeps the widget open');

  api.handleAction('close-tools', { dataset: {} });
  check(api.APP.toolsOpen === false, 'closing collapses the widget');

  if (savedInst === undefined) delete store['preludeBandInstrument']; else store['preludeBandInstrument'] = savedInst;
}

  if (failures.length) console.log(failures.join('\n'));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
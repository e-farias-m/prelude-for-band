// app.js
// Application state machine and rendering for Prelude for Band.
// Single delegated click listener drives all interaction via data-action.

const APP = {
  screen: 'select',
  instrumentId: null,
  lessonIndex: 0,
  phase: 'present',
  quiz: null,
  play: { running: false, hasPlayed: false },
  progress: {},
  // Review session state
  reviewQueue: null,
  reviewIndex: 0,
  reviewCorrect: 0,
  reviewTotal: 0,
  // Song session state
  songNoteIndex: 0,
  importedSong: null,
  // Imported song list
  importedSongs: null,
  // Audio playback state
  audioPlaybackTimeouts: [],
  audioPlaybackAudio: null,
};

const STORAGE_KEY = 'preludeBandProgress';
const NAME_KEY = 'preludeBandName';

function getStudentName() { return localStorage.getItem(NAME_KEY) || ''; }
function setStudentName(name) { localStorage.setItem(NAME_KEY, name); }

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ── QUIZ TYPES ────────────────────────────────────────────────────────────
const QUIZ_TYPES = {
  FINGERING_TO_NOTE: 'fingering-to-note',   // See fingering, pick note name
  NOTE_TO_FINGERING: 'note-to-fingering',   // See note name, pick fingering
  STAFF_TO_NOTE: 'staff-to-note',           // See note on staff, pick note name
  NOTE_TO_STAFF: 'note-to-staff',           // See note name, pick staff position
};

// ── MASTERY LEVELS ────────────────────────────────────────────────────────
function getMasteryLevel(correctCount) {
  if (correctCount >= 6) return 'mastered';
  if (correctCount >= 3) return 'practiced';
  if (correctCount >= 1) return 'learning';
  return 'new';
}

function getMasteryColor(level) {
  return { new: '#524F70', learning: '#FF8C42', practiced: '#8B7BFF', mastered: '#4FD98A' }[level] || '#524F70';
}

function getMasteryLabel(level) {
  return { new: 'New', learning: 'Learning', practiced: 'Practiced', mastered: 'Mastered' }[level] || 'New';
}

// ── PROGRESS PERSISTENCE ───────────────────────────────────────────────────
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    APP.progress = raw ? JSON.parse(raw) : {};
  } catch (e) {
    APP.progress = {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(APP.progress));
  } catch (e) { /* storage unavailable — fail silently */ }
}

function getInstrumentProgress(instrumentId) {
  if (!APP.progress[instrumentId]) {
    APP.progress[instrumentId] = { completed: {}, xp: 0, mastery: {} };
  }
  if (!APP.progress[instrumentId].mastery) {
    APP.progress[instrumentId].mastery = {};
  }
  return APP.progress[instrumentId];
}

function getNoteMastery(instrumentId, noteId) {
  const prog = getInstrumentProgress(instrumentId);
  return prog.mastery[noteId] || 0;
}

function addNoteMastery(instrumentId, noteId, amount = 1) {
  const prog = getInstrumentProgress(instrumentId);
  prog.mastery[noteId] = (prog.mastery[noteId] || 0) + amount;
  saveProgress();
}

function getLearnedNotes(instrumentId) {
  const inst = getInstrument(instrumentId);
  const prog = getInstrumentProgress(instrumentId);
  return inst.lessons.filter(l => prog.completed[l.id] && !isReviewLesson(l) && !isSongLesson(l));
}

function getNewestNote(instrumentId) {
  const learned = getLearnedNotes(instrumentId);
  return learned.length > 0 ? learned[learned.length - 1] : null;
}

function isReviewLesson(lesson) {
  return lesson && lesson.type === 'review';
}

function isSongLesson(lesson) {
  return lesson && lesson.type === 'song';
}

function isLessonUnlocked(instrumentId, index) {
  const instrument = CURRICULUM[instrumentId];
  const lesson = instrument.lessons[index];
  if (!lesson) return false;
  if (isReviewLesson(lesson)) {
    const prog = getInstrumentProgress(instrumentId);
    return lesson.reviewLessonIds.every(id => !!prog.completed[id]);
  }
  if (isSongLesson(lesson) && lesson.prerequisiteIds) {
    const prog = getInstrumentProgress(instrumentId);
    return lesson.prerequisiteIds.every(id => !!prog.completed[id]);
  }
  if (index === 0) return true;
  const prevId = instrument.lessons[index - 1].id;
  const prog = getInstrumentProgress(instrumentId);
  return !!prog.completed[prevId];
}

// ── HELPERS ─────────────────────────────────────────────────────────────
function getInstrument(id) { return CURRICULUM[id]; }
function getLesson(instrumentId, index) {
  if (index === -1 && APP.importedSong) return APP.importedSong;
  return CURRICULUM[instrumentId].lessons[index];
}
function findLessonById(instrumentId, id) {
  return CURRICULUM[instrumentId].lessons.find(l => l.id === id);
}

function getResolvedSongNote(instrumentId, lesson) {
  if (!isSongLesson(lesson)) return null;
  const noteId = lesson.noteIds[APP.songNoteIndex];
  return findLessonById(instrumentId, noteId);
}

function getChordFrequencies(instrumentId, lesson, index) {
  if (!lesson.chordIds) return [];
  const ids = lesson.chordIds[index];
  if (!ids) return [];
  return ids.map(id => {
    const n = findLessonById(instrumentId, id);
    return n ? n.freq : null;
  }).filter(f => f != null);
}

const IMPORTED_SONGS_KEY = 'preludeBandImportedSongs';

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), 1800);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showNamePrompt() {
  const overlay = document.createElement('div');
  overlay.className = 'name-overlay';
  overlay.innerHTML = `
    <div class="name-modal">
      <div class="name-modal-icon">🎵</div>
      <div class="name-modal-title">Welcome to Prelude for Band!</div>
      <div class="name-modal-sub">What's your name?</div>
      <input type="text" class="name-input" placeholder="Your name..." maxlength="50" autocomplete="off" />
      <button class="btn btn-primary btn-wide name-submit">Start practicing</button>
    </div>`;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('.name-input');
  const submit = overlay.querySelector('.name-submit');
  input.focus();

  function submitName() {
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    setStudentName(name);
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 300);
  }

  submit.addEventListener('click', submitName);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });
}

// ── RENDER: SELECT SCREEN ──────────────────────────────────────────────────
function renderSelectScreen() {
  const cards = INSTRUMENT_ORDER.map(id => {
    const inst = CURRICULUM[id];
    const icon = Graphics.instrumentIconSVG(id, 56);
    const cls = inst.available ? 'instrument-card' : 'instrument-card coming-soon';
    const badge = inst.available ? '' : `<div class="card-badge">Soon</div>`;
    return `
      <div class="${cls}" data-action="select-instrument" data-id="${id}" style="color:${inst.accentColor}">
        ${badge}
        <div class="card-icon">${icon}</div>
        <div class="card-name" style="color: var(--text-primary)">${inst.shortName}</div>
      </div>`;
  }).join('');

  const studentName = getStudentName();

  return `
    <div class="screen active select-screen">
      <div class="select-hero">
        <div class="wordmark">
          <svg class="wordmark-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="10" cy="24" rx="6" ry="4.5" fill="#FF8C42" transform="rotate(-20 10 24)"/>
            <line x1="15" y1="22" x2="15" y2="5" stroke="#FF8C42" stroke-width="2.4"/>
            <path d="M15 5 Q24 6 24 14" stroke="#FF8C42" stroke-width="2.4" fill="none"/>
          </svg>
          <span class="wordmark-text">Prelude <span>for Band</span></span>
        </div>
        <div class="select-headline">First notes, first wins.</div>
        <div class="select-sub">Pick an instrument to start your very first lessons — fingerings, notes, and your first sounds.</div>
      </div>
      <div class="select-hero-settings">
        ${studentName ? `<span class="select-student-name">${escapeHtml(studentName)}</span>` : ''}
        <button class="btn-icon settings-gear" data-action="open-settings" title="Settings" style="background:none;border:none;cursor:pointer;font-size:18px;vertical-align:middle;">⚙️</button>
      </div>
      <div class="instrument-grid">${cards}</div>
      <div class="version-badge" style="cursor:pointer">v2.0.0</div>
    </div>`;
}

// ── RENDER: SETTINGS SCREEN ────────────────────────────────────────────────
function renderSettingsScreen() {
  const name = getStudentName();
  return `
    <div class="screen active settings-screen">
      <div class="settings-header">
        <button class="btn-icon" data-action="close-settings" style="background:none;border:none;cursor:pointer;font-size:24px;">←</button>
        <h2>Settings</h2>
      </div>
      <div class="settings-body">
        <div class="settings-section">
          <label class="settings-label">Student name</label>
          <div class="settings-row">
            <input type="text" id="settings-name-input" class="settings-input" value="${escapeHtml(name)}" maxlength="50" autocomplete="off" />
            <button class="btn btn-primary" data-action="save-settings-name">Save</button>
          </div>
        </div>
        <div class="settings-section">
          <label class="settings-label">Reset progress</label>
          <p class="settings-desc">Clear all lesson progress and XP for all instruments. This cannot be undone.</p>
          <button class="btn btn-danger" data-action="reset-progress">Reset all progress</button>
        </div>
      </div>
    </div>`;
}

// ── RENDER: MAP SCREEN ─────────────────────────────────────────────────────
function renderMapScreen() {
  const inst = getInstrument(APP.instrumentId);
  const prog = getInstrumentProgress(APP.instrumentId);
  const allImported = JSON.parse(localStorage.getItem(IMPORTED_SONGS_KEY) || '{}');
  const instImported = (allImported[APP.instrumentId] || []).filter(s => s && s.noteIds);
  const total = inst.lessons.length + instImported.length;
  const doneCount = inst.lessons.filter(l => prog.completed[l.id]).length + instImported.filter(s => prog.completed[s.id]).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const nodes = inst.lessons.map((lesson, i) => {
    const unlocked = isLessonUnlocked(APP.instrumentId, i);
    const completed = !!prog.completed[lesson.id];
    const isReview = isReviewLesson(lesson);

    let stateCls = 'locked';
    let inner = `<span class="map-node-lock">🔒</span>`;
    let masteryHtml = '';
    let label = lesson.noteName;

    if (isReview && unlocked && completed) {
      stateCls = 'review-done';
      inner = `<span class="map-node-icon">⟳</span>`;
    } else if (isReview && unlocked && !completed) {
      stateCls = 'review-available';
      inner = `<span class="map-node-icon">⟳</span>`;
    } else if (completed) {
      stateCls = 'done';
      const stars = prog.completed[lesson.id].stars;
      const mastery = getNoteMastery(APP.instrumentId, lesson.id);
      const masteryLevel = getMasteryLevel(mastery);
      inner = `<span class="map-node-note">${lesson.noteName}</span><span class="map-node-star">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>`;
      masteryHtml = `<div class="map-node-mastery mastery-${masteryLevel}">${getMasteryLabel(masteryLevel)}</div>`;
    } else if (unlocked && !completed) {
      stateCls = 'current';
      inner = `<span class="map-node-note">${lesson.noteName}</span>`;
    } else if (unlocked) {
      stateCls = 'available';
      inner = `<span class="map-node-note">${lesson.noteName}</span>`;
    }

    const connector = i === 0 ? '' : `<div class="map-connector ${prog.completed[inst.lessons[i-1].id] ? 'done' : ''}"></div>`;
    const action = unlocked ? `data-action="open-lesson" data-index="${i}"` : `data-action="locked-node"`;

    return `
      <div class="map-node-wrap">
        ${connector}
        <div class="map-node ${stateCls}" ${action}>${inner}</div>
        <div class="map-node-label">${label}</div>
        ${masteryHtml}
      </div>`;
  }).join('');

  const importedNodes = instImported.map((s, i) => {
    const completed = !!prog.completed[s.id];
    const stateCls = completed ? 'done' : 'current';
    const stars = completed ? prog.completed[s.id].stars : 0;
    const inner = completed
      ? `<span class="map-node-note">${escapeHtml(s.noteName)}</span><span class="map-node-star">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</span>`
      : `<span class="map-node-note">${escapeHtml(s.noteName)}</span>`;
    const prevId = i === 0 ? inst.lessons[inst.lessons.length - 1]?.id : instImported[i - 1]?.id;
    const prevDone = prevId ? !!prog.completed[prevId] : false;
    const connector = inst.lessons.length > 0 || i > 0 ? `<div class="map-connector ${prevDone ? 'done' : ''}"></div>` : '';
    return `
      <div class="map-node-wrap">
        ${connector}
        <div class="map-node ${stateCls}" data-action="open-imported-song" data-imported-index="${i}">${inner}</div>
        <div class="map-node-label">${escapeHtml(s.noteName)}</div>
        <button class="btn-icon" data-action="delete-imported-song" data-imported-index="${i}" title="Delete imported song" style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--text-danger);margin-top:2px">✕ Delete</button>
      </div>`;
  }).join('');

  return `
    <div class="screen active">
      <div class="app-header">
        <button class="header-back" data-action="go-select">←</button>
        <div class="header-title">${inst.shortName}</div>
        <div class="header-progress">
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
          <div class="progress-label">${doneCount}/${total}</div>
        </div>
      </div>
      <div class="map-body">
        <div class="map-unit-label">Unit 1 · First Notes</div>
        <div class="map-path">${nodes}${importedNodes}</div>
        <div class="import-section" style="margin-top:20px;text-align:center">
          <button class="btn btn-secondary" data-action="import-song">+ Import Song</button>
          <input type="file" id="import-file-input" accept=".xml,.musicxml" style="display:none"/>
        </div>
      </div>
    </div>`;
}

// ── RENDER: LESSON SCREEN ───────────────────────────────────────────────────
function phasePercent(phase) {
  return { present: 20, quiz: 50, play: 78, complete: 100 }[phase] || 20;
}

function renderLessonScreen() {
  const inst = getInstrument(APP.instrumentId);
  const lesson = getLesson(APP.instrumentId, APP.lessonIndex);
  const isReview = isReviewLesson(lesson);
  const isSong = isSongLesson(lesson);

  let body = '';
  if (isReview && APP.phase === 'present') {
    APP.phase = 'quiz';
  }
  if (isSong && APP.phase === 'present') {
    APP.songNoteIndex = APP.songNoteIndex || 0;
    body = renderSongPresentPhase(inst, lesson);
  } else if (APP.phase === 'present') body = renderPresentPhase(inst, lesson);
  else if (APP.phase === 'quiz') body = renderQuizPhase(inst, lesson);
  else if (APP.phase === 'play') body = renderPlayPhase(inst, lesson);
  else if (APP.phase === 'complete') body = renderCompletePhase(inst, lesson);

  const showHeader = APP.phase !== 'complete';
  const header = showHeader ? `
      <div class="app-header">
        <button class="header-back" data-action="exit-lesson">✕</button>
        <div class="header-progress" style="margin-left:0; flex:1;">
          <div class="progress-bar-track" style="flex:1; width:auto;"><div class="progress-bar-fill" style="width:${phasePercent(APP.phase)}%"></div></div>
        </div>
      </div>` : '';

  return `<div class="screen active lesson-screen">${header}${body}</div>`;
}

function renderPresentPhase(inst, lesson) {
  const fingeringSvg = Graphics.fingeringSVG(inst.fingeringType, lesson.fingeringState, inst.accentColor, 84);
  const staffSvg = Graphics.staffSVG({ pos: lesson.staffStep, accidental: lesson.accidental, clef: inst.clef, accentColor: inst.accentColor, width: 96 });
  const transposeNote = inst.isTransposing && lesson.concertNote
    ? `<div class="note-description">Sounds as concert ${lesson.concertNote} (${ inst.transposeSemitones === -9 ? 'E\u266d' : inst.transposeSemitones === -7 ? 'F' : 'B\u266d' } instrument).</div>` : '';

  const mastery = getNoteMastery(APP.instrumentId, lesson.id);
  const masteryLevel = getMasteryLevel(mastery);
  const masteryColor = getMasteryColor(masteryLevel);
  const isReview = !!APP.progress[APP.instrumentId]?.completed[lesson.id];
  const reviewLabel = isReview ? `<div style="font-size:12px;font-weight:600;color:${masteryColor};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px">${getMasteryLabel(masteryLevel)}</div>` : '';

  return `
    <div class="lesson-body">
      <div class="lesson-instruction">${isReview ? 'Review this note' : 'Meet your next note'}</div>
      ${reviewLabel}
      <div class="present-layout">
        <div class="present-diagram-wrap">
          <div class="present-diagram-label">Fingering</div>
          <div class="present-diagram-svg">${fingeringSvg}</div>
        </div>
        <div class="present-notation-wrap">
          <div class="present-diagram-label">On the staff</div>
          <div class="present-diagram-svg">${staffSvg}</div>
        </div>
      </div>
      <div class="note-name-block">
        <span class="note-name-big">${lesson.noteName}</span>
      </div>
      <div class="note-description">${lesson.description}</div>
      ${transposeNote}
      <div class="gap-md"></div>
      <div class="note-prompt">${lesson.prompt}</div>
      <div class="gap-lg"></div>
      <button class="btn-hear" data-action="hear-note"><span class="hear-icon">🔊</span> Hear it</button>
    </div>
    <div class="action-bar">
      <button class="btn btn-primary btn-wide" data-action="goto-quiz">Continue</button>
    </div>`;
}

function renderSongPresentPhase(inst, lesson) {
  const note = getResolvedSongNote(APP.instrumentId, lesson);
  const totalNotes = lesson.noteIds.length;
  const currentNum = APP.songNoteIndex + 1;
  const isFirst = APP.songNoteIndex === 0;
  const isLast = APP.songNoteIndex >= totalNotes - 1;
  const hasAudio = !!lesson.audioUrl;

  const fingeringSvg = Graphics.fingeringSVG(inst.fingeringType, note.fingeringState, inst.accentColor, 84);
  const staffSvg = Graphics.staffSVG({ pos: note.staffStep, accidental: note.accidental, clef: inst.clef, accentColor: inst.accentColor, width: 96 });

  let actionButtons;
  if (hasAudio) {
    actionButtons = `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <button class="btn btn-secondary" data-action="song-prev" ${isFirst ? 'disabled' : ''}>‹ Prev</button>
        <button class="btn btn-secondary" data-action="song-next" ${isLast ? 'disabled' : ''}>Next ›</button>
      </div>
      <button class="btn btn-primary btn-wide" data-action="play-song-audio-start" style="margin-top:8px">▶ Play with recording</button>`;
  } else {
    actionButtons = `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <button class="btn btn-secondary" data-action="song-prev" ${isFirst ? 'disabled' : ''}>‹ Prev</button>
        <button class="btn-hear" data-action="hear-note"><span class="hear-icon">🔊</span> Play note</button>
        <button class="btn btn-secondary" data-action="song-next" ${isLast ? 'disabled' : ''}>Next ›</button>
      </div>
      <button class="btn btn-secondary" data-action="play-melody" style="margin-top:8px;width:100%">▶ Play whole melody</button>`;
  }

  return `
    <div class="lesson-body">
      <div class="lesson-instruction">${lesson.noteName}</div>
      <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:16px">Note ${currentNum} of ${totalNotes}</div>
      <div class="present-layout">
        <div class="present-diagram-wrap">
          <div class="present-diagram-label">Fingering</div>
          <div class="present-diagram-svg">${fingeringSvg}</div>
        </div>
        <div class="present-notation-wrap">
          <div class="present-diagram-label">On the staff</div>
          <div class="present-diagram-svg">${staffSvg}</div>
        </div>
      </div>
      <div class="note-name-block">
        <span class="note-name-big">${note.noteName}</span>
      </div>
      <div class="note-description">${lesson.description}</div>
      <div class="gap-md"></div>
      <div class="note-prompt">${lesson.prompt}</div>
      ${actionButtons}
    </div>
    <div class="action-bar">
      <button class="btn btn-primary btn-wide" data-action="goto-quiz">Continue to quiz</button>
    </div>`;
}

function renderSongAudioPlayerContent(inst, lesson) {
  return `
    <div class="lesson-body" id="song-audio-body">
      <div class="lesson-instruction">${lesson.noteName}</div>
      <div class="song-audio-status" id="song-audio-status">Tap play, then follow along with the recording.</div>
      <div class="beat-grid" id="song-audio-beats" style="justify-content:center;margin-bottom:20px">
        ${[1,2,3,4].map(n => `<div class="beat-cell count-in" data-beat="${n}"><span class="beat-num">${n}</span></div>`).join('')}
      </div>
      <div id="song-audio-notation">
        <div class="present-layout">
          <div class="present-diagram-wrap">
            <div class="present-diagram-label">Fingering</div>
            <div class="present-diagram-svg" id="song-audio-fingering"></div>
          </div>
          <div class="present-notation-wrap">
            <div class="present-diagram-label">On the staff</div>
            <div class="present-diagram-svg" id="song-audio-staff"></div>
          </div>
        </div>
        <div class="note-name-block">
          <span class="note-name-big" id="song-audio-notename"></span>
        </div>
      </div>
      <div class="song-audio-progress" id="song-audio-progress"></div>
      <div class="gap-md"></div>
      <button class="btn btn-primary btn-wide" data-action="play-song-audio-start" id="play-song-audio-btn">▶ Play with recording</button>
      <div class="gap-sm"></div>
    </div>`;
}

function startSongAudioPlayback(inst, lesson) {
  const statusEl = document.getElementById('song-audio-status');
  const beatEls = document.querySelectorAll('#song-audio-beats .beat-cell');
  const fingEl = document.getElementById('song-audio-fingering');
  const staffEl = document.getElementById('song-audio-staff');
  const nameEl = document.getElementById('song-audio-notename');
  const progEl = document.getElementById('song-audio-progress');
  const playBtn = document.getElementById('play-song-audio-btn');
  if (!playBtn || playBtn.disabled) return;

  const bpm = lesson.bpm || 100;
  const msPerBeat = 60000 / bpm;

  playBtn.disabled = true;
  playBtn.textContent = 'Preparing\u2026';

  // Clean up any previous playback
  APP.audioPlaybackTimeouts.forEach(clearTimeout);
  APP.audioPlaybackTimeouts = [];

  statusEl.textContent = 'Count-in\u2026';

  // Preload and start the audio
  const audio = new Audio(lesson.audioUrl);
  audio.preload = 'auto';
  APP.audioPlaybackAudio = audio;

  // Count-in: 4 visual beats
  let beatCount = 0;

  function showBeat() {
    beatEls.forEach(el => el.classList.remove('active'));
    if (beatCount < 4 && beatEls[beatCount]) {
      beatEls[beatCount].classList.add('active');
      beatCount++;
    }
    if (beatCount >= 4) {
      clearInterval(countInterval);
      beatEls.forEach(el => el.classList.remove('active'));
      startNotes();
    }
  }

  showBeat();
  const countInterval = setInterval(showBeat, msPerBeat);

  audio.play().catch(() => {
    clearInterval(countInterval);
    beatEls.forEach(el => el.classList.remove('active'));
    statusEl.textContent = 'Audio failed to load.';
    playBtn.textContent = 'Retry';
    playBtn.disabled = false;
    playBtn.dataset.action = 'play-song-audio-start';
    APP.audioPlaybackAudio = null;
  });

  function startNotes() {
    statusEl.textContent = 'Playing\u2026';
    playBtn.textContent = 'Playing\u2026';
    const noteIds = lesson.noteIds;
    noteIds.forEach((id, i) => {
      const t = setTimeout(() => {
        const note = findLessonById(APP.instrumentId, id);
        if (fingEl) fingEl.innerHTML = Graphics.fingeringSVG(inst.fingeringType, note.fingeringState, inst.accentColor, 84);
        if (staffEl) staffEl.innerHTML = Graphics.staffSVG({ pos: note.staffStep, accidental: note.accidental, clef: inst.clef, accentColor: inst.accentColor, width: 96 });
        if (nameEl) nameEl.textContent = note.noteName;
        if (progEl) progEl.textContent = `Note ${i + 1} of ${noteIds.length}`;

        beatEls.forEach(el => el.classList.remove('active'));
        const bi = i % 4;
        if (beatEls[bi]) beatEls[bi].classList.add('active');

        if (i === noteIds.length - 1) {
          statusEl.textContent = 'Song complete!';
          playBtn.textContent = 'Done';
          playBtn.disabled = false;
          playBtn.dataset.action = 'back-to-present';
        }
      }, i * msPerBeat);
      APP.audioPlaybackTimeouts.push(t);
    });
  }
}

function buildSongQuizOptions(inst, song) {
  const uniqueNoteIds = [...new Set(song.noteIds)];
  const randomId = uniqueNoteIds[Math.floor(Math.random() * uniqueNoteIds.length)];
  const noteLesson = findLessonById(APP.instrumentId, randomId);
  return buildQuizOptions(inst, noteLesson);
}

function buildQuizOptions(inst, lesson) {
  const completedCount = getLearnedNotes(APP.instrumentId).length;
  const alreadyCompleted = !!getInstrumentProgress(APP.instrumentId).completed[lesson.id];

  const availableTypes = [QUIZ_TYPES.FINGERING_TO_NOTE];
  if (completedCount >= 1) availableTypes.push(QUIZ_TYPES.NOTE_TO_FINGERING);
  if (completedCount >= 2) availableTypes.push(QUIZ_TYPES.STAFF_TO_NOTE);
  if (completedCount >= 3) availableTypes.push(QUIZ_TYPES.NOTE_TO_STAFF);

  const quizType = alreadyCompleted
    ? availableTypes[Math.floor(Math.random() * availableTypes.length)]
    : QUIZ_TYPES.FINGERING_TO_NOTE;

  // Draw distractors from learned notes for spaced repetition;
  // fall back to all lessons if not enough learned notes exist.
  const learned = getLearnedNotes(APP.instrumentId).filter(l => l.id !== lesson.id);
  const pool = learned.length >= 2
    ? learned
    : inst.lessons.filter(l => l.id !== lesson.id);
  const distractors = shuffle(pool).slice(0, 2);

  return {
    quizType,
    prompt: lesson,
    options: shuffle([lesson, ...distractors]),
    correctId: lesson.id,
    answeredCorrectly: false,
    wrongIds: [],
  };
}

function getQuizQuestionText(quizType) {
  switch (quizType) {
    case QUIZ_TYPES.FINGERING_TO_NOTE:  return 'Which note does this fingering play?';
    case QUIZ_TYPES.NOTE_TO_FINGERING:  return 'Which fingering plays this note?';
    case QUIZ_TYPES.STAFF_TO_NOTE:      return 'What note is on the staff?';
    case QUIZ_TYPES.NOTE_TO_STAFF:      return 'Which staff position matches this note?';
    default:                            return 'Which one is correct?';
  }
}

function renderQuizPhase(inst, lesson) {
  if (!APP.quiz) APP.quiz = isSongLesson(lesson) ? buildSongQuizOptions(inst, lesson) : buildQuizOptions(inst, lesson);
  const q = APP.quiz;
  const isReview = isReviewLesson(lesson);

  // Review progress indicator
  let reviewProgress = '';
  if (isReview) {
    reviewProgress = `<div class="review-progress">Note ${APP.reviewIndex + 1} of ${APP.reviewTotal}</div>`;
  }

  // ── PROMPT ──
  let promptHtml = '';
  if (q.quizType === QUIZ_TYPES.FINGERING_TO_NOTE) {
    promptHtml = `<div class="quiz-prompt-svg">${Graphics.fingeringSVG(inst.fingeringType, q.prompt.fingeringState, inst.accentColor, 100)}</div>`;
  } else if (q.quizType === QUIZ_TYPES.NOTE_TO_FINGERING) {
    promptHtml = `<div class="quiz-prompt-note">${q.prompt.noteName}</div>`;
  } else if (q.quizType === QUIZ_TYPES.STAFF_TO_NOTE) {
    promptHtml = `<div class="quiz-prompt-svg">${Graphics.staffSVG({ pos: q.prompt.staffStep, accidental: q.prompt.accidental, clef: inst.clef, accentColor: inst.accentColor, width: 100 })}</div>`;
  } else if (q.quizType === QUIZ_TYPES.NOTE_TO_STAFF) {
    promptHtml = `<div class="quiz-prompt-note">${q.prompt.noteName}</div>`;
  }

  // ── OPTIONS ──
  const optionsHtml = q.options.map(opt => {
    const isWrongTapped = q.wrongIds.includes(opt.id);
    const isCorrectShown = q.answeredCorrectly && opt.id === q.correctId;
    const isDimmed = (q.answeredCorrectly && opt.id !== q.correctId) || (isWrongTapped && !isCorrectShown);
    let cls = 'quiz-option';
    if (isCorrectShown) cls += ' selected-correct';
    if (isWrongTapped) cls += ' selected-wrong';
    if (isDimmed) cls += ' dimmed';

    let content = '';
    if (q.quizType === QUIZ_TYPES.FINGERING_TO_NOTE) {
      cls += ' text-only';
      content = `<div class="quiz-option-note">${opt.noteName}</div>`;
    } else if (q.quizType === QUIZ_TYPES.NOTE_TO_FINGERING) {
      content = `<div class="quiz-option-svg">${Graphics.fingeringSVG(inst.fingeringType, opt.fingeringState, inst.accentColor, 72)}</div>`;
    } else if (q.quizType === QUIZ_TYPES.STAFF_TO_NOTE) {
      cls += ' text-only';
      content = `<div class="quiz-option-note">${opt.noteName}</div>`;
    } else if (q.quizType === QUIZ_TYPES.NOTE_TO_STAFF) {
      content = `<div class="quiz-option-svg">${Graphics.staffSVG({ pos: opt.staffStep, accidental: opt.accidental, clef: inst.clef, accentColor: inst.accentColor, width: 72 })}</div>`;
    }

    return `<div class="${cls}" data-action="quiz-answer" data-id="${opt.id}">${content}</div>`;
  }).join('');

  const feedback = q.answeredCorrectly
    ? `<div class="quiz-feedback correct visible">Nice work!</div>`
    : (q.wrongIds.length > 0 ? `<div class="quiz-feedback wrong visible">Not quite — try again.</div>` : `<div class="quiz-feedback"></div>`);

  const btnLabel = isReview
    ? (APP.reviewIndex >= APP.reviewTotal - 1 ? 'See summary' : 'Next note')
    : 'Continue';

  return `
    <div class="lesson-body">
      ${reviewProgress}
      <div class="lesson-instruction">${getQuizQuestionText(q.quizType)}</div>
      <div class="quiz-prompt">${promptHtml}</div>
      <div class="quiz-options">${optionsHtml}</div>
      ${feedback}
    </div>
    <div class="action-bar">
      <button class="btn btn-primary btn-wide" data-action="goto-play" ${q.answeredCorrectly ? '' : 'disabled'}>${btnLabel}</button>
    </div>`;
}

function renderPlayPhase(inst, lesson) {
  const fingeringSvg = Graphics.fingeringSVG(inst.fingeringType, lesson.fingeringState, inst.accentColor, 120);
  const cells = [1, 2, 3, 4].map(n => `<div class="beat-cell count-in" data-beat="${n}"><span class="beat-num">${n}</span></div>`).join('');
  const playCell = `<div class="beat-cell" data-beat="play">♪</div>`;

  return `
    <div class="lesson-body">
      <div class="lesson-instruction">Play it on your instrument</div>
      <div class="play-layout">
        <div class="play-diagram-large">
          ${fingeringSvg}
          <span class="play-note-label">${lesson.noteName}</span>
        </div>
        <div class="beat-grid">${cells}${playCell}</div>
        <div class="play-status" id="play-status">Tap Start, then play along on the count.</div>
        <button class="btn btn-secondary" data-action="play-start" id="play-start-btn">▶ Start count-in</button>
      </div>
    </div>
    <div class="action-bar">
      <button class="btn btn-success btn-wide" data-action="play-confirm" ${APP.play.hasPlayed ? '' : 'disabled'}>I played it!</button>
    </div>`;
}

function renderCompletePhase(inst, lesson) {
  const stars = APP.lastStars || 3;
  const xp = APP.lastXp || 10;
  const starsHtml = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  const isReview = isReviewLesson(lesson);

  if (isReview) {
    // Review summary: show each reviewed note's mastery
    const notesHtml = lesson.reviewLessonIds.map(id => {
      const note = findLessonById(APP.instrumentId, id);
      const count = getNoteMastery(APP.instrumentId, id);
      const level = getMasteryLevel(count);
      const color = getMasteryColor(level);
      return `
        <div class="review-note-row">
          <span class="review-note-name">${note.noteName}</span>
          <span class="review-note-badge" style="background:${color}22;color:${color}">${getMasteryLabel(level)}</span>
        </div>`;
    }).join('');

    return `
      <div class="complete-layout">
        <div class="complete-stars">${starsHtml}</div>
        <div class="complete-xp">+${xp} XP</div>
        <div class="complete-title">Review complete!</div>
        <div class="complete-sub">${APP.reviewCorrect} of ${APP.reviewTotal} on first try</div>
        <div class="review-notes-list">${notesHtml}</div>
        <div class="gap-lg"></div>
        <button class="btn btn-primary btn-wide" data-action="finish-lesson">Continue</button>
      </div>`;
  }

  const mastery = getNoteMastery(APP.instrumentId, lesson.id);
  const masteryLevel = getMasteryLevel(mastery);
  const masteryColor = getMasteryColor(masteryLevel);
  const alreadyDone = !!APP.progress[APP.instrumentId]?.completed[lesson.id];
  const isSong = isSongLesson(lesson);

  const messages = {
    new: 'You got the basics down!',
    learning: 'Getting there — keep practicing!',
    practiced: 'Solid understanding of this note.',
    mastered: 'You really know this note well!',
  };

  const exportBtn = isSong ? `<button class="btn btn-secondary" data-action="export-musicxml" style="width:100%;margin-bottom:8px">Export MusicXML</button>` : '';

  return `
    <div class="complete-layout">
      <div class="complete-stars">${starsHtml}</div>
      <div class="complete-xp">+${xp} XP</div>
      <div class="complete-title">${alreadyDone ? 'Review complete!' : 'Lesson complete!'}</div>
      <div class="complete-sub">${isSong ? 'Song complete!' : messages[masteryLevel]}</div>
      <div style="margin-top:8px;padding:6px 14px;border-radius:20px;background:${masteryColor}22;color:${masteryColor};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">${getMasteryLabel(masteryLevel)} — ${mastery} correct</div>
      <div class="gap-lg"></div>
      ${exportBtn}
      <button class="btn btn-primary btn-wide" data-action="finish-lesson">Continue</button>
    </div>`;
}

// ── MASTER RENDER ───────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  if (APP.screen === 'select') app.innerHTML = renderSelectScreen();
  else if (APP.screen === 'settings') app.innerHTML = renderSettingsScreen();
  else if (APP.screen === 'map') app.innerHTML = renderMapScreen();
  else if (APP.screen === 'lesson') app.innerHTML = renderLessonScreen();
}

// ── PLAY PHASE SEQUENCE ─────────────────────────────────────────────────
function runPlaySequence(inst, lesson) {
  const btn = document.getElementById('play-start-btn');
  const status = document.getElementById('play-status');
  if (!btn || btn.disabled) return;
  btn.disabled = true;
  btn.textContent = '...';
  const beatMs = 650;
  const cells = document.querySelectorAll('.beat-cell');

  function clearActive() { cells.forEach(c => c.classList.remove('active')); }

  status.textContent = 'Get ready...';
  [1, 2, 3, 4].forEach((n, i) => {
    setTimeout(() => {
      clearActive();
      const cell = document.querySelector(`.beat-cell[data-beat="${n}"]`);
      if (cell) cell.classList.add('active');
      AudioEngine.playClick(n === 1);
      status.textContent = `${n}...`;
    }, i * beatMs);
  });

  setTimeout(() => {
    clearActive();
    const playCell = document.querySelector('.beat-cell[data-beat="play"]');
    if (playCell) playCell.classList.add('active');
    AudioEngine.playInstrumentNote(lesson.freq, inst.fingeringType, 1.3);
    status.textContent = 'Play now!';
  }, 4 * beatMs);

  setTimeout(() => {
    clearActive();
    status.textContent = 'Nice. Tap Start to try again, or confirm below.';
    btn.disabled = false;
    btn.textContent = '▶ Replay count-in';
    APP.play.hasPlayed = true;
    const confirmBtn = document.querySelector('[data-action="play-confirm"]');
    if (confirmBtn) confirmBtn.disabled = false;
  }, 4 * beatMs + 1500);
}

// ── SONG SEQUENCE ──────────────────────────────────────────────────────
function runSongSequence(inst, lesson) {
  const noteIds = lesson.noteIds;
  const msPerBeat = 480;
  noteIds.forEach((id, i) => {
    const note = findLessonById(APP.instrumentId, id);
    const chordFreqs = getChordFrequencies(APP.instrumentId, lesson, i);
    setTimeout(() => {
      if (chordFreqs.length > 0) {
        AudioEngine.playChord(chordFreqs, inst.fingeringType, 0.45);
      }
      AudioEngine.playInstrumentNote(note.freq, inst.fingeringType, 0.45);
    }, i * msPerBeat);
  });
}

// ── MUSICXML ──────────────────────────────────────────────────────────
function exportSongMusicXML(inst, lesson) {
  function pitchAttr(n) {
    const step = n.noteName.replace(/[♭♯#b]/g, '').charAt(0);
    const oct = n.octave;
    const acc = n.accidental;
    let xml = `<pitch><step>${step}</step>`;
    if (acc === '♭' || acc === 'b') xml += `<alter>-1</alter>`;
    else if (acc === '♯' || acc === '#') xml += `<alter>1</alter>`;
    xml += `<octave>${oct}</octave></pitch>`;
    return xml;
  }
  const clef = inst.clef === 'bass' ? '<sign>F</sign><line>4</line>' : '<sign>G</sign><line>2</line>';
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>'];
  lines.push('<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">');
  lines.push('<score-partwise version="4.0">');
  lines.push('  <part-list><score-part id="P1"><part-name>' + escapeXml(lesson.noteName) + '</part-name></score-part></part-list>');
  lines.push('  <part id="P1">');
  const noteIds = lesson.noteIds;
  const chordIds = lesson.chordIds || [];
  let measure = 1, beat = 0;
  let measureNotes = [];
  for (let i = 0; i < noteIds.length; i++) {
    const n = findLessonById(APP.instrumentId, noteIds[i]);
    if (!n) continue;
    const chordEntry = chordIds[i];
    const chordNotes = chordEntry ? chordEntry.map(id => findLessonById(APP.instrumentId, id)).filter(Boolean) : [];
    measureNotes.push({ note: n, chord: false });
    chordNotes.forEach(cn => measureNotes.push({ note: cn, chord: true }));
    beat++;
    if (beat === 4 && i < noteIds.length - 1) { flushMeasure(); measure++; beat = 0; }
  }
  if (measureNotes.length > 0) flushMeasure();
  function flushMeasure() {
    lines.push('    <measure number="' + measure + '">');
    if (measure === 1) {
      lines.push('      <attributes>');
      lines.push('        <divisions>1</divisions>');
      lines.push('        <key><fifths>0</fifths></key>');
      lines.push('        <time><beats>4</beats><beat-type>4</beat-type></time>');
      lines.push('        <clef>' + clef + '</clef>');
      lines.push('      </attributes>');
    }
    measureNotes.forEach(mn => {
      lines.push('      <note>');
      if (mn.chord) lines.push('        <chord/>');
      lines.push('        ' + pitchAttr(mn.note));
      lines.push('        <duration>1</duration>');
      lines.push('        <type>quarter</type>');
      lines.push('      </note>');
    });
    lines.push('    </measure>');
    measureNotes = [];
  }
  lines.push('  </part>');
  lines.push('</score-partwise>');
  return lines.join('\n');
}
function escapeXml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
}
function matchNoteToLesson(instrumentId, noteName, octave) {
  const inst = getInstrument(instrumentId);
  const searchName = noteName.replace(/♭/g,'b').replace(/♯/g,'#');
  const lesson = inst.lessons.find(l => {
    if (l.type) return false;
    const lName = l.noteName.replace(/♭/g,'b').replace(/♯/g,'#');
    return lName === searchName && l.octave === octave;
  });
  return lesson ? lesson.id : null;
}
function importSongFromMusicXML(xmlString) {
  const doc = new DOMParser().parseFromString(xmlString, 'text/xml');
  const parseError = doc.querySelector('parsererror');
  if (parseError) throw new Error('Invalid XML: ' + parseError.textContent);
  const partName = doc.querySelector('part-name');
  const title = partName ? partName.textContent.trim() : 'Imported Song';
  const noteEls = doc.querySelectorAll('measure note');
  const noteIds = [];
  const chordIds = [];
  let currentChordBuffer = [];
  noteEls.forEach(noteEl => {
    const step = noteEl.querySelector('pitch step');
    const octave = noteEl.querySelector('pitch octave');
    const alter = noteEl.querySelector('pitch alter');
    const isChord = noteEl.querySelector('chord');
    if (noteEl.querySelector('rest')) return;
    if (!step || !octave) return;
    let nn = step.textContent;
    const oct = parseInt(octave.textContent, 10);
    if (alter) {
      const a = parseInt(alter.textContent, 10);
      if (a === -1) nn += 'b';
      else if (a === 1) nn += '#';
    }
    const lessonId = matchNoteToLesson(APP.instrumentId, nn, oct);
    if (!lessonId) return;
    if (isChord) {
      currentChordBuffer.push(lessonId);
    } else {
      if (currentChordBuffer.length > 0) {
        chordIds[chordIds.length - 1] = currentChordBuffer;
        currentChordBuffer = [];
      }
      noteIds.push(lessonId);
      chordIds.push(null);
    }
  });
  if (currentChordBuffer.length > 0) {
    chordIds[chordIds.length - 1] = currentChordBuffer;
  }
  if (noteIds.length === 0) throw new Error('No playable notes found in MusicXML');
  const importedId = 'imported-' + Date.now();
  const song = { id: importedId, type: 'song', noteName: title, prerequisiteIds: [], noteIds, chordIds, prompt: '', description: 'Imported from MusicXML.' };
  const existing = JSON.parse(localStorage.getItem(IMPORTED_SONGS_KEY) || '{}');
  if (!existing[APP.instrumentId]) existing[APP.instrumentId] = [];
  existing[APP.instrumentId].push(song);
  localStorage.setItem(IMPORTED_SONGS_KEY, JSON.stringify(existing));
  return song;
}

// ── EVENT HANDLING ─────────────────────────────────────────────────────
function handleAction(action, el) {
  switch (action) {

    case 'open-settings':
      APP.screen = 'settings';
      render();
      break;

    case 'close-settings':
      APP.screen = 'select';
      render();
      break;

    case 'save-settings-name': {
      const input = document.getElementById('settings-name-input');
      if (input) {
        const name = input.value.trim();
        if (name) setStudentName(name);
      }
      APP.screen = 'select';
      render();
      break;
    }

    case 'reset-progress': {
      if (!confirm('Reset all progress for all instruments? This cannot be undone.')) return;
      APP.progress = {};
      saveProgress();
      APP.screen = 'select';
      render();
      showToast('Progress reset.');
      break;
    }

    case 'select-instrument': {
      const id = el.dataset.id;
      const inst = getInstrument(id);
      if (!inst.available) { showToast(`${inst.name} is coming soon!`); return; }
      APP.instrumentId = id;
      APP.screen = 'map';
      render();
      break;
    }

    case 'go-select':
      APP.screen = 'select';
      render();
      break;

    case 'open-lesson': {
      const idx = parseInt(el.dataset.index, 10);
      APP.lessonIndex = idx;
      const lesson = getLesson(APP.instrumentId, idx);
      APP.play = { running: false, hasPlayed: false };

      if (isSongLesson(lesson)) {
        APP.phase = 'present';
        APP.quiz = null;
        APP.songNoteIndex = 0;
      } else if (isReviewLesson(lesson)) {
        const inst = getInstrument(APP.instrumentId);
        APP.phase = 'quiz';
        APP.reviewQueue = shuffle(lesson.reviewLessonIds);
        APP.reviewIndex = 0;
        APP.reviewCorrect = 0;
        APP.reviewTotal = lesson.reviewLessonIds.length;
        const firstNote = findLessonById(APP.instrumentId, APP.reviewQueue[0]);
        APP.quiz = buildQuizOptions(inst, firstNote);
      } else {
        APP.phase = 'present';
        APP.quiz = null;
      }

      APP.screen = 'lesson';
      render();
      break;
    }

    case 'locked-node':
      showToast('Finish the previous note first.');
      break;

    case 'song-next': {
      APP.songNoteIndex = Math.min(APP.songNoteIndex + 1, getLesson(APP.instrumentId, APP.lessonIndex).noteIds.length - 1);
      render();
      break;
    }

    case 'song-prev': {
      APP.songNoteIndex = Math.max(APP.songNoteIndex - 1, 0);
      render();
      break;
    }

    case 'play-melody': {
      AudioEngine.unlock();
      const inst = getInstrument(APP.instrumentId);
      const lesson = getLesson(APP.instrumentId, APP.lessonIndex);
      runSongSequence(inst, lesson);
      break;
    }

    case 'play-song-audio-start': {
      const inst = getInstrument(APP.instrumentId);
      const lesson = getLesson(APP.instrumentId, APP.lessonIndex);
      const body = document.querySelector('.lesson-body');
      if (body) {
        body.innerHTML = renderSongAudioPlayerContent(inst, lesson);
        startSongAudioPlayback(inst, lesson);
      }
      break;
    }

    case 'back-to-present': {
      APP.audioPlaybackTimeouts.forEach(clearTimeout);
      APP.audioPlaybackTimeouts = [];
      if (APP.audioPlaybackAudio) {
        APP.audioPlaybackAudio.pause();
        APP.audioPlaybackAudio = null;
      }
      APP.songNoteIndex = 0;
      APP.phase = 'present';
      render();
      break;
    }

    case 'exit-lesson':
      APP.audioPlaybackTimeouts.forEach(clearTimeout);
      APP.audioPlaybackTimeouts = [];
      if (APP.audioPlaybackAudio) { APP.audioPlaybackAudio.pause(); APP.audioPlaybackAudio = null; }
      APP.reviewQueue = null;
      APP.reviewIndex = 0;
      APP.reviewCorrect = 0;
      APP.reviewTotal = 0;
      APP.songNoteIndex = 0;
      APP.importedSong = null;
      APP.screen = 'map';
      render();
      break;

    case 'hear-note': {
      const inst = getInstrument(APP.instrumentId);
      const lesson = getLesson(APP.instrumentId, APP.lessonIndex);
      if (isSongLesson(lesson)) {
        const note = getResolvedSongNote(APP.instrumentId, lesson);
        const chordFreqs = getChordFrequencies(APP.instrumentId, lesson, APP.songNoteIndex);
        if (chordFreqs.length > 0) {
          AudioEngine.playChord(chordFreqs, inst.fingeringType, 1.1);
        }
        AudioEngine.playInstrumentNote(note.freq, inst.fingeringType, 1.1);
      } else {
        AudioEngine.playInstrumentNote(lesson.freq, inst.fingeringType, 1.1);
      }
      break;
    }

    case 'goto-quiz':
      APP.audioPlaybackTimeouts.forEach(clearTimeout);
      APP.audioPlaybackTimeouts = [];
      if (APP.audioPlaybackAudio) { APP.audioPlaybackAudio.pause(); APP.audioPlaybackAudio = null; }
      APP.phase = 'quiz';
      APP.quiz = null;
      render();
      break;

    case 'quiz-answer': {
      const tappedId = el.dataset.id;
      const q = APP.quiz;
      if (q.answeredCorrectly || q.wrongIds.includes(tappedId)) return;
      if (tappedId === q.correctId) {
        q.answeredCorrectly = true;
        addNoteMastery(APP.instrumentId, q.correctId);
      } else {
        q.wrongIds.push(tappedId);
      }
      render();
      break;
    }

    case 'goto-play': {
      const lesson = getLesson(APP.instrumentId, APP.lessonIndex);
      // ── Song: track mastery and go to complete ────────────────────
      if (isSongLesson(lesson)) {
        const q = APP.quiz;
        const mistakes = q ? q.wrongIds.length : 0;
        const stars = mistakes === 0 ? 3 : (mistakes <= 2 ? 2 : 1);
        const xp = 10 + (stars * 5);
        APP.lastStars = stars;
        APP.lastXp = xp;
        const prog = getInstrumentProgress(APP.instrumentId);
        const prevStars = prog.completed[lesson.id] ? prog.completed[lesson.id].stars : 0;
        prog.completed[lesson.id] = { stars: Math.max(stars, prevStars) };
        prog.xp += xp;
        saveProgress();
        APP.phase = 'complete';
        render();
        return;
      }
      // ── Review session: advance to next note or show summary ──────
      if (isReviewLesson(lesson)) {
        const q = APP.quiz;
        if (q && q.wrongIds.length === 0) APP.reviewCorrect++;
        APP.reviewIndex++;
        if (APP.reviewIndex >= APP.reviewTotal) {
          const totalMistakes = APP.reviewTotal - APP.reviewCorrect;
          APP.lastStars = totalMistakes === 0 ? 3 : (totalMistakes <= 1 ? 2 : 1);
          APP.lastXp = 10 + (APP.lastStars * 5);
          const prog = getInstrumentProgress(APP.instrumentId);
          const prevStars = prog.completed[lesson.id] ? prog.completed[lesson.id].stars : 0;
          prog.completed[lesson.id] = { stars: Math.max(APP.lastStars, prevStars) };
          prog.xp += APP.lastXp;
          saveProgress();
          APP.phase = 'complete';
        } else {
          const inst = getInstrument(APP.instrumentId);
          const nextNote = findLessonById(APP.instrumentId, APP.reviewQueue[APP.reviewIndex]);
          APP.quiz = buildQuizOptions(inst, nextNote);
          APP.phase = 'quiz';
        }
        render();
        return;
      }
      // ── Regular lesson ───────────────────────────────────────────
      APP.phase = 'play';
      APP.play = { running: false, hasPlayed: false };
      render();
      break;
    }

    case 'play-start': {
      AudioEngine.unlock();
      const inst = getInstrument(APP.instrumentId);
      const lesson = getLesson(APP.instrumentId, APP.lessonIndex);
      runPlaySequence(inst, lesson);
      break;
    }

    case 'play-confirm': {
      const q = APP.quiz;
      const mistakes = q ? q.wrongIds.length : 0;
      const stars = mistakes === 0 ? 3 : (mistakes <= 2 ? 2 : 1);
      const xp = 10 + (stars * 5);
      APP.lastStars = stars;
      APP.lastXp = xp;

      const prog = getInstrumentProgress(APP.instrumentId);
      const lesson = getLesson(APP.instrumentId, APP.lessonIndex);
      const prevStars = prog.completed[lesson.id] ? prog.completed[lesson.id].stars : 0;
      prog.completed[lesson.id] = { stars: Math.max(stars, prevStars) };
      prog.xp += xp;
      saveProgress();

      APP.phase = 'complete';
      render();
      break;
    }

    case 'export-musicxml': {
      const inst = getInstrument(APP.instrumentId);
      const lesson = getLesson(APP.instrumentId, APP.lessonIndex);
      const xml = exportSongMusicXML(inst, lesson);
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (lesson.noteName || 'song').replace(/[^a-zA-Z0-9]+/g, '-') + '.musicxml';
      a.click();
      URL.revokeObjectURL(url);
      break;
    }
    case 'import-song': {
      document.getElementById('import-file-input').click();
      break;
    }
    case 'import-file-chosen': {
      // Handled by the change event listener below
      break;
    }
    case 'open-imported-song': {
      APP.audioPlaybackTimeouts.forEach(clearTimeout);
      APP.audioPlaybackTimeouts = [];
      if (APP.audioPlaybackAudio) { APP.audioPlaybackAudio.pause(); APP.audioPlaybackAudio = null; }
      const idx = parseInt(el.dataset.importedIndex, 10);
      const allImported = JSON.parse(localStorage.getItem(IMPORTED_SONGS_KEY) || '{}');
      const songs = allImported[APP.instrumentId] || [];
      const song = songs[idx];
      if (!song) { showToast('Song not found.'); break; }
      APP.importedSong = song;
      APP.lessonIndex = -1;
      APP.phase = 'present';
      APP.songNoteIndex = 0;
      APP.quiz = null;
      APP.screen = 'lesson';
      render();
      break;
    }
    case 'delete-imported-song': {
      const idx = parseInt(el.dataset.importedIndex, 10);
      const allImported = JSON.parse(localStorage.getItem(IMPORTED_SONGS_KEY) || '{}');
      const songs = allImported[APP.instrumentId] || [];
      songs.splice(idx, 1);
      allImported[APP.instrumentId] = songs;
      localStorage.setItem(IMPORTED_SONGS_KEY, JSON.stringify(allImported));
      render();
      break;
    }
    case 'finish-lesson':
      APP.audioPlaybackTimeouts.forEach(clearTimeout);
      APP.audioPlaybackTimeouts = [];
      if (APP.audioPlaybackAudio) { APP.audioPlaybackAudio.pause(); APP.audioPlaybackAudio = null; }
      APP.reviewQueue = null;
      APP.reviewIndex = 0;
      APP.reviewCorrect = 0;
      APP.reviewTotal = 0;
      APP.songNoteIndex = 0;
      APP.importedSong = null;
      APP.screen = 'map';
      render();
      break;
  }
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el || el.hasAttribute('disabled')) return;
  handleAction(el.dataset.action, el);
});

document.addEventListener('change', (e) => {
  const input = e.target;
  if (input.id !== 'import-file-input' || !input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const song = importSongFromMusicXML(reader.result);
      showToast('Imported "' + song.noteName + '"');
      render();
    } catch (err) {
      showToast('Import error: ' + err.message);
    }
  };
  reader.onerror = () => showToast('Error reading file.');
  reader.readAsText(file);
  input.value = '';
});

// ── INIT ───────────────────────────────────────────────────────────────
loadProgress();
if (!getStudentName()) showNamePrompt();
render();

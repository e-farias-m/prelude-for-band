// test-curriculum.js
// Validates js/curriculum.js against authoritative reference data:
//   1. staffStep matches the written note name + octave + clef
//   2. freq matches the written note + instrument transposition
//   3. fingeringState matches reference fingerings transcribed from
//      The Woodwind Fingering Guide (wfg.woodwind.org) for woodwinds and
//      the standard brass harmonic series / charts for the brass.
//
// Woodwind slot layout (graphics.js woodwindFingeringSVG):
//   [thumb, h1, h2, h3, h4, h5, h6, h7, extra]
//     thumb = left thumb (flute Bb lever / clarinet thumb hole / oboe octave /
//             sax octave / bassoon whisper key)
//     h1..h3 = left hand, h4..h6 = right hand, h7 = right pinky (Eb / low keys)
//     extra  = register / octave key drawn as "R"
// Brass valve layout: [v1, v2, v3]
// Trombone: single slide position (1..7)

const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, 'js', 'curriculum.js'), 'utf8');
const { CURRICULUM, CANONICAL_SONGS, degreeKey, scaleSemitones, PROGRESSION_SCHEDULE, EXTENDED_NOTES } =
  new Function(src + '\nreturn { CURRICULUM, CANONICAL_SONGS, degreeKey, scaleSemitones, PROGRESSION_SCHEDULE, EXTENDED_NOTES };')();

let pass = 0;
let fail = 0;
const failures = [];
function check(cond, msg) {
  if (cond) { pass++; } else { fail++; failures.push(msg); }
}

const LETTER = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const DIA = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };

// Each instrument must declare a family so the "make your first sound" guide
// can pick the right embouchure instructions (brass buzz vs. flute airstream
// vs. single/double reed). Unknown families would fall back to brass silently.
const VALID_FAMILIES = new Set(['brass', 'flute', 'single-reed', 'double-reed']);
for (const inst of Object.values(CURRICULUM)) {
  check(VALID_FAMILIES.has(inst.family),
    `${inst.id} must declare a valid family (got ${JSON.stringify(inst.family)})`);
}

function letterOf(name) { return name[0]; }
function accidentalOf(name, accidental) {
  if (typeof accidental === 'number') return accidental;
  if (name.includes('\u266d')) return -1;
  if (name.includes('#')) return 1;
  return 0;
}
function midiFor(name, octave, accidental) {
  return 12 * (octave + 1) + LETTER[letterOf(name)] + accidentalOf(name, accidental);
}
function expectedStaffStep(name, octave, clef) {
  const dia = octave * 7 + DIA[letterOf(name)];
  if (clef === 'bass') return dia - (2 * 7 + 4); // G2
  return dia - (4 * 7 + 2); // E4
}
function freqFor(name, octave, accidental, transpose) {
  const concert = midiFor(name, octave, accidental) + (transpose || 0);
  return 440 * Math.pow(2, (concert - 69) / 12);
}
// Resolve a canonical song's degree token to the note lesson it plays. Tokens
// are either a scale degree ("5", "0b", "-1") or the teaching-order aliases
// "FIRST"/"SECOND" (the first and second note each instrument teaches).
function resolveDegree(inst, token) {
  if (token === 'FIRST' || token === 'SECOND') {
    const ordered = (inst.lessons || []).filter(l => !l.type && l.degree != null);
    return ordered[token === 'FIRST' ? 0 : 1];
  }
  const want = typeof token === 'number' ? degreeKey(token, 0) : token;
  return (inst.lessons || []).find(l =>
    !l.type && degreeKey(l.degree, l.alter || 0) === want);
}
// Degree + alteration a song token asks for, for the concert-pitch check.
function degreeStepOf(token) {
  if (typeof token === 'number') return { step: token, alt: 0 };
  return {
    step: parseInt(token, 10),
    alt: /b/.test(token) ? -1 : /#/.test(token) ? 1 : 0,
  };
}

// Reference fingerings keyed by lesson id.
const T = true, F = false;
const REF = {
  flute: {
    'fl-1': [T, T, T, T, T, T, T, T, F], // C4  T 123|123 C
    'fl-2': [T, T, T, T, T, T, T, F, F], // D4  T 123|123
    'fl-3': [T, T, T, T, T, T, F, T, F], // E4  T 123|12- Eb
    'fl-4': [T, T, T, T, T, F, F, T, F], // F4  T 123|1-- Eb
    'fl-5': [T, T, T, T, F, F, F, T, F], // G4  T 123|--- Eb
    'fl-6': [T, T, T, F, F, F, F, T, F], // A4  T 12-|--- Eb
    'fl-7': [T, T, F, F, F, F, F, T, F], // B4  T 1--|--- Eb
    'fl-8': [F, T, F, F, F, F, F, T, F], // C5  1--|--- (thumb off) Eb
  },
  clarinet: {
    'cl-1': [T, T, T, T, F, F, F, F, F], // C4  T 123|---
    'cl-2': [T, T, T, F, F, F, F, F, F], // D4  T 12-|---
    'cl-3': [T, T, F, F, F, F, F, F, F], // E4  T 1--|---
    'cl-4': [T, F, F, F, F, F, F, F, F], // F4  T ---|---
    'cl-5': [F, F, F, F, F, F, F, F, F], // G4  --- (open)
    'cl-6': [F, T, F, F, F, F, F, F, F], // A4  A--- (left index A key)
    'cl-7': [T, T, T, T, T, T, T, F, T, T], // B4  RT 123|123 + left little-finger E key
    'cl-8': [T, T, T, T, T, T, T, T, T, F], // C5  RT 123|123 + right little-finger F key
  },
  'alto-saxophone': {
    'as-1': [F, T, T, T, T, T, T, T, F], // C4  123|123 C
    'as-2': [F, T, T, T, T, T, T, F, F], // D4  123|123
    'as-3': [F, T, T, T, T, T, F, F, F], // E4  123|12-
    'as-4': [F, T, T, T, T, F, F, F, F], // F4  123|1--
    'as-5': [F, T, T, T, F, F, F, F, F], // G4  123|---
    'as-6': [F, T, T, F, F, F, F, F, F], // A4  12-|---
    'as-7': [F, T, F, F, F, F, F, F, F], // B4  1--|---
    'as-8': [F, F, T, F, F, F, F, F, F], // C5  -2-|---
  },
  oboe: {
    'ob-1': [F, T, T, T, T, T, T, T, F], // C4  123|123 C
    'ob-2': [F, T, T, T, T, T, T, F, F], // D4  123|123
    'ob-3': [F, T, T, T, T, T, F, F, F], // E4  123|12-
    'ob-4': [F, T, T, T, T, T, F, F, F, T], // F4  123|12 + F resonance key
    'ob-5': [F, T, T, T, F, F, F, F, F], // G4  123|---
    'ob-6': [F, T, T, F, F, F, F, F, F], // A4  12-|---
    'ob-7': [F, T, F, F, F, F, F, F, F], // B4  1--|--- (no octave key)
    'ob-8': [F, T, F, F, T, F, F, F, F], // C5  1--|1-- (no octave key)
  },
  bassoon: {
    'bn-1': [T, T, T, T, F, F, F, F, F], // C3  W 123|---
    'bn-2': [T, T, T, F, F, F, F, F, F], // D3  W 12-|---
    'bn-3': [T, T, F, F, F, F, F, F, F], // E3  W 1--|---
    'bn-4': [T, F, F, F, F, F, F, F, F], // F3  W ---|---
    'bn-5': [T, F, T, T, T, T, T, F, F], // G3  W (~)23|123 (half-hole shown open)
    'bn-6': [F, T, T, T, T, T, F, F, F], // A3  123|12-
    'bn-7': [F, T, T, T, T, F, F, F, F], // B3  123|1--
    'bn-8': [F, T, T, T, F, F, F, F, F], // C4  123|---
  },
  trumpet: {
    'tr-1': [F, F, F], 'tr-2': [T, F, T], 'tr-3': [T, T, F], 'tr-4': [T, F, F],
    'tr-5': [F, F, F], 'tr-6': [T, T, F], 'tr-7': [F, T, F], 'tr-8': [F, F, F],
    // standard beginner additions (chart: tunableapp.com trumpet fingering)
    'tr-ext-0': [F, T, F],      // B3   2
    'tr-ext-neg1': [T, T, F],   // A3   12
    'tr-ext-0flat': [T, F, F],  // Bb3  1
    'tr-ext-7flat': [T, F, F],  // Bb4  1
    'tr-ext-4sharp': [F, T, F], // F#4  2
    'tr-ext-3flat': [F, T, T],  // Eb4  23
    'tr-ext-9': [T, F, F],      // D5   1  (5th partial of the 1st-valve series)
  },
  // Written F: F4 first note, so fh-1..fh-8 are now the F-major scale notes.
  'french-horn': {
    'fh-1': [T, F, F], 'fh-2': [F, F, F], 'fh-3': [T, T, F], 'fh-4': [T, F, F],
    'fh-5': [F, F, F], 'fh-6': [F, F, F], 'fh-7': [F, F, F], 'fh-8': [T, F, F],
    'fh-ext-0': [F, F, F],      // E4   open 5th partial
    'fh-ext-neg1': [T, F, F],   // D4   1
    'fh-ext-0flat': [F, T, F],  // Eb4  2
    'fh-ext-7flat': [F, T, F],  // Eb5  2
    'fh-ext-4sharp': [F, T, F], // B4   2
    'fh-ext-3flat': [F, T, T],  // Ab4  23
    'fh-ext-9': [F, F, F],      // G5   open 12th partial
  },
  euphonium: {
    'eu-1': [F, F, F], 'eu-2': [T, F, T], 'eu-3': [T, T, F], 'eu-4': [T, F, F],
    'eu-5': [F, F, F], 'eu-6': [T, T, F], 'eu-7': [F, T, F], 'eu-8': [F, F, F],
    'eu-ext-0': [F, T, F],      // A2   2
    'eu-ext-neg1': [T, T, F],   // G2   12
    'eu-ext-0flat': [T, F, F],  // Ab2  1
    'eu-ext-7flat': [T, F, F],  // Ab3  1
    'eu-ext-4sharp': [F, T, F], // E3   2
    'eu-ext-3flat': [F, T, T],  // Db3  23
    'eu-ext-9': [T, F, T],      // C4   13
  },
  tuba: {
    'tu-1': [F, F, F], 'tu-2': [T, F, T], 'tu-3': [T, T, F], 'tu-4': [T, F, F],
    'tu-5': [F, F, F], 'tu-6': [T, T, F], 'tu-7': [F, T, F], 'tu-8': [F, F, F],
    'tu-ext-0': [F, T, F],      // A1   2
    'tu-ext-neg1': [T, T, F],   // G1   12
    'tu-ext-0flat': [T, F, F],  // Ab1  1
    'tu-ext-7flat': [T, F, F],  // Ab2  1
    'tu-ext-4sharp': [F, T, F], // E2   2
    'tu-ext-3flat': [F, T, T],  // Db2  23
    'tu-ext-9': [T, F, T],      // C3   13
  },
  trombone: {
    'tb-1': 1, 'tb-2': 6, 'tb-3': 4, 'tb-4': 3, 'tb-5': 1, 'tb-6': 4, 'tb-7': 2, 'tb-8': 1,
    'tb-ext-0': 2,      // A2
    'tb-ext-neg1': 4,   // G2
    'tb-ext-0flat': 3,  // Ab2
    'tb-ext-7flat': 3,  // Ab3
    'tb-ext-4sharp': 2, // E3
    'tb-ext-3flat': 5,  // Db3
    'tb-ext-9': 3,      // C4
  },
};

for (const inst of Object.values(CURRICULUM)) {
  const ref = REF[inst.id];
  check(!!ref, `missing reference table for ${inst.id}`);

  for (const lesson of inst.lessons || []) {
    if (!lesson.noteName || lesson.type === 'review' || lesson.type === 'song') continue;

    // staffStep
    const expectedStep = expectedStaffStep(lesson.noteName, lesson.octave, inst.clef);
    check(lesson.staffStep === expectedStep,
      `${inst.id}/${lesson.id} staffStep ${lesson.staffStep} != ${expectedStep}`);

    // freq
    const expectedFreq = freqFor(lesson.noteName, lesson.octave, lesson.accidental || 0,
      inst.transposeSemitones || 0);
    check(Math.abs(lesson.freq - expectedFreq) < 0.6,
      `${inst.id}/${lesson.id} freq ${lesson.freq} != ${expectedFreq.toFixed(2)}`);

    // fingering
    const expected = ref && ref[lesson.id];
    if (expected === undefined) continue;
    if (Array.isArray(expected)) {
      const actual = lesson.fingeringState;
      check(Array.isArray(actual) && actual.length === expected.length &&
        actual.every((v, i) => v === expected[i]),
        `${inst.id}/${lesson.id} fingering [${actual}] != [${expected}]`);
    } else {
      check(lesson.fingeringState === expected,
        `${inst.id}/${lesson.id} position ${lesson.fingeringState} != ${expected}`);
    }
  }
}

for (const inst of Object.values(CURRICULUM)) {
  const ids = new Set((inst.lessons || []).map(l => l.id));
  for (const lesson of inst.lessons || []) {
    if (lesson.type !== 'song') continue;

    // melody must reference real lessons in this instrument
    for (const nid of lesson.noteIds || []) {
      check(ids.has(nid), `${inst.id}/${lesson.id} unknown noteId ${nid}`);
    }

    // durations must be present and align with the melody
    check(Array.isArray(lesson.durations) && lesson.durations.length === lesson.noteIds.length,
      `${inst.id}/${lesson.id} durations must align with noteIds`);
    check(Array.isArray(lesson.durations) && lesson.durations.every(d => typeof d === 'number' && d > 0),
      `${inst.id}/${lesson.id} durations must be positive numbers`);

    // accompaniment is derived from the melody, so no stored chords
    check(lesson.chordIds === undefined,
      `${inst.id}/${lesson.id} should not define chordIds (derived at runtime)`);
  }
}

// No lesson id may repeat, within or across instruments.
const seenIds = new Set();
for (const inst of Object.values(CURRICULUM)) {
  for (const lesson of inst.lessons || []) {
    check(!seenIds.has(lesson.id), `duplicate lesson id ${lesson.id}`);
    seenIds.add(lesson.id);
  }
}

// Every cross-reference must point at a real lesson, and a song must own the
// notes it plays (each played note must be listed among its prerequisites).
for (const inst of Object.values(CURRICULUM)) {
  const ids = new Set((inst.lessons || []).map(l => l.id));
  for (const lesson of inst.lessons || []) {
    for (const rid of lesson.reviewLessonIds || []) {
      check(ids.has(rid), `${inst.id}/${lesson.id} unknown reviewLessonId ${rid}`);
    }
    for (const pid of lesson.prerequisiteIds || []) {
      check(ids.has(pid), `${inst.id}/${lesson.id} unknown prerequisiteId ${pid}`);
    }
    if (lesson.type === 'song' && Array.isArray(lesson.prerequisiteIds)) {
      const listed = new Set(lesson.prerequisiteIds);
      for (const nid of lesson.noteIds || []) {
        check(listed.has(nid), `${inst.id}/${lesson.id} plays ${nid} but does not list it as a prerequisite`);
      }
    }
  }
}

// Shared songs must match the single canonical scale-degree definition, so
// hand-entered variants cannot creep back in.
for (const inst of Object.values(CURRICULUM)) {
  for (const lesson of inst.lessons || []) {
    if (lesson.type !== 'song') continue;
    const song = CANONICAL_SONGS[lesson.noteName];
    if (!song) continue;
    const expected = song.degrees
      .map(d => (resolveDegree(inst, d) || {}).id)
      .filter(Boolean);
    check(Array.isArray(lesson.noteIds) && lesson.noteIds.join(',') === expected.join(','),
      `${inst.id}/${lesson.id} noteIds do not match canonical "${lesson.noteName}"`);
    check(JSON.stringify(lesson.durations) === JSON.stringify(song.durations),
      `${inst.id}/${lesson.id} durations do not match canonical "${lesson.noteName}"`);
  }
}

// Canonical table locks (guard against accidental edits to the single source).
check(CANONICAL_SONGS['Hot Cross Buns'].degrees.length === 17,
  'Hot Cross Buns must be 17 notes');
check(CANONICAL_SONGS['Hot Cross Buns'].degrees.join(',').includes('1,1,1,1,2,2,2,2'),
  'Hot Cross Buns "one a penny / two a penny" must be four repeated notes each');

// "Merrily We Roll Along" is the three-note B A G version of Mary Had a Little
// Lamb: it must stay inside degrees 1-3 and repeat the opening three times.
check(CANONICAL_SONGS['Merrily We Roll Along'].degrees.length === 25,
  'Merrily We Roll Along must be 25 notes');
check(CANONICAL_SONGS['Merrily We Roll Along'].degrees.every(d => d >= 1 && d <= 3),
  'Merrily We Roll Along must use only the first three notes (B A G)');
check(CANONICAL_SONGS['Merrily We Roll Along'].degrees.join(',') ===
  '3,2,1,2,3,3,3,2,2,2,3,3,3,3,2,1,2,3,3,3,2,2,3,2,1',
  'Merrily We Roll Along must follow the canonical B A G melody');

// "Lightly Row" is the first section of the German folk song; it steps through
// the first five notes and must stay within degrees 1-5.
check(CANONICAL_SONGS['Lightly Row'].degrees.length === 24,
  'Lightly Row must be 24 notes');
check(CANONICAL_SONGS['Lightly Row'].degrees.every(d => d >= 1 && d <= 5),
  'Lightly Row must use only the first five notes');
check(CANONICAL_SONGS['Lightly Row'].degrees.join(',') ===
  '5,3,3,4,2,2,1,2,3,4,5,5,5,5,3,3,4,2,2,1,3,5,5,1',
  'Lightly Row must follow the canonical folk melody');

// Every canonical song must declare durations matching its note count.
for (const [name, song] of Object.entries(CANONICAL_SONGS)) {
  check(song.durations.length === song.degrees.length,
    `Canonical "${name}" durations (${song.durations.length}) must match its ${song.degrees.length} notes`);
}

// The two early practice songs give a brand-new student something to play the
// moment they learn their first note(s). They must stay inside the notes they
// teach.
check(CANONICAL_SONGS['My First Note'].degrees.length === 6 &&
  CANONICAL_SONGS['My First Note'].degrees.every(d => d === 'FIRST'),
  'My First Note must use only the first note taught');
check(CANONICAL_SONGS['Step Up and Down'].degrees.length === 11,
  'Step Up and Down must be 11 notes');
check(CANONICAL_SONGS['Step Up and Down'].degrees.every(d => d === 'FIRST' || d === 'SECOND'),
  'Step Up and Down must use only the first two notes taught');
check(CANONICAL_SONGS['Step Up and Down'].degrees.includes('FIRST') &&
  CANONICAL_SONGS['Step Up and Down'].degrees.includes('SECOND'),
  'Step Up and Down must use both of the first two notes');

// Every instrument must present a practice song soon after the note(s) it uses,
// so the newest notes are immediately heard in a tune, and the first review
// must bring those songs back. These checks are deliberately order-agnostic
// (they locate notes by degree, not by array position) so the range-growth
// order can change without rewriting them.
for (const inst of Object.values(CURRICULUM)) {
  const lessons = inst.lessons || [];
  const noteLessons = lessons.filter(l => !l.type && l.degree != null);
  if (!noteLessons.length) continue;
  check(!!noteLessons.find(n => n.degree === 1 && !(n.alter || 0)),
    `${inst.id} must teach a degree-1 (tonic) note`);
  check(noteLessons.length >= 2, `${inst.id} must teach at least two notes`);

  const firstSong = lessons.find(l => l.type === 'song' && l.noteName === 'My First Note');
  check(!!firstSong, `${inst.id} must include the "My First Note" practice song`);
  if (firstSong && noteLessons[1]) {
    check(lessons.indexOf(firstSong) > lessons.indexOf(noteLessons[0]),
      `${inst.id} must place the "My First Note" song after its first taught note`);
  }

  const stepSong = lessons.find(l => l.type === 'song' && l.noteName === 'Step Up and Down');
  check(!!stepSong, `${inst.id} must include the "Step Up and Down" practice song`);
  if (stepSong && noteLessons[1]) {
    check(lessons.indexOf(stepSong) > lessons.indexOf(noteLessons[1]),
      `${inst.id} must place the "Step Up and Down" song after its second taught note`);
  }

  const review = lessons.find(l => l.type === 'review' && l.noteName === 'Review 1');
  check(review && firstSong && stepSong &&
    review.reviewLessonIds.includes(firstSong.id) &&
    review.reviewLessonIds.includes(stepSong.id),
    `${inst.id} review 1 must include both practice songs`);
}

// Every song must sit after every note it plays, so each note in the teaching
// progression is heard in a tune right after it is learned (and never before).
// This is the real contract between the range-growth order and the repertoire.
for (const inst of Object.values(CURRICULUM)) {
  const lessons = inst.lessons || [];
  const seen = new Map();
  for (let i = 0; i < lessons.length; i++) {
    const l = lessons[i];
    if (!l.type && l.degree != null) seen.set(l.id, i);
  }
  for (const lesson of lessons) {
    if (lesson.type !== 'song') continue;
    if (!CANONICAL_SONGS[lesson.noteName]) continue;
    for (const nid of lesson.noteIds || []) {
      const at = seen.get(nid);
      if (at === undefined) continue;
      check(lessons.indexOf(lesson) > at,
        `${inst.id}/${lesson.id} plays ${nid} but is taught before it`);
    }
  }
}

// The standard beginner progression schedules a practice song after each new
// note. Every scheduled name must be a real canonical song and must actually
// appear on every instrument that follows the progression (a typo in the
// schedule would otherwise silently drop the song).
{
  const scheduled = [];
  for (const step of Object.values(PROGRESSION_SCHEDULE)) {
    for (const name of step.songs || []) scheduled.push(name);
  }
  for (const name of scheduled) {
    check(!!CANONICAL_SONGS[name], `scheduled practice song "${name}" is not a canonical song`);
  }
  for (const instId of Object.keys(EXTENDED_NOTES)) {
    const inst = CURRICULUM[instId];
    const names = new Set((inst.lessons || []).filter(l => l.type === 'song').map(l => l.noteName));
    for (const name of scheduled) {
      check(names.has(name), `${instId} must include scheduled song "${name}"`);
    }
  }
}

// Every note lesson must declare its scale degree explicitly. The degree is the
// note's position in the instrument's (major) scale and is deliberately
// independent of the lesson order and the id suffix, so the range-growth order
// (and the method book it follows) can change without disturbing songs or
// chords. Degrees may fall below the tonic (0, -1, ...) or above the octave
// (> 8); `alter` (-1 flat / +1 sharp) marks chromatic notes.
for (const inst of Object.values(CURRICULUM)) {
  const keys = [];
  const naturals = [];
  const alters = [];
  for (const lesson of inst.lessons || []) {
    if (lesson.type) continue;
    check(Number.isInteger(lesson.degree),
      `${inst.id}/${lesson.id} must declare an integer degree (got ${JSON.stringify(lesson.degree)})`);
    const alter = lesson.alter || 0;
    check([-1, 0, 1].includes(alter),
      `${inst.id}/${lesson.id} alter must be -1, 0 or 1 (got ${JSON.stringify(lesson.alter)})`);
    keys.push(degreeKey(lesson.degree, alter));
    if (alter === 0) naturals.push(lesson.degree); else alters.push(lesson.degree);
    // The degree -> note index the runtime uses must agree with the lessons.
    const index = inst.noteByDegree || {};
    check(index[degreeKey(lesson.degree, alter)] === lesson.id,
      `${inst.id} noteByDegree[${degreeKey(lesson.degree, alter)}] = ${index[degreeKey(lesson.degree, alter)]} but ${lesson.id} claims it`);
  }
  check(new Set(keys).size === keys.length,
    `${inst.id} note degree keys must be unique (got ${keys.join(',')})`);
  check(naturals.includes(1), `${inst.id} must have a degree-1 (tonic) note`);
  const sorted = [...naturals].sort((a, b) => a - b);
  check(sorted.every((d, i) => d === sorted[0] + i),
    `${inst.id} natural degrees must be contiguous (got ${sorted.join(',')})`);
  for (const d of alters) {
    check(naturals.includes(d),
      `${inst.id} altered degree ${d} must have a matching natural degree`);
  }
}

// Every note's actual concert pitch must agree with its own scale degree, so a
// newly added note cannot carry a plausible-looking degree and a wrong pitch.
for (const inst of Object.values(CURRICULUM)) {
  const tonic = (inst.lessons || []).find(l => !l.type && l.degree === 1 && !(l.alter || 0));
  if (!tonic) continue;
  const tonicConcert = midiFor(tonic.noteName, tonic.octave, tonic.accidental) + (inst.transposeSemitones || 0);
  for (const l of inst.lessons || []) {
    if (l.type || l.degree == null) continue;
    const concert = midiFor(l.noteName, l.octave, l.accidental) + (inst.transposeSemitones || 0);
    const want = tonicConcert + scaleSemitones(l.degree) + (l.alter || 0);
    check(concert === want,
      `${inst.id}/${l.id} sounds concert MIDI ${concert}, expected ${want} for degree ${l.degree}${l.alter ? degreeKey(l.degree, l.alter).slice(String(l.degree).length) : ''}`);
  }
}

// Each canonical song must expand through the `degree` field: the lesson behind
// every played noteId must carry the degree the tune asked for. This is what
// lets the teaching order change without the melodies following the id suffix.
for (const inst of Object.values(CURRICULUM)) {
  const byId = {};
  for (const l of inst.lessons || []) byId[l.id] = l;
  for (const lesson of inst.lessons || []) {
    if (lesson.type !== 'song') continue;
    const song = CANONICAL_SONGS[lesson.noteName];
    if (!song) continue;
    lesson.noteIds.forEach((nid, i) => {
      const n = byId[nid];
      const resolved = resolveDegree(inst, song.degrees[i]);
      check(n && resolved && n === resolved,
        `${inst.id}/${lesson.id} note ${i} (${nid}) must be the note degree ${song.degrees[i]} resolves to` +
        (resolved ? ` (${resolved.id})` : ' (unresolved)'));
    });
  }
}

// Independent musical check: a shared song must sound like the canonical
// major-scale shape in CONCERT pitch, not merely in written degrees. This uses
// each lesson's own pitch plus the instrument's transposition, then compares
// against the major scale (an external reference). A mode error such as
// D-Dorian therefore cannot hide behind self-consistent written data.
for (const inst of Object.values(CURRICULUM)) {
  const byId = {};
  for (const l of inst.lessons || []) byId[l.id] = l;
  const tonic = (inst.lessons || []).find(l => !l.type && l.degree === 1 && !(l.alter || 0));
  if (!tonic) { check(false, `${inst.id} has no degree-1 (tonic) note`); continue; }
  const tonicConcert = midiFor(tonic.noteName, tonic.octave, tonic.accidental) + (inst.transposeSemitones || 0);
  for (const lesson of inst.lessons || []) {
    if (lesson.type !== 'song') continue;
    const song = CANONICAL_SONGS[lesson.noteName];
    if (!song) continue;
    lesson.noteIds.forEach((nid, i) => {
      const n = byId[nid];
      if (!n) return; // unknown note id already reported above
      const deg = song.degrees[i];
      let step, alt;
      if (deg === 'FIRST' || deg === 'SECOND') {
        const r = resolveDegree(inst, deg);
        if (!r) return;
        step = r.degree; alt = r.alter || 0;
      } else {
        ({ step, alt } = degreeStepOf(deg));
      }
      if (!Number.isInteger(step)) return; // unresolved token reported above
      const concert = midiFor(n.noteName, n.octave, n.accidental) + (inst.transposeSemitones || 0);
      const want = tonicConcert + scaleSemitones(step) + alt;
      check(concert === want,
        `${inst.id}/${lesson.id} note ${i} (${nid}) sounds concert MIDI ${concert}, expected ${want} for degree ${deg}`);
    });
  }
}
if (failures.length) console.log(failures.join('\n'));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
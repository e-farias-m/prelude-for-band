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
const { CURRICULUM, CANONICAL_SONGS } = new Function(src + '\nreturn { CURRICULUM, CANONICAL_SONGS };')();

let pass = 0;
let fail = 0;
const failures = [];
function check(cond, msg) {
  if (cond) { pass++; } else { fail++; failures.push(msg); }
}

const LETTER = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const DIA = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };

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
  },
  'french-horn': {
    'fh-1': [F, F, F], 'fh-2': [T, F, F], 'fh-3': [F, F, F], 'fh-4': [T, F, F],
    'fh-5': [F, F, F], 'fh-6': [T, T, F], 'fh-7': [F, T, F], 'fh-8': [F, F, F],
  },
  euphonium: {
    'eu-1': [F, F, F], 'eu-2': [T, F, T], 'eu-3': [T, T, F], 'eu-4': [T, F, F],
    'eu-5': [F, F, F], 'eu-6': [T, T, F], 'eu-7': [F, T, F], 'eu-8': [F, F, F],
  },
  tuba: {
    'tu-1': [F, F, F], 'tu-2': [T, F, T], 'tu-3': [T, T, F], 'tu-4': [T, F, F],
    'tu-5': [F, F, F], 'tu-6': [T, T, F], 'tu-7': [F, T, F], 'tu-8': [F, F, F],
  },
  trombone: {
    'tb-1': 1, 'tb-2': 6, 'tb-3': 4, 'tb-4': 3, 'tb-5': 1, 'tb-6': 4, 'tb-7': 2, 'tb-8': 1,
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
    const prefix = lesson.id.replace(/-song-\d+$/, '');
    const expected = song.degrees.map(d => `${prefix}-${d}`);
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

// Independent musical check: a shared song must sound like the canonical
// major-scale shape in CONCERT pitch, not merely in written degrees. This uses
// each lesson's own pitch plus the instrument's transposition, then compares
// against the major scale (an external reference). A mode error such as
// D-Dorian therefore cannot hide behind self-consistent written data.
const MAJOR = { 1: 0, 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11, 8: 12 };
for (const inst of Object.values(CURRICULUM)) {
  const byId = {};
  for (const l of inst.lessons || []) byId[l.id] = l;
  for (const lesson of inst.lessons || []) {
    if (lesson.type !== 'song') continue;
    const song = CANONICAL_SONGS[lesson.noteName];
    if (!song) continue;
    const prefix = lesson.id.replace(/-song-\d+$/, '');
    const tonic = byId[`${prefix}-1`];
    if (!tonic) { check(false, `${inst.id}/${lesson.id} has no ${prefix}-1 tonic`); continue; }
    const tonicConcert = midiFor(tonic.noteName, tonic.octave, tonic.accidental) + (inst.transposeSemitones || 0);
    lesson.noteIds.forEach((nid, i) => {
      const n = byId[nid];
      if (!n) return; // unknown note id already reported above
      const concert = midiFor(n.noteName, n.octave, n.accidental) + (inst.transposeSemitones || 0);
      const want = tonicConcert + MAJOR[song.degrees[i]];
      check(concert === want,
        `${inst.id}/${lesson.id} note ${i} (${nid}) sounds concert MIDI ${concert}, expected ${want} for degree ${song.degrees[i]}`);
    });
  }
}
if (failures.length) console.log(failures.join('\n'));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
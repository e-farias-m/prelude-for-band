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
const CURRICULUM = new Function(src + '\nreturn CURRICULUM;')();

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
    'fl-1': [T, T, T, T, T, T, T, F, F], // D4  T 123|123
    'fl-2': [T, T, T, T, T, T, F, T, F], // E4  T 123|12- Eb
    'fl-3': [T, T, T, T, T, F, F, T, F], // F4  T 123|1-- Eb
    'fl-4': [T, T, T, T, F, F, F, T, F], // G4  T 123|--- Eb
    'fl-5': [T, T, T, F, F, F, F, T, F], // A4  T 12-|--- Eb
    'fl-6': [T, T, F, F, F, F, F, T, F], // B4  T 1--|--- Eb
    'fl-7': [F, T, F, F, F, F, F, T, F], // C5  1--|--- (thumb off) Eb
    'fl-8': [T, F, T, T, T, T, T, F, F], // D5  T 023|123
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
    'ob-1': [F, T, T, T, T, T, T, F, F], // D4  123|123
    'ob-2': [F, T, T, T, T, T, F, F, F], // E4  123|12-
    'ob-3': [F, T, T, T, T, T, F, F, F, T], // F4  123|12 + F resonance key
    'ob-4': [F, T, T, T, F, F, F, F, F], // G4  123|---
    'ob-5': [F, T, T, F, F, F, F, F, F], // A4  12-|---
    'ob-6': [F, T, F, F, F, F, F, F, F], // B4  1--|--- (no octave key)
    'ob-7': [F, T, F, F, T, F, F, F, F], // C5  1--|1-- (no octave key)
    'ob-8': [T, F, T, T, T, T, T, F, F], // D5  (I) 023|123
  },
  bassoon: {
    'bn-1': [T, T, T, F, F, F, F, F, F], // D3  W 12-|---
    'bn-2': [T, T, F, F, F, F, F, F, F], // E3  W 1--|---
    'bn-3': [T, F, F, F, F, F, F, F, F], // F3  W ---|---
    'bn-4': [T, F, T, T, T, T, T, F, F], // G3  W (~)23|123 (half-hole shown open)
    'bn-5': [F, T, T, T, T, T, F, F, F], // A3  123|12-
    'bn-6': [F, T, T, T, T, F, F, F, F], // B3  123|1--
    'bn-7': [F, T, T, T, F, F, F, F, F], // C4  123|---
    'bn-8': [F, T, T, F, F, F, F, F, F], // D4  12-|---
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

if (failures.length) console.log(failures.join('\n'));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
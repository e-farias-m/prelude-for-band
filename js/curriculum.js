// curriculum.js
// Instrument and lesson data for Prelude for Band
//
// staffStep: treble clef position where 0 = E4 (bottom line)
//   Each diatonic step UP = +1. Lines are at steps 0,2,4,6,8.
//   E4=0, F4=1, G4=2, A4=3, B4=4, C5=5, D5=6, E5=7, F5=8
//   G5=9, A5=10(ledger above), B5=11, C6=12(ledger above)
//   Middle C (C4) = -2 (ledger line below)
//
// freq: concert pitch in Hz (what the app synthesises)
//
// fingeringState for recorder: [thumb, h1, h2, h3, h4, h5, h6, h7]
//   true = hole covered, false = open
//
// fingeringState for trumpet/euphonium: [v1, v2, v3]
//   true = valve pressed

const CURRICULUM = {

  // ── TRUMPET (Bb) ────────────────────────────────────────────────────────
  'trumpet': {
    id: 'trumpet',
    name: 'Trumpet',
    shortName: 'Trumpet',
    clef: 'treble',
    fingeringType: 'trumpet',
    isTransposing: true,
    transposeSemitones: -2,   // Bb instrument: concert = written - M2
    accentColor: '#D4A017',
    available: true,
    lessons: [
      {
        id: 'tr-1',
        noteName: 'G',
        octave: 4,
        concertNote: 'F4',
        staffStep: 2,         // Written G4 = second line of treble staff
        accidental: null,
        freq: 349.23,         // Concert F4
        fingeringState: [false, false, false],
        description: 'Your first note — no valves! Just air and embouchure.',
        prompt: 'Fingers rest gently on the valves but press nothing. Form your embouchure and blow a steady, supported stream of air.'
      },
      {
        id: 'tr-2',
        noteName: 'C',
        octave: 5,
        concertNote: 'B♭4',
        staffStep: 5,         // Written C5 = 3rd space of treble staff
        accidental: null,
        freq: 466.16,         // Concert Bb4
        fingeringState: [false, false, false],
        description: 'Same open fingering — tighten the lips slightly and blow faster.',
        prompt: 'No valves! Make the air faster and your lips slightly firmer. This is a harmonic overtone above G — same pipe, higher buzz.'
      },
      {
        id: 'tr-3',
        noteName: 'F',
        octave: 4,
        concertNote: 'E♭4',
        staffStep: 1,         // Written F4 = first space of treble staff
        accidental: null,
        freq: 311.13,         // Concert Eb4
        fingeringState: [true, false, false],
        description: 'Press valve 1 with your index finger.',
        prompt: 'Index finger presses valve 1 down. Relax your embouchure slightly compared to G — this is a lower, more open sound.'
      },
      {
        id: 'tr-4',
        noteName: 'E',
        octave: 4,
        concertNote: 'D4',
        staffStep: 0,         // Written E4 = bottom line of treble staff
        accidental: null,
        freq: 293.66,         // Concert D4
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 together — index and middle finger.',
        prompt: 'Press valves 1 and 2 simultaneously. Even finger pressure, quick and clean valve movement.'
      },
      {
        id: 'tr-5',
        noteName: 'A',
        octave: 4,
        concertNote: 'G4',
        staffStep: 3,
        accidental: null,
        freq: 392.00,
        fingeringState: [true, true, false],
        description: 'Same 1–2 fingering as E, but overblow to the next harmonic.',
        prompt: 'Same valves 1+2 as E. Make the air faster and firm the lips — you\'ll jump up to A. Listen for the pitch to "lock in."'
      },
      {
        id: 'tr-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['tr-1', 'tr-3', 'tr-4'],
        description: 'A classic English nursery rhyme using G, F, and E — your first three fingerings.',
        prompt: 'Step through each note of the melody. The pattern repeats — feel how the valves move in sequence!',
        noteIds: ['tr-1', 'tr-3', 'tr-4', 'tr-1', 'tr-3', 'tr-4', 'tr-4', 'tr-4', 'tr-4', 'tr-3', 'tr-3', 'tr-3', 'tr-3', 'tr-1', 'tr-3', 'tr-4'],
      },
      {
        id: 'tr-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5'],
        description: 'The tune behind "Mary Had a Little Lamb" using G, A, G, F, and E.',
        prompt: 'Listen for the repeating three-note pattern! This song adds A into your note set.',
        noteIds: ['tr-1', 'tr-5', 'tr-1', 'tr-3', 'tr-4', 'tr-1', 'tr-5', 'tr-1', 'tr-3', 'tr-4', 'tr-1', 'tr-5', 'tr-1', 'tr-3', 'tr-4', 'tr-3', 'tr-3', 'tr-4', 'tr-4', 'tr-1', 'tr-5', 'tr-1', 'tr-3', 'tr-4'],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'tr-review-1',
        type: 'review',
        reviewLessonIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-song-1', 'tr-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — G, C, F, E, and A.',
        prompt: '',
      },
      // ── Lessons 6–8: expanding the range ────────────────────────────────
      {
        id: 'tr-6',
        noteName: 'D',
        octave: 4,
        concertNote: 'C4',
        staffStep: -1,
        accidental: null,
        freq: 261.63,
        fingeringState: [true, false, true],
        description: 'Valves 1 and 3 together — your lowest note yet.',
        prompt: 'Press valves 1 and 3. Keep your embouchure relaxed and air warm. This low D needs a full, supported breath.'
      },
      {
        id: 'tr-7',
        noteName: 'B\u266d',
        octave: 4,
        concertNote: 'A\u266d4',
        staffStep: 4,
        accidental: '\u266d',
        freq: 415.30,
        fingeringState: [true, false, true],
        description: 'Bb uses the same 1–3 fingering as D but in a different harmonic.',
        prompt: 'Valves 1 and 3 again. Faster air than D4 — aim for the higher harmonic. Listen for the Bb to lock in.'
      },
      {
        id: 'tr-8',
        noteName: 'D',
        octave: 5,
        concertNote: 'C5',
        staffStep: 6,
        accidental: null,
        freq: 523.25,
        fingeringState: [false, false, false],
        description: 'Open fingering again — the 3rd harmonic of the trumpet\'s bugle.',
        prompt: 'No valves! Same open fingering as G4 and C5. Tighten lips and blow faster air than C5 to reach this D5.'
      },
      {
        id: 'tr-song-3', type: 'song',
        noteName: 'Lightly Row',
        prerequisiteIds: ['tr-1', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8'],
        description: 'A traditional German folk song spanning your full range — D4 up to D5.',
        prompt: 'This song uses your lowest and highest notes together. Take it slowly!',
        noteIds: ['tr-5', 'tr-1', 'tr-3', 'tr-4', 'tr-6', 'tr-5', 'tr-1', 'tr-3', 'tr-4', 'tr-6', 'tr-1', 'tr-1', 'tr-5', 'tr-5', 'tr-3', 'tr-3', 'tr-4', 'tr-4', 'tr-6', 'tr-6', 'tr-5', 'tr-1', 'tr-3', 'tr-4', 'tr-6'],
      },
      {
        id: 'tr-song-4', type: 'song',
        noteName: 'Trumpet Tune',
        prerequisiteIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8'],
        description: 'A bright fanfare-like melody using all your trumpet notes.',
        prompt: 'This fanfare leaps between open and valve combinations. Keep the air strong!',
        noteIds: ['tr-1', 'tr-2', 'tr-8', 'tr-2', 'tr-1', 'tr-7', 'tr-4', 'tr-3', 'tr-6', 'tr-3', 'tr-4', 'tr-5', 'tr-1', 'tr-2', 'tr-8', 'tr-1'],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'tr-review-2',
        type: 'review',
        reviewLessonIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8', 'tr-song-3', 'tr-song-4'],
        noteName: 'Review 2',
        description: 'Review all trumpet notes and songs together.',
        prompt: '',
      },
    ]
  },

  // ── FLUTE ────────────────────────────────────────────────────────────────
  'flute': {
    id: 'flute', name: 'Flute', shortName: 'Flute',
    clef: 'treble', fingeringType: 'flute', isTransposing: false, available: true, accentColor: '#7BAFC0',
    lessons: [
      {
        id: 'fl-1',
        noteName: 'D',
        octave: 4,
        staffStep: -1,
        accidental: null,
        freq: 293.66,
        fingeringState: [true, true, true, true, true, true, true, false, false],
        description: 'D — all main keys covered. Left thumb and all three left-hand fingers, plus all three right hand fingers.',
        prompt: 'Left thumb on the key. Left index, middle, and ring all cover their keys. Right index, middle, and ring too. Your right pinky stays up. Blow across the embouchure hole with a focused, steady stream.'
      },
      {
        id: 'fl-2',
        noteName: 'E',
        octave: 4,
        staffStep: 0,
        accidental: null,
        freq: 329.63,
        fingeringState: [true, true, true, true, true, true, false, true, false],
        description: 'E — lift your right ring finger and press the Eb key with your pinky.',
        prompt: 'Same as D4 but lift right ring finger and add the Eb key with your pinky. Keep the air stream steady.'
      },
      {
        id: 'fl-3',
        noteName: 'F',
        octave: 4,
        staffStep: 1,
        accidental: null,
        freq: 349.23,
        fingeringState: [true, true, true, true, false, false, true, true, false],
        description: 'Forked F — right ring finger and pinky only in the right hand.',
        prompt: 'Left thumb + all three left fingers down. Right ring finger and pinky only. This forked pattern needs careful air support.'
      },
      {
        id: 'fl-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['fl-1', 'fl-2', 'fl-3'],
        description: 'A classic English nursery rhyme using D, E, and F — your first three flute notes.',
        prompt: 'Step through each note slowly. Notice how your right hand alternates between keys!',
        noteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-1', 'fl-2', 'fl-3', 'fl-3', 'fl-3', 'fl-3', 'fl-2', 'fl-2', 'fl-2', 'fl-2', 'fl-1', 'fl-2', 'fl-3'],
      },
      {
        id: 'fl-4',
        noteName: 'G',
        octave: 4,
        staffStep: 2,
        accidental: null,
        freq: 392.00,
        fingeringState: [true, true, true, true, false, false, false, true, false],
        description: 'G — left hand only plus the Eb key with your right pinky.',
        prompt: 'Left thumb + all three left fingers down. Right pinky on the Eb key. Right index, middle, and ring stay up. A warm, open flute note.'
      },
      {
        id: 'fl-5',
        noteName: 'A',
        octave: 4,
        staffStep: 3,
        accidental: null,
        freq: 440.00,
        fingeringState: [true, true, true, false, false, false, false, true, false],
        description: 'A — lift your left ring finger. Just thumb and first two left fingers plus Eb key.',
        prompt: 'Left thumb + left index + left middle. Left ring finger lifts. Right pinky on the Eb key. A beautifully resonant flute note.'
      },
      {
        id: 'fl-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5'],
        description: 'The tune behind "Mary Had a Little Lamb" using D, E, F, G, and A.',
        prompt: 'Your first five-note melody! Listen for the repeating phrase pattern.',
        noteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-2', 'fl-1', 'fl-1', 'fl-1', 'fl-2', 'fl-2', 'fl-2', 'fl-1', 'fl-1', 'fl-1', 'fl-1', 'fl-2', 'fl-3', 'fl-2', 'fl-1', 'fl-1', 'fl-1', 'fl-2', 'fl-2', 'fl-1', 'fl-2', 'fl-3'],
      },
    ]
  },

  // ── CLARINET (Bb) ───────────────────────────────────────────────────────
  'clarinet': {
    id: 'clarinet', name: 'Clarinet', shortName: 'Clarinet',
    clef: 'treble', fingeringType: 'clarinet', isTransposing: true, transposeSemitones: -2, available: true, accentColor: '#4A3826',
    lessons: [
      {
        id: 'cl-1',
        noteName: 'E',
        octave: 4,
        concertNote: 'D4',
        staffStep: 0,
        accidental: null,
        freq: 293.66,
        fingeringState: [true, true, false, false, false, false, false, false, false],
        description: 'E (written) — first note above the break! Register key plus A key.',
        prompt: 'Left thumb presses the register key (back of the clarinet). Left index finger presses the A key. Everything else stays open. Blow a warm, steady stream through the mouthpiece.'
      },
      {
        id: 'cl-2',
        noteName: 'F',
        octave: 4,
        concertNote: 'E\u266d4',
        staffStep: 1,
        accidental: null,
        freq: 311.13,
        fingeringState: [true, true, false, false, true, false, false, false, false],
        description: 'F — add the E/B key with your right index finger.',
        prompt: 'Register key + A key (left index) + E/B key (right index). All other keys open. Keep the embouchure firm and the air supported.'
      },
      {
        id: 'cl-3',
        noteName: 'G',
        octave: 4,
        concertNote: 'F4',
        staffStep: 2,
        accidental: null,
        freq: 349.23,
        fingeringState: [true, true, true, false, false, false, false, false, false],
        description: 'G — add left middle finger. Three keys down now.',
        prompt: 'Register key + A key + G key (left middle). All other keys open. This note sits nicely in the clarion register.'
      },
      {
        id: 'cl-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['cl-1', 'cl-2', 'cl-3'],
        description: 'A classic English nursery rhyme using E, F, and G — your first three clarinet notes.',
        prompt: 'Step through each note carefully. Feel how the register key stays pressed throughout!',
        noteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-1', 'cl-2', 'cl-3', 'cl-3', 'cl-3', 'cl-3', 'cl-2', 'cl-2', 'cl-2', 'cl-2', 'cl-1', 'cl-2', 'cl-3'],
      },
      {
        id: 'cl-4',
        noteName: 'A',
        octave: 4,
        concertNote: 'G4',
        staffStep: 3,
        accidental: null,
        freq: 392.00,
        fingeringState: [true, true, true, true, false, false, false, false, false],
        description: 'A — add left ring finger. All three left-hand fingers down.',
        prompt: 'Register key + all three left hand fingers (A, G, E keys). Right hand stays open. Listen for a round, woody clarinet tone.'
      },
      {
        id: 'cl-5',
        noteName: 'B',
        octave: 4,
        concertNote: 'A4',
        staffStep: 4,
        accidental: null,
        freq: 440.00,
        fingeringState: [true, true, true, true, true, false, false, false, false],
        description: 'B — add right index finger. Climbing the clarion register!',
        prompt: 'Register key + all three left fingers + right index (E/B key). This is the highest of your first five clarinet notes. Keep the air fast and steady.'
      },
      {
        id: 'cl-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-4', 'cl-5'],
        description: 'The tune behind "Mary Had a Little Lamb" using E, F, G, A, and B.',
        prompt: 'Your first five-note clarinet melody! Great for practising finger coordination.',
        noteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-2', 'cl-1', 'cl-1', 'cl-1', 'cl-2', 'cl-2', 'cl-2', 'cl-1', 'cl-1', 'cl-1', 'cl-1', 'cl-2', 'cl-3', 'cl-2', 'cl-1', 'cl-1', 'cl-1', 'cl-2', 'cl-2', 'cl-1', 'cl-2', 'cl-3'],
      },
    ]
  },

  // ── ALTO SAXOPHONE (Eb) ─────────────────────────────────────────────────
  'alto-saxophone': {
    id: 'alto-saxophone', name: 'Alto Saxophone', shortName: 'Alto Sax',
    clef: 'treble', fingeringType: 'saxophone', isTransposing: true, transposeSemitones: -9, available: true, accentColor: '#B08020',
    lessons: [
      {
        id: 'as-1',
        noteName: 'C',
        octave: 4,
        concertNote: 'E\u266d3',
        staffStep: -2,
        accidental: null,
        freq: 155.56,
        fingeringState: [false, true, true, true, true, true, true, true, false],
        description: 'Low C (written) — all fingers down including the low C key.',
        prompt: 'Left thumb stays off (no octave key in the low register). All three left-hand fingers and all four right-hand fingers down. Blow a warm, steady stream through the mouthpiece.'
      },
      {
        id: 'as-2',
        noteName: 'D',
        octave: 4,
        concertNote: 'F3',
        staffStep: -1,
        accidental: null,
        freq: 174.61,
        fingeringState: [false, true, true, true, true, true, true, false, false],
        description: 'D — lift your right pinky. One step up from low C.',
        prompt: 'Same as C but lift your right pinky off the low C key. Left thumb stays off. Keep the air supported.'
      },
      {
        id: 'as-3',
        noteName: 'E',
        octave: 4,
        concertNote: 'G3',
        staffStep: 0,
        accidental: null,
        freq: 196.00,
        fingeringState: [false, true, true, true, true, true, false, false, false],
        description: 'E — right ring and pinky lift.',
        prompt: 'Left thumb off. All three left-hand fingers down. Right index and middle down. Ring and pinky up. Keep the embouchure firm.'
      },
      {
        id: 'as-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['as-1', 'as-2', 'as-3'],
        description: 'A classic English nursery rhyme using C, D, and E — your first three alto sax notes.',
        prompt: 'Step through each note. Feel the right hand lifting one finger at a time!',
        noteIds: ['as-1', 'as-2', 'as-3', 'as-1', 'as-2', 'as-3', 'as-3', 'as-3', 'as-3', 'as-2', 'as-2', 'as-2', 'as-2', 'as-1', 'as-2', 'as-3'],
      },
      {
        id: 'as-4',
        noteName: 'F',
        octave: 4,
        concertNote: 'A\u266d3',
        staffStep: 1,
        accidental: null,
        freq: 207.65,
        fingeringState: [false, true, true, true, false, true, false, false, false],
        description: 'F — right middle finger only. A forked feel.',
        prompt: 'Left thumb off. All three left-hand fingers down. Only right middle finger presses its key. Index, ring, and pinky stay up. A core saxophone pattern.'
      },
      {
        id: 'as-5',
        noteName: 'G',
        octave: 4,
        concertNote: 'B\u266d3',
        staffStep: 2,
        accidental: null,
        freq: 233.08,
        fingeringState: [false, true, true, true, false, false, false, false, false],
        description: 'G — left hand only. A wide-open, resonant note.',
        prompt: 'Left thumb off. All three left-hand fingers down. Right hand completely open. Blow with a confident, supported stream of air.'
      },
      {
        id: 'as-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5'],
        description: 'The tune behind "Mary Had a Little Lamb" using C, D, E, F, and G.',
        prompt: 'Your first five-note saxophone melody! Keep the air steady throughout.',
        noteIds: ['as-1', 'as-2', 'as-3', 'as-2', 'as-1', 'as-1', 'as-1', 'as-2', 'as-2', 'as-2', 'as-1', 'as-1', 'as-1', 'as-1', 'as-2', 'as-3', 'as-2', 'as-1', 'as-1', 'as-1', 'as-2', 'as-2', 'as-1', 'as-2', 'as-3'],
      },
    ]
  },

  // ── OBOE ─────────────────────────────────────────────────────────────────
  'oboe': {
    id: 'oboe', name: 'Oboe', shortName: 'Oboe',
    clef: 'treble', fingeringType: 'oboe', isTransposing: false, available: true, accentColor: '#6B4C2A',
    lessons: [
      {
        id: 'ob-1',
        noteName: 'D',
        octave: 4,
        staffStep: -1,
        accidental: null,
        freq: 293.66,
        fingeringState: [false, true, true, true, true, true, true, false, false],
        description: 'D — first oboe note. All main keys covered, no octave key needed.',
        prompt: 'Left thumb off (no octave key in low register). All three left-hand fingers down. All three right-hand fingers down. Shape your embouchure with firm corners and blow a thin, focused air stream through the reed.'
      },
      {
        id: 'ob-2',
        noteName: 'E',
        octave: 4,
        staffStep: 0,
        accidental: null,
        freq: 329.63,
        fingeringState: [false, true, true, true, true, true, false, false, false],
        description: 'E — lift your right ring finger.',
        prompt: 'Same as D4 but lift your right ring finger. Support the air from the diaphragm and keep the embouchure steady. Listen for a clear, singing E.'
      },
      {
        id: 'ob-3',
        noteName: 'F',
        octave: 4,
        staffStep: 1,
        accidental: null,
        freq: 349.23,
        fingeringState: [false, true, true, true, true, false, false, false, false],
        description: 'F — just left hand plus right index. An open, centered note.',
        prompt: 'Left thumb off. All three left-hand fingers down. Only right index finger down. Ring and middle stay up. This F speaks easily with good air support.'
      },
      {
        id: 'ob-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['ob-1', 'ob-2', 'ob-3'],
        description: 'A classic English nursery rhyme using D, E, and F — your first three oboe notes.',
        prompt: 'Step through each note gently. Keep your embouchure firm and air supported!',
        noteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-1', 'ob-2', 'ob-3', 'ob-3', 'ob-3', 'ob-3', 'ob-2', 'ob-2', 'ob-2', 'ob-2', 'ob-1', 'ob-2', 'ob-3'],
      },
      {
        id: 'ob-4',
        noteName: 'G',
        octave: 4,
        staffStep: 2,
        accidental: null,
        freq: 392.00,
        fingeringState: [false, true, true, true, false, false, false, false, false],
        description: 'G — left hand only! A warm, open oboe note.',
        prompt: 'Left thumb off. All three left-hand fingers down. Right hand completely open. Support the air well and listen for a clear, singing tone.'
      },
      {
        id: 'ob-5',
        noteName: 'A',
        octave: 4,
        staffStep: 3,
        accidental: null,
        freq: 440.00,
        fingeringState: [false, true, true, false, false, false, false, false, false],
        description: 'A — lift your left ring finger. Just first two fingers.',
        prompt: 'Left thumb off. Left index and middle down. Left ring finger lifts. Right hand completely open. Keep the air moving forward and the reed vibrating freely.'
      },
      {
        id: 'ob-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5'],
        description: 'The tune behind "Mary Had a Little Lamb" using D, E, F, G, and A.',
        prompt: 'Your first five-note oboe melody! Focus on smooth connections between each note.',
        noteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-2', 'ob-1', 'ob-1', 'ob-1', 'ob-2', 'ob-2', 'ob-2', 'ob-1', 'ob-1', 'ob-1', 'ob-1', 'ob-2', 'ob-3', 'ob-2', 'ob-1', 'ob-1', 'ob-1', 'ob-2', 'ob-2', 'ob-1', 'ob-2', 'ob-3'],
      },
    ]
  },

  // ── BASSOON (bass clef) ─────────────────────────────────────────────────
  'bassoon': {
    id: 'bassoon', name: 'Bassoon', shortName: 'Bassoon',
    clef: 'bass', fingeringType: 'bassoon', isTransposing: false, available: true, accentColor: '#7A5C30',
    lessons: [
      {
        id: 'bn-1',
        noteName: 'D',
        octave: 3,
        staffStep: 4,
        accidental: null,
        freq: 146.83,
        fingeringState: [true, true, true, true, true, true, true, false, false],
        description: 'Low D — whisper key on, all main fingers down.',
        prompt: 'Left thumb presses the whisper key. All three left-hand and all three right-hand fingers down. Right pinky stays up. Blow a slow, wide stream of air and feel the reed vibrate freely.'
      },
      {
        id: 'bn-2',
        noteName: 'E',
        octave: 3,
        staffStep: 5,
        accidental: null,
        freq: 164.81,
        fingeringState: [true, true, true, false, true, true, true, false, false],
        description: 'E — lift your left ring finger to open the E tone hole.',
        prompt: 'Same as D3 but lift your left ring finger. The whisper key stays on. This opens the E hole on the wing joint. Keep the air warm and steady.'
      },
      {
        id: 'bn-3',
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: [true, true, true, true, false, true, false, false, false],
        description: 'F — a forked pattern. Right middle down, ring up.',
        prompt: 'Whisper key on. All three left-hand fingers down. Right middle finger down. Right index and ring stay up. This forked fingering is characteristic of the bassoon. Blow steadily.'
      },
      {
        id: 'bn-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['bn-1', 'bn-2', 'bn-3'],
        description: 'A classic English nursery rhyme using D, E, and F — your first three bassoon notes.',
        prompt: 'Step through each note with warm, supported air. The whisper key stays on throughout!',
        noteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-1', 'bn-2', 'bn-3', 'bn-3', 'bn-3', 'bn-3', 'bn-2', 'bn-2', 'bn-2', 'bn-2', 'bn-1', 'bn-2', 'bn-3'],
      },
      {
        id: 'bn-4',
        noteName: 'G',
        octave: 3,
        staffStep: 7,
        accidental: null,
        freq: 196.00,
        fingeringState: [true, true, true, false, false, false, false, false, false],
        description: 'G — left hand only, whisper key on.',
        prompt: 'Whisper key on. All three left-hand fingers down. Right hand completely open. Blow a warm, supported stream of air.'
      },
      {
        id: 'bn-5',
        noteName: 'A',
        octave: 3,
        staffStep: 8,
        accidental: null,
        freq: 220.00,
        fingeringState: [true, true, false, false, false, false, false, false, false],
        description: 'A — just your first two left-hand fingers and the whisper key.',
        prompt: 'Whisper key on. Left index and middle down. Left ring finger lifts. Right hand stays open. A3 has a clear, singing quality at the top line of the bass staff.'
      },
      {
        id: 'bn-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5'],
        description: 'The tune behind "Mary Had a Little Lamb" using D, E, F, G, and A.',
        prompt: 'Your first five-note bassoon melody! Rich, warm air for every note.',
        noteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-2', 'bn-1', 'bn-1', 'bn-1', 'bn-2', 'bn-2', 'bn-2', 'bn-1', 'bn-1', 'bn-1', 'bn-1', 'bn-2', 'bn-3', 'bn-2', 'bn-1', 'bn-1', 'bn-1', 'bn-2', 'bn-2', 'bn-1', 'bn-2', 'bn-3'],
      },
    ]
  },
  'trombone': {
    id: 'trombone', name: 'Trombone', shortName: 'Trombone',
    clef: 'bass', fingeringType: 'trombone', available: true, accentColor: '#C0A020',
    lessons: [
      {
        id: 'tb-1',
        noteName: 'B\u266d',
        octave: 3,
        staffStep: 9,
        accidental: '\u266d',
        freq: 233.08,
        fingeringState: 1,
        description: '1st position — slide all the way in!',
        prompt: 'Slide all the way in to 1st position. Buzz a firm, centered buzz. Bb is the most resonant note on the trombone.'
      },
      {
        id: 'tb-2',
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: 6,
        description: 'F is in 6th position — a long reach!',
        prompt: 'Extend the slide to 6th position (just before the bell flare). Keep the slide arm straight and relaxed. Buzz firmly.'
      },
      {
        id: 'tb-3',
        noteName: 'B\u266d',
        octave: 2,
        staffStep: 2,
        accidental: '\u266d',
        freq: 116.54,
        fingeringState: 1,
        description: 'Same 1st position, lower octave — a bigger buzz.',
        prompt: 'Same 1st position as your first Bb. Loosen your embouchure and use more air — this is one octave lower. Feel the vibration.'
      },
      {
        id: 'tb-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['tb-1', 'tb-2', 'tb-3'],
        description: 'A classic English nursery rhyme using Bb3, F3, and Bb2 — your first three slide positions.',
        prompt: 'Step through each note. Feel the slide moving between 1st, 6th, and back to 1st!',
        noteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-1', 'tb-2', 'tb-3', 'tb-3', 'tb-3', 'tb-3', 'tb-2', 'tb-2', 'tb-2', 'tb-2', 'tb-1', 'tb-2', 'tb-3'],
      },
      {
        id: 'tb-4',
        noteName: 'D',
        octave: 3,
        staffStep: 4,
        accidental: null,
        freq: 146.83,
        fingeringState: 4,
        description: 'D in 4th position — right in the middle.',
        prompt: 'Slide to 4th position (the slide handle should line up with your bell). This is a natural overtone of the open horn.'
      },
      {
        id: 'tb-5',
        noteName: 'F',
        octave: 4,
        staffStep: 13,
        accidental: null,
        freq: 349.23,
        fingeringState: 1,
        description: 'Higher F — 1st position again!',
        prompt: '1st position, higher buzz. Tighten your lips and speed up the air. Same slide position as Bb but a higher overtone.'
      },
      {
        id: 'tb-song-2', type: 'song',
        noteName: 'Slide Serenade',
        prerequisiteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4'],
        description: 'A melodic phrase connecting all your slide positions — 1st, 6th, 1st, and 4th.',
        prompt: 'This song moves through each position in sequence. Keep the buzz steady!',
        noteIds: ['tb-1', 'tb-4', 'tb-2', 'tb-3', 'tb-3', 'tb-2', 'tb-4', 'tb-1', 'tb-1', 'tb-4', 'tb-2', 'tb-3', 'tb-3', 'tb-2', 'tb-4', 'tb-1'],
      },
    ]
  },
  'french-horn': {
    id: 'french-horn', name: 'French Horn', shortName: 'Fr. Horn',
    clef: 'treble', fingeringType: 'horn', isTransposing: true, transposeSemitones: -7, available: true, accentColor: '#C06030',
    lessons: [
      {
        id: 'fh-1',
        noteName: 'C',
        octave: 4,
        concertNote: 'F3',
        staffStep: -2,
        accidental: null,
        freq: 174.61,
        fingeringState: [false, false, false],
        description: 'Open — no valves! The horn\'s natural note.',
        prompt: 'No valves pressed. Buzz with firm lips into the mouthpiece. The hand in the bell stays cupped and relaxed. Middle C on the horn is a great starting sound.'
      },
      {
        id: 'fh-2',
        noteName: 'G',
        octave: 4,
        concertNote: 'C4',
        staffStep: 2,
        accidental: null,
        freq: 261.63,
        fingeringState: [false, false, false],
        description: 'Same open fingering, higher harmonic.',
        prompt: 'Still no valves. Tighten the embouchure slightly and blow faster air. This is the 3rd harmonic above your C.'
      },
      {
        id: 'fh-3',
        noteName: 'C',
        octave: 5,
        concertNote: 'F4',
        staffStep: 5,
        accidental: null,
        freq: 349.23,
        fingeringState: [false, false, false],
        description: 'Another open note — the octave above your first C.',
        prompt: 'Open again! More air speed, firmer lips. This C5 is the 4th harmonic. Listen for a clear, ringing tone.'
      },
      {
        id: 'fh-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['fh-1', 'fh-2', 'fh-3'],
        description: 'A classic melody using C4, G4, and C5 — your first three horn harmonics.',
        prompt: 'Step through each note. All open — feel the harmonics change with your air speed!',
        noteIds: ['fh-1', 'fh-2', 'fh-3', 'fh-1', 'fh-2', 'fh-3', 'fh-3', 'fh-3', 'fh-3', 'fh-2', 'fh-2', 'fh-2', 'fh-2', 'fh-1', 'fh-2', 'fh-3'],
      },
      {
        id: 'fh-4',
        noteName: 'E',
        octave: 4,
        concertNote: 'A3',
        staffStep: 0,
        accidental: null,
        freq: 220.00,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 together.',
        prompt: 'Press valves 1 and 2. The air feels similar to open C but the pitch drops. Relax the embouchure slightly.'
      },
      {
        id: 'fh-5',
        noteName: 'F',
        octave: 4,
        concertNote: 'B\u266d3',
        staffStep: 1,
        accidental: null,
        freq: 233.08,
        fingeringState: [true, false, false],
        description: 'Valve 1 alone — whole step down from G.',
        prompt: 'Press only valve 1 (index finger). Keep the hand position steady and the air warm.'
      },
      {
        id: 'fh-song-2', type: 'song',
        noteName: 'Horn Calls',
        prerequisiteIds: ['fh-1', 'fh-2', 'fh-3', 'fh-4', 'fh-5'],
        description: 'A gentle melody connecting your open harmonics with valve combinations.',
        prompt: 'Alternate between open and valve notes. Keep the hand in the bell position steady!',
        noteIds: ['fh-1', 'fh-3', 'fh-5', 'fh-4', 'fh-2', 'fh-5', 'fh-3', 'fh-1', 'fh-1', 'fh-5', 'fh-4', 'fh-3', 'fh-2', 'fh-1'],
      },
    ]
  },
  'euphonium': {
    id: 'euphonium', name: 'Euphonium', shortName: 'Euph.',
    clef: 'bass', fingeringType: 'euphonium', available: true, accentColor: '#A09000',
    lessons: [
      {
        id: 'eu-1',
        noteName: 'B\u266d',
        octave: 2,
        staffStep: 2,
        accidental: '\u266d',
        freq: 116.54,
        fingeringState: [false, false, false],
        description: 'Open — no valves. Let the horn ring.',
        prompt: 'No valves pressed. Breathe deep from the diaphragm and blow a steady, warm stream of air. Listen for the rich low Bb.'
      },
      {
        id: 'eu-2',
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: [false, false, false],
        description: 'Same open fingering, faster air.',
        prompt: 'Still no valves. Make the air faster and the lips slightly firmer. This F is the 3rd harmonic of the Bb bugle.'
      },
      {
        id: 'eu-3',
        noteName: 'B\u266d',
        octave: 3,
        staffStep: 9,
        accidental: '\u266d',
        freq: 233.08,
        fingeringState: [false, false, false],
        description: 'Open again — you\'re going up the harmonic series.',
        prompt: 'No valves. Same Bb fingering, higher octave. Focus the air and let the pitch speak clearly.'
      },
      {
        id: 'eu-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['eu-1', 'eu-2', 'eu-3'],
        description: 'A classic melody using Bb2, F3, and Bb3 — your first three euphonium harmonics.',
        prompt: 'Step through each note. No valves needed — let the air do the work!',
        noteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-1', 'eu-2', 'eu-3', 'eu-3', 'eu-3', 'eu-3', 'eu-2', 'eu-2', 'eu-2', 'eu-2', 'eu-1', 'eu-2', 'eu-3'],
      },
      {
        id: 'eu-4',
        noteName: 'D',
        octave: 3,
        staffStep: 4,
        accidental: null,
        freq: 146.83,
        fingeringState: [true, false, true],
        description: 'Valves 1 and 3 together.',
        prompt: 'Press valves 1 and 3. This D is between the low Bb and F. Warm, supported air.'
      },
      {
        id: 'eu-5',
        noteName: 'E\u266d',
        octave: 3,
        staffStep: 5,
        accidental: '\u266d',
        freq: 155.56,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 for E♭.',
        prompt: 'Press valves 1 and 2. Listen for the difference between D (1+3) and Eb (1+2). Keep the air steady.'
      },
      {
        id: 'eu-song-2', type: 'song',
        noteName: 'Euphonium Air',
        prerequisiteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5'],
        description: 'A calming melody using all five euphonium notes — open and valve combinations.',
        prompt: 'Move between open harmonics and valve combinations. Warm, steady air throughout!',
        noteIds: ['eu-1', 'eu-4', 'eu-2', 'eu-5', 'eu-3', 'eu-1', 'eu-3', 'eu-2', 'eu-4', 'eu-5', 'eu-3', 'eu-2', 'eu-1'],
      },
    ]
  },
  'tuba': {
    id: 'tuba', name: 'Tuba', shortName: 'Tuba',
    clef: 'bass', fingeringType: 'tuba', available: true, accentColor: '#B08030',
    lessons: [
      {
        id: 'tu-1',
        noteName: 'B\u266d',
        octave: 2,
        staffStep: 2,
        accidental: '\u266d',
        freq: 116.54,
        fingeringState: [false, false, false],
        description: 'Open — your first tuba note. Feel the resonance.',
        prompt: 'No valves pressed. Take a full, relaxed breath and blow a slow, wide stream of air. The whole horn should vibrate.'
      },
      {
        id: 'tu-2',
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: [false, false, false],
        description: 'Same open fingering, higher harmonic.',
        prompt: 'No valves. Faster air, slightly firmer lips. This F is the 3rd harmonic above your low Bb.'
      },
      {
        id: 'tu-3',
        noteName: 'B\u266d',
        octave: 3,
        staffStep: 9,
        accidental: '\u266d',
        freq: 233.08,
        fingeringState: [false, false, false],
        description: 'Open octave — you\'re climbing the series.',
        prompt: 'No valves. Breathe deep and blow with focused, fast air. Same fingering as the first note, one octave higher.'
      },
      {
        id: 'tu-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['tu-1', 'tu-2', 'tu-3'],
        description: 'A classic melody using Bb2, F3, and Bb3 — your first three tuba harmonics.',
        prompt: 'Step through each note with deep, supported breaths. No valves needed!',
        noteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-1', 'tu-2', 'tu-3', 'tu-3', 'tu-3', 'tu-3', 'tu-2', 'tu-2', 'tu-2', 'tu-2', 'tu-1', 'tu-2', 'tu-3'],
      },
      {
        id: 'tu-4',
        noteName: 'D',
        octave: 3,
        staffStep: 4,
        accidental: null,
        freq: 146.83,
        fingeringState: [true, false, true],
        description: 'Valves 1 and 3 for D.',
        prompt: 'Press valves 1 and 3. This D sits between the low Bb and F. Use warm, slow air and listen for a centered pitch.'
      },
      {
        id: 'tu-5',
        noteName: 'E\u266d',
        octave: 3,
        staffStep: 5,
        accidental: '\u266d',
        freq: 155.56,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 for E♭.',
        prompt: 'Press valves 1 and 2. Compare the feel to D (1+3) — this one is slightly higher. Keep the air steady and the sound round.'
      },
      {
        id: 'tu-song-2', type: 'song',
        noteName: 'Tuba Foundation',
        prerequisiteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5'],
        description: 'A grounding melody using all five tuba notes — open harmonics and valve combinations.',
        prompt: 'Move between open and valve notes. Big, warm air — let the tuba resonate!',
        noteIds: ['tu-1', 'tu-4', 'tu-2', 'tu-5', 'tu-3', 'tu-1', 'tu-3', 'tu-2', 'tu-4', 'tu-5', 'tu-3', 'tu-2', 'tu-1'],
      },
    ]
  },

};

// Ordered list for the home screen
const INSTRUMENT_ORDER = [
  'flute', 'clarinet', 'alto-saxophone', 'oboe', 'bassoon',
  'trumpet', 'trombone', 'french-horn', 'euphonium', 'tuba'
];

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
        noteName: 'C',
        octave: 4,
        concertNote: 'B\u266d3',
        staffStep: -2,
        accidental: null,
        freq: 233.08,
        fingeringState: [false, false, false],
        description: 'Your first note — no valves! Also known as concert Bb, the fundamental resonance of the trumpet.',
        prompt: 'Fingers rest gently on the valves but press nothing. Form your embouchure and blow a steady, supported stream of air. This is the 4th partial of the trumpet\'s Bb bugle.'
      },
      {
        id: 'tr-2',
        noteName: 'D',
        octave: 4,
        concertNote: 'C4',
        staffStep: -1,
        accidental: null,
        freq: 261.63,
        fingeringState: [true, false, true],
        description: 'Valves 1 and 3 together — your first valve combination.',
        prompt: 'Press valves 1 and 3 with your index and ring fingers. Keep your embouchure relaxed and air warm. This D is just a step above your first C.'
      },
      {
        id: 'tr-3',
        noteName: 'E',
        octave: 4,
        concertNote: 'D4',
        staffStep: 0,
        accidental: null,
        freq: 293.66,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 together — index and middle finger.',
        prompt: 'Press valves 1 and 2 simultaneously. Even finger pressure, quick and clean valve movement. This is the bottom line of the staff.'
      },
      {
        id: 'tr-4',
        noteName: 'F',
        octave: 4,
        concertNote: 'E\u266d4',
        staffStep: 1,
        accidental: null,
        freq: 311.13,
        fingeringState: [true, false, false],
        description: 'Press valve 1 with your index finger.',
        prompt: 'Index finger presses valve 1 down. Relax your embouchure slightly compared to E — this is a lower harmonic with the same 1-valve feel.'
      },
      {
        id: 'tr-5',
        noteName: 'G',
        octave: 4,
        concertNote: 'F4',
        staffStep: 2,
        accidental: null,
        freq: 349.23,
        fingeringState: [false, false, false],
        description: 'No valves again — the 6th partial of the open tube.',
        prompt: 'No valves! G is a higher open note above C. Tighten your lips slightly and blow faster. Same pipe, higher buzz.'
      },
      {
        id: 'tr-6',
        noteName: 'A',
        octave: 4,
        concertNote: 'G4',
        staffStep: 3,
        accidental: null,
        freq: 392.00,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 from the 8th partial.',
        prompt: 'Valves 1+2 from the C5 harmonic. Make the air faster than G and feel the valve combination lock in. A bright, centred sound.'
      },
      {
        id: 'tr-7',
        noteName: 'B',
        octave: 4,
        concertNote: 'A4',
        staffStep: 4,
        accidental: null,
        freq: 440.00,
        fingeringState: [false, true, false],
        description: 'Valve 2 alone — just the middle finger.',
        prompt: 'Press only valve 2 (middle finger). B is a half-step below C — listen for the valve to lower the pitch by one semitone.'
      },
      {
        id: 'tr-8',
        noteName: 'C',
        octave: 5,
        concertNote: 'B\u266d4',
        staffStep: 5,
        accidental: null,
        freq: 466.16,
        fingeringState: [false, false, false],
        description: 'Open again — C above the staff completes the octave.',
        prompt: 'No valves! Tighten your embouchure and blow fast, supported air. C5 crowns your first octave on the trumpet.'
      },
      {
        id: 'tr-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['tr-3', 'tr-4', 'tr-5'],
        description: 'A classic English nursery rhyme using G, F, and E — your first three valve combinations.',
        prompt: 'Step through each note. The pattern repeats. Feel how the valves move in sequence!',
        noteIds: ['tr-5', 'tr-4', 'tr-3', 'tr-5', 'tr-4', 'tr-3', 'tr-3', 'tr-3', 'tr-3', 'tr-4', 'tr-4', 'tr-4', 'tr-4', 'tr-5', 'tr-4', 'tr-3'],
      },
      {
        id: 'tr-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6'],
        description: 'The tune behind "Mary Had a Little Lamb" using G, A, G, F, E, and D.',
        prompt: 'Listen for the repeating three-note pattern! This song uses five notes across the staff.',
        noteIds: ['tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-5', 'tr-5', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-4', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-5', 'tr-5', 'tr-5', 'tr-3', 'tr-4', 'tr-4', 'tr-2', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3'],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'tr-review-1',
        type: 'review',
        reviewLessonIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-song-1', 'tr-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'tr-song-3', type: 'song',
        noteName: 'Lightly Row',
        prerequisiteIds: ['tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8'],
        description: 'A traditional German folk song spanning almost your full octave — D up to C.',
        prompt: 'This song moves stepwise through your new notes. Take it slowly and listen for each pitch!',
        noteIds: ['tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2', 'tr-5', 'tr-5', 'tr-6', 'tr-6', 'tr-4', 'tr-4', 'tr-3', 'tr-3', 'tr-2', 'tr-2', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2'],
      },
      {
        id: 'tr-song-4', type: 'song',
        noteName: 'Trumpet Tune',
        prerequisiteIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8'],
        description: 'A bright fanfare using all eight notes of your first octave — C to C.',
        prompt: 'This fanfare leaps between all your notes. Keep the air strong and the valves crisp!',
        noteIds: ['tr-1', 'tr-5', 'tr-8', 'tr-5', 'tr-1', 'tr-7', 'tr-5', 'tr-4', 'tr-3', 'tr-6', 'tr-4', 'tr-5', 'tr-1', 'tr-5', 'tr-8', 'tr-1'],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'tr-review-2',
        type: 'review',
        reviewLessonIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8', 'tr-song-3', 'tr-song-4'],
        noteName: 'Review 2',
        description: 'Review all trumpet notes and songs together — the full C4 to C5 octave.',
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
        octave: 5,
        concertNote: 'D5',
        staffStep: 7,
        accidental: null,
        freq: 587.33,
        fingeringState: [true, true, false, false, false, false, false, false, false],
        description: 'E (written) — first note above the break! Register key plus A key.',
        prompt: 'Left thumb presses the register key (back of the clarinet). Left index finger presses the A key. Everything else stays open. Blow a warm, steady stream through the mouthpiece.'
      },
      {
        id: 'cl-2',
        noteName: 'F',
        octave: 5,
        concertNote: 'E\u266d5',
        staffStep: 8,
        accidental: null,
        freq: 622.25,
        fingeringState: [true, true, false, false, true, false, false, false, false],
        description: 'F — add the E/B key with your right index finger.',
        prompt: 'Register key + A key (left index) + E/B key (right index). All other keys open. Keep the embouchure firm and the air supported.'
      },
      {
        id: 'cl-3',
        noteName: 'G',
        octave: 5,
        concertNote: 'F5',
        staffStep: 9,
        accidental: null,
        freq: 698.46,
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
        octave: 5,
        concertNote: 'G5',
        staffStep: 10,
        accidental: null,
        freq: 783.99,
        fingeringState: [true, true, true, true, false, false, false, false, false],
        description: 'A — add left ring finger. All three left-hand fingers down.',
        prompt: 'Register key + all three left hand fingers (A, G, E keys). Right hand stays open. Listen for a round, woody clarinet tone.'
      },
      {
        id: 'cl-5',
        noteName: 'B',
        octave: 5,
        concertNote: 'A5',
        staffStep: 11,
        accidental: null,
        freq: 880.00,
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
    clef: 'bass', fingeringType: 'trombone', isTransposing: false, available: true, accentColor: '#C0A020',
    lessons: [
      {
        id: 'tb-1',
        noteName: 'B\u266d',
        octave: 2,
        staffStep: 2,
        accidental: '\u266d',
        freq: 116.54,
        fingeringState: 1,
        description: '1st position — slide all the way in!',
        prompt: 'Slide all the way in to 1st position. Buzz a firm, centered note. Bb is the most resonant tone on the trombone — it is the fundamental harmonic.'
      },
      {
        id: 'tb-2',
        noteName: 'C',
        octave: 3,
        staffStep: 3,
        accidental: null,
        freq: 130.81,
        fingeringState: 3,
        description: 'C in 3rd position — the next step up.',
        prompt: 'Move the slide to 3rd position (between the bell and the stocking). Keep the slide arm straight and buzz firmly.'
      },
      {
        id: 'tb-3',
        noteName: 'D',
        octave: 3,
        staffStep: 4,
        accidental: null,
        freq: 146.83,
        fingeringState: 4,
        description: 'D in 4th position — right in the middle.',
        prompt: 'Slide to 4th position (the slide handle should line up with your bell). Warm, centred air.'
      },
      {
        id: 'tb-4',
        noteName: 'E\u266d',
        octave: 3,
        staffStep: 5,
        accidental: '\u266d',
        freq: 155.56,
        fingeringState: 5,
        description: 'Eb in 5th position — reaching out.',
        prompt: 'Extend to 5th position. The slide crosses your bell rim. Keep the buzz steady and the air supported.'
      },
      {
        id: 'tb-5',
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: 1,
        description: 'F in 1st position — back to the top!',
        prompt: 'Back to 1st position. F is the 3rd harmonic of the open tube. Faster air than the notes below, same slide position.'
      },
      {
        id: 'tb-6',
        noteName: 'G',
        octave: 3,
        staffStep: 7,
        accidental: null,
        freq: 196.00,
        fingeringState: 4,
        description: 'G in 4th position — a higher harmonic.',
        prompt: 'Slide to 4th position. G is the 4th partial of the G series. Keep the air focused and the buzz centred.'
      },
      {
        id: 'tb-7',
        noteName: 'A',
        octave: 3,
        staffStep: 8,
        accidental: null,
        freq: 220.00,
        fingeringState: 2,
        description: 'A in 2nd position — just past 1st.',
        prompt: 'Slide just past 1st to 2nd position. This is a small, precise movement. Listen for the clear A.'
      },
      {
        id: 'tb-8',
        noteName: 'B\u266d',
        octave: 3,
        staffStep: 9,
        accidental: '\u266d',
        freq: 233.08,
        fingeringState: 1,
        description: 'Bb in 1st position — an octave above your first note!',
        prompt: '1st position again. This Bb is the 4th partial of the open tube — one octave above where you started. Faster air, firmer lips.'
      },
      {
        id: 'tb-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['tb-3', 'tb-4', 'tb-5'],
        description: 'A classic English nursery rhyme using F3, Eb3, and D3 — your first three slide positions.',
        prompt: 'Step through each note. Feel the slide moving between 1st, 5th, and 4th positions!',
        noteIds: ['tb-5', 'tb-4', 'tb-3', 'tb-5', 'tb-4', 'tb-3', 'tb-3', 'tb-3', 'tb-3', 'tb-4', 'tb-4', 'tb-4', 'tb-4', 'tb-5', 'tb-4', 'tb-3'],
      },
      {
        id: 'tb-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tb-3', 'tb-4', 'tb-5', 'tb-6'],
        description: 'A classic tune using G3, F3, Eb3, and D3 — four notes across the staff.',
        prompt: 'This song moves between four slide positions. Listen for the repeating pattern!',
        noteIds: ['tb-6', 'tb-5', 'tb-4', 'tb-3', 'tb-5', 'tb-6', 'tb-6', 'tb-6', 'tb-5', 'tb-5', 'tb-5', 'tb-6', 'tb-6', 'tb-6', 'tb-5', 'tb-4', 'tb-4', 'tb-3', 'tb-3', 'tb-5', 'tb-6', 'tb-5', 'tb-4', 'tb-3'],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'tb-review-1',
        type: 'review',
        reviewLessonIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-song-1', 'tb-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — Bb2, C3, D3, Eb3, and F3.',
        prompt: '',
      },
      {
        id: 'tb-song-3', type: 'song',
        noteName: 'Lightly Row',
        prerequisiteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8'],
        description: 'A folk melody travelling up and down the full Bb octave.',
        prompt: 'This song takes you from Bb2 up to Bb3 and back. A great slide workout!',
        noteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8', 'tb-8', 'tb-7', 'tb-6', 'tb-5', 'tb-4', 'tb-3', 'tb-2', 'tb-1'],
      },
      {
        id: 'tb-song-4', type: 'song',
        noteName: 'Slide Serenade',
        prerequisiteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8'],
        description: 'A melodic phrase connecting all your slide positions.',
        prompt: 'This fanfare-style melody uses every position at least once. Keep the buzz steady!',
        noteIds: ['tb-1', 'tb-5', 'tb-8', 'tb-5', 'tb-1', 'tb-7', 'tb-5', 'tb-4', 'tb-3', 'tb-6', 'tb-4', 'tb-5', 'tb-1', 'tb-5', 'tb-8', 'tb-1'],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'tb-review-2',
        type: 'review',
        reviewLessonIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8', 'tb-song-3', 'tb-song-4'],
        noteName: 'Review 2',
        description: 'Review all trombone notes and songs together — the full Bb2 to Bb3 octave.',
        prompt: '',
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
    clef: 'bass', fingeringType: 'euphonium', isTransposing: false, available: true, accentColor: '#A09000',
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
        prompt: 'No valves pressed. Breathe deep from the diaphragm and blow a steady, warm stream of air. Bb is the most resonant note on the euphonium.'
      },
      {
        id: 'eu-2',
        noteName: 'C',
        octave: 3,
        staffStep: 3,
        accidental: null,
        freq: 130.81,
        fingeringState: [true, false, true],
        description: 'Valves 1 and 3 — a half-step above Bb.',
        prompt: 'Press valves 1 and 3 together. C is the next step up from Bb. Keep the air warm and the tone centred.'
      },
      {
        id: 'eu-3',
        noteName: 'D',
        octave: 3,
        staffStep: 4,
        accidental: null,
        freq: 146.83,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 — up another step.',
        prompt: 'Press valves 1 and 2. Move the fingers together smoothly. This D sits on the third line of the staff.'
      },
      {
        id: 'eu-4',
        noteName: 'E\u266d',
        octave: 3,
        staffStep: 5,
        accidental: '\u266d',
        freq: 155.56,
        fingeringState: [true, false, false],
        description: 'Valve 1 alone — a whole step above D.',
        prompt: 'Press only valve 1 (index finger). This Eb is the 4th note of the Bb major scale. Steady, supported air.'
      },
      {
        id: 'eu-5',
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: [false, false, false],
        description: 'Open again — the 3rd harmonic.',
        prompt: 'No valves. F is the 3rd harmonic of the Bb bugle. Faster air, same open feel as your first note.'
      },
      {
        id: 'eu-6',
        noteName: 'G',
        octave: 3,
        staffStep: 7,
        accidental: null,
        freq: 196.00,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 — stepping up from F.',
        prompt: 'Press valves 1 and 2. G is a whole step above F. Listen for a clear, singing tone.'
      },
      {
        id: 'eu-7',
        noteName: 'A',
        octave: 3,
        staffStep: 8,
        accidental: null,
        freq: 220.00,
        fingeringState: [false, true, false],
        description: 'Valve 2 alone — just the middle finger.',
        prompt: 'Press only valve 2 (middle finger). A is a half-step below Bb in the staff space above G.'
      },
      {
        id: 'eu-8',
        noteName: 'B\u266d',
        octave: 3,
        staffStep: 9,
        accidental: '\u266d',
        freq: 233.08,
        fingeringState: [false, false, false],
        description: 'Open again — an octave above your first note!',
        prompt: 'No valves! Bb3 is the 4th harmonic and completes your first octave. Tighten the embouchure and let the horn ring.'
      },
      {
        id: 'eu-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['eu-3', 'eu-4', 'eu-5'],
        description: 'A classic English nursery rhyme using F3, Eb3, and D3 — your first three valve combinations.',
        prompt: 'Step through each note. Feel the valves changing between combinations!',
        noteIds: ['eu-5', 'eu-4', 'eu-3', 'eu-5', 'eu-4', 'eu-3', 'eu-3', 'eu-3', 'eu-3', 'eu-4', 'eu-4', 'eu-4', 'eu-4', 'eu-5', 'eu-4', 'eu-3'],
      },
      {
        id: 'eu-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['eu-3', 'eu-4', 'eu-5', 'eu-6'],
        description: 'A classic tune using G3, F3, Eb3, and D3 — four notes across the staff.',
        prompt: 'This song moves between four valve combinations. Listen for the repeating pattern!',
        noteIds: ['eu-6', 'eu-5', 'eu-4', 'eu-3', 'eu-5', 'eu-6', 'eu-6', 'eu-6', 'eu-5', 'eu-5', 'eu-5', 'eu-6', 'eu-6', 'eu-6', 'eu-5', 'eu-4', 'eu-4', 'eu-3', 'eu-3', 'eu-5', 'eu-6', 'eu-5', 'eu-4', 'eu-3'],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'eu-review-1',
        type: 'review',
        reviewLessonIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-song-1', 'eu-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — Bb2, C3, D3, Eb3, and F3.',
        prompt: '',
      },
      {
        id: 'eu-song-3', type: 'song',
        noteName: 'Lightly Row',
        prerequisiteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8'],
        description: 'A folk melody travelling up and down the full Bb octave.',
        prompt: 'This song takes you from Bb2 up to Bb3 and back. Listen for the stepwise motion!',
        noteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8', 'eu-8', 'eu-7', 'eu-6', 'eu-5', 'eu-4', 'eu-3', 'eu-2', 'eu-1'],
      },
      {
        id: 'eu-song-4', type: 'song',
        noteName: 'Euphonium Air',
        prerequisiteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8'],
        description: 'A melodic phrase connecting all your valve combinations.',
        prompt: 'This fanfare-style melody uses every combination at least once. Keep the air steady!',
        noteIds: ['eu-1', 'eu-5', 'eu-8', 'eu-5', 'eu-1', 'eu-7', 'eu-5', 'eu-4', 'eu-3', 'eu-6', 'eu-4', 'eu-5', 'eu-1', 'eu-5', 'eu-8', 'eu-1'],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'eu-review-2',
        type: 'review',
        reviewLessonIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8', 'eu-song-3', 'eu-song-4'],
        noteName: 'Review 2',
        description: 'Review all euphonium notes and songs together — the full Bb2 to Bb3 octave.',
        prompt: '',
      },
    ]
  },
  'tuba': {
    id: 'tuba', name: 'Tuba', shortName: 'Tuba',
    clef: 'bass', fingeringType: 'tuba', isTransposing: false, available: true, accentColor: '#B08030',
    lessons: [
      {
        id: 'tu-1',
        noteName: 'B\u266d',
        octave: 1,
        staffStep: -5,
        accidental: '\u266d',
        freq: 58.27,
        fingeringState: [false, false, false],
        description: 'Open — your first tuba note. Feel the resonance.',
        prompt: 'No valves pressed. Take a full, relaxed breath and blow a slow, wide stream of air. The whole horn should vibrate.'
      },
      {
        id: 'tu-2',
        noteName: 'C',
        octave: 2,
        staffStep: -4,
        accidental: null,
        freq: 65.41,
        fingeringState: [true, false, true],
        description: 'Valves 1 and 3 — a half-step above Bb.',
        prompt: 'Press valves 1 and 3. This C is just a step above your first note. Keep the air deep and wide.'
      },
      {
        id: 'tu-3',
        noteName: 'D',
        octave: 2,
        staffStep: -3,
        accidental: null,
        freq: 73.42,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 — up another step.',
        prompt: 'Press valves 1 and 2 together. D is below the staff. Warm, slow, supported air.'
      },
      {
        id: 'tu-4',
        noteName: 'E\u266d',
        octave: 2,
        staffStep: -2,
        accidental: '\u266d',
        freq: 77.78,
        fingeringState: [true, false, false],
        description: 'Valve 1 alone — Eb sits just below the staff.',
        prompt: 'Press only valve 1 (index finger). Let the air flow freely and feel the low resonance.'
      },
      {
        id: 'tu-5',
        noteName: 'F',
        octave: 2,
        staffStep: -1,
        accidental: null,
        freq: 87.31,
        fingeringState: [false, false, false],
        description: 'Open — the 3rd harmonic of the Bb bugle.',
        prompt: 'No valves. F is the 3rd partial. Speed up the air slightly. This is the first note on the staff.'
      },
      {
        id: 'tu-6',
        noteName: 'G',
        octave: 2,
        staffStep: 0,
        accidental: null,
        freq: 98.00,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 — G in the middle of the staff.',
        prompt: 'Press valves 1 and 2. G is on the second line of the bass clef. Let the air support the sound.'
      },
      {
        id: 'tu-7',
        noteName: 'A',
        octave: 2,
        staffStep: 1,
        accidental: null,
        freq: 110.00,
        fingeringState: [false, true, false],
        description: 'Valve 2 alone — A in the second space.',
        prompt: 'Press only valve 2 (middle finger). A is just a half-step below Bb in the staff space above G.'
      },
      {
        id: 'tu-8',
        noteName: 'B\u266d',
        octave: 2,
        staffStep: 2,
        accidental: '\u266d',
        freq: 116.54,
        fingeringState: [false, false, false],
        description: 'Open — an octave above where you started!',
        prompt: 'No valves! This Bb is on the third line of the staff. Faster, more focused air to reach the top of your first octave.'
      },
      {
        id: 'tu-song-1', type: 'song',
        noteName: 'Hot Cross Buns',
        prerequisiteIds: ['tu-3', 'tu-4', 'tu-5'],
        description: 'A classic English nursery rhyme using F2, Eb2, and D2 — your first three notes below the staff.',
        prompt: 'Step through each note. Feel the valves changing between combinations below the staff!',
        noteIds: ['tu-5', 'tu-4', 'tu-3', 'tu-5', 'tu-4', 'tu-3', 'tu-3', 'tu-3', 'tu-3', 'tu-4', 'tu-4', 'tu-4', 'tu-4', 'tu-5', 'tu-4', 'tu-3'],
      },
      {
        id: 'tu-song-2', type: 'song',
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tu-3', 'tu-4', 'tu-5', 'tu-6'],
        description: 'A classic tune using G2, F2, Eb2, and D2 — four notes across and below the staff.',
        prompt: 'This song moves between four note names. Big, warm air throughout!',
        noteIds: ['tu-6', 'tu-5', 'tu-4', 'tu-3', 'tu-5', 'tu-6', 'tu-6', 'tu-6', 'tu-5', 'tu-5', 'tu-5', 'tu-6', 'tu-6', 'tu-6', 'tu-5', 'tu-4', 'tu-4', 'tu-3', 'tu-3', 'tu-5', 'tu-6', 'tu-5', 'tu-4', 'tu-3'],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'tu-review-1',
        type: 'review',
        reviewLessonIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-song-1', 'tu-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — Bb1, C2, D2, Eb2, and F2.',
        prompt: '',
      },
      {
        id: 'tu-song-3', type: 'song',
        noteName: 'Lightly Row',
        prerequisiteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8'],
        description: 'A folk melody climbing up and down the full Bb octave.',
        prompt: 'This song takes you from Bb1 up to Bb2 and back. Start with deep, slow air and gradually speed up!',
        noteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8', 'tu-8', 'tu-7', 'tu-6', 'tu-5', 'tu-4', 'tu-3', 'tu-2', 'tu-1'],
      },
      {
        id: 'tu-song-4', type: 'song',
        noteName: 'Tuba Foundation',
        prerequisiteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8'],
        description: 'A grounding melody connecting all your notes across the octave.',
        prompt: 'This fanfare-style melody uses every note at least once. Let the tuba resonate!',
        noteIds: ['tu-1', 'tu-5', 'tu-8', 'tu-5', 'tu-1', 'tu-7', 'tu-5', 'tu-4', 'tu-3', 'tu-6', 'tu-4', 'tu-5', 'tu-1', 'tu-5', 'tu-8', 'tu-1'],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'tu-review-2',
        type: 'review',
        reviewLessonIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8', 'tu-song-3', 'tu-song-4'],
        noteName: 'Review 2',
        description: 'Review all tuba notes and songs together — the full Bb1 to Bb2 octave.',
        prompt: '',
      },
    ]
  },

};

// Ordered list for the home screen
const INSTRUMENT_ORDER = [
  'flute', 'clarinet', 'alto-saxophone', 'oboe', 'bassoon',
  'trumpet', 'trombone', 'french-horn', 'euphonium', 'tuba'
];

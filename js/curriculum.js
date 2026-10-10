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
    accentColor: '#F2C24E',
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
        prompt: 'No valves. C is the 4th partial of the Bb bugle. Buzz a firm middle-register pitch.'
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
        prompt: 'Valves 1 and 3. Keep the buzz centred and the air fast.'
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
        prompt: 'Valves 1 and 2. Clean, simultaneous valve motion.'
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
        prompt: 'Valve 1. Relax the embouchure slightly — this is a half-step lower than E.'
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
        prompt: 'No valves. Same open fingering as C. Faster air.'
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
        prompt: 'Valves 1 and 2. Faster air than G.'
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
        prompt: 'Valve 2 only. Half-step below C.'
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
        prompt: 'No valves. Tighten the embouchure. Fast, supported air.'
      },
      {
        id: 'tr-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three notes.',
        prompt: 'Step through each note. The pattern repeats. Feel how the valves move in sequence!',
      },
      {
        id: 'tr-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6'],
        description: 'The tune behind "Mary Had a Little Lamb" using G, A, G, F, E, and D.',
        prompt: 'Listen for the repeating three-note pattern! This song uses five notes across the staff.',
        noteIds: ['tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-5', 'tr-5', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-4', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-5', 'tr-5', 'tr-5', 'tr-3', 'tr-4', 'tr-4', 'tr-2', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8'],
        description: 'A traditional German folk song spanning almost your full octave — D up to C.',
        prompt: 'This song moves stepwise through your new notes. Take it slowly and listen for each pitch!',
        noteIds: ['tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2', 'tr-5', 'tr-5', 'tr-6', 'tr-6', 'tr-4', 'tr-4', 'tr-3', 'tr-3', 'tr-2', 'tr-2', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tr-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Trumpet Tune',
        prerequisiteIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8'],
        description: 'A bright fanfare using all eight notes of your first octave — C to C.',
        prompt: 'This fanfare leaps between all your notes. Keep the air strong and the valves crisp!',
        noteIds: ['tr-1', 'tr-5', 'tr-8', 'tr-5', 'tr-1', 'tr-7', 'tr-5', 'tr-4', 'tr-3', 'tr-6', 'tr-4', 'tr-5', 'tr-1', 'tr-5', 'tr-8', 'tr-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
    clef: 'treble', fingeringType: 'flute', isTransposing: false, available: true,     accentColor: '#7ED0E8',
    lessons: [
      {
        id: 'fl-1',
        noteName: 'C',
        octave: 4,
        staffStep: -2,
        accidental: null,
        freq: 261.63,
        fingeringState: [true, true, true, true, true, true, true, true, false],
        description: 'Low C — the bottom of the flute. Every main key covered, plus the little-finger C key.',
        prompt: 'Left thumb + all three left fingers + all three right fingers, plus the footjoint C key with your right pinky. Warm, supported air.'
      },
      {
        id: 'fl-2',
        noteName: 'D',
        octave: 4,
        staffStep: -1,
        accidental: null,
        freq: 293.66,
        fingeringState: [true, true, true, true, true, true, true, false, false],
        description: 'D — all main keys covered. Left thumb and all three left-hand fingers, plus all three right hand fingers.',
        prompt: 'Left thumb + all three left fingers + all three right fingers. Right pinky up. Blow across the embouchure hole.'
      },
      {
        id: 'fl-3',
        noteName: 'E',
        octave: 4,
        staffStep: 0,
        accidental: null,
        freq: 329.63,
        fingeringState: [true, true, true, true, true, true, false, true, false],
        description: 'E — lift your right ring finger and press the Eb key with your pinky.',
        prompt: 'Same as D4 but lift right ring finger and add the Eb key with right pinky.'
      },
      {
        id: 'fl-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three flute notes.',
        prompt: 'Step through each note slowly. Notice how your right hand alternates between keys!',
      },
      {
        id: 'fl-4',
        noteName: 'F',
        octave: 4,
        staffStep: 1,
        accidental: null,
        freq: 349.23,
        fingeringState: [true, true, true, true, true, false, false, true, false],
        description: 'F — left hand down, right index finger, and the Eb key.',
        prompt: 'Left thumb + all three left fingers + right index. Add the Eb key with your right pinky.'
      },
      {
        id: 'fl-5',
        noteName: 'G',
        octave: 4,
        staffStep: 2,
        accidental: null,
        freq: 392.00,
        fingeringState: [true, true, true, true, false, false, false, true, false],
        description: 'G — left hand only plus the Eb key with your right pinky.',
        prompt: 'Left thumb + all three left fingers. Right pinky on the Eb key. Right index, middle, ring up.'
      },
      {
        id: 'fl-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4'],
        description: 'A classic tune using F, E, D, and C — four notes descending through your first octave.',
        prompt: 'This song moves stepwise through F, E, D, and C. Listen for the repeating pattern!',
        noteIds: ['fl-4', 'fl-3', 'fl-2', 'fl-1', 'fl-4', 'fl-4', 'fl-4', 'fl-3', 'fl-3', 'fl-3', 'fl-4', 'fl-4', 'fl-4', 'fl-4', 'fl-3', 'fl-2', 'fl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'fl-review-1',
        type: 'review',
        reviewLessonIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-song-1', 'fl-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'fl-6',
        noteName: 'A',
        octave: 4,
        staffStep: 3,
        accidental: null,
        freq: 440.00,
        fingeringState: [true, true, true, false, false, false, false, true, false],
        description: 'A — lift your left ring finger. Just thumb and first two left fingers plus Eb key.',
        prompt: 'Left thumb + left index + left middle. Left ring up. Right pinky on Eb key.'
      },
      {
        id: 'fl-7',
        noteName: 'B',
        octave: 4,
        staffStep: 4,
        accidental: null,
        freq: 493.88,
        fingeringState: [true, true, false, false, false, false, false, true, false],
        description: 'B — left thumb and left index, plus the Eb key.',
        prompt: 'Left thumb + left index only. Add the Eb key with your right pinky.'
      },
      {
        id: 'fl-8',
        noteName: 'C',
        octave: 5,
        staffStep: 5,
        accidental: null,
        freq: 523.25,
        fingeringState: [false, true, false, false, false, false, false, true, false],
        description: 'C — left index finger only (thumb off), plus the Eb key. Your first note in the second octave.',
        prompt: 'Left index only, thumb off. Keep the Eb key down with your right pinky.'
      },
      {
        id: 'fl-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-6', 'fl-7', 'fl-8'],
        description: 'A folk melody climbing up and down the full C octave.',
        prompt: 'This song takes you from C4 up to C5 and back. Listen for the stepwise motion!',
        noteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-6', 'fl-7', 'fl-8', 'fl-8', 'fl-7', 'fl-6', 'fl-5', 'fl-4', 'fl-3', 'fl-2', 'fl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'fl-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Flute Song',
        prerequisiteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-6', 'fl-7', 'fl-8'],
        description: 'A melodic phrase connecting every note of your flute octave.',
        prompt: 'This melody leaps across the full range. Support the air and let the tone sing!',
        noteIds: ['fl-1', 'fl-5', 'fl-8', 'fl-5', 'fl-1', 'fl-7', 'fl-5', 'fl-4', 'fl-3', 'fl-6', 'fl-4', 'fl-5', 'fl-1', 'fl-5', 'fl-8', 'fl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'fl-review-2',
        type: 'review',
        reviewLessonIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-6', 'fl-7', 'fl-8', 'fl-song-3', 'fl-song-4'],
        noteName: 'Review 2',
        description: 'Review all flute notes and songs together — the full C4 to C5 octave.',
        prompt: '',
      },
    ]
  },

      // ── CLARINET (Bb) ───────────────────────────────────────────────────────
  'clarinet': {
    id: 'clarinet', name: 'Clarinet', shortName: 'Clarinet',
    clef: 'treble', fingeringType: 'clarinet', isTransposing: true, transposeSemitones: -2, available: true,     accentColor: '#E0A868',
    lessons: [
      {
        id: 'cl-1',
        noteName: 'C',
        octave: 4,
        concertNote: 'B♭3',
        staffStep: -2,
        accidental: null,
        freq: 233.08,
        fingeringState: [true, true, true, true, false, false, false, false, false],
        description: 'C — thumb hole + all three left-hand rings closed.',
        prompt: 'Thumb hole + left-hand rings 1-2-3. Right hand open.'
      },
      {
        id: 'cl-2',
        noteName: 'D',
        octave: 4,
        concertNote: 'C4',
        staffStep: -1,
        accidental: null,
        freq: 261.63,
        fingeringState: [true, true, true, false, false, false, false, false, false],
        description: 'D — lift left ring finger. Two left-hand rings down.',
        prompt: 'Thumb hole + left-hand rings 1 and 2. Ring finger open.'
      },
      {
        id: 'cl-3',
        noteName: 'E',
        octave: 4,
        concertNote: 'D4',
        staffStep: 0,
        accidental: null,
        freq: 293.66,
        fingeringState: [true, true, false, false, false, false, false, false, false],
        description: 'E — only the first left-hand ring closed.',
        prompt: 'Thumb hole + first ring (left index). All other fingers open.'
      },
      {
        id: 'cl-4',
        noteName: 'F',
        octave: 4,
        concertNote: 'E♭4',
        staffStep: 1,
        accidental: null,
        freq: 311.13,
        fingeringState: [true, false, false, false, false, false, false, false, false],
        description: 'F — thumb hole only, all fingers off.',
        prompt: 'Thumb hole only. All fingers off the rings.'
      },
      {
        id: 'cl-5',
        noteName: 'G',
        octave: 4,
        concertNote: 'F4',
        staffStep: 2,
        accidental: null,
        freq: 349.23,
        fingeringState: [false, false, false, false, false, false, false, false, false],
        description: 'G — completely open. No fingers down, no register key.',
        prompt: 'Lift every finger and the thumb. The clarinet sings open on G.'
      },
      {
        id: 'cl-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using C, D, and E — your first three chalumeau notes.',
        prompt: 'Step through each note carefully. Feel how the rings seal with your fingertips!',
      },
      {
        id: 'cl-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-4'],
        description: 'A classic tune using F, E, D, and C — four descending chalumeau notes.',
        prompt: 'This song moves downward through four notes. Keep the air steady!',
        noteIds: ['cl-4', 'cl-3', 'cl-2', 'cl-1', 'cl-4', 'cl-4', 'cl-4', 'cl-3', 'cl-3', 'cl-3', 'cl-4', 'cl-4', 'cl-4', 'cl-4', 'cl-3', 'cl-2', 'cl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'cl-review-1',
        type: 'review',
        reviewLessonIds: ['cl-1','cl-2','cl-3','cl-4','cl-5','cl-song-1','cl-song-2'],
        noteName: 'Review 1',
        description: 'Review your first five notes and songs — C through G in the chalumeau.',
        prompt: '',
      },
      {
        id: 'cl-6',
        noteName: 'A',
        octave: 4,
        concertNote: 'G4',
        staffStep: 3,
        accidental: null,
        freq: 392.00,
        fingeringState: [false, true, false, false, false, false, false, false, false],
        description: 'A — top A side key with left index.',
        prompt: 'A key (left index side key). Thumb off. All other keys open.'
      },
      {
        id: 'cl-7',
        noteName: 'B',
        octave: 4,
        concertNote: 'A4',
        staffStep: 4,
        accidental: null,
        freq: 440.00,
        fingeringState: [true, true, true, true, true, true, true, false, true, true],
        description: 'B — the clarion register! Thumb hole closed, all fingers down, register key, and the left little-finger E key.',
        prompt: 'Thumb hole closed + all left and right fingers down + register key. Add the left little-finger E key.'
      },
      {
        id: 'cl-8',
        noteName: 'C',
        octave: 5,
        concertNote: 'B♭4',
        staffStep: 5,
        accidental: null,
        freq: 466.16,
        fingeringState: [true, true, true, true, true, true, true, true, true, false],
        description: 'C — same as B but switch to the right little-finger F key. All fingers stay down.',
        prompt: 'Thumb hole closed + all fingers down + register key. Press the right little-finger F key instead of the left.'
      },
      {
        id: 'cl-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-4', 'cl-5', 'cl-6', 'cl-7', 'cl-8'],
        description: 'A folk melody climbing up and down the chalumeau and clarion registers.',
        prompt: 'This song climbs from C4 up to C5 and back. Watch the break between B4 and C5!',
        noteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-4', 'cl-5', 'cl-6', 'cl-7', 'cl-8', 'cl-8', 'cl-7', 'cl-6', 'cl-5', 'cl-4', 'cl-3', 'cl-2', 'cl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'cl-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Clarinet Song',
        prerequisiteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-4', 'cl-5', 'cl-6', 'cl-7', 'cl-8'],
        description: 'A melodic phrase connecting every note of the full octave.',
        prompt: 'This melody leaps across the chalumeau and into the clarion. Keep the air supported!',
        noteIds: ['cl-1', 'cl-5', 'cl-8', 'cl-5', 'cl-1', 'cl-7', 'cl-5', 'cl-4', 'cl-3', 'cl-6', 'cl-4', 'cl-5', 'cl-1', 'cl-5', 'cl-8', 'cl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'cl-review-2',
        type: 'review',
        reviewLessonIds: ['cl-1','cl-2','cl-3','cl-4','cl-5','cl-6','cl-7','cl-8','cl-song-3','cl-song-4'],
        noteName: 'Review 2',
        description: 'Review all clarinet notes and songs across the full octave.',
        prompt: '',
      },
    ]
  },

  // ── ALTO SAXOPHONE (Eb) ─────────────────────────────────────────────────
  'alto-saxophone': {
    id: 'alto-saxophone', name: 'Alto Saxophone', shortName: 'Alto Sax',
    clef: 'treble', fingeringType: 'saxophone', isTransposing: true, transposeSemitones: -9, available: true,     accentColor: '#F0B840',
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
        prompt: 'No octave key. All three left-hand and all three right-hand fingers down. Right pinky on low C key.'
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
        prompt: 'No octave key. Same as C but right pinky off the low C key.'
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
        prompt: 'No octave key. All three left fingers down. Right index and middle down. Right ring and pinky up.'
      },
      {
        id: 'as-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three alto sax notes.',
        prompt: 'Step through each note from E down to C. Feel the right hand lifting!',
      },
      {
        id: 'as-4',
        noteName: 'F',
        octave: 4,
        concertNote: 'A\u266d3',
        staffStep: 1,
        accidental: null,
        freq: 207.65,
        fingeringState: [false, true, true, true, true, false, false, false, false],
        description: 'F — right index finger only with the left hand down.',
        prompt: 'No octave key. All three left fingers down. Right index finger only.'
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
        prompt: 'No octave key. All three left fingers down. Right hand completely open.'
      },
      {
        id: 'as-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['as-1', 'as-2', 'as-3', 'as-4'],
        description: 'A classic tune using F, E, D, and C — four notes descending through your first notes.',
        prompt: 'This song moves stepwise through F, E, D, and C. Keep the air steady!',
        noteIds: ['as-4', 'as-3', 'as-2', 'as-1', 'as-4', 'as-4', 'as-4', 'as-3', 'as-3', 'as-3', 'as-4', 'as-4', 'as-4', 'as-4', 'as-3', 'as-2', 'as-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'as-review-1',
        type: 'review',
        reviewLessonIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-song-1', 'as-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'as-6',
        noteName: 'A',
        octave: 4,
        concertNote: 'C4',
        staffStep: 3,
        accidental: null,
        freq: 261.63,
        fingeringState: [false, true, true, false, false, false, false, false, false],
        description: 'A — left index and middle fingers. No octave key needed.',
        prompt: 'No octave key. Left index + left middle. Right hand open.'
      },
      {
        id: 'as-7',
        noteName: 'B',
        octave: 4,
        concertNote: 'D4',
        staffStep: 4,
        accidental: null,
        freq: 293.66,
        fingeringState: [false, true, false, false, false, false, false, false, false],
        description: 'B — left index finger only. No octave key.',
        prompt: 'No octave key. Left index only. Right hand open and left ring up.'
      },
      {
        id: 'as-8',
        noteName: 'C',
        octave: 5,
        concertNote: 'E\u266d4',
        staffStep: 5,
        accidental: null,
        freq: 311.13,
        fingeringState: [false, false, true, false, false, false, false, false, false],
        description: 'C — left middle finger only. The top of your first octave!',
        prompt: 'Left middle finger only (left index and thumb open). No octave key.'
      },
      {
        id: 'as-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-6', 'as-7', 'as-8'],
        description: 'A folk melody climbing up and down the full C octave.',
        prompt: 'This song climbs from C4 up to C5 and back. Listen for the stepwise motion!',
        noteIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-6', 'as-7', 'as-8', 'as-8', 'as-7', 'as-6', 'as-5', 'as-4', 'as-3', 'as-2', 'as-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'as-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Saxophone Song',
        prerequisiteIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-6', 'as-7', 'as-8'],
        description: 'A melodic phrase connecting every note of your alto sax octave.',
        prompt: 'This melody leaps across the full range. Keep the air supported and the tone warm!',
        noteIds: ['as-1', 'as-5', 'as-8', 'as-5', 'as-1', 'as-7', 'as-5', 'as-4', 'as-3', 'as-6', 'as-4', 'as-5', 'as-1', 'as-5', 'as-8', 'as-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'as-review-2',
        type: 'review',
        reviewLessonIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-6', 'as-7', 'as-8', 'as-song-3', 'as-song-4'],
        noteName: 'Review 2',
        description: 'Review all alto sax notes and songs together — the full C4 to C5 octave.',
        prompt: '',
      },
    ]
  },

  // ── OBOE ─────────────────────────────────────────────────────────────────
  'oboe': {
    id: 'oboe', name: 'Oboe', shortName: 'Oboe',
    clef: 'treble', fingeringType: 'oboe', isTransposing: false, available: true,     accentColor: '#D98C5F',
    lessons: [
      {
        id: 'ob-1',
        noteName: 'C',
        octave: 4,
        staffStep: -2,
        accidental: null,
        freq: 261.63,
        fingeringState: [false, true, true, true, true, true, true, true, false],
        description: 'Low C — the bottom of the oboe. All six main fingers down plus the low C key.',
        prompt: 'No octave key. All three left fingers + all three right fingers, plus the low C key with your right pinky. Focused, steady air through the reed.'
      },
      {
        id: 'ob-2',
        noteName: 'D',
        octave: 4,
        staffStep: -1,
        accidental: null,
        freq: 293.66,
        fingeringState: [false, true, true, true, true, true, true, false, false],
        description: 'D — all main keys covered, no octave key needed.',
        prompt: 'No octave key. All three left-hand and all three right-hand fingers down. Firm embouchure corners, focused air through the reed.'
      },
      {
        id: 'ob-3',
        noteName: 'E',
        octave: 4,
        staffStep: 0,
        accidental: null,
        freq: 329.63,
        fingeringState: [false, true, true, true, true, true, false, false, false],
        description: 'E — lift your right ring finger.',
        prompt: 'No octave key. Same as D4 but lift right ring finger.'
      },
      {
        id: 'ob-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three oboe notes.',
        prompt: 'Step through each note. Feel the right fingers lifting one at a time!',
      },
      {
        id: 'ob-4',
        noteName: 'F',
        octave: 4,
        staffStep: 1,
        accidental: null,
        freq: 349.23,
        fingeringState: [false, true, true, true, true, true, false, false, false, true],
        description: 'F — left hand down, right index and middle fingers, plus the F resonance key.',
        prompt: 'No octave key. All three left fingers + right index + right middle. Press the F resonance key with your right hand.'
      },
      {
        id: 'ob-5',
        noteName: 'G',
        octave: 4,
        staffStep: 2,
        accidental: null,
        freq: 392.00,
        fingeringState: [false, true, true, true, false, false, false, false, false],
        description: 'G — left hand only! A warm, open oboe note.',
        prompt: 'No octave key. All three left fingers down. Right hand open.'
      },
      {
        id: 'ob-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4'],
        description: 'A classic tune using F, E, D, and C — four notes descending through your first notes.',
        prompt: 'This song moves stepwise through F, E, D, and C. Keep the air steady!',
        noteIds: ['ob-4', 'ob-3', 'ob-2', 'ob-1', 'ob-4', 'ob-4', 'ob-4', 'ob-3', 'ob-3', 'ob-3', 'ob-4', 'ob-4', 'ob-4', 'ob-4', 'ob-3', 'ob-2', 'ob-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'ob-review-1',
        type: 'review',
        reviewLessonIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-song-1', 'ob-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'ob-6',
        noteName: 'A',
        octave: 4,
        staffStep: 3,
        accidental: null,
        freq: 440.00,
        fingeringState: [false, true, true, false, false, false, false, false, false],
        description: 'A — lift your left ring finger. Just first two fingers.',
        prompt: 'No octave key. Left index + left middle only. Left ring up. Right hand open.'
      },
      {
        id: 'ob-7',
        noteName: 'B',
        octave: 4,
        staffStep: 4,
        accidental: null,
        freq: 493.88,
        fingeringState: [false, true, false, false, false, false, false, false, false],
        description: 'B — left index finger only. No octave key.',
        prompt: 'No octave key. Left index only. Thumb and all other fingers open.'
      },
      {
        id: 'ob-8',
        noteName: 'C',
        octave: 5,
        staffStep: 5,
        accidental: null,
        freq: 523.25,
        fingeringState: [false, true, false, false, true, false, false, false, false],
        description: 'C — left index plus right index fingers. No octave key.',
        prompt: 'No octave key. Left index + right index. Thumb and other fingers open.'
      },
      {
        id: 'ob-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-6', 'ob-7', 'ob-8'],
        description: 'A folk melody climbing up and down the full C octave.',
        prompt: 'This song takes you from C4 up to C5 and back. Keep the embouchure steady!',
        noteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-6', 'ob-7', 'ob-8', 'ob-8', 'ob-7', 'ob-6', 'ob-5', 'ob-4', 'ob-3', 'ob-2', 'ob-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'ob-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Oboe Song',
        prerequisiteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-6', 'ob-7', 'ob-8'],
        description: 'A melodic phrase connecting every note of your oboe octave.',
        prompt: 'This melody leaps across the full range. Crisp articulation and steady air!',
        noteIds: ['ob-1', 'ob-5', 'ob-8', 'ob-5', 'ob-1', 'ob-7', 'ob-5', 'ob-4', 'ob-3', 'ob-6', 'ob-4', 'ob-5', 'ob-1', 'ob-5', 'ob-8', 'ob-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'ob-review-2',
        type: 'review',
        reviewLessonIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-6', 'ob-7', 'ob-8', 'ob-song-3', 'ob-song-4'],
        noteName: 'Review 2',
        description: 'Review all oboe notes and songs together — the full C4 to C5 octave.',
        prompt: '',
      },
    ]
  },

  // ── BASSOON (bass clef) ─────────────────────────────────────────────────
  'bassoon': {
    id: 'bassoon', name: 'Bassoon', shortName: 'Bassoon',
    clef: 'bass', fingeringType: 'bassoon', isTransposing: false, available: true,     accentColor: '#C98A55',
    lessons: [
      {
        id: 'bn-1',
        noteName: 'C',
        octave: 3,
        staffStep: 3,
        accidental: null,
        freq: 130.81,
        fingeringState: [true, true, true, true, false, false, false, false, false],
        description: 'Low C — the bottom of the bassoon. Whisper key with all three left fingers down.',
        prompt: 'Left thumb on the whisper key. Left index, middle, and ring down. Right hand open. Slow, warm, steady air.'
      },
      {
        id: 'bn-2',
        noteName: 'D',
        octave: 3,
        staffStep: 4,
        accidental: null,
        freq: 146.83,
        fingeringState: [true, true, true, false, false, false, false, false, false],
        description: 'Low D — whisper key with the left index and middle fingers down.',
        prompt: 'Whisper key on. Left index + left middle down, left ring up. Right hand open.'
      },
      {
        id: 'bn-3',
        noteName: 'E',
        octave: 3,
        staffStep: 5,
        accidental: null,
        freq: 164.81,
        fingeringState: [true, true, false, false, false, false, false, false, false],
        description: 'E — whisper key with only the left index finger down.',
        prompt: 'Whisper key on. Left index only. Left middle and ring up. Right hand open.'
      },
      {
        id: 'bn-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three bassoon notes.',
        prompt: 'Step through each note with warm, supported air. The whisper key stays on for these notes!',
      },
      {
        id: 'bn-4',
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: [true, false, false, false, false, false, false, false, false],
        description: 'F — whisper key with no fingers down. An open, resonant note.',
        prompt: 'Whisper key on. No fingers down at all. Open throat, slow air.'
      },
      {
        id: 'bn-5',
        noteName: 'G',
        octave: 3,
        staffStep: 7,
        accidental: null,
        freq: 196.00,
        fingeringState: [true, false, true, true, true, true, true, false, false],
        description: 'G — whisper key with a half-hole on the left index and all other main fingers down.',
        prompt: 'Whisper key on. Left index half-hole (cracked open), left middle + ring down, all three right fingers down.'
      },
      {
        id: 'bn-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4'],
        description: 'A classic tune using F, E, D, and C — four notes descending through your first notes.',
        prompt: 'This song moves stepwise through F, E, D, and C. Warm, supported air!',
        noteIds: ['bn-4', 'bn-3', 'bn-2', 'bn-1', 'bn-4', 'bn-4', 'bn-4', 'bn-3', 'bn-3', 'bn-3', 'bn-4', 'bn-4', 'bn-4', 'bn-4', 'bn-3', 'bn-2', 'bn-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'bn-review-1',
        type: 'review',
        reviewLessonIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-song-1', 'bn-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'bn-6',
        noteName: 'A',
        octave: 3,
        staffStep: 8,
        accidental: null,
        freq: 220.00,
        fingeringState: [false, true, true, true, true, true, false, false, false],
        description: 'A — whisper key off, left hand down with right index and middle fingers.',
        prompt: 'Whisper key off. Left hand down + right index + right middle.'
      },
      {
        id: 'bn-7',
        noteName: 'B',
        octave: 3,
        staffStep: 9,
        accidental: null,
        freq: 246.94,
        fingeringState: [false, true, true, true, true, false, false, false, false],
        description: 'B — whisper key off, left hand down with the right index finger.',
        prompt: 'Whisper key off. All three left fingers + right index.'
      },
      {
        id: 'bn-8',
        noteName: 'C',
        octave: 4,
        staffStep: 10,
        accidental: null,
        freq: 261.63,
        fingeringState: [false, true, true, true, false, false, false, false, false],
        description: 'C — whisper key off, just the left hand down.',
        prompt: 'Whisper key off. All three left fingers only. Right hand open.'
      },
      {
        id: 'bn-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-6', 'bn-7', 'bn-8'],
        description: 'A folk melody travelling up and down the full C octave.',
        prompt: 'This song climbs from C3 up to C4 and back. Let the reed sing!',
        noteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-6', 'bn-7', 'bn-8', 'bn-8', 'bn-7', 'bn-6', 'bn-5', 'bn-4', 'bn-3', 'bn-2', 'bn-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'bn-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Bassoon Song',
        prerequisiteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-6', 'bn-7', 'bn-8'],
        description: 'A melodic phrase connecting every note of your bassoon octave.',
        prompt: 'This melody leaps across the full range. Slow, warm air with a steady buzz!',
        noteIds: ['bn-1', 'bn-5', 'bn-8', 'bn-5', 'bn-1', 'bn-7', 'bn-5', 'bn-4', 'bn-3', 'bn-6', 'bn-4', 'bn-5', 'bn-1', 'bn-5', 'bn-8', 'bn-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'bn-review-2',
        type: 'review',
        reviewLessonIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-6', 'bn-7', 'bn-8', 'bn-song-3', 'bn-song-4'],
        noteName: 'Review 2',
        description: 'Review all bassoon notes and songs together — the full C3 to C4 octave.',
        prompt: '',
      },
    ]
  },
  'trombone': {
    id: 'trombone', name: 'Trombone', shortName: 'Trombone',
    clef: 'bass', fingeringType: 'trombone', isTransposing: false, available: true,     accentColor: '#E8C24A',
    lessons: [
      {
        id: 'tb-1',
        noteName: 'B♭',
        octave: 2,
        staffStep: 2,
        accidental: '♭',
        freq: 116.54,
        fingeringState: 1,
        description: 'Bb — 1st position. Slide all the way in!',
        prompt: '1st position (slide all the way in). Buzz a firm centred pitch.'
      },
      {
        id: 'tb-2',
        noteName: 'C',
        octave: 3,
        staffStep: 3,
        accidental: null,
        freq: 130.81,
        fingeringState: 6,
        description: 'C — 6th position. A long reach!',
        prompt: '6th position (slide well past the bell rim). Keep the buzz steady.'
      },
      {
        id: 'tb-3',
        noteName: 'D',
        octave: 3,
        staffStep: 4,
        accidental: null,
        freq: 146.83,
        fingeringState: 4,
        description: 'D — 4th position. Slide lines up with the bell.',
        prompt: '4th position (handle aligns with bell rim). Listen for a clear pitch.'
      },
      {
        id: 'tb-4',
        noteName: 'E♭',
        octave: 3,
        staffStep: 5,
        accidental: '♭',
        freq: 155.56,
        fingeringState: 3,
        description: 'Eb — 3rd position. Just past the bell.',
        prompt: '3rd position (slide just past the bell rim). Steady air.'
      },
      {
        id: 'tb-5',
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: 1,
        description: 'F — 1st position. Third harmonic of the open horn.',
        prompt: '1st position. F is the 3rd harmonic. Faster air than the low notes.'
      },
      {
        id: 'tb-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using D, C, and Bb — sliding between 4th, 6th, and 1st positions.',
        prompt: 'Step through each note carefully. Feel the slide moving between 4th, 6th, and 1st positions!',
      },
      {
        id: 'tb-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tb-3', 'tb-4', 'tb-5', 'tb-6'],
        description: 'A classic tune using G, F, Eb, and D — four notes across the staff.',
        prompt: 'This song moves between four slide positions. Listen for the repeating pattern!',
        noteIds: ['tb-6', 'tb-5', 'tb-4', 'tb-3', 'tb-5', 'tb-6', 'tb-6', 'tb-6', 'tb-5', 'tb-5', 'tb-5', 'tb-6', 'tb-6', 'tb-6', 'tb-5', 'tb-4', 'tb-4', 'tb-3', 'tb-3', 'tb-5', 'tb-6', 'tb-5', 'tb-4', 'tb-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tb-review-1',
        type: 'review',
        reviewLessonIds: ['tb-1','tb-2','tb-3','tb-4','tb-5','tb-song-1','tb-song-2'],
        noteName: 'Review 1',
        description: 'Review your first five notes and songs — Bb2 through F3.',
        prompt: '',
      },
      {
        id: 'tb-6',
        noteName: 'G',
        octave: 3,
        staffStep: 7,
        accidental: null,
        freq: 196.00,
        fingeringState: 4,
        description: 'G — 4th position. Fourth harmonic.',
        prompt: '4th position. G is the 4th partial. Keep the air speed up.'
      },
      {
        id: 'tb-7',
        noteName: 'A',
        octave: 3,
        staffStep: 8,
        accidental: null,
        freq: 220.00,
        fingeringState: 2,
        description: 'A — 2nd position. Just past 1st.',
        prompt: '2nd position (just past 1st). Small precise slide movement.'
      },
      {
        id: 'tb-8',
        noteName: 'B♭',
        octave: 3,
        staffStep: 9,
        accidental: '♭',
        freq: 233.08,
        fingeringState: 1,
        description: 'Bb — 1st position. An octave above your first note!',
        prompt: '1st position. Bb is the 4th partial — one octave above the first note. Faster air, firmer buzz.'
      },
      {
        id: 'tb-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8'],
        description: 'A folk melody climbing up and down the full Bb octave.',
        prompt: 'This song takes you from Bb2 up to Bb3 and back. A great slide workout!',
        noteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8', 'tb-8', 'tb-7', 'tb-6', 'tb-5', 'tb-4', 'tb-3', 'tb-2', 'tb-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tb-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Slide Serenade',
        prerequisiteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8'],
        description: 'A melodic phrase connecting all your slide positions.',
        prompt: 'This melody uses every position at least once. Keep the buzz steady!',
        noteIds: ['tb-1', 'tb-5', 'tb-8', 'tb-5', 'tb-1', 'tb-7', 'tb-5', 'tb-4', 'tb-3', 'tb-6', 'tb-4', 'tb-5', 'tb-1', 'tb-5', 'tb-8', 'tb-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tb-review-2',
        type: 'review',
        reviewLessonIds: ['tb-1','tb-2','tb-3','tb-4','tb-5','tb-6','tb-7','tb-8','tb-song-3','tb-song-4'],
        noteName: 'Review 2',
        description: 'Review all trombone notes and songs together — the full Bb2 to Bb3 octave.',
        prompt: '',
      },
    ]
  },
  'french-horn': {
    id: 'french-horn', name: 'French Horn', shortName: 'Fr. Horn',
    clef: 'treble', fingeringType: 'horn', isTransposing: true, transposeSemitones: -7, available: true,     accentColor: '#E8845A',
    lessons: [
      // ── Note lessons ────────────────────────────────────────────────────
      {
        id: 'fh-1',
        noteName: 'C',
        octave: 4,
        concertNote: 'F3',
        staffStep: -2,
        accidental: null,
        freq: 174.61,
        fingeringState: [false, false, false],
        description: 'No valves — the fundamental resonance of the F horn.',
        prompt: 'No valves. C is the 4th partial of the F horn.'
      },
      {
        id: 'fh-2',
        noteName: 'D',
        octave: 4,
        concertNote: 'G3',
        staffStep: -1,
        accidental: null,
        freq: 196.00,
        fingeringState: [true, false, false],
        description: 'Valve 1 — whole step above C.',
        prompt: 'Valve 1. Fifth partial with first valve down.'
      },
      {
        id: 'fh-3',
        noteName: 'E',
        octave: 4,
        concertNote: 'A3',
        staffStep: 0,
        accidental: null,
        freq: 220.00,
        fingeringState: [false, false, false],
        description: 'No valves — E is the 5th partial of the open series.',
        prompt: 'No valves. E is the 5th partial of the open series.'
      },
      {
        id: 'fh-4',
        noteName: 'F',
        octave: 4,
        concertNote: 'B\u266d3',
        staffStep: 1,
        accidental: null,
        freq: 233.08,
        fingeringState: [true, false, false],
        description: 'Valve 1 again — half-step below E.',
        prompt: 'Valve 1. Half-step below E.'
      },
      {
        id: 'fh-5',
        noteName: 'G',
        octave: 4,
        concertNote: 'C4',
        staffStep: 2,
        accidental: null,
        freq: 261.63,
        fingeringState: [false, false, false],
        description: 'No valves — the 6th partial.',
        prompt: 'No valves. 6th partial. Faster air than E.'
      },
      {
        id: 'fh-6',
        noteName: 'A',
        octave: 4,
        concertNote: 'D4',
        staffStep: 3,
        accidental: null,
        freq: 293.66,
        fingeringState: [true, true, false],
        description: 'Valves 1 and 2 — whole step below B.',
        prompt: 'Valves 1 and 2. Whole step below B.'
      },
      {
        id: 'fh-7',
        noteName: 'B',
        octave: 4,
        concertNote: 'E4',
        staffStep: 4,
        accidental: null,
        freq: 329.63,
        fingeringState: [false, true, false],
        description: 'Valve 2 — half-step below C5.',
        prompt: 'Valve 2. Half-step below C5.'
      },
      {
        id: 'fh-8',
        noteName: 'C',
        octave: 5,
        concertNote: 'F4',
        staffStep: 5,
        accidental: null,
        freq: 349.23,
        fingeringState: [false, false, false],
        description: 'No valves — the 8th partial. Octave above your first C.',
        prompt: 'No valves. 8th partial. Firm embouchure, fast air.'
      },
      // ── Song 1 ──────────────────────────────────────────────────────────
      {
        id: 'fh-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic melody using E, D, and C — your first three notes with valves.',
        prompt: 'Step through each note. The pattern repeats. Feel how the valves move!',
      },
      {
        id: 'fh-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-6'],
        description: 'The tune behind "Mary Had a Little Lamb" using G, A, G, F, E, and D.',
        prompt: 'Listen for the repeating three-note pattern!',
        noteIds: ['fh-5', 'fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-5', 'fh-5', 'fh-5', 'fh-6', 'fh-5', 'fh-4', 'fh-4', 'fh-5', 'fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-5', 'fh-5', 'fh-5', 'fh-3', 'fh-4', 'fh-4', 'fh-2', 'fh-5', 'fh-6', 'fh-5', 'fh-4', 'fh-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'fh-review-1',
        type: 'review',
        reviewLessonIds: ['fh-1', 'fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-song-1', 'fh-song-2'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'fh-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-6', 'fh-7', 'fh-8'],
        description: 'A traditional German folk song spanning almost your full octave — D up to C.',
        prompt: 'This song moves stepwise through your new notes. Take it slowly!',
        noteIds: ['fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-2', 'fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-2', 'fh-5', 'fh-5', 'fh-6', 'fh-6', 'fh-4', 'fh-4', 'fh-3', 'fh-3', 'fh-2', 'fh-2', 'fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-2'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'fh-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Horn Calls',
        prerequisiteIds: ['fh-1', 'fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-6', 'fh-7', 'fh-8'],
        description: 'A bright fanfare using all eight notes of your first octave — C to C.',
        prompt: 'This fanfare leaps between all your notes. Keep the air strong and the valves crisp!',
        noteIds: ['fh-1', 'fh-5', 'fh-8', 'fh-5', 'fh-1', 'fh-7', 'fh-5', 'fh-4', 'fh-3', 'fh-6', 'fh-4', 'fh-5', 'fh-1', 'fh-5', 'fh-8', 'fh-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'fh-review-2',
        type: 'review',
        reviewLessonIds: ['fh-1', 'fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-6', 'fh-7', 'fh-8', 'fh-song-3', 'fh-song-4'],
        noteName: 'Review 2',
        description: 'Review all horn notes and songs together — the full C4 to C5 octave.',
        prompt: '',
      },
    ]
  },
  'euphonium': {
    id: 'euphonium', name: 'Euphonium', shortName: 'Euph.',
    clef: 'bass', fingeringType: 'euphonium', isTransposing: false, available: true,     accentColor: '#D8C34A',
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
        prompt: 'No valves. Bb is the 2nd partial of the Bb bugle. Deep breath, steady air.'
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
        prompt: 'Valves 1 and 3. Half-step above Bb.'
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
        prompt: 'Valves 1 and 2. D sits on the third line of the bass staff.'
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
        prompt: 'Valve 1 only (index finger). Eb is the 4th note of the Bb major scale.'
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
        prompt: 'No valves. F is the 3rd harmonic. Faster air.'
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
        prompt: 'Valves 1 and 2. Whole step above F.'
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
        prompt: 'Valve 2 only (middle finger). Half-step below Bb.'
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
        prompt: 'No valves. Bb is the 4th harmonic. Tighter embouchure, faster air.'
      },
      {
        id: 'eu-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using D, C, and Bb — your first three notes.',
        prompt: 'Step through each note. Feel the valves changing between combinations!',
      },
      {
        id: 'eu-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['eu-3', 'eu-4', 'eu-5', 'eu-6'],
        description: 'A classic tune using G3, F3, Eb3, and D3 — four notes across the staff.',
        prompt: 'This song moves between four valve combinations. Listen for the repeating pattern!',
        noteIds: ['eu-6', 'eu-5', 'eu-4', 'eu-3', 'eu-5', 'eu-6', 'eu-6', 'eu-6', 'eu-5', 'eu-5', 'eu-5', 'eu-6', 'eu-6', 'eu-6', 'eu-5', 'eu-4', 'eu-4', 'eu-3', 'eu-3', 'eu-5', 'eu-6', 'eu-5', 'eu-4', 'eu-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8'],
        description: 'A folk melody travelling up and down the full Bb octave.',
        prompt: 'This song takes you from Bb2 up to Bb3 and back. Listen for the stepwise motion!',
        noteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8', 'eu-8', 'eu-7', 'eu-6', 'eu-5', 'eu-4', 'eu-3', 'eu-2', 'eu-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'eu-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Euphonium Air',
        prerequisiteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8'],
        description: 'A melodic phrase connecting all your valve combinations.',
        prompt: 'This fanfare-style melody uses every combination at least once. Keep the air steady!',
        noteIds: ['eu-1', 'eu-5', 'eu-8', 'eu-5', 'eu-1', 'eu-7', 'eu-5', 'eu-4', 'eu-3', 'eu-6', 'eu-4', 'eu-5', 'eu-1', 'eu-5', 'eu-8', 'eu-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
    clef: 'bass', fingeringType: 'tuba', isTransposing: false, available: true,     accentColor: '#E0A24E',
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
        prompt: 'No valves. Full, relaxed breath. Slow, wide air stream.'
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
        prompt: 'Valves 1 and 3. Half-step above Bb.'
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
        prompt: 'Valves 1 and 2. D sits below the bass staff.'
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
        prompt: 'Valve 1 only (index finger). Half-step above C.'
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
        prompt: 'No valves. F is the 3rd partial. First note on the staff.'
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
        prompt: 'Valves 1 and 2. G is on the second line of the bass clef.'
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
        prompt: 'Valve 2 only (middle finger). Half-step below Bb.'
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
        prompt: 'No valves. Bb is on the third line. Faster, more focused air.'
      },
      {
        id: 'tu-song-1', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using D, C, and Bb — your first three notes below the staff.',
        prompt: 'Step through each note. Feel the valves changing between combinations below the staff!',
      },
      {
        id: 'tu-song-2', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tu-3', 'tu-4', 'tu-5', 'tu-6'],
        description: 'A classic tune using G2, F2, Eb2, and D2 — four notes across and below the staff.',
        prompt: 'This song moves between four note names. Big, warm air throughout!',
        noteIds: ['tu-6', 'tu-5', 'tu-4', 'tu-3', 'tu-5', 'tu-6', 'tu-6', 'tu-6', 'tu-5', 'tu-5', 'tu-5', 'tu-6', 'tu-6', 'tu-6', 'tu-5', 'tu-4', 'tu-4', 'tu-3', 'tu-3', 'tu-5', 'tu-6', 'tu-5', 'tu-4', 'tu-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8'],
        description: 'A folk melody climbing up and down the full Bb octave.',
        prompt: 'This song takes you from Bb1 up to Bb2 and back. Start with deep, slow air and gradually speed up!',
        noteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8', 'tu-8', 'tu-7', 'tu-6', 'tu-5', 'tu-4', 'tu-3', 'tu-2', 'tu-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tu-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Tuba Foundation',
        prerequisiteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8'],
        description: 'A grounding melody connecting all your notes across the octave.',
        prompt: 'This fanfare-style melody uses every note at least once. Let the tuba resonate!',
        noteIds: ['tu-1', 'tu-5', 'tu-8', 'tu-5', 'tu-1', 'tu-7', 'tu-5', 'tu-4', 'tu-3', 'tu-6', 'tu-4', 'tu-5', 'tu-1', 'tu-5', 'tu-8', 'tu-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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

// ── Shared songs ────────────────────────────────────────────────────────────
// The shared tunes are defined once here, as scale degrees relative to each
// instrument's own notes (degree 1 = that instrument's first note lesson).
// The loop below expands them into every instrument's noteIds/durations, so
// the melodies cannot drift apart the way hand-entered note lists did.
const CANONICAL_SONGS = {
  'Hot Cross Buns': {
    degrees:   [3, 2, 1,  3, 2, 1,  1, 1, 1, 1,  2, 2, 2, 2,  3, 2, 1],
    durations: [1, 1, 2,  1, 1, 2,  1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 2],
  },
};

for (const inst of Object.values(CURRICULUM)) {
  for (const lesson of inst.lessons) {
    if (lesson.type !== 'song') continue;
    const song = CANONICAL_SONGS[lesson.noteName];
    if (!song) continue;
    const prefix = lesson.id.replace(/-song-\d+$/, '');
    lesson.noteIds = song.degrees.map(d => `${prefix}-${d}`);
    lesson.durations = song.durations.slice();
    lesson.prerequisiteIds = [...new Set(song.degrees)]
      .sort((a, b) => a - b)
      .map(d => `${prefix}-${d}`);
  }
}

// Ordered list for the home screen
const INSTRUMENT_ORDER = [
  'flute', 'clarinet', 'alto-saxophone', 'oboe', 'bassoon',
  'trumpet', 'trombone', 'french-horn', 'euphonium', 'tuba'
];

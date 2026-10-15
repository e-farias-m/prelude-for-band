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
    family: 'brass',
    lessons: [
      {
        id: 'tr-1',
        degree: 1,
        noteName: 'C',
        octave: 4,
        concertNote: 'B\u266d3',
        staffStep: -2,
        accidental: null,
        freq: 233.08,
        fingeringState: [false, false, false],
        description: 'The tonic — no valves! Also known as concert Bb, the fundamental resonance of the trumpet.',
        prompt: 'No valves. C is the 4th partial of the Bb bugle. Buzz a firm middle-register pitch.'
      },
      {
        id: 'tr-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'tr-2',
        degree: 2,
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
        id: 'tr-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'tr-3',
        degree: 3,
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
        degree: 4,
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
        degree: 5,
        noteName: 'G',
        octave: 4,
        concertNote: 'F4',
        staffStep: 2,
        accidental: null,
        freq: 349.23,
        fingeringState: [false, false, false],
        description: 'Your first note — no valves, the 6th partial of the open tube.',
        prompt: 'No valves. Same open fingering as C. Faster air.'
      },
      {
        id: 'tr-6',
        degree: 6,
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
        degree: 7,
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
        degree: 8,
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
        id: 'tr-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — the first three notes of your scale.',
        prompt: 'Step through each note. The pattern repeats. Feel how the valves move in sequence!',
      },
      {
        id: 'tr-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-5', 'tr-5', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-4', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-5', 'tr-5', 'tr-5', 'tr-3', 'tr-4', 'tr-4', 'tr-2', 'tr-5', 'tr-6', 'tr-5', 'tr-4', 'tr-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'tr-review-1',
        type: 'review',
        reviewLessonIds: ['tr-song-1', 'tr-song-2', 'tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-song-3', 'tr-song-4'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'tr-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2', 'tr-5', 'tr-5', 'tr-6', 'tr-6', 'tr-4', 'tr-4', 'tr-3', 'tr-3', 'tr-2', 'tr-2', 'tr-6', 'tr-5', 'tr-4', 'tr-3', 'tr-2'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tr-song-6', type: 'song',
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
        reviewLessonIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4', 'tr-5', 'tr-6', 'tr-7', 'tr-8', 'tr-song-5', 'tr-song-6'],
        noteName: 'Review 2',
        description: 'Review all trumpet notes and songs together — the full C4 to C5 octave.',
        prompt: '',
      },
    ]
  },

  // ── FLUTE ────────────────────────────────────────────────────────────────
  'flute': {
    id: 'flute', name: 'Flute', shortName: 'Flute',
    clef: 'treble', fingeringType: 'flute', isTransposing: false, available: true, family: 'flute',
    accentColor: '#7ED0E8',
    lessons: [
      {
        id: 'fl-1',
        degree: 1,
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
        id: 'fl-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'fl-2',
        degree: 2,
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
        id: 'fl-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'fl-3',
        degree: 3,
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
        id: 'fl-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three flute notes.',
        prompt: 'Step through each note slowly. Notice how your right hand alternates between keys!',
      },
      {
        id: 'fl-4',
        degree: 4,
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
        degree: 5,
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
        id: 'fl-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['fl-4', 'fl-3', 'fl-2', 'fl-1', 'fl-4', 'fl-4', 'fl-4', 'fl-3', 'fl-3', 'fl-3', 'fl-4', 'fl-4', 'fl-4', 'fl-4', 'fl-3', 'fl-2', 'fl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'fl-review-1',
        type: 'review',
        reviewLessonIds: ['fl-song-1', 'fl-song-2', 'fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-song-3', 'fl-song-4'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'fl-6',
        degree: 6,
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
        degree: 7,
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
        degree: 8,
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
        id: 'fl-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-6', 'fl-7', 'fl-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-6', 'fl-7', 'fl-8', 'fl-8', 'fl-7', 'fl-6', 'fl-5', 'fl-4', 'fl-3', 'fl-2', 'fl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'fl-song-6', type: 'song',
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
        reviewLessonIds: ['fl-1', 'fl-2', 'fl-3', 'fl-4', 'fl-5', 'fl-6', 'fl-7', 'fl-8', 'fl-song-5', 'fl-song-6'],
        noteName: 'Review 2',
        description: 'Review all flute notes and songs together — the full C4 to C5 octave.',
        prompt: '',
      },
    ]
  },

      // ── CLARINET (Bb) ───────────────────────────────────────────────────────
  'clarinet': {
    id: 'clarinet', name: 'Clarinet', shortName: 'Clarinet',
    clef: 'treble', fingeringType: 'clarinet', isTransposing: true, transposeSemitones: -2, available: true, family: 'single-reed',
    accentColor: '#E0A868',
    lessons: [
      {
        id: 'cl-1',
        degree: 1,
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
        id: 'cl-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'cl-2',
        degree: 2,
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
        id: 'cl-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'cl-3',
        degree: 3,
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
        degree: 4,
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
        degree: 5,
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
        id: 'cl-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using C, D, and E — your first three chalumeau notes.',
        prompt: 'Step through each note carefully. Feel how the rings seal with your fingertips!',
      },
      {
        id: 'cl-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-4'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['cl-4', 'cl-3', 'cl-2', 'cl-1', 'cl-4', 'cl-4', 'cl-4', 'cl-3', 'cl-3', 'cl-3', 'cl-4', 'cl-4', 'cl-4', 'cl-4', 'cl-3', 'cl-2', 'cl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'cl-review-1',
        type: 'review',
        reviewLessonIds: ['cl-song-1', 'cl-song-2', 'cl-1','cl-2','cl-3','cl-4','cl-5','cl-song-3','cl-song-4'],
        noteName: 'Review 1',
        description: 'Review your first five notes and songs — C through G in the chalumeau.',
        prompt: '',
      },
      {
        id: 'cl-6',
        degree: 6,
        noteName: 'A',
        octave: 4,
        concertNote: 'G4',
        staffStep: 3,
        accidental: null,
        freq: 392.00,
        fingeringState: [false, false, false, false, false, false, false, false, false, undefined, true],
        description: 'A — top A side key with left index.',
        prompt: 'A key (left index side key). Thumb off. All other keys open.'
      },
      {
        id: 'cl-7',
        degree: 7,
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
        degree: 8,
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
        id: 'cl-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-4', 'cl-5', 'cl-6', 'cl-7', 'cl-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['cl-1', 'cl-2', 'cl-3', 'cl-4', 'cl-5', 'cl-6', 'cl-7', 'cl-8', 'cl-8', 'cl-7', 'cl-6', 'cl-5', 'cl-4', 'cl-3', 'cl-2', 'cl-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'cl-song-6', type: 'song',
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
        reviewLessonIds: ['cl-1','cl-2','cl-3','cl-4','cl-5','cl-6','cl-7','cl-8','cl-song-5','cl-song-6'],
        noteName: 'Review 2',
        description: 'Review all clarinet notes and songs across the full octave.',
        prompt: '',
      },
    ]
  },

  // ── ALTO SAXOPHONE (Eb) ─────────────────────────────────────────────────
  'alto-saxophone': {
    id: 'alto-saxophone', name: 'Alto Saxophone', shortName: 'Alto Sax',
    clef: 'treble', fingeringType: 'saxophone', isTransposing: true, transposeSemitones: -9, available: true, family: 'single-reed',
    accentColor: '#F0B840',
    lessons: [
      {
        id: 'as-1',
        degree: 1,
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
        id: 'as-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'as-2',
        degree: 2,
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
        id: 'as-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'as-3',
        degree: 3,
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
        id: 'as-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three alto sax notes.',
        prompt: 'Step through each note from E down to C. Feel the right hand lifting!',
      },
      {
        id: 'as-4',
        degree: 4,
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
        degree: 5,
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
        id: 'as-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['as-1', 'as-2', 'as-3', 'as-4'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['as-4', 'as-3', 'as-2', 'as-1', 'as-4', 'as-4', 'as-4', 'as-3', 'as-3', 'as-3', 'as-4', 'as-4', 'as-4', 'as-4', 'as-3', 'as-2', 'as-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'as-review-1',
        type: 'review',
        reviewLessonIds: ['as-song-1', 'as-song-2', 'as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-song-3', 'as-song-4'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'as-6',
        degree: 6,
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
        degree: 7,
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
        degree: 8,
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
        id: 'as-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-6', 'as-7', 'as-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-6', 'as-7', 'as-8', 'as-8', 'as-7', 'as-6', 'as-5', 'as-4', 'as-3', 'as-2', 'as-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'as-song-6', type: 'song',
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
        reviewLessonIds: ['as-1', 'as-2', 'as-3', 'as-4', 'as-5', 'as-6', 'as-7', 'as-8', 'as-song-5', 'as-song-6'],
        noteName: 'Review 2',
        description: 'Review all alto sax notes and songs together — the full C4 to C5 octave.',
        prompt: '',
      },
    ]
  },

  // ── OBOE ─────────────────────────────────────────────────────────────────
  'oboe': {
    id: 'oboe', name: 'Oboe', shortName: 'Oboe',
    clef: 'treble', fingeringType: 'oboe', isTransposing: false, available: true, family: 'double-reed',
    accentColor: '#D98C5F',
    lessons: [
      {
        id: 'ob-1',
        degree: 1,
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
        id: 'ob-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'ob-2',
        degree: 2,
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
        id: 'ob-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'ob-3',
        degree: 3,
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
        id: 'ob-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three oboe notes.',
        prompt: 'Step through each note. Feel the right fingers lifting one at a time!',
      },
      {
        id: 'ob-4',
        degree: 4,
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
        degree: 5,
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
        id: 'ob-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['ob-4', 'ob-3', 'ob-2', 'ob-1', 'ob-4', 'ob-4', 'ob-4', 'ob-3', 'ob-3', 'ob-3', 'ob-4', 'ob-4', 'ob-4', 'ob-4', 'ob-3', 'ob-2', 'ob-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'ob-review-1',
        type: 'review',
        reviewLessonIds: ['ob-song-1', 'ob-song-2', 'ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-song-3', 'ob-song-4'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'ob-6',
        degree: 6,
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
        degree: 7,
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
        degree: 8,
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
        id: 'ob-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-6', 'ob-7', 'ob-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-6', 'ob-7', 'ob-8', 'ob-8', 'ob-7', 'ob-6', 'ob-5', 'ob-4', 'ob-3', 'ob-2', 'ob-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'ob-song-6', type: 'song',
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
        reviewLessonIds: ['ob-1', 'ob-2', 'ob-3', 'ob-4', 'ob-5', 'ob-6', 'ob-7', 'ob-8', 'ob-song-5', 'ob-song-6'],
        noteName: 'Review 2',
        description: 'Review all oboe notes and songs together — the full C4 to C5 octave.',
        prompt: '',
      },
    ]
  },

  // ── BASSOON (bass clef) ─────────────────────────────────────────────────
  'bassoon': {
    id: 'bassoon', name: 'Bassoon', shortName: 'Bassoon',
    clef: 'bass', fingeringType: 'bassoon', isTransposing: false, available: true, family: 'double-reed',
    accentColor: '#C98A55',
    lessons: [
      {
        id: 'bn-1',
        degree: 1,
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
        id: 'bn-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'bn-2',
        degree: 2,
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
        id: 'bn-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'bn-3',
        degree: 3,
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
        id: 'bn-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using E, D, and C — your first three bassoon notes.',
        prompt: 'Step through each note with warm, supported air. The whisper key stays on for these notes!',
      },
      {
        id: 'bn-4',
        degree: 4,
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
        degree: 5,
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
        id: 'bn-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['bn-4', 'bn-3', 'bn-2', 'bn-1', 'bn-4', 'bn-4', 'bn-4', 'bn-3', 'bn-3', 'bn-3', 'bn-4', 'bn-4', 'bn-4', 'bn-4', 'bn-3', 'bn-2', 'bn-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'bn-review-1',
        type: 'review',
        reviewLessonIds: ['bn-song-1', 'bn-song-2', 'bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-song-3', 'bn-song-4'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — C, D, E, F, and G.',
        prompt: '',
      },
      {
        id: 'bn-6',
        degree: 6,
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
        degree: 7,
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
        degree: 8,
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
        id: 'bn-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-6', 'bn-7', 'bn-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-6', 'bn-7', 'bn-8', 'bn-8', 'bn-7', 'bn-6', 'bn-5', 'bn-4', 'bn-3', 'bn-2', 'bn-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'bn-song-6', type: 'song',
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
        reviewLessonIds: ['bn-1', 'bn-2', 'bn-3', 'bn-4', 'bn-5', 'bn-6', 'bn-7', 'bn-8', 'bn-song-5', 'bn-song-6'],
        noteName: 'Review 2',
        description: 'Review all bassoon notes and songs together — the full C3 to C4 octave.',
        prompt: '',
      },
    ]
  },
  'trombone': {
    id: 'trombone', name: 'Trombone', shortName: 'Trombone',
    clef: 'bass', fingeringType: 'trombone', isTransposing: false, available: true, family: 'brass',
    accentColor: '#E8C24A',
    lessons: [
      {
        id: 'tb-1',
        degree: 1,
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
        id: 'tb-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'tb-2',
        degree: 2,
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
        id: 'tb-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'tb-3',
        degree: 3,
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
        degree: 4,
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
        degree: 5,
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: 1,
        description: 'Your first note — F in 1st position, the third harmonic of the open horn.',
        prompt: '1st position. F is the 3rd harmonic. Faster air than the low notes.'
      },
      {
        id: 'tb-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using D, C, and Bb — sliding between 4th, 6th, and 1st positions.',
        prompt: 'Step through each note carefully. Feel the slide moving between 4th, 6th, and 1st positions!',
      },
      {
        id: 'tb-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tb-3', 'tb-4', 'tb-5', 'tb-6'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['tb-6', 'tb-5', 'tb-4', 'tb-3', 'tb-5', 'tb-6', 'tb-6', 'tb-6', 'tb-5', 'tb-5', 'tb-5', 'tb-6', 'tb-6', 'tb-6', 'tb-5', 'tb-4', 'tb-4', 'tb-3', 'tb-3', 'tb-5', 'tb-6', 'tb-5', 'tb-4', 'tb-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tb-review-1',
        type: 'review',
        reviewLessonIds: ['tb-song-1', 'tb-song-2', 'tb-1','tb-2','tb-3','tb-4','tb-5','tb-song-3','tb-song-4'],
        noteName: 'Review 1',
        description: 'Review your first five notes and songs — Bb2 through F3.',
        prompt: '',
      },
      {
        id: 'tb-6',
        degree: 6,
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
        degree: 7,
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
        degree: 8,
        noteName: 'B♭',
        octave: 3,
        staffStep: 9,
        accidental: '♭',
        freq: 233.08,
        fingeringState: 1,
        description: 'Bb — 1st position. An octave above your low Bb!',
        prompt: '1st position. Bb is the 4th partial — one octave above Bb2. Faster air, firmer buzz.'
      },
      {
        id: 'tb-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6', 'tb-7', 'tb-8', 'tb-8', 'tb-7', 'tb-6', 'tb-5', 'tb-4', 'tb-3', 'tb-2', 'tb-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tb-song-6', type: 'song',
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
        reviewLessonIds: ['tb-1','tb-2','tb-3','tb-4','tb-5','tb-6','tb-7','tb-8','tb-song-5','tb-song-6'],
        noteName: 'Review 2',
        description: 'Review all trombone notes and songs together — the full Bb2 to Bb3 octave.',
        prompt: '',
      },
    ]
  },
  'french-horn': {
    id: 'french-horn', name: 'French Horn', shortName: 'Fr. Horn',
    clef: 'treble', fingeringType: 'horn', isTransposing: true, transposeSemitones: -7, available: true, family: 'brass',
    accentColor: '#E8845A',
    lessons: [
      // ── Note lessons ────────────────────────────────────────────────────
      {
        id: 'fh-1',
        degree: 1,
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
        id: 'fh-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'fh-2',
        degree: 2,
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
        id: 'fh-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'fh-3',
        degree: 3,
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
        degree: 4,
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
        degree: 5,
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
        degree: 6,
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
        degree: 7,
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
        degree: 8,
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
        id: 'fh-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic melody using A, G, and F — the first three notes of your scale with valves.',
        prompt: 'Step through each note. The pattern repeats. Feel how the valves move!',
      },
      {
        id: 'fh-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-6'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['fh-5', 'fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-5', 'fh-5', 'fh-5', 'fh-6', 'fh-5', 'fh-4', 'fh-4', 'fh-5', 'fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-5', 'fh-5', 'fh-5', 'fh-3', 'fh-4', 'fh-4', 'fh-2', 'fh-5', 'fh-6', 'fh-5', 'fh-4', 'fh-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'fh-review-1',
        type: 'review',
        reviewLessonIds: ['fh-song-1', 'fh-song-2', 'fh-1', 'fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-song-3', 'fh-song-4'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — F, G, A, Bb, and C.',
        prompt: '',
      },
      {
        id: 'fh-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-6', 'fh-7', 'fh-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-2', 'fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-2', 'fh-5', 'fh-5', 'fh-6', 'fh-6', 'fh-4', 'fh-4', 'fh-3', 'fh-3', 'fh-2', 'fh-2', 'fh-6', 'fh-5', 'fh-4', 'fh-3', 'fh-2'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'fh-song-6', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Horn Calls',
        prerequisiteIds: ['fh-1', 'fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-6', 'fh-7', 'fh-8'],
        description: 'A bright fanfare using all eight notes of your first octave — F to F.',
        prompt: 'This fanfare leaps between all your notes. Keep the air strong and the valves crisp!',
        noteIds: ['fh-1', 'fh-5', 'fh-8', 'fh-5', 'fh-1', 'fh-7', 'fh-5', 'fh-4', 'fh-3', 'fh-6', 'fh-4', 'fh-5', 'fh-1', 'fh-5', 'fh-8', 'fh-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 2 ────────────────────────────────────────────────────────
      {
        id: 'fh-review-2',
        type: 'review',
        reviewLessonIds: ['fh-1', 'fh-2', 'fh-3', 'fh-4', 'fh-5', 'fh-6', 'fh-7', 'fh-8', 'fh-song-5', 'fh-song-6'],
        noteName: 'Review 2',
        description: 'Review all horn notes and songs together — the full F4 to F5 octave.',
        prompt: '',
      },
    ]
  },
  'euphonium': {
    id: 'euphonium', name: 'Euphonium', shortName: 'Euph.',
    clef: 'bass', fingeringType: 'euphonium', isTransposing: false, available: true, family: 'brass',
    accentColor: '#D8C34A',
    lessons: [
      {
        id: 'eu-1',
        degree: 1,
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
        id: 'eu-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'eu-2',
        degree: 2,
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
        id: 'eu-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'eu-3',
        degree: 3,
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
        degree: 4,
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
        degree: 5,
        noteName: 'F',
        octave: 3,
        staffStep: 6,
        accidental: null,
        freq: 174.61,
        fingeringState: [false, false, false],
        description: 'Your first note — open, the 3rd harmonic.',
        prompt: 'No valves. F is the 3rd harmonic. Faster air.'
      },
      {
        id: 'eu-6',
        degree: 6,
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
        degree: 7,
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
        degree: 8,
        noteName: 'B\u266d',
        octave: 3,
        staffStep: 9,
        accidental: '\u266d',
        freq: 233.08,
        fingeringState: [false, false, false],
        description: 'Open again — an octave above your low Bb!',
        prompt: 'No valves. Bb is the 4th harmonic. Tighter embouchure, faster air.'
      },
      {
        id: 'eu-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using D, C, and Bb — the first three notes of your scale.',
        prompt: 'Step through each note. Feel the valves changing between combinations!',
      },
      {
        id: 'eu-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['eu-3', 'eu-4', 'eu-5', 'eu-6'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['eu-6', 'eu-5', 'eu-4', 'eu-3', 'eu-5', 'eu-6', 'eu-6', 'eu-6', 'eu-5', 'eu-5', 'eu-5', 'eu-6', 'eu-6', 'eu-6', 'eu-5', 'eu-4', 'eu-4', 'eu-3', 'eu-3', 'eu-5', 'eu-6', 'eu-5', 'eu-4', 'eu-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'eu-review-1',
        type: 'review',
        reviewLessonIds: ['eu-song-1', 'eu-song-2', 'eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-song-3', 'eu-song-4'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — Bb2, C3, D3, Eb3, and F3.',
        prompt: '',
      },
      {
        id: 'eu-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8', 'eu-8', 'eu-7', 'eu-6', 'eu-5', 'eu-4', 'eu-3', 'eu-2', 'eu-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'eu-song-6', type: 'song',
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
        reviewLessonIds: ['eu-1', 'eu-2', 'eu-3', 'eu-4', 'eu-5', 'eu-6', 'eu-7', 'eu-8', 'eu-song-5', 'eu-song-6'],
        noteName: 'Review 2',
        description: 'Review all euphonium notes and songs together — the full Bb2 to Bb3 octave.',
        prompt: '',
      },
    ]
  },
  'tuba': {
    id: 'tuba', name: 'Tuba', shortName: 'Tuba',
    clef: 'bass', fingeringType: 'tuba', isTransposing: false, available: true, family: 'brass',
    accentColor: '#E0A24E',
    lessons: [
      {
        id: 'tu-1',
        degree: 1,
        noteName: 'B\u266d',
        octave: 1,
        staffStep: -5,
        accidental: '\u266d',
        freq: 58.27,
        fingeringState: [false, false, false],
        description: 'Open — the tonic tuba note. Feel the resonance.',
        prompt: 'No valves. Full, relaxed breath. Slow, wide air stream.'
      },
      {
        id: 'tu-song-1',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'My First Note',
        description: 'A short warm-up on your very first note. Relax and keep the tone steady!',
        prompt: 'Play the note a few times, long and even. Listen for a clear, centred sound.',
      },
      {
        id: 'tu-2',
        degree: 2,
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
        id: 'tu-song-2',
        type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Step Up and Down',
        description: 'A two-note song that steps from your first note to your second and back.',
        prompt: 'Move smoothly between just two notes. Keep each pitch centred!',
      },
      {
        id: 'tu-3',
        degree: 3,
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
        degree: 4,
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
        degree: 5,
        noteName: 'F',
        octave: 2,
        staffStep: -1,
        accidental: null,
        freq: 87.31,
        fingeringState: [false, false, false],
        description: 'Your first note — open, the 3rd harmonic of the Bb bugle.',
        prompt: 'No valves. F is the 3rd partial. First note on the staff.'
      },
      {
        id: 'tu-6',
        degree: 6,
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
        degree: 7,
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
        degree: 8,
        noteName: 'B\u266d',
        octave: 2,
        staffStep: 2,
        accidental: '\u266d',
        freq: 116.54,
        fingeringState: [false, false, false],
        description: 'Open — an octave above your low Bb!',
        prompt: 'No valves. Bb is on the third line. Faster, more focused air.'
      },
      {
        id: 'tu-song-3', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Hot Cross Buns',
        description: 'A classic English nursery rhyme using D, C, and Bb — the first three notes of your scale, below the staff.',
        prompt: 'Step through each note. Feel the valves changing between combinations below the staff!',
      },
      {
        id: 'tu-song-4', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Merrily We Roll Along',
        prerequisiteIds: ['tu-3', 'tu-4', 'tu-5', 'tu-6'],
        description: 'The tune behind "Mary Had a Little Lamb" — a short melody that walks down and back up the first three notes of your scale.',
        prompt: 'Listen for the repeating pattern — just those three notes, so make every one count!',
        noteIds: ['tu-6', 'tu-5', 'tu-4', 'tu-3', 'tu-5', 'tu-6', 'tu-6', 'tu-6', 'tu-5', 'tu-5', 'tu-5', 'tu-6', 'tu-6', 'tu-6', 'tu-5', 'tu-4', 'tu-4', 'tu-3', 'tu-3', 'tu-5', 'tu-6', 'tu-5', 'tu-4', 'tu-3'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      // ── Review 1 ────────────────────────────────────────────────────────
      {
        id: 'tu-review-1',
        type: 'review',
        reviewLessonIds: ['tu-song-1', 'tu-song-2', 'tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-song-3', 'tu-song-4'],
        noteName: 'Review 1',
        description: 'Mix up your first five notes and songs — Bb1, C2, D2, Eb2, and F2.',
        prompt: '',
      },
      {
        id: 'tu-song-5', type: 'song',
        audioUrl: null,
        bpm: 100,
        noteName: 'Lightly Row',
        prerequisiteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8'],
        description: 'A traditional folk melody that steps up and down your first five notes.',
        prompt: 'Take it slowly and listen for the stepwise motion across five notes.',
        noteIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8', 'tu-8', 'tu-7', 'tu-6', 'tu-5', 'tu-4', 'tu-3', 'tu-2', 'tu-1'],
        durations: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
      {
        id: 'tu-song-6', type: 'song',
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
        reviewLessonIds: ['tu-1', 'tu-2', 'tu-3', 'tu-4', 'tu-5', 'tu-6', 'tu-7', 'tu-8', 'tu-song-5', 'tu-song-6'],
        noteName: 'Review 2',
        description: 'Review all tuba notes and songs together — the full Bb1 to Bb2 octave.',
        prompt: '',
      },
    ]
  },

};

// ── Shared songs ────────────────────────────────────────────────────────────
// The shared tunes are defined once here, as scale degrees relative to each
// instrument's own notes (degree 1 = that instrument's tonic note lesson).
// Each note lesson carries an explicit `degree` (its scale position) that is
// independent of its lesson order and its id suffix, so the range-growth order
// can change without touching any song. The loop below resolves each song's
// degrees to the matching note lessons and expands them into noteIds/durations,
// so the melodies cannot drift apart the way hand-entered note lists did.
const CANONICAL_SONGS = {
  'Hot Cross Buns': {
    degrees: [3,2,1, 3,2,1, 1,1,1,1, 2,2,2,2, 3,2,1],
    durations: [1,1,2, 1,1,2, 1,1,1,1, 1,1,1,1, 1,1,2],
  },
  // The three-note "B A G" beginner arrangement of the Mary Had a Little Lamb
  // tune, so it stays within the first three notes the student has learned.
  'Merrily We Roll Along': {
    degrees: [3,2,1,2,3,3,3, 2,2,2, 3,3,3, 3,2,1,2,3,3,3, 2,2,3,2,1],
    durations: [1,1,1,1,1,1,2, 1,1,2, 1,1,2, 1,1,1,1,1,1,2, 1,1,1,1,2],
  },
  // The familiar first section of the German folk song ("Hänschen klein"),
  // stepping through the first five notes of the scale.
  'Lightly Row': {
    degrees: [5,3,3, 4,2,2, 1,2,3,4, 5,5,5, 5,3,3, 4,2,2, 1,3,5,5, 1],
    durations: [1,1,2, 1,1,2, 1,1,1,1, 1,1,2, 1,1,2, 1,1,2, 1,1,1,1, 2],
  },
  // Made-up warm-up for the very first note — one pitch in a simple rhythm,
  // so a beginner has something to play the moment they learn note one. The
  // token "FIRST" resolves to whichever note each instrument teaches first
  // (degree 1 in a scale-first order, degree 5 in standard beginner order).
  'My First Note': {
    degrees: ['FIRST','FIRST','FIRST','FIRST','FIRST','FIRST'],
    durations: [1,1,2, 1,1,2],
  },
  // Made-up two-note song: steps between the first two notes taught and back,
  // giving the newest note a context a single pitch cannot. "FIRST"/"SECOND"
  // resolve to the first two notes in each instrument's own teaching order.
  'Step Up and Down': {
    degrees: ['FIRST','SECOND','FIRST', 'SECOND','FIRST','SECOND', 'FIRST','SECOND','FIRST','SECOND', 'FIRST'],
    durations: [1,1,2, 1,1,2, 1,1,1,1, 2],
  },
  // ── Extended-range practice songs (standard beginner progression) ────────
  // Each is placed right after the note it introduces, so a brand-new note is
  // heard in a tune straight away. Degrees are relative to the instrument's
  // tonic, exactly like the songs above.
  'Climb the Ladder':  { degrees: [1,2,3,4,5,6,5,4,3,2,1], durations: [1,1,1,1,1,2,1,1,1,1,2] },
  'Bounce Back':       { degrees: [1,0,1,0,1],             durations: [1,1,1,1,2] },
  'Deep Down':         { degrees: [-1,1,-1,1],             durations: [1,1,1,2] },
  'Blue Note':         { degrees: ['0b',1,'0b',1],         durations: [1,1,1,2] },
  'High and Low':      { degrees: ['7b',1,'7b',1],         durations: [1,1,1,2] },
  'Octave Leap':       { degrees: [1,8,1,8,1],             durations: [1,1,1,1,2] },
  'Sharp Turn':        { degrees: ['4#',1,'4#',1],         durations: [1,1,1,2] },
  'Seventh Heaven':    { degrees: [1,7,1,7,1],             durations: [1,1,1,1,2] },
  'Flat Third':        { degrees: ['3b',1,'3b',1],         durations: [1,1,1,2] },
  'Top Note':          { degrees: [9,1,9,1],               durations: [1,1,1,2] },
  // The woodwinds continue a few notes past the octave, so their newest (and
  // highest) notes get their own short arpeggios built on the tonic, 5th and
  // octave they already know.
  'Reach Higher':      { degrees: [1,5,8,10,8,5,1],        durations: [1,1,1,2,1,1,2] },
  'Almost There':      { degrees: [1,5,8,11,8,5,1],        durations: [1,1,1,2,1,1,2] },
  'Top of the Range':  { degrees: [1,5,8,12,8,5,1],        durations: [1,1,1,2,1,1,2] },
};

// Scale degree -> note lesson, per instrument. Keyed by the explicit `degree`
// field, so the canonical melodies resolve to the right pitch no matter what
// order the notes are taught in (or what their ids are named).
// A note's scale position is `degree` (its diatonic step from the tonic, where
// the tonic is 1) together with an optional `alter` (semitones: -1 = flat,
// +1 = sharp). Natural notes use the bare degree ("5"); chromatic notes add the
// accidental ("0b" = lowered leading-tone, "4#" = raised 4th). The degree may be
// ≤ 0 (below the tonic) or > 8 (above the first octave), so a range that dips
// below or rises above one octave keeps every note distinct. This key is what
// songs and chords resolve through, so the teaching order, the octave, and the
// id suffix are all free to change.
function degreeKey(degree, alter) {
  if (!alter) return String(degree);
  return `${degree}${alter < 0 ? 'b'.repeat(-alter) : '#'.repeat(alter)}`;
}

// Semitone distance of a *natural* scale degree from the tonic (degree 1),
// valid for degrees below the tonic (0, -1, ...) and above the octave (> 8).
// Used to check that a melody really sounds like the scale it claims.
function scaleSemitones(degree) {
  const step = degree - 1;
  const octave = Math.floor(step / 7);
  const idx = step - octave * 7;
  return [0, 2, 4, 5, 7, 9, 11][idx] + 12 * octave;
}

// ── standard beginner teaching order (brass) ────────────────────────
// The brass instruments teach notes in standard beginner order instead
// of up the scale: the first note is the 5th of the key, and the range grows
// outward from there. PROGRESSION_ORDER lists the scale degrees in teaching order.
//
// EXTENDED_NOTES adds the notes the scale-first order never taught, and (for the
// horn) re-spells every note now that its written key is F. A key that already
// exists as a degree overrides that lesson in place (same id, so the
// instrument's tune and reviews keep pointing at it); a new key creates a fresh
// `${prefix}-ext-*` lesson. This block is pure data: it runs *before* the degree
// index and the canonical song builder below, so nothing downstream needs to
// know that the order changed.
const PROGRESSION_ORDER = [5, 4, 3, 2, 1, 6, 0, -1, '0b', '7b', 8, '4#', 7, '3b', 9];

function extNote(noteName, octave, accidental, staffStep, freq, fingering, alter, description, prompt, concertNote) {
  const note = {
    noteName, octave, accidental, staffStep, freq,
    fingeringState: fingering, alter: alter || 0, description, prompt,
  };
  if (concertNote) note.concertNote = concertNote;
  return note;
}

const EXTENDED_NOTES = {
  trumpet: {
    '0':  extNote('B', 3, null, -3, 220.00, [false, true, false], 0, 'B — the leading tone, a half-step below C (valve 2).', 'Valve 2. Half-step below C.', 'A3'),
    '-1': extNote('A', 3, null, -4, 196.00, [true, true, false], 0, 'A — a whole step below B, valves 1 and 2.', 'Valves 1 and 2.', 'G3'),
    '0b': extNote('B\u266d', 3, '\u266d', -3, 207.65, [true, false, false], -1, 'Bb — valve 1, the bottom of the beginner range.', 'Valve 1.', 'A\u266d3'),
    '7b': extNote('B\u266d', 4, '\u266d', 4, 415.30, [true, false, false], -1, 'Bb — valve 1 again, an octave above your low Bb.', 'Valve 1. Faster air.', 'A\u266d4'),
    '4#': extNote('F#', 4, '#', 1, 329.63, [false, true, false], 1, 'F# — valve 2.', 'Valve 2 only.', 'E4'),
    '3b': extNote('E\u266d', 4, '\u266d', 0, 277.18, [false, true, true], -1, 'Eb — valves 2 and 3.', 'Valves 2 and 3.', 'D\u266d4'),
    '9':  extNote('D', 5, null, 6, 523.25, [true, false, false], 0, 'High D — valve 1, the top of the beginner range.', 'Valve 1. Firm air.', 'C5'),
  },
  trombone: {
    '0':  extNote('A', 2, null, 1, 110.00, 2, 0, 'Low A — 2nd position.', '2nd position. Support the low note.'),
    '-1': extNote('G', 2, null, 0, 98.00, 4, 0, 'Low G — 4th position.', '4th position. Stay relaxed.'),
    '0b': extNote('A\u266d', 2, '\u266d', 1, 103.83, 3, -1, 'Ab — 3rd position, your first flat.', '3rd position.'),
    '7b': extNote('A\u266d', 3, '\u266d', 8, 207.65, 3, -1, 'Ab above the staff — 3rd position.', '3rd position, faster air.'),
    '4#': extNote('E', 3, null, 5, 164.81, 2, 1, 'E natural — 2nd position (or 7th).', '2nd position.'),
    '3b': extNote('D\u266d', 3, '\u266d', 4, 138.59, 5, -1, 'Db — 5th position.', '5th position.'),
    '9':  extNote('C', 4, null, 10, 261.63, 3, 0, 'C above the staff — 3rd position.', '3rd position.'),
  },
  euphonium: {
    '0':  extNote('A', 2, null, 1, 110.00, [false, true, false], 0, 'Low A — valve 2, a half-step below Bb.', 'Valve 2.'),
    '-1': extNote('G', 2, null, 0, 98.00, [true, true, false], 0, 'Low G — valves 1 and 2.', 'Valves 1 and 2.'),
    '0b': extNote('A\u266d', 2, '\u266d', 1, 103.83, [true, false, false], -1, 'Ab — valve 1, your first flat.', 'Valve 1.'),
    '7b': extNote('A\u266d', 3, '\u266d', 8, 207.65, [true, false, false], -1, 'Ab above the staff — valve 1.', 'Valve 1.'),
    '4#': extNote('E', 3, null, 5, 164.81, [false, true, false], 1, 'E natural — valve 2.', 'Valve 2.'),
    '3b': extNote('D\u266d', 3, '\u266d', 4, 138.59, [false, true, true], -1, 'Db — valves 2 and 3.', 'Valves 2 and 3.'),
    '9':  extNote('C', 4, null, 10, 261.63, [true, false, true], 0, 'C above the staff — valves 1 and 3.', 'Valves 1 and 3.'),
  },
  tuba: {
    '0':  extNote('A', 1, null, -6, 55.00, [false, true, false], 0, 'Low A — valve 2, a half-step below Bb.', 'Valve 2.'),
    '-1': extNote('G', 1, null, -7, 49.00, [true, true, false], 0, 'Low G — valves 1 and 2.', 'Valves 1 and 2.'),
    '0b': extNote('A\u266d', 1, '\u266d', -6, 51.91, [true, false, false], -1, 'Ab — valve 1, your first flat.', 'Valve 1.'),
    '7b': extNote('A\u266d', 2, '\u266d', 1, 103.83, [true, false, false], -1, 'Ab in the staff — valve 1.', 'Valve 1.'),
    '4#': extNote('E', 2, null, -2, 82.41, [false, true, false], 1, 'E natural — valve 2.', 'Valve 2.'),
    '3b': extNote('D\u266d', 2, '\u266d', -3, 69.30, [false, true, true], -1, 'Db — valves 2 and 3.', 'Valves 2 and 3.'),
    '9':  extNote('C', 3, null, 3, 130.81, [true, false, true], 0, 'C in the staff — valves 1 and 3.', 'Valves 1 and 3.'),
  },
  // Horn moves to written F: the tonic is now F4, every note is re-spelled,
  // and (like every transposing instrument here) `freq` stores the concert
  // pitch it actually sounds, so `freq` = written pitch − 7 semitones.
  'french-horn': {
    '1':  extNote('F', 4, null, 1, 233.08, [true, false, false], 0, 'F — your first note, valve 1.', 'Valve 1. Buzz a firm middle-register pitch.', 'B\u266d3'),
    '2':  extNote('G', 4, null, 2, 261.63, [false, false, false], 0, 'G — open, a whole step above F.', 'No valves. 6th partial.', 'C4'),
    '3':  extNote('A', 4, null, 3, 293.66, [true, true, false], 0, 'A — valves 1 and 2.', 'Valves 1 and 2.', 'D4'),
    '4':  extNote('B\u266d', 4, '\u266d', 4, 311.13, [true, false, false], 0, 'Bb — valve 1, the flat of the written key.', 'Valve 1.', 'E\u266d4'),
    '5':  extNote('C', 5, null, 5, 349.23, [false, false, false], 0, 'C — open, the 8th partial.', 'No valves. Faster air.', 'F4'),
    '6':  extNote('D', 5, null, 6, 392.00, [false, false, false], 0, 'D — open, the 9th partial.', 'No valves. Keep the air fast.', 'G4'),
    '7':  extNote('E', 5, null, 7, 440.00, [false, false, false], 0, 'E — open, the 10th partial.', 'No valves.', 'A4'),
    '8':  extNote('F', 5, null, 8, 466.16, [true, false, false], 0, 'F — an octave above your first note, valve 1.', 'Valve 1. Firm embouchure.', 'B\u266d4'),
    '0':  extNote('E', 4, null, 0, 220.00, [false, false, false], 0, 'Low E — open, the 5th partial.', 'No valves.', 'A3'),
    '-1': extNote('D', 4, null, -1, 196.00, [true, false, false], 0, 'Low D — valve 1.', 'Valve 1.', 'G3'),
    '0b': extNote('E\u266d', 4, '\u266d', 0, 207.65, [false, true, false], -1, 'Eb — valve 2, your first flat.', 'Valve 2.', 'A\u266d3'),
    '7b': extNote('E\u266d', 5, '\u266d', 7, 415.30, [false, true, false], -1, 'Eb above the staff — valve 2.', 'Valve 2.', 'A\u266d4'),
    '4#': extNote('B', 4, null, 4, 329.63, [false, true, false], 1, 'B natural — valve 2.', 'Valve 2.', 'E4'),
    '3b': extNote('A\u266d', 4, '\u266d', 3, 277.18, [false, true, true], -1, 'Ab — valves 2 and 3.', 'Valves 2 and 3.', 'D\u266d4'),
    '9':  extNote('G', 5, null, 9, 523.25, [false, false, false], 0, 'High G — open, the top of the beginner range.', 'No valves. Support the note.', 'C5'),
  },

  // ----- Woodwinds ---------------------------------------------------------
  // Slot layout: [thumb, h1, h2, h3, h4, h5, h6, h7, extra, extra2, sideKey,
  // lhp2, rthumb, rp2, halfHole]. `undefined` means the pad is not drawn.
  // Clarinet follows the shared order; the register/R key lives in `extra`.
  clarinet: {
    '0':  extNote('B', 3, null, -3, 220.00, [true, true, true, true, false, true, false, false], 0, 'Low B — thumb hole, the left-hand rings, and the right index.', 'Thumb hole + left rings 1-2-3 + right index. Right middle and ring open.', 'A3'),
    '-1': extNote('A', 3, null, -4, 196.00, [true, true, true, true, true, true, false, false], 0, 'Low A — the low B shape plus the right middle finger.', 'Thumb hole + left rings 1-2-3 + right index and middle.', 'G3'),
    '0b': extNote('B\u266d', 3, '\u266d', -3, 207.65, [true, true, true, true, true, false, false, false], -1, 'Bb — like low A with the right middle finger lifted.', 'Thumb hole + left rings 1-2-3 + right index only.', 'A\u266d3'),
    '4#': extNote('F#', 4, '#', 1, 329.63, [false, true, false, false, false, false, false, false], 1, 'F# — the left index alone, no thumb.', 'Left index ring only. Thumb hole open.', 'E4'),
    '3b': extNote('E\u266d', 4, '\u266d', 0, 277.18, [true, true, true, false, false, false, false, true], -1, 'Eb — thumb hole, two left rings, and the right-hand side key.', 'Thumb hole + left rings 1-2 + the right-hand (Eb) side key.', 'D\u266d4'),
    '7b': extNote('B\u266d', 4, '\u266d', 4, 415.30, [false, false, false, false, false, false, false, false, true, undefined, true], -1, 'Clarion Bb — the register key with the A side key.', 'Register key + the A (left-index) side key. No rings down.', 'A\u266d4'),
    '9':  extNote('D', 5, null, 6, 523.25, [true, true, true, true, true, true, true, false, true], 0, 'Clarion D — every finger down with the register key.', 'Thumb hole + all left and right fingers + register key.', 'C5'),
  },
  'alto-saxophone': {
    '0':  extNote('B', 3, null, -3, 146.83, [false, true, true, true, true, true, true, true, undefined, true], 0, 'Low B — all fingers down plus the left little-finger B key.', 'All main fingers down + the left pinky B key.', 'D3'),
    '0b': extNote('B\u266d', 3, '\u266d', -3, 138.59, [false, true, true, true, true, true, true, true, undefined, undefined, undefined, true], -1, 'Low Bb — all fingers down plus the low Bb pinky key.', 'All main fingers down + the left pinky Bb key.', 'D\u266d3'),
    '4#': extNote('F#', 4, '#', 1, 220.00, [false, true, true, true, false, true, false, false], 1, 'F# — left hand with the right middle finger.', 'Left hand 1-2-3 + right middle finger only.', 'A3'),
    '3b': extNote('E\u266d', 4, '\u266d', 0, 185.00, [false, true, true, true, true, true, true, false, undefined, undefined, undefined, undefined, undefined, true], -1, 'Eb — all fingers down and the low Eb pinky key.', 'All main fingers down + the right pinky Eb key.', 'G\u266d3'),
    '7b': extNote('B\u266d', 4, '\u266d', 4, 277.18, [false, true, true, false, false, false, false, true], -1, 'Bb — left index and middle plus the right-hand side Bb key.', 'Left hand 1-2 + the right-hand Bb side key.', 'D\u266d4'),
    '9':  extNote('D', 5, null, 6, 349.23, [true, true, true, true, true, true, true, false], 0, 'High D — the octave key on the low D shape.', 'Octave key + all left and right fingers.', 'F4'),
    '10': extNote('E', 5, null, 7, 392.00, [true, true, true, true, true, true, false, false], 0, 'High E — the top of your beginner range.', 'Octave key + all left fingers + right index and middle.', 'G4'),
  },
  flute: {
    '7b': extNote('B\u266d', 4, '\u266d', 4, 466.16, [true, true, false, false, true, false, false, false, true], -1, 'Bb — thumb, left index and right index with the Eb key.', 'Thumb + left index + right index + the right-pinky Eb key.', 'B\u266d4'),
    '4#': extNote('F#', 4, '#', 1, 369.99, [true, true, true, true, false, false, true, false, true], 1, 'F# — the left hand with the right ring finger.', 'Left hand 1-2-3 + right ring finger + the Eb key.', 'F\u266f4'),
    '3b': extNote('E\u266d', 4, '\u266d', 0, 311.13, [true, true, true, true, true, true, true, false, true], -1, 'Eb — all fingers down with the Eb key.', 'All fingers down + the right-pinky Eb key.', 'E\u266d4'),
    '9':  extNote('D', 5, null, 6, 587.33, [true, false, true, true, true, true, true, false, false], 0, 'High D — the thumb vent with the right hand down.', 'Thumb + right hand 1-2-3 + left middle and ring. Left index open.', 'D5'),
    '10': extNote('E', 5, null, 7, 659.25, [true, true, true, true, true, true, false, false, true], 0, 'High E — one note below the top of your range.', 'Thumb + left 1-2-3 + right index and middle + the Eb key.', 'E5'),
    '11': extNote('F', 5, null, 8, 698.46, [true, true, true, true, true, false, false, false, true], 0, 'High F — the second-highest note you have learned.', 'Thumb + left 1-2-3 + right index + the Eb key.', 'F5'),
    '12': extNote('G', 5, null, 9, 783.99, [true, true, true, true, false, false, false, false, true], 0, 'High G — the top note of your range.', 'Thumb + left 1-2-3 + the Eb key. Support with fast air.', 'G5'),
  },
  oboe: {
    '0':  extNote('B', 3, null, -3, 246.94, [false, true, true, true, true, true, true, true, undefined, true], 0, 'Low B — all fingers down plus the left little-finger B key.', 'All main fingers down + the left pinky B key.', 'B3'),
    '0b': extNote('B\u266d', 3, '\u266d', -3, 233.08, [false, true, true, true, true, true, true, true, undefined, undefined, undefined, true], -1, 'Low Bb — all fingers down plus the low Bb pinky key.', 'All main fingers down + the left pinky Bb key.', 'B\u266d3'),
    '4#': extNote('F#', 4, '#', 1, 369.99, [false, true, true, true, true, false, false, false], 1, 'F# — the left hand with the right index finger.', 'Left hand 1-2-3 + right index only.', 'F\u266f4'),
    '3b': extNote('E\u266d', 4, '\u266d', 0, 311.13, [false, true, true, true, true, true, true, false, undefined, undefined, undefined, undefined, undefined, true], -1, 'Eb — all fingers down and the low Eb pinky key.', 'All main fingers down + the right pinky Eb key.', 'E\u266d4'),
    '7b': extNote('B\u266d', 4, '\u266d', 4, 466.16, [false, true, true, false, true, false, false, false], -1, 'Bb — left hand 1-2 with the right index finger.', 'Left hand 1-2 + right index only. Thumb off.', 'B\u266d4'),
    '9':  extNote('D', 5, null, 6, 587.33, [false, false, true, true, true, true, true, false, undefined, undefined, undefined, undefined, undefined, undefined, true], 0, 'High D — the half-hole vent with the right hand down.', 'Crack the left index (half-hole) + left middle and ring + all right fingers.', 'D5'),
    '10': extNote('E', 5, null, 7, 659.25, [true, true, true, true, true, true, false, false], 0, 'High E — the octave key with the left hand and two right fingers.', 'Octave key + left 1-2-3 + right index and middle.', 'E5'),
  },
  bassoon: {
    '0':  extNote('B', 2, null, 2, 123.47, [true, true, true, true, true, false, false, false], 0, 'Low B — whisper key, left hand, and the right index.', 'Whisper key + left rings 1-2-3 + right index.', 'B2'),
    '-1': extNote('A', 2, null, 1, 110.00, [true, true, true, true, true, true, false, false], 0, 'Low A — add the right middle finger.', 'Whisper key + left rings 1-2-3 + right index and middle.', 'A2'),
    '0b': extNote('B\u266d', 2, '\u266d', 2, 116.54, [true, true, true, true, true, true, false, false, false, undefined, undefined, undefined, true], -1, 'Low Bb — the low A shape plus the right-thumb Bb key.', 'Whisper key + left rings + right index and middle + the right-thumb Bb key.', 'B\u266d2'),
    '4#': extNote('F#', 3, '#', 6, 185.00, [true, false, true, true, true, true, true, true, false, undefined, undefined, undefined, true, undefined, true], 1, 'F# — the half-hole with the right-thumb F# key.', 'Whisper key + cracked left index (half-hole) + left middle/ring + all right fingers + the right-thumb F# key.', 'F\u266f3'),
    '3b': extNote('E\u266d', 3, '\u266d', 5, 155.56, [true, true, false, true, false, false, false, false], -1, 'Eb — whisper key with the left index and ring.', 'Whisper key + left index and left ring. Left middle open.', 'E\u266d3'),
    '7b': extNote('B\u266d', 3, '\u266d', 9, 233.08, [false, true, true, true, true, true, false, false, false, undefined, undefined, undefined, true], -1, 'Bb above the staff — the right-thumb Bb key.', 'Left rings 1-2-3 + right index and middle + the right-thumb Bb key.', 'B\u266d3'),
    '9':  extNote('D', 4, null, 11, 293.66, [false, true, true, false, false, false, false, false], 0, 'D above the staff — left hand 1-2 only, whisper key off.', 'Left rings 1-2. Whisper key off, right hand open.', 'D4'),
  },
};

// Short practice songs introduced alongside each new note, so every note in the
// progression is immediately heard in a tune. Each is keyed to the *scale
// degree* it introduces, so it automatically lands at whatever step an
// instrument teaches that degree — even though the woodwinds add a few notes the
// brass never reach (and skip a couple the brass do).
const PROGRESSION_SONG_META = {
  'Climb the Ladder': { description: 'Steps up and down your first six notes.', prompt: 'Keep every step even.' },
  'Bounce Back': { description: 'Bounce between your tonic and the note just below it.', prompt: 'Small, controlled moves.' },
  'Deep Down': { description: 'Reach down to the lowest note of your range and back.', prompt: 'Relax and support the low note.' },
  'Blue Note': { description: 'A flat sitting a whole step below your tonic.', prompt: 'Keep the flat centred and match it to the tonic.' },
  'High and Low': { description: 'Leap between a high flat and your tonic.', prompt: 'Big, smooth moves.' },
  'Octave Leap': { description: 'Leap a full octave from your tonic.', prompt: 'Support the top note without pinching.' },
  'Sharp Turn': { description: 'A raised note alternating with your tonic.', prompt: 'A half-step above the 4th degree.' },
  'Seventh Heaven': { description: 'The leading tone leaning home to the tonic.', prompt: 'Hear the pull to resolve.' },
  'Flat Third': { description: 'A lowered third colours the tonic.', prompt: 'Match the pitch to your tonic.' },
  'Top Note': { description: 'The highest note in your range.', prompt: 'Firm air, steady support.' },
  'Reach Higher': { description: 'An arpeggio reaching up to the note above your octave.', prompt: 'Keep the top note relaxed.' },
  'Almost There': { description: 'An arpeggio up to the note just below the top of your range.', prompt: 'Support the high note.' },
  'Top of the Range': { description: 'An arpeggio that touches the highest note you have learned.', prompt: 'Firm air, no pinching.' },
};

// Degree (as `degreeKey`) -> the practice song that introduces it. A song is
// only created for an instrument that actually teaches its degree, so the extra
// top notes live only on the woodwinds that reach them.
const PROGRESSION_PRACTICE = {
  '6':  'Climb the Ladder',
  '0':  'Bounce Back',
  '-1': 'Deep Down',
  '0b': 'Blue Note',
  '7b': 'High and Low',
  '8':  'Octave Leap',
  '4#': 'Sharp Turn',
  '7':  'Seventh Heaven',
  '3b': 'Flat Third',
  '9':  'Top Note',
  '10': 'Reach Higher',
  '11': 'Almost There',
  '12': 'Top of the Range',
};

// Teaching order per instrument. The brass all follow the shared PROGRESSION_ORDER; the
// woodwinds each confirmed a slightly different sequence, so they override it.
// Positions 1-5 are always the fifth, fourth, third, second and first degrees,
// which is where the fixed opening songs live.
const PROGRESSION_ORDERS = {
  flute: [5, 4, 3, 2, 1, 6, '7b', 8, '4#', 7, '3b', 9, 10, 11, 12],
  clarinet: PROGRESSION_ORDER,
  bassoon: PROGRESSION_ORDER,
  'alto-saxophone': [5, 4, 3, 2, 1, 6, 0, '0b', '7b', 8, '4#', 7, '3b', 9, 10],
  oboe: [5, 4, 3, 2, 1, 6, 0, '0b', '7b', 8, '4#', 7, '3b', 9, 10],
};

// Fixed opening songs, scheduled by step (every order starts 5-4-3-2-1, so these
// steps mean the same thing for every instrument).
const PROGRESSION_SCHEDULE = {
  1:  { songs: ['My First Note'] },
  2:  { songs: ['Step Up and Down'] },
  5:  { songs: ['Hot Cross Buns', 'Merrily We Roll Along', 'Lightly Row'], reviews: ['Review 1'] },
};

const orderKeyOf = k => (typeof k === 'number' ? degreeKey(k, 0) : k);

for (const instId of Object.keys(EXTENDED_NOTES)) {
  const inst = CURRICULUM[instId];
  if (!inst) continue;
  const order = PROGRESSION_ORDERS[instId] || PROGRESSION_ORDER;
  const prefix = ((inst.lessons.find(l => !l.type && /-\d+$/.test(l.id)) || {}).id || '').replace(/-\d+$/, '');

  const byDegreeKey = {};
  for (const lesson of inst.lessons) {
    if (!lesson.type && lesson.degree != null) {
      byDegreeKey[degreeKey(lesson.degree, lesson.alter || 0)] = lesson;
    }
  }
  for (const [key, spec] of Object.entries(EXTENDED_NOTES[instId])) {
    if (byDegreeKey[key]) {
      Object.assign(byDegreeKey[key], spec);
    } else {
      const m = /^(-?\d+)([b#]*)$/.exec(key);
      let alter = 0;
      for (const c of m[2]) alter += c === 'b' ? -1 : 1;
      const id = `${prefix}-ext-${key.replace(/-/g, 'neg').replace(/b/g, 'flat').replace(/#/g, 'sharp')}`;
      byDegreeKey[key] = Object.assign({ id, degree: parseInt(m[1], 10), alter }, spec);
    }
  }

  const songs = {};
  const reviews = {};
  for (const lesson of inst.lessons) {
    if (lesson.type === 'song') songs[lesson.noteName] = lesson;
    else if (lesson.type === 'review') reviews[lesson.noteName] = lesson;
  }
  // Create the fixed opening songs plus one practice song per new degree this
  // instrument actually teaches.
  const wanted = new Set();
  for (const step of Object.values(PROGRESSION_SCHEDULE)) for (const name of step.songs || []) wanted.add(name);
  for (const key of order) if (PROGRESSION_PRACTICE[orderKeyOf(key)]) wanted.add(PROGRESSION_PRACTICE[orderKeyOf(key)]);
  for (const name of wanted) {
    if (songs[name] || !CANONICAL_SONGS[name]) continue;
    const meta = PROGRESSION_SONG_META[name] || {};
    songs[name] = {
      id: `${prefix}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      type: 'song', audioUrl: null, bpm: 100, noteName: name,
      description: meta.description || '', prompt: meta.prompt || '',
    };
  }

  const lessons = [];
  order.forEach((key, i) => {
    const step = i + 1;
    const kk = orderKeyOf(key);
    if (byDegreeKey[kk]) lessons.push(byDegreeKey[kk]);
    const sched = PROGRESSION_SCHEDULE[step];
    if (sched) {
      for (const name of sched.songs || []) {
        if (songs[name]) { lessons.push(songs[name]); delete songs[name]; }
      }
      for (const name of sched.reviews || []) {
        if (reviews[name]) { lessons.push(reviews[name]); delete reviews[name]; }
      }
    }
    const practice = PROGRESSION_PRACTICE[kk];
    if (practice && songs[practice]) { lessons.push(songs[practice]); delete songs[practice]; }
  });
  for (const song of Object.values(songs)) lessons.push(song);       // instrument tune
  for (const review of Object.values(reviews)) lessons.push(review); // Review 2
  inst.lessons = lessons;
}

for (const inst of Object.values(CURRICULUM)) {
  const byDegree = {};
  for (const lesson of inst.lessons) {
    if (!lesson.type && lesson.degree != null) {
      byDegree[degreeKey(lesson.degree, lesson.alter || 0)] = lesson.id;
    }
  }
  inst.noteByDegree = byDegree;
}

for (const inst of Object.values(CURRICULUM)) {
  for (const lesson of inst.lessons) {
    if (lesson.type !== 'song') continue;
    const song = CANONICAL_SONGS[lesson.noteName];
    if (!song) continue;
    // "FIRST"/"SECOND" resolve to the instrument's own teaching order (note 1
    // and note 2 taught), everything else through the scale-degree index.
    const ordered = inst.lessons.filter(l => !l.type && l.degree != null);
    const idFor = d => {
      if (d === 'FIRST') return (ordered[0] || {}).id;
      if (d === 'SECOND') return (ordered[1] || {}).id;
      return inst.noteByDegree[String(d)];
    };
    const noteIds = song.degrees.map(idFor).filter(Boolean);
    lesson.noteIds = noteIds;
    lesson.durations = song.durations.slice();
    lesson.prerequisiteIds = [...new Set(noteIds)];
  }
}

// Ordered list for the home screen
const INSTRUMENT_ORDER = [
  'flute', 'clarinet', 'alto-saxophone', 'oboe', 'bassoon',
  'trumpet', 'trombone', 'french-horn', 'euphonium', 'tuba'
];

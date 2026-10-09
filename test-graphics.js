// test-graphics.js
// Renders every fingering/staff diagram in js/graphics.js and checks the SVG
// output is well-formed. Also pins the handful of deliberate design choices
// (horizontal flute, labelled side keys) so they don't silently regress.

const fs = require('fs');
const path = require('path');

const read = f => fs.readFileSync(path.join(__dirname, 'js', f), 'utf8');

const sandbox = new Function(`
${read('curriculum.js')}
${read('graphics.js')}
return { Graphics, CURRICULUM };
`);
const { Graphics, CURRICULUM } = sandbox();

let pass = 0;
let fail = 0;
const failures = [];
function check(cond, msg) {
  if (cond) { pass++; } else { fail++; failures.push(msg); }
}
function isSvg(s) {
  return typeof s === 'string' && s.startsWith('<svg') && s.endsWith('</svg>');
}
// Every circle must sit inside the diagram's viewBox, otherwise an enlarged or
// repositioned key can be clipped at the edges.
function circlesWithinViewBox(svg) {
  const vb = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (!vb) return false;
  const [, w, h] = vb.map(Number);
  const re = /<circle cx="(-?\d+(?:\.\d+)?)" cy="(-?\d+(?:\.\d+)?)" r="(\d+(?:\.\d+)?)"/g;
  let m;
  while ((m = re.exec(svg))) {
    const [cx, cy, r] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (cx - r < -0.01 || cy - r < -0.01 || cx + r > w + 0.01 || cy + r > h + 0.01) return false;
  }
  return true;
}

const SIZES = [72, 84, 100, 120];
let diagrams = 0;

for (const inst of Object.values(CURRICULUM)) {
  for (const lesson of inst.lessons) {
    if (!lesson.fingeringState) continue;
    for (const size of SIZES) {
      const svg = Graphics.fingeringSVG(inst.fingeringType, lesson.fingeringState, inst.accentColor, size);
      diagrams++;
      check(isSvg(svg), `${inst.id}/${lesson.id} fingering @${size} is not valid SVG`);
      check(!svg.includes('undefined') && !svg.includes('NaN'),
        `${inst.id}/${lesson.id} fingering @${size} contains undefined/NaN`);
      check(circlesWithinViewBox(svg),
        `${inst.id}/${lesson.id} fingering @${size} has a key outside its viewBox`);
    }
    const staff = Graphics.staffSVG({ pos: lesson.staffStep, accidental: lesson.accidental, clef: inst.clef, accentColor: inst.accentColor, width: 96 });
    check(isSvg(staff), `${inst.id}/${lesson.id} staff is not valid SVG`);
  }
}
check(diagrams > 0, 'no fingering diagrams rendered');

// ── Flute is drawn horizontally (transverse) ───────────────────────────────
{
  const flute = CURRICULUM.flute;
  const note = flute.lessons.find(l => l.id === 'fl-1');
  const svg = Graphics.fingeringSVG('flute', note.fingeringState, flute.accentColor, 100);
  check(svg.includes('viewBox="0 0 240 130"'), 'flute diagram should use a horizontal viewBox');
  check(svg.includes('<ellipse'), 'flute diagram should show an embouchure');
  check(svg.includes('>TH<'), 'flute diagram should label the thumb Bb lever');
}

// ── Generic woodwinds label their side keys on the button ──────────────────
{
  const cl = CURRICULUM.clarinet;
  const note = cl.lessons.find(l => l.id === 'cl-7'); // uses register + little finger
  const svg = Graphics.fingeringSVG('clarinet', note.fingeringState, cl.accentColor, 100);
  check(svg.includes('>R<'), 'clarinet register key should be labelled R');
  check(svg.includes('>TH<'), 'clarinet thumb key should be labelled TH');
  check(svg.includes('>L<'), 'clarinet little-finger key should be labelled L');
}

// ── Brass keeps numbered valve buttons ─────────────────────────────────────
{
  const tr = CURRICULUM.trumpet;
  const note = tr.lessons.find(l => l.id === 'tr-1');
  const svg = Graphics.fingeringSVG('trumpet', note.fingeringState, tr.accentColor, 100);
  check(svg.includes('>1<') && svg.includes('>2<') && svg.includes('>3<'),
    'valve diagram should number the valves 1-3');
}

// ── Home-screen icons render for every instrument ──────────────────────────
for (const inst of Object.values(CURRICULUM)) {
  const icon = Graphics.instrumentIconSVG(inst.id, 56);
  check(isSvg(icon), `${inst.id} home icon is not valid SVG`);
}
check(Graphics.instrumentIconSVG('flute', 56).includes('<ellipse'),
  'flute home icon should show an embouchure to match its diagram');

if (failures.length) console.log(failures.join('\n'));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

var tempo = 92;
const dt = 60000 / tempo;
const baseOctave = 4;

const frqs = [ // Pitches in PC order
  261.63, // C - 0
  277.18, 
  293.66, // D - 2
  311.13, 
  329.63, // E - 4
  349.23, // F - 5
  369.99, 
  392.00, // G - 7
  415.30, 
  440.00, // A - 9
  466.16,
  493.88, // B - 11
  ];

const notePC = {
  "C" : 0,
  "C#" : 1,
  "D" : 2,
  "D#" : 3,
  "E" : 4,
  "F" : 5,
  "F#" : 6,
  "G" : 7,
  "G#" : 8,
  "A" : 9,
  "A#" : 10,
  "B" : 11,
  "Bb" : 10,
  "Ab" : 8,
  "Gb" : 6,
  "Eb" : 3,
  "Db" : 1
};

const rVal = {
  1 : dt * 4,
  2 : dt * 2,
  4 : dt,
  8 : dt / 2,
  16 : dt / 4
};

const tVals = [
  dt * 4, // W - 0
  dt * 2, // H - 1
  dt,     // Q - 2
  dt / 2, // E - 3
  dt / 4  // S - 4
];

const score = [
  {pitch:"G", time:8},
  {pitch:"C", time:4, octave:1},
  {pitch:"G", time:8, isDotted:true},
  {pitch:"A", time:16},
  {pitch:"B", time:4},
  {pitch:"E", time:8},
  {pitch:"E", time:8},
  {pitch:"A", time:4},
  {pitch:"G", time:8, isDotted:true},
  {pitch:"F", time:16},
  {pitch:"G", time:4},
  {pitch:"C", time:8},
  {pitch:"C", time:8},
  {pitch:"D", time:4},
  {pitch:"D", time:8},
  {pitch:"E", time:8},
  {pitch:"F", time:4},
  {pitch:"F", time:8},
  {pitch:"G", time:8},
  {pitch:"A", time:4},
  {pitch:"B", time:8},
  {pitch:"C", time:8},
  {pitch:"D", time:2}
];

function playNote(pc, rhyVal, octAdj, isDotted){
  //Pitch
  let p = frqs[pc] * baseOctave;
  if (octAdj){
    p *= 1 + octAdj;
  }
  //Rhythmn
  let t = tVals[rhyVal];
  if (isDotted){
    t += t / 2;
  }
  //Make the note
  let val = Bangle.beep(t, p);
  return val; // Return the Promise from Bangle.beep()
}

function getFormattedNote(scoreNote){
    let f = frq[notePC[currentNote.pitch]];
    let t = tVals[currentNote.time];
    let hasDot;
    let octAdj;
    if (scoreNote.hasOwnProperty('octave')) {
        octAdj = scoreNote.octave;
        } else { octAdj = 0; 
    }
    if (scoreNote.hasOwnProperty('isDotted')){
      hasDot = scoreNote.isDotted;
    } else { hasDot = false; }
    let formattedNote = [f, t, octAdj, hasDot];
}

function play(musicScore){
  isPlaying = true;
  let i = 0;
  while(isPlaying){
    currentNote = getFormattedNote(musicScore[i]);
    playNote(currentNote[0], currentNote[1], currentNote[2], currentNote[3])
      .then(() => new Promise(resolve => setTimeout(resolve, currentNote[1])));
    i++;
    if (i == musicScore.length) { isPlaying = false; }
  }
}

var isPlaying = false;

setWatch(() => {
  play(score);
}, BTN1, {repeat:true, edge:1} );

setWatch(() => {
  isPlaying = false;
}, BTN3, {repeat:true, edge:0} );

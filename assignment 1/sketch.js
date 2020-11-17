/* Assignment 2: p5 Sketch - Programming for Musicians
   17 November 2020
   Nathan Ó Maoilearca*/

/* BUG - Don't let the shapes overlap!*/

let circles = [];  // array of circles
let squares = [];  // array of squares
let counts = []; // array counting the number of playing sine oscillators
let counts2 = []; // array counting the number of playing square oscillators
let oscSine, oscSine2, oscSine3, oscSq, oscSq2, oscSq3; // circle + square synths
let midiNotes = [85, 81, 78, 74, 69, 62, 57, 50]; //scale of notes
// position of circles' and squares' y value which...
let noteIndex, noteIndex2, noteIndex3, noteIndex4, noteIndex5, noteIndex6;
//...determines the midi value from midiNotes array
let midiVal, midVal2, midiVal3, midiVal4, midiVal5, midiVal6;
let xOffset = 0; // offset for dragging shapes around
let yOffset = 0;
let textAlpha = 200;

function setup() {
  createCanvas(800, 600);

  soundLoop1 = new p5.SoundLoop(onSoundLoop1, 2);  // 2 second soundloop
  soundLoop2 = new p5.SoundLoop(onSoundLoop2, 1);  // 1 second soundloop
  soundLoop3 = new p5.SoundLoop(onSoundLoop3, 0.5);  // 0.5 second soundloop
  soundLoop4 = new p5.SoundLoop(onSoundLoop4, 0.25);  // 0.25 second soundloop

  soundLoop1.syncedStart(soundLoop2); //syncing all loops to soundLoop 1
  soundLoop1.syncedStart(soundLoop3);
  soundLoop1.syncedStart(soundLoop4);

  oscSine = new p5.Oscillator('sine');  // circle synth 1
  oscSine2 = new p5.Oscillator('sine'); // circle synth 2
  oscSine3 = new p5.Oscillator('sine'); // circle synth 3

  oscSq = new p5.Oscillator('square');
  oscSq2 = new p5.Oscillator('square');
  oscSq3 = new p5.Oscillator('square');

  for (let i = 0; i < 3; i++) { // 3 squares on page
  let x = random(25, width -25);
  let y = random(25, height-25);
  let s = new Square(x, y);
  squares.push(s);              // new squares
  }

  for (let i = 0; i < 3; i++) { // 3 circles on page
  let x = random(25, width -25);
  let y = random(25, height-25);
  let r = 50;
  let c = new Circle(x, y, r);
  circles.push(c);              //new circles
  }
}

function soundRules1() {  // determines the pitch and amplitude for circle 1
  //gives value between 0 and 7 in relation to circle[0]'s y value
  //height/16 is the y centre of the first grid row
  noteIndex = round(map(circles[0].y, height/16, height - height/16, 0 , 7));
  // converts that value to a midiNote from the array
  midiVal = midiNotes[noteIndex % midiNotes.length];
  // converts midiVal to a frequency for oscSine
  oscSine.freq(midiToFreq(midiVal));
  oscSine.amp(0.1);
  oscSine.start();
}
function soundRules2() { // determines the pitch and amplitude for circle 2
  noteIndex2 = round(map(circles[1].y, height/16, height - height/16, 0 , 7));
  midiVal2 = midiNotes[noteIndex2 % midiNotes.length];
  oscSine2.freq(midiToFreq(midiVal2));
  oscSine2.amp(0.1);
  oscSine2.start();
}
function soundRules3() { // determines the pitch and amplitude for circle 3
  noteIndex3 = round(map(circles[2].y, height/16, height - height/16, 0 , 7));
  midiVal3 = midiNotes[noteIndex3 % midiNotes.length];
  oscSine3.freq(midiToFreq(midiVal3));
  oscSine3.amp(0.1);
  oscSine3.start();
}
function soundRules4() {  // determines the pitch and amplitude for square 1
  //gives value between 0 and 7 in relation to circle[0]'s y value
  noteIndex4 = round(map(squares[0].y, height/16, height - height/16, 0 , 7));
  // converts that value to a midiNote from the array
  midiVal4 = midiNotes[noteIndex4 % midiNotes.length];
  // converts midiVal to a frequency for oscSine
  oscSq.freq(midiToFreq(midiVal4));
  oscSq.amp(0.1);
  oscSq.start();
}
function soundRules5() { // determines the pitch and amplitude for square 2
  noteIndex5 = round(map(squares[1].y, height/16, height - height/16, 0 , 7));
  midiVal5 = midiNotes[noteIndex5 % midiNotes.length];
  oscSq2.freq(midiToFreq(midiVal5));
  oscSq2.amp(0.1);
  oscSq2.start();
}
function soundRules6() { // determines the pitch and amplitude for square 3
  noteIndex6 = round(map(squares[2].y, height/16, height - height/16, 0 , 7));
  midiVal6 = midiNotes[noteIndex6 % midiNotes.length];
  oscSq3.freq(midiToFreq(midiVal6));
  oscSq3.amp(0.1);
  oscSq3.start();
}

function onSoundLoop1() {
  for (let i = 0; i < circles.length; i++){
    if (counts.includes(0) && circles[0].x < width/4) {
      oscSine.amp(0, 1.3);  // 1.3 second long note
      soundRules1();
    }
    if (counts.includes(1) && circles[1].x < width/4) {
      oscSine2.amp(0, 1.3);
      soundRules2();
    }
    if (counts.includes(2) && circles[2].x < width/4) {
      oscSine3.amp(0, 1.3);
      soundRules3();
    }
  }
  for (let i = 0; i < squares.length; i++){
    if (counts2.includes(0) && squares[0].x < width/4) {
      oscSq.amp(0, 1.3);
      soundRules4();
    }
    if (counts2.includes(1) && squares[1].x < width/4) {
      oscSq2.amp(0, 1.3);
      soundRules5();
    }
    if (counts2.includes(2) && squares[2].x < width/4) {
      oscSq3.amp(0, 1.3);
      soundRules6();
    }
  }
}
function onSoundLoop2() {
  for (let i = 0; i < circles.length; i++){
    if (counts.includes(0) && circles[0].x > width/4 && circles[0].x < width/2) {
      oscSine.amp(0, 0.7); // 0.7 second long note
      soundRules1();
    }
    if (counts.includes(1) && circles[1].x > width/4 && circles[1].x < width/2) {
      oscSine2.amp(0, 0.7);
      soundRules2();
    }
    if (counts.includes(2) && circles[2].x > width/4 && circles[2].x < width/2) {
      oscSine3.amp(0, 0.7);
      soundRules3();
    }
  }
  for (let i = 0; i < squares.length; i++){
      if (counts2.includes(0) && squares[0].x > width/4 && squares[0].x < width/2) {
        oscSq.amp(0, 0.7);
        soundRules4();
      }
      if (counts2.includes(1) && squares[1].x > width/4 && squares[1].x < width/2) {
        oscSq2.amp(0, 0.7);
        soundRules5();
      }
      if (counts2.includes(2) && squares[2].x > width/4 && squares[2].x < width/2) {
        oscSq3.amp(0, 0.7);
        soundRules6();
      }
    }
}
function onSoundLoop3() {
  for (let i = 0; i < circles.length; i++){
    if (counts.includes(0) && circles[0].x > width/2 && circles[0].x < width - width/4) {
      oscSine.amp(0, 0.35);
      soundRules1();
    }
    if (counts.includes(1) && circles[1].x > width/2 && circles[1].x < width - width/4) {
      oscSine2.amp(0, 0.35);
      soundRules2();
    }
    if (counts.includes(2) && circles[2].x > width/2 && circles[2].x < width - width/4) {
      oscSine3.amp(0, 0.35);
      soundRules3();
    }
}
  for (let i = 0; i < squares.length; i++){
      if (counts2.includes(0) && squares[0].x > width/2 && squares[0].x < width - width/4) {
        oscSq.amp(0, 0.35);
        soundRules4();
      }
      if (counts2.includes(1) && squares[1].x > width/2 && squares[1].x < width - width/4) {
        oscSq2.amp(0, 0.35);
        soundRules5();
      }
      if (counts2.includes(2) && squares[2].x > width/2 && squares[2].x < width - width/4) {
        oscSq3.amp(0, 0.35);
        soundRules6();
      }
    }
}
function onSoundLoop4() {
  for (let i = 0; i < circles.length; i++){
    if (counts.includes(0) && circles[0].x > width - width/4) {
      oscSine.amp(0, 0.2);
      soundRules1();
    }
    if (counts.includes(1) && circles[1].x > width - width/4) {
      oscSine2.amp(0, 0.2);
      soundRules2();
    }
    if (counts.includes(2) && circles[2].x > width - width/4) {
      oscSine3.amp(0, 0.2);
      soundRules3();
    }
  }
  for (let i = 0; i < squares.length; i++){
      if (counts2.includes(0) && squares[0].x > width - width/4) {
        oscSq.amp(0, 0.2);
        soundRules4();
      }
      if (counts2.includes(1) && squares[1].x > width - width/4) {
        oscSq2.amp(0, 0.2);
        soundRules5();
      }
      if (counts2.includes(2) && squares[2].x > width - width/4) {
        oscSq3.amp(0, 0.2);
        soundRules6();
      }
    }
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++){
     // if circle x is clicked and x is within array...
        if (circles[i].clicked() && counts.indexOf(i) !== -1){
          counts.splice(counts.indexOf(i), 1);     //...splice x from array...
      } else if (circles[i].x > width - width/4 && circles[i].clicked()){
          counts.push(i); // ... else add x to array
          soundLoop4.start();
      } else if (circles[i].x > width/2 && circles[i].x < width - width/4
          && circles[i].clicked()){
          counts.push(i);
          soundLoop3.start();
      } else if (circles[i].x > width/4 && circles[i].x < width/2
          && circles[i].clicked()){
          counts.push(i);
          soundLoop2.start();
      } else if (circles[i].x < width/4 && circles[i].clicked()){
          counts.push(i);
          soundLoop1.start();
      }
      if (circles[i].clicked()) {        //sets offset when circles is clicked
        xOffset = mouseX - circles[i].x;
        yOffset = mouseY - circles[i].y;
      }
  }

  for (let i = 0; i < squares.length; i++){
    // if square x is clicked and x is within array...
        if (squares[i].clicked() && counts2.indexOf(i) !== -1){
          counts2.splice(counts2.indexOf(i), 1); //...splice x from array
      } else if (squares[i].x > width - width/4 && squares[i].clicked()){
          soundLoop4.start();
          counts2.push(i);
      } else if (squares[i].x > width/2 && squares[i].x < width - width/4
          && squares[i].clicked()){
          soundLoop3.start();
          counts2.push(i);
      } else if (squares[i].x > width/4 && squares[i].x < width/2
          && squares[i].clicked()){
          soundLoop2.start();
          counts2.push(i);
      } else if (squares[i].x < width/4 && squares[i].clicked()){
          soundLoop1.start();
          counts2.push(i);
    }
    if (squares[i].clicked()) {        //sets offset when square is clicked
      xOffset = mouseX - squares[i].x;
      yOffset = mouseY - squares[i].y;
    }
  }
}

function mouseDragged() {  // when shape is dragged it follows mouse - offset
    for (let i = 0; i < circles.length; i++){
      if (circles[i].clicked()) {
        circles[i].x = mouseX - xOffset;
        circles[i].y = mouseY - yOffset;
      }
    }
    for (let i = 0; i < squares.length; i++){
      if (squares[i].clicked()) {
        squares[i].x = mouseX - xOffset;
        squares[i].y = mouseY - yOffset;
      }
    }
}

function draw() {
  background(35);
  //creates background grid
  let xgrid = width/2
  let ygrid = height/4
  for (let i = 0; i < 2; i++) {
    for(let j = 0; j < 4; j++){
      stroke(40);
      fill(50);
      rectMode(CORNER);
      rect(xgrid * i, ygrid * j, width/4, height/8);
      rect(xgrid * i + width/4, ygrid * j + height/8, width/4, height/8);
    }
  }

  //displays circles + squares
  for (let i = 0; i < squares.length; i++){
      squares[i].show();
  }
  for (let i = 0; i < circles.length; i++){
      circles[i].show();
  }

  // welcome text
  textSize(32);
  textAlign(CENTER);
  noStroke();
  fill(255, textAlpha);
  text('Click and Drag a Shape to Begin!', width/2, height/2);

  alphaChange();
}

function alphaChange() { // when shape is not playing, it is transparent
  for (let i = 0; i < circles.length; i++){
    if (counts.includes(i)){
        circles[i].alpha = 255;
        textAlpha = textAlpha - 10 // welcome text disappears
      } else {
        circles[i].alpha = 80;
      }
  }
  for (let i = 0; i < squares.length; i++){
    if (counts2.includes(i)){
        squares[i].alpha = 255;
        textAlpha = textAlpha - 10
      } else {
        squares[i].alpha = 80;
      }
  }
}

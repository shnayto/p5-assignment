let squares = [];  // array of squares
let circles = [];  // array of circles
let oscSine, oscSine2, oscSine3;       // circle synths
let midiNotes = [50, 57, 62, 69, 74, 78, 81, 85]; //scale of notes
let noteIndex, noteIndex2, noteIndex3; // position of circles y value which...
let midiVal, midVal2, midiVal3;//..determines the midi value from midiNotes array
let freq, freq2, freq3; //... which determines the frequency of the circles
let counts = []; // array counting the number of playing oscillators

function setup() {
  createCanvas(800, 600);

  soundLoop1 = new p5.SoundLoop(onSoundLoop1, 2);  // 2 second soundloop
  soundLoop2 = new p5.SoundLoop(onSoundLoop2, 1);  // 1 second soundloop
  soundLoop3 = new p5.SoundLoop(onSoundLoop3, 0.5);  // 0.5 second soundloop
  soundLoop4 = new p5.SoundLoop(onSoundLoop4, 0.25);  // 0.25 second soundloop

  soundLoop1.syncedStart(soundLoop2) //syncing all loops to soundLoop 1
  soundLoop1.syncedStart(soundLoop3)
  soundLoop1.syncedStart(soundLoop4)

  oscSine = new p5.Oscillator('sine');  // circle synth 1
  oscSine2 = new p5.Oscillator('sine'); // circle synth 2
  oscSine3 = new p5.Oscillator('sine'); // circle synth 3

  object = new Cursor();   // mouse

  for (let i = 0; i < 3; i++) { // 3 squares on page
  let x = random(width);
  let y = random(height);
  let s = new Square(x, y);
  squares.push(s);              // new squares
  }

  for (let i = 0; i < 3; i++) { // 3 circles on page
  let x = random(width);
  let y = random(height);
  let r = 40;
  let c = new Circle(x, y, r);
  circles.push(c);              //new circles
  }
}

function soundRules1() {  // determines the pitch and amplitude for circle 1
  //gives value between 0 and 7 in relation to circle[0]'s y value
  noteIndex = round(map(circles[0].y, 0, height, 0 , 7));
  // converts that value to a midiNote from the array
  midiVal = midiNotes[noteIndex % midiNotes.length];
  // converts midiVal to a frequency for oscSine
  oscSine.freq(midiToFreq(midiVal));
  oscSine.amp(0.1);
}

function soundRules2() { // determines the pitch and amplitude for circle 2
  noteIndex2 = round(map(circles[1].y, 0, height, 0 , 7));
  midiVal2 = midiNotes[noteIndex2 % midiNotes.length];
  oscSine2.freq(midiToFreq(midiVal2));
  oscSine2.amp(0.1);
}

function soundRules3() { // determines the pitch and amplitude for circle 3
  noteIndex3 = round(map(circles[2].y, 0, height, 0 , 7));
  midiVal3 = midiNotes[noteIndex3 % midiNotes.length];
  oscSine3.freq(midiToFreq(midiVal3));
  oscSine3.amp(0.1);
}

function onSoundLoop1() {
  for (let i = 0; i < circles.length; i++)
    if (counts.includes(0) && circles[0].x < width/4) {
      soundRules1();
      oscSine.amp(0, 1.3);
      oscSine.start();
    }
    if (counts.includes(1) && circles[1].x < width/4) {
      soundRules2();
      oscSine2.amp(0, 1.3);
      oscSine2.start();
    }
    if (counts.includes(2) && circles[2].x < width/4) {
      soundRules3();
      oscSine3.amp(0, 1.3);
      oscSine3.start();
    }
}

function onSoundLoop2() {
  for (let i = 0; i < circles.length; i++)
    if (counts.includes(0) && circles[0].x > width/4 && circles[0].x < width/2) {
      soundRules1();
      oscSine.amp(0, 0.7);
      oscSine.start();
    }
    if (counts.includes(1) && circles[1].x > width/4 && circles[1].x < width/2) {
      soundRules2();
      oscSine2.amp(0, 0.7);
      oscSine2.start();
    }
    if (counts.includes(2) && circles[2].x > width/4 && circles[2].x < width/2) {
      soundRules3();
      oscSine3.amp(0, 0.7);
      oscSine3.start();
    }
}

function onSoundLoop3() {
  for (let i = 0; i < circles.length; i++)
    if (counts.includes(0) && circles[0].x > width/2 && circles[0].x < width - width/4) {
      soundRules1();
      oscSine.amp(0, 0.35);
      oscSine.start();
    }
    if (counts.includes(1) && circles[1].x > width/2 && circles[1].x < width - width/4) {
      soundRules2();
      oscSine2.amp(0, 0.35);
      oscSine2.start();
    }
    if (counts.includes(2) && circles[2].x > width/2 && circles[2].x < width - width/4) {
      soundRules3();
      oscSine3.amp(0, 0.35);
      oscSine3.start();
    }
}

function onSoundLoop4() {
  for (let i = 0; i < circles.length; i++)
    if (counts.includes(0) && circles[0].x > width - width/4) {
      soundRules1();
      oscSine.amp(0, 0.2);
      oscSine.start();
    }
    if (counts.includes(1) && circles[1].x > width - width/4) {
      soundRules2();
      oscSine2.amp(0, 0.2);
      oscSine2.start();
    }
    if (counts.includes(2) && circles[2].x > width - width/4) {
      soundRules3();
      oscSine3.amp(0, 0.2);
      oscSine3.start();
    }
}


function mousePressed() {
  for (let i = 0; i < circles.length; i++)
      if (circles[i].clicked() && counts.indexOf(i) !== -1){ // if circle x is clicked and x is within array
        counts.splice(counts.indexOf(i), 1);                 //splice x from array
      } else if (circles[i].x > width - width/4 && circles[i].clicked()){
        counts.push(i);
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
}

function mouseDragged() {
    for (let i = 0; i < circles.length; i++){
      let offset = dist(mouseX, mouseY, circles[i].x, circles[i].y);
      if (circles[i].rollover() == true) {
        circles[i].x = mouseX
        circles[i].y = mouseY
      }
    }
}

function draw() {
  background(35);


  for (let i = 0; i < squares.length; i++){
      squares[i].show();
  }
  for (let i = 0; i < circles.length; i++){
      circles[i].show();
  }
    object.showEllipse();


}



// function mouseReleased() {
//   if (playing == false) {
//   soundLoop.start();
//   console.log('start')
//   playing = true
//   }
// }

//
// function alphaChange() {
//   for (let i = 0; i < circles.length; i++){
//       if (circles[i].() == true) {
//         circles[i].alpha = 50;
//       } else {
//         circles[i].alpha = 255;
//       }
//   }
// }


class Circle {
  constructor( x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rand = random(145, 255)
    this.alpha = alpha;
    this.clicked = function() {
      let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.r) {
          return true
        } else {
          return false;
        }
      }
  }

  rollover() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r) {
      return true;
    }
  }

  show() {
    noStroke();
    fill(0, this.rand, 0, this.alpha);
    ellipse(this.x, this.y, this.r);
  }
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.e = 30;
    this.rand = random(145, 255)
  }

  clicked() {
  let d = dist(mouseX, mouseY, this.x, this.y);
  if (d < this.e) {
    oscSine.stop();
    oscSquare.start();
    oscSquare.amp(env);
    env.play();
    }
  }

  show() {
  noStroke();
  fill(this.rand, 0, 0);
  rectMode(CENTER)
  rect(this.x, this.y, this.e);
  }
}

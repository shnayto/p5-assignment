let squares = [];  // array of squares
let circles = [];  // array of circles
let oscSine;       // circle synth 1
let oscSine2;
let oscSine3;
// let midiNotes = [82, 84, 92, 122]; eventual midi note to freq
// let noteIndex = 0;
let playing = false;
let playing0 = false;
let playing1 = false;
let playing2 = false;
let counts = []; // array counting the number of playing oscillators
let stop;

function setup() {
  createCanvas(800, 600);

  soundLoop = new p5.SoundLoop(onSoundLoop, 1);  // 1 second soundloop

  oscSine = new p5.Oscillator('sine');  // circle synth 1
  oscSine2 = new p5.Oscillator('sine');
  oscSine3 = new p5.Oscillator('sine');

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


function onSoundLoop() {
  for (let i = 0; i < circles.length; i++)
      if (counts.includes(0)) {
      oscSine.start();
      oscSine.amp(0.2);
      oscSine.amp(0, 0.5);
      oscSine.freq(random(100, 200));
    }
    if (counts.includes(1)) {
      oscSine2.start();
      oscSine2.amp(0.2);
      oscSine2.amp(0, 0.5);
      oscSine2.freq(random(300, 301));
    }
    if (counts.includes(2)) {
      oscSine3.start();
      oscSine3.amp(0.2);
      oscSine3.amp(0, 0.5);
      oscSine3.freq(random(1000, 1001));
    }
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++)
      if (circles[i].clicked() && counts.length == (i + 1)) {
        counts.splice(i);
        console.log(counts);
        soundLoop.start();
      } else if (circles[i].clicked() && counts.length < (i + 3)) {
        counts.push(i);
        console.log(counts);
        soundLoop.start();
      }
    //   } else if (circles[i].clicked() && playing == true){
    //     count.splice(i);
    //     console.log(playing);
    // }
}

// function mouseDragged() {
//     for (let i = 0; i < circles.length; i++){
//       let offset = dist(mouseX, mouseY, circles[i].x, circles[i].y);
//       if (circles[i].rollover() == true) {
//         circles[i].x = mouseX
//         circles[i].y = mouseY
//         soundLoop.stop();
//         console.log('stop');
//         playing = false;
//       }
//     }
// }

function draw() {
  background(35);

  for (let i = 0; i < squares.length; i++){
      squares[i].show();
  }
  for (let i = 0; i < circles.length; i++){
      circles[i].show();
  }
    object.showEllipse();
    alphaChange();
}



// function mouseReleased() {
//   if (playing == false) {
//   soundLoop.start();
//   console.log('start')
//   playing = true
//   }
// }


function alphaChange() {
  for (let i = 0; i < circles.length; i++){
      if (circles[i].rollover() == true) {
        circles[i].alpha = 50;
      } else {
        circles[i].alpha = 255;
      }
  }
}


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

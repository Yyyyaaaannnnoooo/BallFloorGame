// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const MOTION = 1000;
const INC = Math.PI / 120;
const START_VALUE = 100;
// A reference to our box2d world
let world;
let ball;
let boundaries = [];

let cnv;
let sinBG = 0;
let BGcolor = 100;

let start = false;
let startCount = 0;
function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('p5Sketch');
  // Initialize box2d physics and create the world
  world = createWorld();
  // attach the collision listener to the world
  world.SetContactListener(new CustomListener());

  ball = new Ball(width / 2, 0);
  boundaries.push(new Boundary());

}

function draw() {
  background(BGcolor);
  if (start) {
    // We must always step through time!
    let timeStep = 1.0 / 30;
    // 2nd and 3rd arguments are velocity and position iterations
    world.Step(timeStep, 10, 10);

    //update the moving floors
    let num = floor(random(30, 50));
    if (frameCount % num == 0 && frameCount > 0) {
      boundaries.push(new Boundary());
    }
    for (let i = boundaries.length - 1; i >= 0; i--) {
      let b = boundaries[i];
      boundaries[i].update();
      boundaries[i].display();
      if (boundaries[i].done()) {
        boundaries.splice(i, 1);
      }
    }

    //update the ball
    ball.edge();
    ball.display();
    const x = map(mouseX, 0, width, -50, 50)
    sx = smoothVal(x, sx)
    // let value = window.orientation == 90 ? -(sy * 5) : sx * 5;
    ball.motion(sx);

    /////SWEARS//////
    counter--;
    if (counter < 1) {
      // hide the swears!
      document.getElementById('swears').style.display = 'none';
    }
  } else {
    let w = map(startCount, 0, START_VALUE, 0, width);
    fill(0, 0, 255);
    rect(0, 0, w, height);
  }

  if (mouseIsPressed) {
    startCount++;
    if (!start && startCount > START_VALUE) {
      document.getElementById('intro').style.display = 'none';
      start = true;
    }
  }
  // uppdate the background
  // sinBG += INC;
  BGcolor = map(ball.position().y, 0, FLOOR_HEIGTH(), 100, 0);
  // console.log(ball.position().y);
}
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
function FLOOR_HEIGTH() {
  return innerHeight * 0.85;
}
function mousePressed() {
  ball.jump();
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) ball.motion(-MOTION);
  else if (keyCode === RIGHT_ARROW) ball.motion(MOTION);
  else if (keyCode === UP_ARROW) ball.jump();
}

/**
 * DEVICE MOTION
 */

/* PREFS */
const easing = 0.5; // set between 0 - 1

/* VARS */
let rx, ry, rz, sx, sy, sz;
rx = ry = rz = sx = sy = sz = 0;

/* ONDEVICEMOTION */
// https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion
// window.ondevicemotion = event => {
//   /* RAW VALUES */
//   rx = event.accelerationIncludingGravity.x;
//   ry = event.accelerationIncludingGravity.y;
//   rz = event.accelerationIncludingGravity.z;

//   /* SMOOTHED VALUES */
//   sx = smoothVal(rx, sx);
//   sy = smoothVal(ry, sy);
//   sz = smoothVal(rz, sz);
// };

// /* VALUE MAPPING */
// function mapVal(value, istart, istop, ostart, ostop) {
//   return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
// }

/* VALUE SMOOTHING */
function smoothVal(inputVal, outputVal) {
  let tarVal = inputVal;
  let calcVal = tarVal - outputVal;
  outputVal += calcVal * easing;
  return outputVal;
}
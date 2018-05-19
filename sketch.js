// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const MOTION = 1000;
// A reference to our box2d world
let world;
// A list we'll use to track fixed objects
// let boundaries = [];
let flr;
let ball;
let boundaries = [];
let cnv;
function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('p5Sketch');
  // Initialize box2d physics and create the world
  world = createWorld();
  // attach the collision listener to the world
  world.SetContactListener(new CustomListener());
  // flr = new Floor();
  ball = new Ball(width / 2, 0);
  boundaries.push(new Boundary());
  // boundaries.push(new Boundary());
  // Add a bunch of fixed boundaries
  // bb = new Boundary(4 * width / 4, height - 150, width / 2 - 50, 10)

}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);
  let num = floor(random(30, 50));
  if (frameCount % num == 0 && frameCount > 0) {
    boundaries.push(new Boundary());
  }
  // flr.update();
  for (let i = boundaries.length - 1; i >= 0; i--) {
    let b = boundaries[i];
    boundaries[i].update();
    boundaries[i].display();
    if (boundaries[i].done()) {
      boundaries.splice(i, 1);
      // boundaries.push(new Boundary());
    }
  }
  ball.edge();
  ball.display();
  let value = window.orientation == 90 ? -(sy * 5) : sx * 5;
  ball.motion(value);
  
  /////SWEARS//////
  counter--;
  if(counter < 1){
    document.getElementById('swears').style.display = 'none';
  }
}
function windowResized(){
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
window.ondevicemotion = event => {
  /* RAW VALUES */
  rx = event.accelerationIncludingGravity.x;
  ry = event.accelerationIncludingGravity.y;
  rz = event.accelerationIncludingGravity.z;

  /* SMOOTHED VALUES */
  sx = smoothVal(rx, sx);
  sy = smoothVal(ry, sy);
  sz = smoothVal(rz, sz);
};

/* VALUE MAPPING */
function mapVal(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

/* VALUE SMOOTHING */
function smoothVal(inputVal, outputVal) {
  let tarVal = inputVal;
  let calcVal = tarVal - outputVal;
  outputVal += calcVal * easing;
  return outputVal;
}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
// let boundaries = [];
let flr;
let ball;
let floorB;
function setup() {
  createCanvas(640, 360);

  // Initialize box2d physics and create the world
  world = createWorld();
  flr = new Floor();
  ball = new Ball(width / 2, 0);
  floorB = new Boundary(0, height - 10, width);
  // Add a bunch of fixed boundaries
  // bb = new Boundary(4 * width / 4, height - 150, width / 2 - 50, 10)

}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);
  flr.update();
  floorB.display();
  floorB.move(width, height - 10);
  ball.display();
  // Boxes fall from the top every so often
  // if (random(1) < 0.2) {
  //   let b = new Box(width / 2, 30);
  //   boxes.push(b);
  // }
  // bb.display();
  // bb.move(mouseX, height / 20);
  // // Display all the boundaries
  // for (let i = 0; i < boundaries.length; i++) {
  //   boundaries[i].display();
  // }
}

function mousePressed() {
  ball.jump();
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) ball.move(-10);
  else if (keyCode === RIGHT_ARROW) ball.move(10);
  else if (keyCode === UP_ARROW) ball.jump();
}
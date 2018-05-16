// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// const FLOOR_HEIGTH = innerHeight * 0.85;
// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
// let boundaries = [];
let flr;
let ball;
function setup() {
  createCanvas(innerWidth, innerHeight);

  // Initialize box2d physics and create the world
  world = createWorld();
  flr = new Floor();
  ball = new Ball(width / 2, 0);
  // Add a bunch of fixed boundaries
  // bb = new Boundary(4 * width / 4, height - 150, width / 2 - 50, 10)

}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);
  // if(frameCount % 60 == 0 && frameCount > 0)flr.addFloor();
  flr.update();
  ball.edge();
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
  stroke(255);
  line(0, FLOOR_HEIGTH(), width, FLOOR_HEIGTH());
  stroke(0, 255, 0);
  line(0, FLOOR_HEIGTH() - (4 * ball.r), width, FLOOR_HEIGTH() - (4 * ball.r));
}
function FLOOR_HEIGTH(){
  return innerHeight * 0.85;
}
function mousePressed() {
  ball.jump();
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) ball.move(-10);
  else if (keyCode === RIGHT_ARROW) ball.move(10);
  else if (keyCode === UP_ARROW) ball.jump();
}
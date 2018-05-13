// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A circular particle

// Constructor
class Ball {
    constructor(x, y) {
      this.r = 8;
  
      // Define a body
      let bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position = scaleToWorld(x, y);
  
      // Define a fixture
      let fd = new box2d.b2FixtureDef();
      // Fixture holds shape
      fd.shape = new box2d.b2CircleShape();
      fd.shape.m_radius = scaleToWorld(this.r);
  
      // Some physics
      fd.density = 1.0;
      fd.friction = 0.1;
      fd.restitution = 0.3;
  
      // Create the body
      this.body = world.CreateBody(bd);
      // Attach the fixture
      this.body.CreateFixture(fd);
  
      // Some additional stuff
    //   this.body.SetLinearVelocity(new box2d.b2Vec2(10, 10));
      this.body.SetAngularVelocity(random(-5, 5));
    }
    move(x){
        // x = scaleToWorld(x);
        let pos = this.body.GetPosition();
        // pos.x += x;
        // this.body.SetPositionXY(pos.x, pos.y);
        this.body.SetLinearVelocity(new box2d.b2Vec2(x, 0));
    }
    jump(){
        this.body.SetLinearVelocity(new box2d.b2Vec2(0, 100));
    }
    // Drawing the box
    display() {
      // Get the body's position
      let pos = scaleToPixels(this.body.GetPosition());
      // Get its angle of rotation
      let a = this.body.GetAngleRadians();
  
      // Draw it!
      rectMode(CENTER);
      push();
      translate(pos.x, pos.y);
      rotate(a);
      fill(127);
      stroke(200);
      strokeWeight(2);
      ellipse(0, 0, this.r * 2, this.r * 2);
      // Let's add a line so we can see the rotation
      line(0, 0, this.r, 0);
      pop();
    }
  }
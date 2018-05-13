// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A fixed boundary class

// A boundary is a simple rectangle with x,y,width,and height
class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.fd = new box2d.b2FixtureDef();
    this.fd.density = 1.0;
    this.fd.friction = 0.5;
    this.fd.restitution = 0.2;

    this.bd = new box2d.b2BodyDef();
    // this.bd.type = box2d.b2BodyType.b2_dynamicBody;
    this.bd.type = box2d.b2BodyType.b2_staticBody;
    this.bd.position.x = scaleToWorld(this.x);
    this.bd.position.y = scaleToWorld(this.y);
    this.fd.shape = new box2d.b2PolygonShape();
    this.fd.shape.SetAsBox(this.w / (scaleFactor * 2), this.h / (scaleFactor * 2));
    this.body = world.CreateBody(this.bd)
    this.body.CreateFixture(this.fd);
  }

  // Draw the boundary, if it were at an angle we'd have to do something fancier
  display() {
    let pos = scaleToPixels(this.body.GetPosition());
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    // rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
  move(x, y){
    this.body.SetPositionXY(x, y);
  }


  // This function removes the particle from the box2d world
  killBody() {
    world.DestroyBody(this.body);
  }

  // Is the particle ready for deletion?
  done() {
    // Let's find the screen position of the particle
    let pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.x < 0 - (this.w)) {
      this.killBody();
      return true;
    }
    return false;
  }
}
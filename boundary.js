// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A fixed boundary class

// A boundary is a simple rectangle with x,y,width,and height
class Boundary {
  constructor(x, y, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || random(30, 200);
    this.h = 20;
    this.col = color(128);
    // movement vars
    this.initialPos = scaleToWorld(width + this.w);//
    this.velocity = 0;
    this.acceleration = 5;
    // Box2D vars
    this.fd = new box2d.b2FixtureDef();
    this.fd.density = 1.0;
    this.fd.friction = 0.5;
    this.fd.restitution = 0.2;
    
    this.bd = new box2d.b2BodyDef();
    // this.bd.type = box2d.b2BodyType.b2_dynamicBody;
    this.bd.type = box2d.b2BodyType.b2_staticBody;
    this.bd.position.x = this.initialPos;
    this.bd.position.y = scaleToWorld(FLOOR_HEIGTH());
    this.fd.shape = new box2d.b2PolygonShape();
    this.fd.shape.SetAsBox(this.w / (scaleFactor * 2), this.h / (scaleFactor * 2));
    this.body = world.CreateBody(this.bd)
    this.body.CreateFixture(this.fd);
    this.body.SetLinearVelocity(new box2d.b2Vec2(-10, 0));
    this.body.SetUserData(this);
  }

  // Draw the boundary, if it were at an angle we'd have to do something fancier
  display() {
    let pos = scaleToPixels(this.body.GetPosition());
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    // rotate(a);
    fill(this.col);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
  change(){
    this.col = color(0, 255, 0);
  }
  update(){
    // x = scaleToWorld(x);
    // y = scaleToWorld(y);
    // this.body.SetLinearVelocity(new box2d.b2Vec2(-10, 0));
    // console.log(this.body.GetPosition());
    this.velocity++;
    this.body.SetPositionXY(this.initialPos - this.velocity, scaleToWorld(FLOOR_HEIGTH()));
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
      // console.log(this, pos.x);
      this.killBody();
      return true;
    }
    return false;
  }
}
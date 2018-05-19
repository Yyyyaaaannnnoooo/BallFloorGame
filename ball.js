// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A circular particle

// Constructor
class Ball {
    constructor(x, y) {
        this.r = 25;
        this.col = color(51);
        this.ableToJump = true;
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
        this.body.SetAngularVelocity(random(-5, 5));
        this.body.SetUserData(this);
    }
    change() {
        this.ableToJump = true;
    }
    motion(x) {
        // x = scaleToWorld(x);
        let pos = this.body.GetPosition();
        let y = this.body.GetLinearVelocity().y;
        this.body.SetLinearVelocity(new box2d.b2Vec2(x, y));
    }
    jump() {
        if (this.ableToJump) {
            let x = this.body.GetLinearVelocity().x;
            this.body.SetLinearVelocity(new box2d.b2Vec2(x, -50));
            this.ableToJump = false;
        }
    }
    edge() {
        let pos = this.position();
        let w = scaleToWorld(width);
        let h = scaleToWorld(height)
        let x = scaleToWorld(pos.x);
        let y = scaleToWorld(pos.y);
        if (pos.x < 0) this.body.SetPositionXY(w, y);
        if (pos.x > width) this.body.SetPositionXY(0, y);
        if (pos.y < 0) this.body.SetPositionXY(x, h);
        if (pos.y > height) {
            this.body.SetPositionXY(x, 0);
            swearText();
        }
    }
    position() {
        return scaleToPixels(this.body.GetPosition());
    }
    // Drawing the box
    display() {
        // Get the body's position
        //   let pos = scaleToPixels(this.body.GetPosition());
        // Get its angle of rotation
        let a = this.body.GetAngleRadians();

        // Draw it!
        rectMode(CENTER);
        push();
        translate(this.position().x, this.position().y);
        rotate(a);
        fill(this.col);
        stroke(200);
        strokeWeight(2);
        ellipse(0, 0, this.r * 2, this.r * 2);
        // Let's add a line so we can see the rotation
        line(0, 0, this.r, 0);
        pop();
    }
}
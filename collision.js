// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// ContactListener to listen for collisions!

class CustomListener {

    // Collision event functions!
    BeginContact(contact) {
        // Get both fixtures
        let f1 = contact.GetFixtureA();
        let f2 = contact.GetFixtureB();
        // Get both bodies
        let b1 = f1.GetBody();
        let b2 = f2.GetBody();

        // Get our objects that reference these bodies
        let o1 = b1.GetUserData();
        let o2 = b2.GetUserData();
        // o1.change();
        o2.change();
        // if (o1 instanceof Ball || o2 instanceof Boundary) {
        //     o1.change();
        //     o2.change();
        // }
        // console.log(contact)
    }

    // Objects stop touching each other
    EndContact(contact) { };

    PreSolve(contact, manifold) { };

    PostSolve(contact, manifold) { };
}
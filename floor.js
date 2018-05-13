class Floor{
    constructor(){
        this.boundaries = [];
        this.velocity = 0;
        this.acceleration = 1;
        this.boundaries.push(new Boundary());
    }
    update(){
        for(let i = this.boundaries.length - 1; i >= 0; i--){
            let b = this.boundaries[i];
            b.move(this.velocity, height * 0.85);
            b.display();
            if (b.done()) {
                this.boundaries.splice(i, 1);
                this.velocity = 0;
                this.boundaries.push(new Boundary());
              }
        }
        this.velocity += this.acceleration;
    }
}
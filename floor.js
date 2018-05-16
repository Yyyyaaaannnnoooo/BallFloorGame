class Floor{
    constructor(){
        this.boundaries = [];
        this.velocity = 0;
        this.acceleration = 5;
        this.boundaries.push(new Boundary());
    }
    update(){
        for(let i = this.boundaries.length - 1; i >= 0; i--){
            let b = this.boundaries[i];
            b.move(this.velocity, FLOOR_HEIGTH());
            b.display();
            if (b.done()) {
                this.boundaries.splice(i, 1);
                this.velocity = 0;
                this.boundaries.push(new Boundary());
              }   
        }
        this.velocity += this.acceleration;
    }
    addFloor(){
        this.boundaries.push(new Boundary());
    }
}
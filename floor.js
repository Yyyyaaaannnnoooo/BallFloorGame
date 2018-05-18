class Floor{
    constructor(){
        this.boundaries = [];
        this.boundaries.push(new Boundary());
    }
    update(){
        for(let i = this.boundaries.length - 1; i >= 0; i--){
            let b = this.boundaries[i];
            b.update();
            b.display();
            if (b.done()) {
                this.boundaries.splice(i, 1);
                this.boundaries.push(new Boundary());
              }   
        }
    }
    addFloor(){
        this.boundaries.push(new Boundary());
        console.log(this.boundaries);
    }
}
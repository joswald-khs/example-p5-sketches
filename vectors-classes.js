// https://p5js.org/reference/p5/p5.Vector/

let movers = []
let G;
let j;
let w;

function setup() {
  createCanvas(400, 400);
  // create a new Mover object
  for( let i = 0; i < 1; i++ ) { // we had this set higher before I did the "chasing" part
    movers.push( new Mover(createVector(width/2,height/3), createVector(random(-3,3),random(-1,-5))))
  }

  G = createVector(0,0.5)
  fill(200)
  noStroke()
  ellipseMode(RADIUS)
}

function draw() {
  background(240);
  for( let mover of movers ) {
    mover.steerTowards(createVector(mouseX,mouseY))
    mover.addForce(G)
    mover.addForce(j)
    mover.addForce(w)
    mover.update()
    mover.draw()
  }
  j = createVector(0,0)
  w = createVector(0,0)
  

}

function keyPressed() {
  // j = createVector(0,-5)
  w = p5.Vector.random2D().mult(3)
}

class Mover {
  constructor( position, velocity ) {
    this.position = position
    this.velocity = velocity
    this.acceleration = createVector(0,0)
  }
  
  draw() {
    circle(this.position.x, this.position.y, 10)
  }
  
  steerTowards( location ) {
    const v = createVector(location.x - this.position.x, location.y - this.position.y )
    const f = v.sub(this.velocity)
    f.limit(2)
    this.addForce(f)
  }
  
  update() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    if( this.position.x < 0 || this.position.x > width ) {
      this.velocity.x = -this.velocity.x
    }
    if( this.position.y < 0 || this.position.y > height ) {
      this.velocity.y = -this.velocity.y
    }
    this.acceleration = createVector(0,0)
  }
  
  addForce(f) {
    this.acceleration.add(f)
  }
}

// https://p5js.org/reference/p5/p5.Vector/

let mover = {}
let G;
let j;
let w;

function setup() {
  createCanvas(400, 400);
  mover.position = createVector(width/2,height/3)
  mover.velocity = createVector(random(-3,3),random(-1,-5))
  G = createVector(0,0.5)
  fill(200)
  noStroke()
  ellipseMode(RADIUS)
}

function draw() {
  background(240);
  circle(mover.position.x, mover.position.y, 10)
  mover.position.add(mover.velocity)
  mover.velocity.add(G)
  mover.velocity.add(j)
  mover.velocity.add(w)
  j = createVector(0,0)
  w = createVector(0,0)
  if( mover.position.x < 0 || mover.position.x > width ) {
    mover.velocity.x = -mover.velocity.x
  }
  if( mover.position.y < 0 || mover.position.y > height ) {
    mover.velocity.y = -mover.velocity.y
  }  
}

function keyPressed() {
  // j = createVector(0,-5)
  w = p5.Vector.random2D().mult(3)
}

let movers = [];
let G
function setup() {
  G = createVector( 0, 0 )
  createCanvas(600, 600);
  for( let i = 0; i < 50; i++ ) {
    movers.push( new Mover() )
  }
}

function draw() {
  background(220);
  G = createVector( 0, map(mouseY,0,height,-1,1) )
  if( movers.length < 200 ) {
    movers.push( new Mover() );
  }
  for( let i = 0; i < movers.length; i++ ) {
    let m = movers[i];
    m.applyForce(G)
    m.update();
    m.draw();
    if( m.position.y > height + 50 || m.position.y < -50) {
      movers[i] = new Mover();
    }
  }
}

class Mover {
  constructor()  {
    this.position = this.initialPosition();
    this.velocity = createVector( 0, random(0,1) )
    this.acceleration = createVector(0,0)
  }
  
  applyForce( f ) {
    this.acceleration.add( f )
  }
  
  initialPosition() {
    if( random() < 0.5 ) {
      return createVector( random(0,width), random(-50,0) )
    } else {
      return createVector( random(0,width), random(height,height+50) )
    }
  }
  
  update() {
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration = createVector(0,0)
  }
  
  draw() {
    circle(this.position.x, this.position.y, 10)
  }
}

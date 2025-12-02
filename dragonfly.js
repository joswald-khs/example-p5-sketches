let df
let flowers = []
let viewPort = {}

function setup() {
  createCanvas(600, 400)
  viewPort = {  
    x:0,
    y:0,
    w:width,
    h:height,
    minX:-36000,
    maxX:36000,
    minY:-24000,
    maxY:24000
  }
  
  flowers = createFlowers(
    viewPort.minX,viewPort.maxX,
    viewPort.minY,viewPort.maxY,
    1000000
  )  
  
  df = new Dragonfly(width/2,height/2,100,100)
  noStroke();
}

function createFlowers(minX,maxX,minY,maxY,count) {
  let points = []
  const flowerColors = [color(209, 0, 59),color(241, 255, 43),color(255, 163, 43),color(192, 126, 230)]
  for( let i = 0; i < count; i++ ) {
    points.push({
      x: random(minX,maxX),
      y: random(minY,maxY),
      r: random(2,6),
      c: random(flowerColors)
    })
  } 
  return points;
}

function getOnScreenFlowers(flowers) {
  const L = viewPort.x
  const R = viewPort.x + viewPort.w
  const T = viewPort.y
  const B = viewPort.y + viewPort.h
  return flowers.filter( p => p.x > L && p.x < R && p.y > T && p.y < B )  
}

function draw() {
  background(108, 209, 0);

  for( const p of getOnScreenFlowers(flowers) ) {
    fill(p.c)
    circle(- viewPort.x + p.x, - viewPort.y + p.y, p.r)
  }

  df.draw()
  viewPort.x += df.velocity.x
  viewPort.y += df.velocity.y
}

class Dragonfly {
  constructor(x,y,w=400,h=400) {
    this.position = createVector(x,y)
    this.velocity = p5.Vector.random2D()
    this.w = w
    this.h = h
    
    this.fillColors = {
      head: color(101, 0, 255),
      thorax: color(1, 112, 5),
      tail: color(38, 1, 94),
      frontWing: color(214, 255, 120,63),
      backWing: color(237, 255, 196,63)
    }
    
    this.frontWingRotation = 0
    this.backWingRotation = 0
  }
  
  get x() { return this.position.x }
  get y() { return this.position.y }
  
  get rotation() { return this.velocity.heading() }
  
  draw() {
    // steering behavior from 
    // https://natureofcode.com/autonomous-agents/#vehicles-and-steering
    let desired = p5.Vector.sub(createVector(mouseX,mouseY),this.position)
    desired.setMag(5)
    let steer = p5.Vector.sub(desired,this.velocity)
    steer.limit(0.2)
    this.velocity.add(steer);
    this.velocity.limit(5)
    
    push()
    translate(this.x,this.y)
    rotate(this.rotation+PI/2)
    noStroke()
    this.body()
    this.wings()
    this.head()
    pop()
  }
  
  wings() {
    // set up different rotational offsets for each wing
    const ROTATE_DEGREES = 30
    const frontRotationOffset = sin(map( frameCount % 31, 0, 30, 0, TWO_PI ))*ROTATE_DEGREES
    const backRotationOffset = sin(map( frameCount % 29, 0, 28, 0, TWO_PI ))*ROTATE_DEGREES
    fill(this.fillColors.frontWing)
    push()
    translate(0,-this.h/2 + this.h*0.1)
    rotate(radians(this.frontWingRotation+frontRotationOffset))
    ellipse(-this.w/4,0,this.w/2,(this.w/2)*0.2)
    pop()
    push()
    translate(0,-this.h/2 + this.h*0.1)
    rotate(radians(-this.frontWingRotation-frontRotationOffset))
    ellipse(this.w/4,0,this.w/2,(this.w/2)*0.2)
    pop()
    fill(this.fillColors.backWing)
    push()
    translate(0,-this.h/2 + this.h*0.15)
    rotate(radians(this.backWingRotation+backRotationOffset))
    ellipse(-this.w*0.2,0,this.w*0.4,(this.w/2)*0.2)
    pop()
    push()
    translate(0,-this.h/2 + this.h*0.15)
    rotate(radians(-this.backWingRotation-backRotationOffset))
    ellipse(this.w*0.2,0,this.w*0.4,(this.w/2)*0.2)
    pop()    
  }
  
  head() {
    const VPADDING = this.h * 0.01
    const H = this.h * 0.05
    const W = 1.5 * H
    fill(this.fillColors.head)
    ellipse( 0, -this.h/2 + VPADDING + H/2, W, H)    
  }
  
  body() {
    const VPADDING = this.h * 0.05;
    const W = this.w * 0.05
    const HW = W/2
    const QW = HW/2
    const H = this.h * 0.7
    fill(this.fillColors.thorax)
    triangle(-HW, -this.h/2 + VPADDING, HW, -this.h/2 + VPADDING, 0, this.h*0.4)
    fill(this.fillColors.tail)
    rect( -QW/2, 0, QW, this.h/2 - VPADDING )
  }
}

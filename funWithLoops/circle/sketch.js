let numberOfSquares = 11;
let squares = []

function setup() {
  createCanvas(400, 400);
  ellipseMode(RADIUS)
  
  // populating the array
  while( squares.length < numberOfSquares ) {
    let theta = (TWO_PI/numberOfSquares)*squares.length
    squares.push({
      x: width/2 + 100 * cos(theta),
      y: height/2 + 100 * sin(theta),
      theta: theta,
      r: 100
    })
  }
}

function draw() {
  background("white")
  noFill()
  circle(width/2,height/2,100)
  for( let s of squares ) {
    square(s.x, s.y, 10)
    s.r += random(-3,3)
    s.x = width/2 + s.r * cos(s.theta)
    s.y = height/2 + s.r * sin(s.theta)
  }
//   for( let theta = 0; theta < TWO_PI; theta+=(TWO_PI/numberOfSquares) ) {
//     square(width/2 + 100 * cos(theta), 
//            height/2 + 100 * sin(theta), 10 )
//   }
}

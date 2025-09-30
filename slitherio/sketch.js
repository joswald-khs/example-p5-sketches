let snake = []

const STARTING_SIZE = 20
const SHRINK_FACTOR = 0.95

function setup() {
  createCanvas(600, 600)
  ellipseMode(RADIUS)
  tx = random(10000)
  ty = random(10000)
}

function draw() {
  background(220)    
  drawSnake()
}

function mouseMoved() {
  updateSnake(createVector(mouseX,mouseY))
}

function keyPressed() {
  if( key === " " ) {
    addToSnake()
  }
  
  if( key === "r" ) {
    snake = []
    addToSnake()
  }

}
 
function updateSnake(newLocation) {
  if( snake.length > 0 ) {
    snake[0].pLocation = snake[0].location
    snake[0].location = newLocation
    for( let i = 1; i < snake.length; i++ ) {      
      const v = p5.Vector.sub(snake[i-1].location, snake[i].location)
      v.setMag( v.mag() - snake[i-1].size - snake[i].size )
      snake[i].pLocation = snake[i].location
      snake[i].location = p5.Vector.add(v,snake[i].location)
    }    
  } 
}

function drawSnake() {
  for( let section of snake ) {
    circle(section.location.x, section.location.y, section.size)
  }
}

function addToSnake() {
  if( snake.length === 0 ) {
    snake.push( createNewSection(createVector(mouseX,mouseY), STARTING_SIZE) )
  } else {
    const currentTail = snake[snake.length-1]
    let d
    if( currentTail.pLocation ) {
      d = p5.Vector.sub( currentTail.pLocation, currentTail.location )
    } else {
      d = p5.Vector.random2D()
    }
    let ns = nextSize(currentTail)
    d.setMag(currentTail.size + ns) 
    snake.push( 
      createNewSection( 
        p5.Vector.add(d, currentTail.location),
        ns
      )
    )     
  }
}

function nextSize(section) {
  return section.size * SHRINK_FACTOR
}

function createNewSection(location, size) {
  return {
    location, 
    size, 
    pLocation: location
  }
}

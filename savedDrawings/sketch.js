let positions = []
let drawings = []
let drawingToDraw = 0

function setup() {
  createCanvas(600, 600);
  background(220)
  noStroke()
  fill('black')
  noLoop()
}

function draw() {
  text( "Draw freely with your mouse", 10, 12 )
  text( "Press 's' to save your current drawing", 10, 24 )
  text( "Press 'c' to clear the current drawing (without saving)", 10, 36 )
  text( "Press 'd' to clear and drawing the selected saved drawing", 10, 48 )
  text( "Use the up and down arrows to change the selected saved drawing", 10, 60)
  if( drawings.length > 0 ) {
    text( `Selected saved drawing: ${drawingToDraw}`, 10, 72 )  
  }
  
  circle(mouseX,mouseY,20)
}

function mouseMoved() {
  positions.push( {x:mouseX,y:mouseY} )
  redraw()
}

function keyPressed() {
  if( key === 'c' ) {
    background(220)
    positions = []
  }
  
  // print current positions to the console
  if( key === 'p') {
    for( let p of positions ) {
      // templating string
      console.log( `${p.x},${p.y}`)
    }
  }
  
  // save -- push the current positions 
  //         onto the drawings array and
  //         reset positions
  if( key === 's' ) {
    background(220)
    // push the current positions onto the
    // drawings array
    drawings.push(positions)
    positions = []
    redraw()    
  } 
  
  if( key === 'd' ) {
    drawCurrentDrawing()
  }
  
  if( keyIsDown(UP_ARROW) ) {
    drawingToDraw++
    drawCurrentDrawing()
  }
  
  if( keyIsDown(DOWN_ARROW) ) {
    drawingToDraw--
    drawCurrentDrawing()
  }
}

function drawCurrentDrawing() {
  if( drawings.length > 0 ) {
    background(220)    
    for( let p of drawings[drawingToDraw%drawings.length] ) {
      circle(p.x, p.y, 20)
    }
    redraw()     
  }
}

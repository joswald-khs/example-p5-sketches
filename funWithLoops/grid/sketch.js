let spacing = 10;
function setup() {
  createCanvas(400, 600);  
}

function drawGrid() {
  stroke("lightblue")
  for( let i = 0; i <= width; i+=spacing ) {
    line(i,0,i,height)
  }
  
  for( let i = 0; i <= height; i+=spacing) {
    line(0,i,width,i)
  }  
}

function draw() {
  background("white");
  drawGrid();
}

function keyPressed() {
  if( keyIsDown(UP_ARROW) ) {
    spacing++
  }
  
  if( keyIsDown(DOWN_ARROW) ) {
    spacing--
  }
}

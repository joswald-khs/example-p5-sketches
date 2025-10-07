let points = []

function setup() {
  createCanvas(400, 400)
}

function draw() {
  background(220)
  circle(mouseX,mouseY,20)
  points.push({
    x: mouseX,
    y: mouseY
  });
  // the above is equivalent to
  // let newPoint = {}
  // newPoint.x = mouseX
  // newPoint.y = mouseY
  // or even
  // let newPoint = {
  //   x: mouseX,
  //   y: mouseY
  // }; 
}

function keyPressed() {
  // I think the "blob" errors I was getting
  // in class were because we were trying to 
  // write to the same file repeatedly, but
  // maybe not... unclear.
  let writer = createWriter('points.csv');
  for( let p of points ) {
    writer.print(`${p.x},${p.y}`)
  }
  writer.close();
}

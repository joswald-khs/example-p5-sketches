let myObject = {}

function setup() {
  createCanvas(400, 400)
  myObject.points = []
}

function draw() {
  background(220)
  circle(mouseX,mouseY,20)
  myObject.points.push({
    x: mouseX,
    y: mouseY
  });
}

function keyPressed() {
  saveJSON(myObject, 'drawingData.json')
}

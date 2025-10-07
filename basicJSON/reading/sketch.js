// remember that loading something like a file 
// can potentially take a really long time. 'async'
// and 'await' are JavaScript constructs that allow 
// us to wait for those long operations to finish
// before proceeding with our code (and therefore 
// prevent some problems)

let myObject

async function setup() {
  createCanvas(400, 400);
  // we need to have uploaded a 'drawingData.json' file
  // into this sketch before running this code. 
  myObject = await loadJSON('drawingData.json') 
}

function draw() {
  background(220);
  // we are assuming the structure of the object here
  for( let p of myObject.points ) {
    circle(p.x, p.y, 20)
  }
}

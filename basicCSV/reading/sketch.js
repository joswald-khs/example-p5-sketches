// remember that loading something like a file 
// can potentially take a really long time. 'async'
// and 'await' are JavaScript constructs that allow 
// us to wait for those long operations to finish
// before proceeding with our code (and therefore 
// prevent some problems)

let points = []

async function setup() {
  createCanvas(400, 400);
  // we need to have uploaded a 'points.csv' file
  // into this sketch before running this code. 
  let strings = await loadStrings('points.csv')
  
  for( let line of strings ) {
    // split breaks a string into an array. The breaks
    // happen wherever there is a comma in the string
    // (because we passed a comma in as a parameter). 

    let values = line.split(',')
    points.push({
      x: float(values[0]), // have to convert a string
      y: float(values[1])  // into a number (float)
    })
  }  
}

function draw() {
  background(220);
  for( let p of points ) {
    circle(p.x, p.y, 20)
  }
}

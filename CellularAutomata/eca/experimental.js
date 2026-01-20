let generations = []
let colors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075']
let r = 3
let d = r*2
let cellCount
let rule = []
let ruleNumber
let auto = false

function setup() {
  createCanvas(windowWidth-20, windowHeight-20)
  
  cellCount = int(width / d)
  initialize()
  ellipseMode(RADIUS)
  textSize(36)
  noStroke()
  noLoop()  
}

function draw() {
  background('#a9a9a9')
  // draw all generations
  for( let i = 0; i < generations.length; i++ ) {
    const generation = generations[i]
    fill(generation.fillColor)
    for( let j = 0; j < generation.cells.length; j++ ) {
      const c = generation.cells.charAt(j)
      if( c === '1' ) {
        circle( r + j * d, r + i * d, r )
      }
    }
  }
  fill("white")
  text(`rule #:${ruleNumber}\n${rule}`,10,40)
  
  // auto mode automatically advances the generations and then resets if we are at the bottom of the canvas. 
  if( auto ) {
    generations.push( nextGeneration(generations[generations.length-1].cells) )
    if( r + generations.length * d > height ) {
      initialize("increment")
    }
  }
}

function keyPressed() {
  // press space to advance a generation
  if( key === ' ' ) {
    generations.push( nextGeneration(generations[generations.length-1].cells) )
    redraw()    
  }
  
  // press r to reset with a new rule
  if( key === 'r' ) {
    initialize('random')
    redraw()
  }
  
  // press a to toggle auto advance
  if( key === 'a' ) {
    auto = !auto
    if( auto ) {
      loop()
    } else {
      noLoop()
    }
    redraw()
  }

}

function newGeneration(type="standard") {
  let cells
  if( type === "randomized" ) { // random initial state for all cells
    cells = Array(cellCount).fill(0)
    for( let i = 0; i < cells.length; i++ ) {
      cells[i] = random(['0','1']);
    }
    cells = cells.join('')
  } else  { // standard intial state
    const halfCount = floor(cellCount/2)
    cells = Array(halfCount).fill(0).join('') + "1" + Array(halfCount).fill(0).join('')
  }
  
  // a generation consists of all the cells represented as a string and a color
  return {
    cells, // as a string
    fillColor: colors[generations.length%colors.length]
  }  
}

function nextGeneration( previousGeneration ) {
  let cells = applyRules(previousGeneration)
  return {
    cells,
    fillColor: colors[generations.length%colors.length]
  }
}

// we ignore the edge cases
function applyRules( previousGeneration, deterministic = true ) {
  let newGeneration = previousGeneration.charAt(0)
  for( let i = 1; i < previousGeneration.length - 1; i++ ) {
    // generate the neighborhood by creating a substring
    const a = previousGeneration.substring(i-1,i+2) 
    if( deterministic ) {
      // parseInt treats strings as numbers, with a base
      newGeneration += rule.charAt(7-parseInt(a,2))      
    } else {
      if( random() > 0.5 ) {
        newGeneration += rule.charAt(7-parseInt(a,2)) 
      } else {
        newGeneration += rule.charAt(7-parseInt(a,2)) === "0" ? "1" : "0";
      }
    }
  }
  newGeneration += previousGeneration.charAt(previousGeneration.length-1);
  return newGeneration;
}

function resetGenerations() {
  generations = []  
  generations.push( newGeneration() ) //"randomize"
}

function updateRule(method = 'random',value = 0) {
  if( method === 'random' ) {
    ruleNumber = int(random(256))  
  }
  if( method === 'increment') {
    ruleNumber = (ruleNumber + 1)%256
  }
  if( method === 'specific' ) {
    ruleNumber = value // validation
  }
  rule = ruleNumber.toString(2).padStart(8,"0");
}

function initialize(method = 'random', value=0) {
  resetGenerations()
  updateRule(method,value)
}

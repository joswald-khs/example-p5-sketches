let data
let colors = ['#ffe119', '#4363d8', '#f58231', '#dcbeff', '#800000', '#000075']

async function setup() {
  createCanvas(windowWidth, windowHeight)
  data = await loadTable('https://docs.google.com/spreadsheets/d/e/2PACX-1vRTXfgDyP8b6yHFfQPMkmJPjA7Q7Es0HltBXUjxP50jWY2xAswU5lWyhIxzmQK-5lEQuF3hfXJtrwyq/pub?gid=0&single=true&output=csv',',','header')
  rectMode(CENTER)
  noStroke()
}

function draw() {
  let cellWidth = width / colors.length
  let halfCellWidth = cellWidth/2
  let cellHeight = height / data.getRowCount()
  let halfCellHeight = cellHeight/2
  
  for( let i = 0; i < colors.length; i++) {
    for( let j = 0; j < data.getRowCount(); j++ ) {
      const scaleFactor = data.getRow(j).getNum(i)/10
      fill(colors[i])
      rect( 
        halfCellWidth + i * cellWidth,
        halfCellHeight + j * cellHeight,
        cellWidth * scaleFactor,
        cellHeight * scaleFactor,
      )
    }
  }
}

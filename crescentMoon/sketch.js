let crescentMoon1, crescentMoon2;

function setup() {
  createCanvas(600, 600);
  crescentMoon1 = createCrescentMoon(200,300,70);
  crescentMoon2 = createCrescentMoon(400,100,20);
  ellipseMode(RADIUS);
  noStroke();
}

function draw() {
  background("black");
  drawCrescentMoon(crescentMoon1);
  drawCrescentMoon(crescentMoon2);
}

function createCrescentMoon(x,y,r) {
  let moon = {};
  moon.c = "#fafac5";
  moon.x = x;
  moon.y = y;
  moon.r = r;
  return moon;
}

function drawCrescentMoon(moon) {
  fill(moon.c);
  circle(moon.x, moon.y, moon.r); 
  fill("black");
  circle(moon.x + 0.2*moon.r, moon.y, moon.r);
}

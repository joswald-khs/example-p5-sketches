let ball1, ball2, ball3;

let SPEED = 3;

function setup() {
  createCanvas(600, 600);
  ellipseMode(RADIUS);
  resetAllBalls()
}

function draw() {
  background(220);
  drawBall(ball1);
  updateBall(ball1);
  drawBall(ball2);
  updateBall(ball2);
  drawBall(ball3);
  updateBall(ball3);
}

function resetAllBalls() {
  ball1 = createBall()
  ball2 = createBall()
  ball3 = createBall()  
}

function mouseClicked() {
  resetAllBalls()
}

function updateBall(ball) {
  ball.y = ball.y + ball.dy;
  ball.x = ball.x + ball.dx;  
}

function drawBall(ball) { // implicit declaration of the variable (parameter) ball
  fill(ball.c);
  circle(ball.x,ball.y,ball.radius);  
}

function createBall() {
  let ball = {}
  ball.c = color(random(256),random(256),random(256))
  ball.x = width/2;
  ball.y = height/2;
  ball.dx = random(-SPEED,SPEED);
  ball.dy = random(-SPEED,SPEED);
  ball.radius = random(10,50);  
  return ball;
}

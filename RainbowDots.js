const numDots = 2;
const xincrement = 0.01;
const yincrement = 0.02;
var dots = [];
class Dot {
  constructor(xOff, yOff) {
    this.xNoise = 0;
    this.yNoise = 0;
    let dotColor = [];
    this.reverse = false;
    for (let i = 0; i<3; i++) {
      append(dotColor, floor(random(255)));
    }
    this.xOff = xOff;
    this.yOff = yOff;
  }
  move() {
    this.xNoise = noise(this.xOff)*width;
    this.xOff += xincrement;
    this.yNoise = noise(this.yOff)*height;
    this.yOff += yincrement;
    for (let i=0; i<3; i++) {
      if (this.reverse) this.dotColor[i] -= random(2);
      if (!this.reverse) this.dotColor[i] += random(2);
      if (this.dotColor[i]>255) this.reverse = true;
      if (this.dotColor[i]<0) this.reverse = false;
    }
    
    fill(color(this.dotColor[0], this.dotColor[1], this.dotColor[2]));
    circle(this.xNoise, this.yNoise, 20);
  }
}
function setup() {
  createCanvas(500,500);
  background(0);
  noStroke();
}
print("looping");
for (let i=0; i<numDots; i++) {
  append(dots, new Dot(random(width), random(height)));
}
function draw() {
  fill(0, 10);
  rect(0, 0, width, height);
  for (let i = 0; i<dots.length; i++) {
    dots[i].move();
  }
  print(dots.length);
}


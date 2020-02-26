const squareCount = 50; 
var snakeEat = true; 
var gameOver = false;
var xFood, yFood;
var direction;
var score = 0;
class SnakeTail {
    constructor(xPos, yPos){
        this.xPos = xPos; 
        this.yPos = yPos;  
    }
    draw() {
        fill(255, 0, 0);
        rect(map(this.xPos, 0, 50, 0, width), map(this.yPos,0,50,0,height), width/squareCount, height/squareCount);
    } 
}
var snake = new Array(new SnakeTail(24,24));
function setup() {
    createCanvas(500, 500);
    background(255);
    frameRate(10);
    direction = createVector(0, 0);
}
function draw() {
	if (gameOver) {
		score=0;
		snake = [];
		append(snake, new SnakeTail(24,24));
		gameOver=false;
	}
    drawGrid(); 
    checkCollision();
    foodEaten();
    makeFood();
    moveSnake();
    for (let i = 0; i<snake.length; i++) {
        snake[i].draw();
    }
}

function drawGrid(){
    fill(255);
    stroke(0);
    for(let x = 0; x < width; x+=width/squareCount) {
        for(let y = 0; y < width; y+=height/squareCount) {
            rect(x, y, width/squareCount, width/squareCount);
        }
    }
}
function makeFood(){
    if(snakeEat){
        xFood = int(random(0, squareCount));
        yFood = int(random(0, squareCount));
        snakeEat = false; 
    }
    fill(255, 0, 255);
    rect(map(xFood, 0, squareCount, 0, width), map(yFood, 0, squareCount, 0, height), width/squareCount, height/squareCount);
}
function foodEaten() {
	if (snake[0].xPos==xFood && snake[0].yPos==yFood) {
		snakeEat=true;
        append(snake, new SnakeTail(snake[snake.length-1].xPos-1, snake[snake.length-1].yPos));
        score++;
	}
}
function checkCollision() {
	for (let i=1; i<snake.length; i++) {
		if (snake[0].xPos == snake[i].xPos && snake[0].yPos == snake[i].yPos) {
			gameOver = true;
		}
	}
}
function moveSnake() {
    if (snake[0].xPos<0) {
        snake[0].xPos += squareCount;
    }
    if (snake[0].xPos>squareCount-1) {
        snake[0].xPos -= squareCount;
    }
    if (snake[0].yPos<0) {
        snake[0].yPos += squareCount;
    }
    if (snake[0].yPos>squareCount-3) {
        snake[0].yPos -= squareCount;
    }
    for (let i = 1; i<snake.length; i++) {
        snake[i].xPos = snake[i-1].xPos;
        snake[i].yPos = snake[i-1].yPos;
    }
    snake[0].xPos += direction.x;
    snake[0].yPos += direction.y;
}
function keyPressed() {
    if (keyCode==UP_ARROW) {
        direction.y = -1;
        direction.x = 0;
    }
    if (keyCode==RIGHT_ARROW) {
        direction.x = 1;
        direction.y = 0;
    }
    if (keyCode==LEFT_ARROW) {
        direction.x = -1;
        direction.y = 0;
    }
    if (keyCode==DOWN_ARROW) {
        direction.y = 1;
        direction.x = 0;
    }
}
/*

*/
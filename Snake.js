const squareCount = 15; 
var snakeEat = true, gameOver = false, food, direction, score = 0, snake; 
class Snake {
    constructor(){
        this.body = [];
        this.body[0] = createVector(24,24);
    }
    move() {
        let head = this.body[this.body.length-1].copy();
        this.body.shift();
        head.x += direction.x;
        head.y += direction.y;
        if (head.x > squareCount-1) head.x -= squareCount+1;
        else if (head.y > squareCount-1) head.y -= squareCount+1;
        else if (head.x < 0) head.x += squareCount;
        else if (head.y < 0) head.y += squareCount;
        this.body.push(head);
    }
    grow() {
        let head = this.body[this.body.length-1].copy();
        this.body.push(head);
    }
    collision() {
        let head = this.body[this.body.length-1].copy();
        for (let i = 0; i<this.body.length-1; i++) {
            let pos = this.body[i].copy();
            if (head.x == pos.x && head.y == pos.y) {
                gameOver = true;
            }
        }
    }
    draw() {
        fill(255, 0, 0);
        for (let i = 0; i<this.body.length; i++) {
            rect(map(this.body[i].x, 0, squareCount, 0, width), map(this.body[i].y, 0, squareCount, 0, height), width/squareCount, height/squareCount);
        }
    } 
}
function setup() {
    createCanvas(500, 500);
    background(255);
    frameRate(10);
    direction = createVector(0, 0);
    food = createVector(0,0);
    snake = new Snake();
}

function draw() {
    if (!gameOver) {
        drawGrid(); 
        foodEaten();
        makeFood();
        snake.move();
        snake.draw();
        snake.collision();
        textSize(20);
        fill(0);
        text("Length: " + (score+1), 1, 16);
    } else {
        score=0;
        textSize(40);
        text("Game Over", 160, 250);
        text("Press Enter to restart", 80, 300);
	}
}

function drawGrid(){
    fill(255);
    stroke(0);
    for(let x = 0; x < width; x+=width/squareCount) {
        for(let y = 0; y < width; y+=height/squareCount) {
            rect(x, y, width/squareCount, height/squareCount);
        }
    }
}
function makeFood(){
    if(snakeEat){
        food.x = int(random(0, squareCount));
        food.y = int(random(0, squareCount));
        snakeEat = false; 
    }
    fill(255, 0, 255);
    rect(map(food.x, 0, squareCount, 0, width), map(food.y, 0, squareCount, 0, height), width/squareCount, height/squareCount);
}
function foodEaten() {
	if (snake.body[snake.body.length-1].x==food.x && snake.body[snake.body.length-1].y==food.y) {
		snakeEat=true;
        snake.grow();
        score++;
	}
}
function keyPressed() {
    if (keyCode==UP_ARROW && direction.y == 0) {
        direction.y = -1;
        direction.x = 0;
    }
    if (keyCode==RIGHT_ARROW && direction.x == 0) {
        direction.x = 1;
        direction.y = 0;
    }
    if (keyCode==LEFT_ARROW && direction.x == 0) {
        direction.x = -1;
        direction.y = 0;
    }
    if (keyCode==DOWN_ARROW && direction.y == 0) {
        direction.y = 1;
        direction.x = 0;
    }
    if (keyCode==RETURN) {
        snake = null;
        snake = new Snake();
        score = 0;
        snakeEat = true;
        gameOver = false;
    }
}
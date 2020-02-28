var ballPos, ballVel, leftScore=0, rightScore=0, enemyPos, myPos, direction, enemySpeed=5;
function setup() {
	direction = createVector(random(), random());
	if (direction.x>0.5) direction.x = -5;
	else direction.x = 5;
	if (direction.y>0.5) direction.y = -5;
	else direction.y = 5;
	ballPos = createVector(375,250);
	ballVel = createVector(direction.x, direction.y);
	enemyPos = createVector(700,250);
	myPos = createVector(25,50);
	createCanvas(750,500);
}
function draw() {
	background(0);
	fill(255);
	textSize(30);
	text(leftScore, 180, 50);
	text(rightScore, 555, 50);
	rect(370,0,10,500);
	keyHandle();
	drawSelf();	
	drawBall();
	drawEnemy();
	collide();
	endGame();
}
function collide() {
	if (collideRectCircle(myPos.x+25,myPos.y+25,5,200,ballPos.x,ballPos.y,30)) {
		ballVel.x*=-1;
		if(ballVel.x<0) ballVel.x-=0.5;
		else ballVel.x+=0.5;
		if (ballVel.y<0) ballVel.y-0.5;
		else ballVel.y+=0.5;
	} else if (collideRectCircle(enemyPos.x,enemyPos.y+100,5,200,ballPos.x,ballPos.y,30)) {
		ballVel.x*=-1;
		if(ballVel.x<0) ballVel.x--;
		else ballVel.x++;
		if (ballVel.y<0) ballVel.y--;
		else ballVel.y++;;
	}
}
function drawBall() {
	if (ballPos.y+ballVel.y>height-15 || ballPos.y+ballVel.y<15) ballVel.y *= -1;
	if (ballPos.x<25) {
		rightScore++;
		setup();
	}
	else if (ballPos.x>725) {
		leftScore++;
		enemySpeed++;
		setup();
	}
	ballPos.add(ballVel);
	fill(255);
	ellipse(ballPos.x, ballPos.y, 30, 30)
}
function drawSelf() {
	if (myPos.y<0) myPos.y = 0;
	else if (myPos.y+200>500) myPos.y = 300;
		fill(255);
		rect(myPos.x, myPos.y, 25, 200);
}
function drawEnemy() {
	if (ballPos.y>enemyPos.y+200) enemyPos.y+=enemySpeed;
	else enemyPos.y-=enemySpeed;
	if (enemyPos.y+100<0) enemyPos.y = -100;
	else if (enemyPos.y+300>500) enemyPos.y = 200;
	fill(255);
	rect(enemyPos.x, enemyPos.y+100, 25,200);
}
function endGame() {
	if (leftScore>=11) {
		fill(255);
		textSize(30);
		text("You Win", 325, 230);
		text("Press Enter to Play Again", 250, 260);	
		ballVel.x = 0;
		ballVel.y = 0;
		ballPos.y = -100;
		if (keyIsDown(RETURN)) {
			leftScore = 0;
			rightScore = 0;
			enemySpeed = 5
			setup();
		}
	}
	if (rightScore>=11) {
		fill(255);
		textSize(30);
		text("Game Over", 325, 230);
		text("Press Enter to Try Again", 250, 260);
		ballVel.x = 0;
		ballVel.y = 0;
		ballPos.y = -100;
		if (keyIsDown(RETURN)) {
			leftScore = 0;
			rightScore = 0;
			enemySpeed = 5
			setup();
		}
	}
}
function keyHandle() {
		if (keyIsDown(UP_ARROW)) {
				myPos.y -= 10;
		} else if (keyIsDown(DOWN_ARROW)) {
				myPos.y += 10;
		}
}
function mousePressed() {
	setup();
}



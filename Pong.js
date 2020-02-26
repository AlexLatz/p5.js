var ballPos, ballVel, score, enemyPos, myPos, myVel;
function setup() {
		ballPos = createVector(250,250);
		ballVel = createVector(0,0);
		score.left = 0;
		score.right = 0;
		enemyPos = createVector(450,250);
		myPos = createVector(25,250);
		myVel = createVector(0,0);
		createCanvas(500,500);
		background(0);
}
function draw() {
		drawSelf();
}
function drawSelf() {
		myPos.add(myVel);
		fill(255);
		rect(myPos.x, myPos.y, 25, 125);
}
function keyPressed() {
		if (keyCode==UP_ARROW) {
				myVel.y += 1;
		} else if (keyCode==DOWN_ARROW) {
				myVel.y -= 1;
		}
}



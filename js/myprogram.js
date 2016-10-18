
// Game Created by: Brenden Villeneuve

// Tutorial Credit: https://developer.mozilla.org/en-US/docs/Games/
//                  Tutorials/2D_Breakout_game_pure_JavaScript
//                  /Paddle_and_keyboard_controls



var canvas = parent.document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


// These are all the variables that are linked with the 
//    ball!
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var dx = 2;
var dy = -2;

// These are all of the variable that are linked with
//    the paddle.
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// Key listeners to move the paddle around
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) 
{
	if (e.keyCode == 39)
	{
		rightPressed = true;
	}
	else if (e.keyCode == 37)
	{
		leftPressed = true;
	}
}

function keyUpHandler(e) 
{
	if (e.keyCode == 39)
	{
		rightPressed = false;
	}
	else if (e.keyCode == 37)
	{
		leftPressed = false;
	}
}

function drawPaddle() 
{
	ctx.beginPath();
	ctx.rect(paddleX, (canvas.height - paddleHeight), paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBall() 
{
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() 
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();

	if ((x > (canvas.width - ballRadius)) || (x < 10))
	{
		dx *= -1;
	}
	if ((y > (canvas.height - ballRadius)) || (y < 10))
	{
		dy *= -1;
	}

	if(rightPressed && (paddleX < (canvas.width-paddleWidth)))
	{
		paddleX += 2;
	}
	else if (leftPressed && paddleX > 0) {
		paddleX -= 2;
	}

	x += dx;
	y += dy;

}
setInterval(draw, 10);

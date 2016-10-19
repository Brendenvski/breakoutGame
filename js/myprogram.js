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
var ballSpeed = 4;
var dy = -3;
var dx = (Math.random() * 6) - 3;
while(dx == 0)
{
	dx = (Math.random() * 6) - 3;
}

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


// All of the vairables used for the bricks and building 
//    the bricks 
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(c=0; c<brickColumnCount; c++) 
{
    bricks[c] = [];
    for(r = 0; r < brickRowCount; r++)
     {
        bricks[c][r] = { x: 0, y: 0 , status: 1};
    }
}

// SCORE
var score = 0;
var winningScore = 300 * brickRowCount * brickColumnCount;

var randomizer = 0;
var ballColour = "#0095DD";

function drawScore()
{
	ctx.font = "20px Algerian";
	ctx.fillStyle = "#0000FF";
	ctx.fillText("Score: " + score, 8 , 20);
}

// WE must draw the bricks onto the screen now: this is 
//    the function that will draw all of the bricks onto
//    the screen.
function drawBricks()
 {
    for(c = 0; c < brickColumnCount; c++) 
    {
        for(r = 0; r < brickRowCount; r++) 
        {
        	if (bricks[c][r].status == 1)
        	{
        		var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        		var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            	bricks[c][r].x = brickX;
            	bricks[c][r].y = brickY;
            	ctx.beginPath();
            	ctx.rect(brickX, brickY, brickWidth, brickHeight);
            	ctx.fillStyle = "#0095DD";
            	ctx.fill();
            	ctx.closePath();	
        	}
        	else if(bricks[c][r].status < 10){
        		var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        		var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            	bricks[c][r].x = brickX;
            	bricks[c][r].y = brickY;
            	ctx.beginPath();
            	ctx.rect(brickX, brickY, brickWidth, brickHeight);
            	ctx.fillStyle = "#FF0000";
            	ctx.fill();
            	ctx.closePath();
            	bricks[c][r].status += 1;
        	}
        }
    }
}

// Collision detection goes on here: 
function detection() 
{
	for(c = 0; c < brickColumnCount; c++) 
    {
        for(r = 0; r < brickRowCount; r++) 
        {
        	var brik = bricks[c][r];
        	if (brik.status == 1)
        	{
        		if(x == brik.x + brickWidth - ballRadius &&
						y > brik.y &&
						y < brik.y + brickHeight)
        		{
        			dx = -dx;
        			brik.status = 2;
        			score+=300;
        			randomizer = 1;
        			if(score == winningScore)
        			{
        				alert("u won");
        				document.location.reload();
        			}
        		}
        		else if(x == brik.x + ballRadius &&
						y > brik.y &&
						y < brik.y + brickHeight)
        		{
        			dx = -dx;
        			brik.status = 2;
        			score+=300;
        			randomizer = 1;
        			if(score == winningScore)
        			{
        				alert("u won");
        				document.location.reload();
        			}
        		}
        		else if(x >= brik.x && 
        			x <= brik.x + brickWidth + ballRadius &&
					y <= brik.y + brickHeight + ballRadius)
        		{
        			dy = -dy;
        			brik.status = 2;
        			score+=300;
        			randomizer = 1;
        			if(score == winningScore)
        			{
        				alert("u won");
        				document.location.reload();
        			}
        		}

        	}

        }
    }
}

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
	if (randomizer == 1)
	{
		var newColour = Math.random() * 100000;
		ballColour = newColour;
		ctx.fillStyle = "#" + newColour;
		ctx.fill();
	}
	else 
	{
		ctx.fillStyle = ballColour;
		ctx.fill();
	}
	ctx.closePath();
}

function draw() 
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	detection();
	drawScore();

	if ((x > (canvas.width - ballRadius)) || (x < 10))
	{
		dx *= -1;
	}
	if (y < 10)
	{
		dy *= -1;
	}
	else if (y > canvas.height - ballRadius - paddleHeight)
	{
		if(x > paddleX && x < paddleX + paddleWidth)
		{
			dy *= -1;
		}
		else 
		{
			alert("GAME OVER");
			document.location.reload();
		}
	}

	if(rightPressed && (paddleX < (canvas.width-paddleWidth)))
	{
		paddleX += 5;
	}
	else if (leftPressed && paddleX > 0) {
		paddleX -= 5;
	}

	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}
draw();

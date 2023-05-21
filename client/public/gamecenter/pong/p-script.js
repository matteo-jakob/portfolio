var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballRadius = 10;
var ballSpeedX = 3;
var ballSpeedY = 3;
var paddleWidth = 20;
var paddleHeight = 150;
var paddle1Y = (canvas.height - paddleHeight) / 2;
var paddle2Y = (canvas.height - paddleHeight) / 2;
var player1Score = 0;
var player2Score = 0;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFA500";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle1() {
  ctx.beginPath();
  ctx.rect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FFA500";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle2() {
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "#FFA500";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FFA500";
  ctx.fillText(player1Score, 8, 20);
  ctx.fillText(player2Score, canvas.width - 85, 20);
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (
    ballY + ballSpeedY > canvas.height - ballRadius ||
    ballY + ballSpeedY < ballRadius
  ) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX + ballSpeedX < paddleWidth + ballRadius) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      if (ballSpeedX < 13) {
        ballSpeedX++;
        ballSpeedY++;
      }
    } else {
      player2Score++;
      resetBall();
    }
  }

  if (ballX + ballSpeedX > canvas.width - paddleWidth - ballRadius) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      if (ballSpeedX < 13) {
        ballSpeedX++;
        ballSpeedY++;
      }
      ballSpeedX = -ballSpeedX;
    } else {
      player1Score++;
      resetBall();
    }
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 3;
  ballSpeedY = 3;
  ballSpeedX = -ballSpeedX;
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 87) {
    paddle1Y -= 60;
  } else if (event.keyCode === 83) {
    paddle1Y += 60;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 38) {
    paddle2Y -= 60;
  } else if (event.keyCode === 40) {
    paddle2Y += 60;
  }
});

function keepPaddlesInCanvas() {
  if (paddle1Y < 0) {
    paddle1Y = 0;
  } else if (paddle1Y + paddleHeight > canvas.height) {
    paddle1Y = canvas.height - paddleHeight;
  }

  if (paddle2Y < 0) {
    paddle2Y = 0;
  } else if (paddle2Y + paddleHeight > canvas.height) {
    paddle2Y = canvas.height - paddleHeight;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle1();
  drawPaddle2();
  drawScore();
  moveBall();
  keepPaddlesInCanvas();
}

setInterval(draw, 10);

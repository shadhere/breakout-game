const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let score = 0;
let timerId;
let xDirection = -2;
let yDirection = 2;

const userStart = [230, 10];
let currentPostion = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),

  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),

  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

function drawUser() {
  user.style.left = currentPostion[0] + "px";
  user.style.bottom = currentPostion[1] + "px";
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

function moveuser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPostion[0] > 0) {
        currentPostion[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPostion[0] < boardWidth - blockWidth) {
        currentPostion[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveuser);

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++)
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "you win";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveuser);
      }
    }
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  if (
    ballCurrentPosition[0] > currentPostion[0] &&
    ballCurrentPosition[0] < currentPostion[0] + blockWidth &&
    ballCurrentPosition[1] > currentPostion[1] &&
    ballCurrentPosition[1] < currentPostion[1] + blockHeight
  ) {
    changeDirection();
  }

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "you lose";
    document.removeEventListener("keydown", moveuser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

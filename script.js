var gameApp = document.querySelector(".game-app"),
    ctx = gameApp.getContext("2d");

var snakeSprite = new Image();
snakeSprite.src = "sprite.png";

var fieldSize = 16,
    fieldWidth = 50,
    fieldHeight = 25,
    textureSize = 16,
    
    portal = true;

var endGame = false;

var snake = {};
    snake.x = fieldSize;
    snake.y = fieldSize;
    snake.direction = "right";
    snake.speed = 160;
    snake.points = 3;
    snake.body = [];
    snake.foods = [];


gameApp.width = fieldWidth * fieldSize;
gameApp.height = fieldHeight * fieldSize;

document.addEventListener("keydown", function(evt) {
  switch (evt.keyCode) {
    case 37:
      if (snake.direction !== "right")
        snake.direction = "left";
    break;
    case 39:
      if (snake.direction !== "left")
        snake.direction = "right";
    break;
    case 38:
      if (snake.direction !== "bottom")
        snake.direction = "top";
    break;
    case 40:
      if (snake.direction !== "top")
        snake.direction = "bottom";
    break;
  }
});

function moveSnake() {
  if (snake.direction == "left") {
      snake.x -= fieldSize;
  }
  if (snake.direction == "right") {
     snake.x += fieldSize;
  }

  if (snake.direction == "top") {
     snake.y -= fieldSize;
  } 
  if (snake.direction == "bottom") {
     snake.y += fieldSize;
  }
  
  if (portal) {
    if (snake.x > gameApp.width - fieldSize) {
      snake.x = 0;
    }
    if (snake.x < 0) {
      snake.x = gameApp.width - fieldSize;
    }
    if (snake.y > gameApp.height - fieldSize) {
      snake.y = 0;
    }
    if (snake.y < 0) {
      snake.y = gameApp.height - fieldSize;
    }
  } else {
    if (snake.x > gameApp.width - fieldSize) {
      snake.x = gameApp.height - fieldSize;
      endGame = true;
    }
    if (snake.x < 0) {
      snake.x = 0;
      endGame = true;
    }
    if (snake.y > gameApp.height - fieldSize) {
      snake.y = gameApp.height - fieldSize;
      endGame = true;
    }
    if (snake.y < 0) {
      snake.y = 0;
      endGame = true;
    }
  }
}

function clearField() {
  ctx.clearRect(0, 0, gameApp.width, gameApp.height);
}

function drawSnakeHead() {
  if (snake.direction == "left") {
   ctx.drawImage(snakeSprite, 0, 0, textureSize, textureSize, snake.x, snake.y, fieldSize, fieldSize);
  }
  if (snake.direction == "right") {
    ctx.drawImage(snakeSprite, 16, 0, textureSize, textureSize, snake.x, snake.y, fieldSize, fieldSize);
  }
  if (snake.direction == "top") {
    ctx.drawImage(snakeSprite, 32, 0, textureSize, textureSize, snake.x, snake.y, fieldSize, fieldSize);
  }
  if (snake.direction == "bottom") {
   ctx.drawImage(snakeSprite, 48, 0, textureSize, textureSize, snake.x, snake.y, fieldSize, fieldSize);
  }
}

function addSnakeBody() {
  for (var i = 0; i < snake.points; i++) {
    snake.body[i] = {
      x: snake.x,
      y: snake.y
    };
  }
}

function moveSnakeBody() {
  for (var i = snake.body.length - 1; i > 0; i--) {
    snake.body[i].x = snake.body[i - 1].x;
    snake.body[i].y = snake.body[i - 1].y;
  }
  snake.body[0].x = snake.x;
  snake.body[0].y = snake.y;
}

function drawSnakeBody() {
  var tail = snake.body.length - 1;
  
  for (var i = 1; i < snake.body.length - 1; i++) {
    if (snake.body[i].x > snake.body[i - 1].x && snake.body[i].y < snake.body[i + 1].y || snake.body[i].x > snake.body[i + 1].x && snake.body[i].y < snake.body[i - 1].y) {
      ctx.drawImage(snakeSprite, 32, 16, textureSize, textureSize, snake.body[i].x, snake.body[i].y, fieldSize, fieldSize);
    } else
    if (snake.body[i].x > snake.body[i - 1].x && snake.body[i].y > snake.body[i + 1].y || snake.body[i].x > snake.body[i + 1].x && snake.body[i].y > snake.body[i - 1].y) {
     ctx.drawImage(snakeSprite, 16, 16, textureSize, textureSize, snake.body[i].x, snake.body[i].y, fieldSize, fieldSize);
    } else
    if (snake.body[i].x < snake.body[i + 1].x && snake.body[i].y > snake.body[i - 1].y || snake.body[i].x < snake.body[i - 1].x && snake.body[i].y > snake.body[i + 1].y) {
      ctx.drawImage(snakeSprite, 48, 16, textureSize, textureSize, snake.body[i].x, snake.body[i].y, fieldSize, fieldSize);
    } else
    if (snake.body[i].x < snake.body[i + 1].x && snake.body[i].y < snake.body[i - 1].y || snake.body[i].x < snake.body[i - 1].x && snake.body[i].y < snake.body[i + 1].y) {
      ctx.drawImage(snakeSprite, 64, 16, textureSize, textureSize, snake.body[i].x, snake.body[i].y, fieldSize, fieldSize);
    } else ctx.drawImage(snakeSprite, 0, 16, textureSize, textureSize, snake.body[i].x, snake.body[i].y, fieldSize, fieldSize);
  }
  
  if (snake.body[tail].x > snake.body[tail - 1].x && snake.body[tail].y == snake.body[tail - 1].y) {
    ctx.drawImage(snakeSprite, 0, 32, textureSize, textureSize, snake.body[tail].x, snake.body[tail].y, fieldSize, fieldSize);
  }
  if (snake.body[tail].x < snake.body[tail - 1].x && snake.body[tail].y == snake.body[tail - 1].y) {
    ctx.drawImage(snakeSprite, 16, 32, textureSize, textureSize, snake.body[tail].x, snake.body[tail].y, fieldSize, fieldSize);
  }
  
  if (snake.body[tail].y > snake.body[tail - 1].y && snake.body[tail].x == snake.body[tail - 1].x) {
    ctx.drawImage(snakeSprite, 32, 32, textureSize, textureSize, snake.body[tail].x, snake.body[tail].y, fieldSize, fieldSize);
  }
  if (snake.body[tail].y < snake.body[tail - 1].y && snake.body[tail].x == snake.body[tail - 1].x) {
    ctx.drawImage(snakeSprite, 48, 32, textureSize, textureSize, snake.body[tail].x, snake.body[tail].y, fieldSize, fieldSize);
  }
}

function checkIn(x, y, array) {
  var flag = false;
  for (var i = 0; i < array.length; i++) {
    if (x == array[i].x && y == array[i].y) {
        flag = true;
    }
  }
  return flag;
}

function checkCrash() {
  for (var i = 1; i < snake.body.length; i++) {
    if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
        return endGame = true;
    }
  }
}

function addFoods(length) {
  for (var i = 0; i < length; i++) {
    var x = Math.floor(Math.random() * fieldWidth) * fieldSize,
        y = Math.floor(Math.random() * fieldHeight) * fieldSize;
    if (!checkIn(x, y, snake.body) && !checkIn(x, y, snake.foods)) {
      snake.foods.push({
        x: x,
        y: y
      });
    } else return addFoods(length);
    
  }
}

function eatFood() {
  var length = snake.body.length - 1;
  
  if (snake.foods.length > 0) {
    
    for (var i = 0; i < snake.foods.length; i++) {
      if (snake.body[0].x == snake.foods[i].x && snake.body[0].y == snake.foods[i].y) {
        
        addFoods(1);
        snake.points++;
      }
      
      if (snake.body[length].x == snake.foods[i].x && snake.body[length].y == snake.foods[i].y) {
        snake.foods.splice(i, 1);
        snake.body.push({
          x: snake.body[length].x,
          y: snake.body[length].y
        });
      }
    }
  }
  
}

function drawFoods() {
  eatFood();
  if (snake.foods.length > 0) {
    for (var i = 0; i < snake.foods.length; i++) {
      if (snake.foods[i].x == snake.body[i].x && snake.foods[i].y == snake.body[i].y) {
        ctx.drawImage(snakeSprite, 0, 16, textureSize, textureSize, snake.foods[i].x, snake.foods[i].y, fieldSize, fieldSize)
      } else ctx.drawImage(snakeSprite, 64, 0, textureSize, textureSize, snake.foods[i].x, snake.foods[i].y, fieldSize, fieldSize);
    }
  }
}

var time = document.querySelector(".game-times"),
    points = document.querySelector(".game-points"),
    restart = document.querySelector(".game-restart");

var timeStart = Date.now();
var timeout;
var myReq;

function newGame() {
  clearTimeout(timeout);
  endGame = false;

  snake.x = fieldSize;
  snake.y = fieldSize;
  snake.derection = "right";
  snake.speed = 160;
  snake.points = 3;
  snake.body = [];
  snake.foods = [];
  
  addFoods(1);
  addSnakeBody();
  
  timeStart = Date.now();
  game();
}

function game() {
  var newTime = new Date()
  time.textContent = Math.trunc((newTime.getTime() - timeStart) / 1000);
  points.textContent = snake.points;
  moveSnake();
  moveSnakeBody();
  
  clearField();
  
  checkCrash();
  drawFoods();
  drawSnakeBody();
  drawSnakeHead();
  
  timeout = setTimeout(function() {
    if (!endGame) {
      game();
    } 
  }, snake.speed);
}

addFoods(1);
addSnakeBody();
game();

restart.addEventListener("click", newGame);

var canvas = document.getElementById("snake");
var context = canvas.getContext("2d");
var game, snake, food;
var headImg = new Image();
var bodyImg = new Image();
var food1Img = new Image();
var food2Img = new Image();
var food3Img = new Image();

headImg.src = 'img/head.png'; 
bodyImg.src = 'img/body.png'; 
food1Img.src = 'img/food1.png'; 
food2Img.src = 'img/food2.png'; 
food3Img.src = 'img/food3.png'; 

var headPat = context.createPattern(headImg, "repeat");
var bodyPat = context.createPattern(bodyImg, "repeat");
var foodPat = new Array;
foodPat[1] = context.createPattern(food1Img, "repeat");
foodPat[2] = context.createPattern(food2Img, "repeat");
foodPat[3]= context.createPattern(food3Img, "repeat");




game = {
  
  score: 0,
  fps: 8,
  over: false,
  message: null,
  
  start: function() {
    game.over = false;
    game.message = null;
    game.score = 0;
    game.fps = 8;
    snake.init();
    food.set();
  },
  
  stop: function() {
    game.over = true;
    game.message = 'GAME OVER - PRESS ENTER';  
  },
  
  drawBox: function(x, y, size, color) {
    //context.fillStyle = color;
    //var img = new Image();
    //img.src = color;
   // console.log(color);
    //fvar pattern = context.createPattern(color, "repeat");
   // context.fillStyle = pattern;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x - (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y - (size / 2));
    context.lineTo(x + (size / 2), y + (size / 2));
    context.lineTo(x - (size / 2), y + (size / 2));
    context.closePath();
    context.fill();
  },
  
  drawScore: function() {
    context.fillStyle = 'rgba(155, 155, 155, 0.3)';  // #999
    context.font = 45 + 'px Impact, sans-serif'; //(canvas.height) + 'px Impact, sans-serif';
    context.textAlign = 'center';
    context.fillText(game.score, 30, 50); //context.fillText(game.score, canvas.width / 2, canvas.height * 0.9);
  },
  
  drawMessage: function() {
    if (game.message !== null) {
      context.fillStyle = '#035489';
      context.strokeStyle = '#ef3e35';
      context.font = (canvas.height / 15) + 'px Impact';
      context.textAlign = 'center';
      context.fillText(game.message, canvas.width / 2, 110);
      context.strokeText(game.message, canvas.width / 2, 110);
    }
  },
  
  resetCanvas: function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  
};
//console.log(bodyPat);
snake = {


  
  size: canvas.width / 40,
  x: null,
  y: null,
  color: bodyPat,
  direction: 'left',
  sections: [],
  
  init: function() {
    snake.sections = [];
    snake.direction = 'left';
    snake.x = canvas.width / 2 + snake.size / 2;
    snake.y = canvas.height / 2 + snake.size / 2;
    for (var i = snake.x + (5 * snake.size); i >= snake.x; i -= snake.size) {
      snake.sections.push(i + ',' + snake.y); 

    }
  },
  
  move: function() {
    switch (snake.direction) {
      case 'up':
        snake.y -= snake.size;
        break;
      case 'down':
        snake.y += snake.size;
        break;
      case 'left':
        snake.x -= snake.size;
        break;
      case 'right':
        snake.x += snake.size;
        break;
    }
    snake.checkCollision();
    snake.checkGrowth();
    snake.sections.push(snake.x + ',' + snake.y);
  },
  
  draw: function() {
    var i;
    for (i = 0; i < snake.sections.length-1; i++) {
      snake.drawSection(snake.sections[i].split(','));
    }    
    snake.drawHead(snake.sections[i].split(','));
  },
  
  drawHead: function(section) {

    game.drawBox(parseInt(section[0]), parseInt(section[1]), snake.size, headPat);
  },
  
  drawSection: function(section) {
    game.drawBox(parseInt(section[0]), parseInt(section[1]), snake.size, bodyPat);
  },
  
  
  checkCollision: function() {
    if (snake.isCollision(snake.x, snake.y) === true) {
      game.stop();
    }
  },
  
  isCollision: function(x, y) {
    if (x < snake.size / 2 ||
        x > canvas.width ||
        y < snake.size / 2 ||
        y > canvas.height ||
        snake.sections.indexOf(x + ',' + y) >= 0) {
      return true;
    }
  },
  
  checkGrowth: function() {
    if (snake.x == food.x && snake.y == food.y) {
      game.score++;
      if (game.score % 5 == 0 && game.fps < 60) {
        game.fps++;
      }
      food.set();
    } else {
      snake.sections.shift();
    }
  }
  
};

food = {
  
  size: null,
  x: null,
  y: null,
  color: foodPat[1],
  
  set: function() {
    food.size = snake.size;
    food.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size / 2;
    food.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size / 2;
    var random = Math.floor((Math.random() * 3) + 1)
    food.color = foodPat[random];
  },
  
  draw: function() {
    game.drawBox(food.x, food.y, food.size, food.color);
  }
  
};

var inverseDirection = {
  'up': 'down',
  'left': 'right',
  'right': 'left',
  'down': 'up'
};

var keys = {
  up: [38, 75, 87],
  down: [40, 74, 83],
  left: [37, 65, 72],
  right: [39, 68, 76],
  start_game: [13, 32]
};

function getKey(value){
  for (var key in keys){
    if (keys[key] instanceof Array && keys[key].indexOf(value) >= 0){
      return key;
    }
  }
  return null;
}

addEventListener("keydown", function (e) {
    var lastKey = getKey(e.keyCode);
    if (['up', 'down', 'left', 'right'].indexOf(lastKey) >= 0
        && lastKey != inverseDirection[snake.direction]) {
      snake.direction = lastKey;
    } else if (['start_game'].indexOf(lastKey) >= 0 && game.over) {
      game.start();
    }
}, false);

var requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;

function loop() {
  if (game.over == false) {
    game.resetCanvas();
    game.drawScore();
    snake.move();
    food.draw();
    snake.draw();
    game.drawMessage();
  }
  setTimeout(function() {
    requestAnimationFrame(loop);
  }, 1000 / game.fps);
}

requestAnimationFrame(loop);
class Apple {
  constructor() {
    this.DOM = document.createElement("div"),
    this.xPos = Math.floor(Math.random() * 20) * 20,
    this.yPos = Math.floor(Math.random() * 20) * 20
  }

  newPos() {
    this.xPos = Math.floor(Math.random() * 20) * 20,
    this.yPos = Math.floor(Math.random() * 20) * 20
  }

  spawn() {
    this.DOM.classList.add("apple");
    this.DOM.style.top = `${this.yPos}px`;
    this.DOM.style.left = `${this.xPos}px`;
    game.DOM.appendChild(this.DOM);
    game.apples.push(this);
  }

  eat(value) {
    this.DOM.remove();
    player.score += value;
    document.querySelector("h1").innerHTML = player.score;
  }
}

class Bonus extends Apple {
  spawn() {
    this.DOM.classList.add("bonus");
    this.DOM.style.top = `${this.yPos}px`;
    this.DOM.style.left = `${this.xPos}px`;
    game.DOM.appendChild(this.DOM);
  }
}



let game = {
  appleValue: 1,
  bonusValue: undefined,
  directions: ["right", "left", "up", "down"],
  speed: 100,
  apples: [],
  DOM: document.querySelector(".game"),
  bonus: undefined,
};

let player = {
  DOM: document.querySelector(".snake"),
  xPos: Math.floor(Math.random() * 20) * 20,
  yPos: Math.floor(Math.random() * 20) * 20,
  canChangeDirection: true,
  score: 0,
  tails: [],
  direction: game.directions[Math.floor(Math.random() * game.directions.length)]
};

function gameLoop() {
  player.canChangeDirection = true
  const luckyNumber = Math.floor(Math.random() * 700);
  if (luckyNumber === Math.floor(Math.random() * 700) && !game.bonus) {
    game.bonus = new Bonus
    game.bonus.spawn()
  }
  const tail = {
    DOM: document.createElement("div"),
    xPos: player.xPos,
    yPos: player.yPos
  };
  tail.DOM.classList.add("tail");
  tail.DOM.style.top = tail.yPos + "px";
  tail.DOM.style.left = tail.xPos + "px";
  game.DOM.appendChild(tail.DOM);
  player.tails.push(tail);
  setTimeout(() => {
    tail.DOM.remove();
    player.tails.splice(0, 1);
  }, game.speed * (player.score + 2));

  if (!game.apples.length) {
    const apple = new Apple
    player.tails.forEach(tail => {
      while (apple.xPos === tail.xPos || apple.yPos === tail.yPos) {
        apple.newPos()
      }
    });
    apple.spawn();
  }

  if (player.canChangeDirection) {
    switch (player.direction) {
      case "left":
        if (player.xPos > 0) {
          player.xPos -= 20;
        } else {
          player.xPos = 380;
        }
        break;
      case "right":
        if (player.xPos < 380) {
          player.xPos += 20;
        } else {
          player.xPos = 0;
        }
        break;
      case "up":
        if (player.yPos > 0) {
          player.yPos -= 20;
        } else {
          player.yPos = 380;
        }
        break;
      case "down":
        if (player.yPos < 380) {
          player.yPos += 20;
        } else {
          player.yPos = 0;
        }
        break;
      default:
        console.log("player.direction should be left, up, down or right");
    }
  }

  player.DOM.style.left = `${player.xPos}px`;
  player.DOM.style.top = `${player.yPos}px`;

  checkCollisions();

  setTimeout(gameLoop, game.speed);
};

function checkCollisions() {
  game.apples.forEach(apple => {
    if (player.xPos === apple.xPos && player.yPos === apple.yPos) {
      apple.eat(game.appleValue);
      game.apples = [];
    }
  });

  if (game.bonus && player.xPos === game.bonus.xPos && player.yPos === game.bonus.yPos) {
    game.bonus.eat(Math.floor(Math.random() * 5 + 5));
    game.bonus = undefined;
  }

  player.tails.forEach(tail => {
    if (tail.xPos === player.xPos && tail.yPos === player.yPos) {
      gameOver();
    }
  });
};

function gameOver() {
  player.tails.forEach(tail => {
    tail.DOM.remove()
  })
  player.score = 0;
  document.querySelector("h1").innerHTML = player.score;
};

function init() {
  window.addEventListener("keydown", event => {
    if (player.canChangeDirection) {
      switch (event.keyCode) {
        case 37:
          if (player.direction !== "right") {
            player.direction = "left";
          }
          break;
        case 38:
          if (player.direction !== "down") {
            player.direction = "up";
          }
          break;
        case 39:
          if (player.direction !== "left") {
            player.direction = "right";
          }
          break;
        case 40:
          if (player.direction !== "up") {
            player.direction = "down";
          }
          break;
      }
      player.canChangeDirection = false
    } else {
      console.log('Player already made a move choice this frame.')
    }
  });
  gameLoop();
};


init();

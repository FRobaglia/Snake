let player = {
  DOM: document.querySelector('.snake'),
  xPos: 0,
  yPos: 0,
  score: 0,
  tails: [],
  direction: 'right',
}

let game = {
  appleTime: 15,
  apples: [],
  DOM: document.querySelector('.game'),
}

let detectKeyPress = () => {
  window.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case 37:
        if (player.direction !== 'right') {
        player.direction = 'left'
        }
      break
      case 38:
        if (player.direction !== 'down') {
          player.direction = 'up'
        }
      break
      case 39:
        if (player.direction !== 'left') {
          player.direction = 'right'
        }
      break
      case 40:
        if (player.direction !== 'up') {
          player.direction = 'down'
        }
      break
      case 32:
        console.log(player.xPos, player.yPos)
    }
  })
}

let gameLoop = () => {
  game.appleTime++
  if (game.appleTime === 20) {
    const apple = {
      DOM: document.createElement('div'),
      xPos: Math.floor(Math.random() * 20) * 20,
      yPos: Math.floor(Math.random() * 20) * 20,
    }
    apple.DOM.classList.add('apple')
    apple.DOM.style.top = `${apple.yPos}px`
    apple.DOM.style.left = `${apple.xPos}px`
    game.DOM.appendChild(apple.DOM)
    game.apples.push(apple)

    console.log(apple.xPos, apple.yPos)

    game.appleTime = 0
  }

  switch (player.direction) {
    case 'left':
      if (player.xPos > 0) {
      player.xPos -= 20
      }
      break
    case 'right': 
    if (player.xPos < 380) {
      player.xPos += 20
      }
      break
    case 'up' :
    if (player.yPos > 0) {
      player.yPos -= 20
      }
      break
    case 'down' :
    if (player.yPos < 380) {
      player.yPos += 20
      }
      break
    default:
      console.log('player.direction should be left, up, down or right')
  }
  player.DOM.style.left = `${player.xPos}px` 
  player.DOM.style.top = `${player.yPos}px`

  game.apples.forEach(apple => {
    if (player.xPos === apple.xPos && player.yPos === apple.yPos) {
      apple.DOM.remove()
      player.score++
      const tail = {
        DOM: document.createElement('div'),
        xPos: player.xPos,
        yPos: player.yPos
      }
      tail.DOM.classList.add('snake')
      tail.style.top = tail.yPos + 'px'
      tail.style.left = tail.xPos + 'px'
      game.DOM.appendChild(tail)
      player.tails.push(tail)
      document.querySelector('h1').innerHTML = player.score
    }
  });

  setTimeout(gameLoop, 100 - player.score);
}

let init = () => {
  detectKeyPress()
  gameLoop()
}

init()

//check le landing du snake a chaque fois et mettre une tail qui se supprimera dans "score" time
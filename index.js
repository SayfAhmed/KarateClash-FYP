const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/stage.png'
})



const player = new Fighter({
  position: {
    x: 224,
    y: 300
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6 
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4
    },
    block: {
      imageSrc: './img/samuraiMack/block.png',
      framesMax: 2
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 15,
      y: 50
    },
    width: 130,
    height: 50
  }
})

const Player2 = new Fighter({
  position: {
    x: 700,
    y: 300
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    block: {
      imageSrc: './img/kenji/block.png',
      framesMax: 2
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: 5,
      y: 50
    }, //The size of the attack boxes
    width: 170,
    height: 50
  }
})

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  s: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  },
}

decreaseTimer()

function animate() {
  
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  //The colouring for the attack boxes
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  Player2.update()

  player.velocity.x = 0
  Player2.velocity.x = 0

  // player movement

  if ((keys.a.pressed && player.lastKey === 'a') && !(player.position.x <= 3)) {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if ((keys.d.pressed && player.lastKey === 'd') && !(player.position.x >= 960)){
    player.velocity.x = 5
    player.switchSprite('run')
  } 
  else if(keys.s.pressed && player.lastKey === 's') {
    player.switchSprite('block')
  }
  else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Player2 movement
  if ((keys.ArrowLeft.pressed && Player2.lastKey === 'ArrowLeft') && !(Player2.position.x <= 3)) {
    Player2.velocity.x = -5
    Player2.switchSprite('run')
  } else if ((keys.ArrowRight.pressed && Player2.lastKey === 'ArrowRight') && !(Player2.position.x >= 940)) {
    Player2.velocity.x = 5
    Player2.switchSprite('run')
  }
  else if(keys.ArrowDown.pressed == true) {
    Player2.switchSprite('block')
  }
   else {
    Player2.switchSprite('idle')
  }

  // jumping
  if (Player2.velocity.y < 0) {
    Player2.switchSprite('jump')
  } else if (Player2.velocity.y > 0) {
    Player2.switchSprite('fall')
  }

  // detect for collision & Player2 gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: Player2
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    Player2.takeHit()
    player.isAttacking = false

    gsap.to('#Player2Health', {
      width: Player2.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if ((
    rectangularCollision({rectangle1: Player2, rectangle2: player}) 
    &&
    Player2.isAttacking 
    &&
    Player2.framesCurrent === 2
    //&& (player.isblocking = false)
  ))
    {
    player.takeHit()
    Player2.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (Player2.isAttacking && Player2.framesCurrent === 2) {
    Player2.isAttacking = false
  }

  // end game based on health
  if (Player2.health <= 0 || player.health <= 0) {
    determineWinner({ player, Player2, timerId })
  }
  window.requestAnimationFrame(animate)
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        if (player.position.y == 330)
        {
        player.velocity.y = -20
        } 
        break
      case 's':
        if ((player.position.y == 330) && (player.velocity.x == 0))
        {
        player.block()
        }
        keys.s.pressed = true
        player.lastKey = 's'
        break
      case 'e':
        player.attack()
        break
    }
  }

  if (!Player2.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        Player2.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        Player2.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        if (Player2.position.y == 330)
        {
        Player2.velocity.y = -20
        } 
        break
      case 'ArrowDown':
        if ((Player2.position.y == 330) && (Player2.velocity.x = 0))
        {
        Player2.block()
        }
        break
      case 'm':
        Player2.attack()
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
  }

  // Player2 keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
      case 'ArrowDown':
      keys.ArrowDown.pressed = false
      break
  }
})

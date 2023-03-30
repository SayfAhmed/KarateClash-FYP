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
  // imageSrc: './img/Sanji/FacingRight/Idle.png',
  // framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    //Facing right
    idle: {
      imageSrc: './img/Sanji/FacingRight/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/Sanji/FacingRight/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/Sanji/FacingRight/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/Sanji/FacingRight/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/Sanji/FacingRight/Attack1.png',
      framesMax: 6 
    },
    takeHit: {
      imageSrc: './img/Sanji/FacingRight/Take Hit Flash.png',
      framesMax: 4
    },
    block: {
      imageSrc: './img/Sanji/FacingRight/block.png',
      framesMax: 2
    },
    death: {
      imageSrc: './img/Sanji/FacingRight/Death.png',
      framesMax: 6
    },

    //Facing Left

    idleL: {
      imageSrc: './img/Sanji/FacingLeft/Idle.png',
      framesMax: 4
    },
    runL: {
      imageSrc: './img/Sanji/FacingLeft/Run.png',
      framesMax: 8
    },
    jumpL: {
      imageSrc: './img/Sanji/FacingLeft/Jump.png',
      framesMax: 2
    },
    fallL: {
      imageSrc: './img/Sanji/FacingLeft/Fall.png',
      framesMax: 2
    },
    attack1L: {
      imageSrc: './img/Sanji/FacingLeft/Attack1.png',
      framesMax: 6 
    },
    takeHitL: {
      imageSrc: './img/Sanji/FacingLeft/Take Hit Flash.png',
      framesMax: 4
    },
    blockL: {
      imageSrc: './img/Sanji/FacingLeft/block.png',
      framesMax: 2
    },
    deathL: {
      imageSrc: './img/Sanji/FacingLeft/Death.png',
      framesMax: 6
    }
  },
  attackBox: {
   //this is how far from the origin the attackbox is drawn
    offset: {
      x: 15,
      y: 50
    },
    width: 120,
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
  imageSrc: './img/Vegeta/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/Vegeta/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/Vegeta/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/Vegeta/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/Vegeta/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/Vegeta/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/Vegeta/Take hit.png',
      framesMax: 3
    },
    block: {
      imageSrc: './img/Vegeta/block.png',
      framesMax: 2
    },
    death: {
      imageSrc: './img/Vegeta/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: 5,
      y: 50
    }, //The size of the attack boxes
    width: 140,
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
  //A light overlay on the screen to make things loot a tiny bit nicer
  c.fillStyle = 'rgba(255, 255, 255, 0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  Player2.update()

  player.velocity.x = 0
  Player2.velocity.x = 0

            // player movement

  if ((keys.a.pressed && player.lastKey === 'a') && !(player.position.x <= 3)) {
    player.velocity.x = -5
    player.switchSprite('runL')
  } else if ((keys.d.pressed && player.lastKey === 'd') && !(player.position.x >= 960)){
    player.velocity.x = 5
    player.switchSprite('run')
  } 
  else if(keys.s.pressed && player.lastKey === 's') {
    player.switchSprite('block')
  }
  else {
    if (player.position.x > Player2.position.x){
    player.switchSprite('idleL')
    }
    else {
    player.switchSprite('idle')
    }
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
  else if(keys.ArrowDown.pressed && Player2.lastKey === 'ArrowDown') {
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

  // this is where player1 gets hit
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
// Player1 keys  
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
        //this if statement is to stop the player from using block in 'unskillful' ways. This makes it so that you must be stationary for block to occur.
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
// Player2 keys
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
        //this if statement is to stop the player from using block in 'unskillful' ways. This makes it so that you must be stationary for block to occur.
        if ((Player2.position.y == 330) && (Player2.velocity.x == 0)) 
        {
        Player2.block()
        }
        keys.ArrowDown.pressed = true
        Player2.lastKey = 'ArrowDown'
        break
      case 'm':
        Player2.attack()
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  // Player keys
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

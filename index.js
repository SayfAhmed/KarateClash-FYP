const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
playMusic()
GameStartQuote()
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

      //Player Sprites
const player = new Fighter({
  position: {
    x: 225,
    y: 330
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/Sanji/FacingRight/Idle.png',
  framesMax: 4,
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
   //this is how far from the origin of the player which the the attackbox's origin is
    offset: {
      x: -50,
      y: 50
    },
    width: 180,
    height: 50
  }
})

      //Player 2 Sprites
const Player2 = new Fighter({
  position: {
    x: 700,
    y: 330
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
  imageSrc: './img/Vegeta/FacingRight/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/Vegeta/FacingRight/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/Vegeta/FacingRight/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/Vegeta/FacingRight/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/Vegeta/FacingRight/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/Vegeta/FacingRight/Attack1.png',
      framesMax: 4
    },
    attack2: {
      imageSrc: './img/Vegeta/FacingRight/Attack2.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/Vegeta/FacingRight/Take hit.png',
      framesMax: 3
    },
    block: {
      imageSrc: './img/Vegeta/FacingRight/block.png',
      framesMax: 2
    },
    death: {
      imageSrc: './img/Vegeta/FacingRight/Death.png',
      framesMax: 7
    },
    idleL: {
      imageSrc: './img/Vegeta/FacingLeft/Idle.png',
      framesMax: 4
    },
    runL: {
      imageSrc: './img/Vegeta/FacingLeft/Run.png',
      framesMax: 8
    },
    jumpL: {
      imageSrc: './img/Vegeta/FacingLeft/Jump.png',
      framesMax: 2
    },
    fallL: {
      imageSrc: './img/Vegeta/FacingLeft/Fall.png',
      framesMax: 2
    },
    attack1L: {
      imageSrc: './img/Vegeta/FacingLeft/Attack1.png',
      framesMax: 4
    },
    attack2L: {
      imageSrc: './img/Vegeta/FacingLeft/Attack2.png',
      framesMax: 4
    },
    takeHitL: {
      imageSrc: './img/Vegeta/FacingLeft/Take hit.png',
      framesMax: 3
    },
    blockL: {
      imageSrc: './img/Vegeta/FacingLeft/block.png',
      framesMax: 2
    },
    deathL: {
      imageSrc: './img/Vegeta/FacingLeft/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -80,
      y: 50
    }, //The size of the attack boxes
    width: 200,
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
  if (
  (keys.a.pressed && player.lastKey === 'a') && !
  (player.position.x <= 3)
  ) 
  {
    player.velocity.x = -5
    player.switchSprite('runL')

  } else if ((keys.d.pressed && player.lastKey === 'd') && !(player.position.x >= 960)){
    player.velocity.x = 5
    player.switchSprite('run')
  } 
  else if(keys.s.pressed && player.lastKey === 's') {
    player.health -= 0.1 //penalty added for blocking too much
        console.log(player.health)
        gsap.to('#playerHealth', {
          width: player.health + '%'
        })
    if(player.position.x > Player2.position.x){
    player.switchSprite('blockL')
    player.isBlocking = true
    }
    else{
      player.switchSprite('block')
      player.isBlocking = true
    }
  }
  else {
    if (player.position.x > Player2.position.x){
    // player.attackBox.width = -120
    // player.attackBox.offset.x = 55
    player.switchSprite('idleL') 
    player.isBlocking = false
    }
    else {
    // player.attackBox.width = 120
    // player.attackBox.offset.x = 15
    player.switchSprite('idle')
    player.isBlocking = false
    }
  }

  // jumping
  if (player.velocity.y < 0) {
    if(player.position.x > Player2.position.x){
      player.switchSprite('jumpL')
    }
    else{
      player.switchSprite('jump')
    }
  } else if (player.velocity.y > 0) {
    if(player.position.x > Player2.position.x){
      player.switchSprite('fallL')
    }
    else{
      player.switchSprite('fall')
    }
  }


            // Player2 movement
  //running
  if ((keys.ArrowLeft.pressed && Player2.lastKey === 'ArrowLeft') && !(Player2.position.x <= 3)) {
    Player2.velocity.x = -5
    Player2.switchSprite('runL')
  } else if ((keys.ArrowRight.pressed && Player2.lastKey === 'ArrowRight') && !(Player2.position.x >= 940)) {
    Player2.velocity.x = 5
    Player2.switchSprite('run')
  }

  //Blocking
  else if(keys.ArrowDown.pressed && Player2.lastKey === 'ArrowDown') {
    Player2.health -= 0.1 //added penalty for blocking too much
        gsap.to('#Player2Health', {
          width: Player2.health + '%'
        })
    if(Player2.position.x > player.position.x){
      Player2.switchSprite('blockL')
      Player2.isBlocking = true
      }
      else{
        Player2.switchSprite('block')
        Player2.isBlocking = true
      }
  }

  //Idle
   else {
    if (player.position.x > Player2.position.x){
      // Player2.attackBox.width = 120
      // Player2.attackBox.offset.x = 25
      Player2.switchSprite('idle')
      Player2.isBlocking = false
    }
    else{
      // Player2.attackBox.width = -130
      // Player2.attackBox.offset.x = 50
      Player2.switchSprite('idleL')
      Player2.isBlocking = false
    }
  }

  // jumping
  if (Player2.velocity.y < 0) {
    if(player.position.x > Player2.position.x){
      Player2.switchSprite('jump')
    }
    else {
      Player2.switchSprite('jumpL')
    }
  } else if (Player2.velocity.y > 0) {
    if(player.position.x > Player2.position.x){
      Player2.switchSprite('fall')
    }
    else {
      Player2.switchSprite('fallL')
    }
  }


  // detect for collision & Player2 gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: Player2
    }) &&
    player.isAttacking &&
    player.framesCurrent === 2 &&
    Player2.isBlocking == false
  ) {
    Player2.takeHitP2()
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
    rectangularCollision({rectangle1: Player2, rectangle2: player}) &&
    Player2.isAttacking  &&
    Player2.framesCurrent === 2 &&
    player.isBlocking == false
  ))
    {
    player.takeHitP1()
    Player2.isAttacking = false
    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player2 misses
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
        player.blockP1()
        
        }
        keys.s.pressed = true
        player.lastKey = 's'
        break
      case 'e':
        player.attack1P1()
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
        Player2.blockP2()
        
        }
        keys.ArrowDown.pressed = true
        Player2.lastKey = 'ArrowDown'
        break
      case 'm':
        Player2.attack1P2()
        break
      case 'n':
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

// window reloading function to restart the game 
function restart(){
  window.location.reload()
  }
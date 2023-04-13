class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 }
  }) {
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.framesMax = framesMax
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.offset = offset
  }

  draw() {
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    )
  }

  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++
      } else {
        this.framesCurrent = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
    
  }
}

class Fighter extends Sprite {
  draw() {
    c.save()
    super.draw()
    // below
    // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height) 
    // c.restore()
    //comment this back in when you want to test hitbox locations ^
  }
  constructor({
    position,
    velocity,
    color = 'red',
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined }
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    })

    this.velocity = velocity
    this.width = 50
    this.height = 150
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
    }
    this.color = color
    this.isAttacking
    this.isBlocking
    this.health = 100
    this.framesCurrent = 0
    this.framesElapsed = 0
    this.framesHold = 5
    this.sprites = sprites
    this.dead = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  update() {
    this.draw()
    if (!this.dead) this.animateFrames()

    // attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // gravity function
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0
      this.position.y = 330
    } else this.velocity.y += gravity
  }

  attack1P1() {
    if(player.position.x > Player2.position.x){
    this.switchSprite('attack1L')
    this.isAttacking = true
    }
    else{
      this.switchSprite('attack1')
      this.isAttacking = true
    }
  }

  
// Player 2's attack functions
  attack1P2() {
    if(player.position.x > Player2.position.x){
    this.switchSprite('attack1')
    this.isAttacking = true
    }
    else{
      this.switchSprite('attack1L')
      this.isAttacking = true
    }
  }

  attack2P2() {
    if(player.position.x > Player2.position.x){
    this.switchSprite('attack2L')
    this.isAttacking = true
    }
    else{
      this.switchSprite('attack2')
      this.isAttacking = true
    }
  }


// Players Blocking
  blockP1() {
    if(player.position.x > Player2.position.x){
      this.switchSprite('blockL')
      this.isBlocking = true
    }
    else {
      this.switchSprite('block')
      this.isBlocking = true
    }
  }

  // Player2's Blocking
  blockP2() {
    if(player.position.x > Player2.position.x){
      this.switchSprite('block')
      this.isBlocking = true
    }
    else {
      this.switchSprite('blockL')
      this.isBlocking = true
    }
  }



  // PLayer taking the hit
  takeHitP1() {
    this.health -= 10  
    // Impact of the hit noise
    var P1Hit = new Audio('Sounds/Misc/hitImpact.ogg');
    P1Hit.volume = 0.5;
    P1Hit.play();
    // Random Hurt noises
    var SanjiHurtSounds = ['Sounds/Sanji/Hurt/Hurt1.ogg', 'Sounds/Sanji/Hurt/Hurt2.ogg', 'Sounds/Sanji/Hurt/Hurt3.ogg'];
    var randomIndex = Math.floor(Math.random() * SanjiHurtSounds.length);
    var randomSoundFile = SanjiHurtSounds[randomIndex];
    var P2Hit = new Audio(randomSoundFile);
    P2Hit.volume = 0.5;
  
    // Currently playing sound + play the random sound
    if (!P2Hit.paused) {
      P2Hit.pause();
      P2Hit.currentTime = 0;
    }
    P2Hit.play();

    if (this.health <= 0) {
      if(Player2.position.x > player.position.x){
        this.switchSprite('death')
      }
      else{
        this.switchSprite('deathL')
      }
    } else {
      if(Player2.position.x > player.position.x){
        this.switchSprite('takeHit')
      }
      else{
        this.switchSprite('takeHitL')
      }
    }
  }

  // PLayer2 taking the hit
  takeHitP2() {
    this.health -= 10;
    // Impact of the hit noise
    var P1Hit = new Audio('Sounds/Misc/hitImpact.ogg');
    P1Hit.volume = 0.5;
    P1Hit.play();
    // Random Hurt noises
    var VegetaHurtSounds = ['Sounds/Vegeta/Hurt/Hurt1.ogg', 'Sounds/Vegeta/Hurt/Hurt2.ogg', 'Sounds/Vegeta/Hurt/Hurt3.ogg'];
    var randomIndex = Math.floor(Math.random() * VegetaHurtSounds.length);
    var randomSoundFile = VegetaHurtSounds[randomIndex];
    var P2Hit = new Audio(randomSoundFile);
    P2Hit.volume = 0.5;
  
    // Currently playing sound + play the random sound
    if (!P2Hit.paused) {
      P2Hit.pause();
      P2Hit.currentTime = 0;
    }
    P2Hit.play();
  
    if (this.health <= 0) {
      if (Player2.position.x > player.position.x) {
        this.switchSprite('deathL');
      } else {
        this.switchSprite('death');
      }
    } else {
      if (Player2.position.x > player.position.x) {
        this.switchSprite('takeHitL');
      } else {
        this.switchSprite('takeHit');
      }
    }
  }

  switchSprite(sprite) {
    if (this.image === this.sprites.deathL.image) {
      if (this.framesCurrent === this.sprites.deathL.framesMax - 1)
        this.dead = true
      return
    }

    // overriding all other animations with the attack animation
    if (this.image === (this.sprites.attack1L.image) && this.framesCurrent < (this.sprites.attack1L.framesMax -1))
        return
      else if(this.image === (this.sprites.attack1.image) && this.framesCurrent < (this.sprites.attack1.framesMax - 1)) 
          return 

    // override when fighter gets hit
    if (this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1)
        return
      else if (this.image === this.sprites.takeHitL.image && this.framesCurrent < this.sprites.takeHitL.framesMax - 1)
          return
                
    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.framesMax = this.sprites.idle.framesMax
          this.framesCurrent = 0
        }
        break
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.framesMax = this.sprites.run.framesMax
          this.framesCurrent = 0
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.framesMax = this.sprites.jump.framesMax
          this.framesCurrent = 0
        }
        break

      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.framesMax = this.sprites.fall.framesMax
          this.framesCurrent = 0
        }
        break

      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.framesMax = this.sprites.attack1.framesMax
          this.framesCurrent = 0
        }
        break

      case 'attack2':
          if (this.image !== this.sprites.attack2.image) {
            this.image = this.sprites.attack2.image
            this.framesMax = this.sprites.attack2.framesMax
            this.framesCurrent = 0
          }
          break

      case 'takeHit':
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image
          this.framesMax = this.sprites.takeHit.framesMax
          this.framesCurrent = 0
        }
        break

        case 'block':
          if (this.image !== this.sprites.block.image) {
            this.image = this.sprites.block.image
            this.framesMax = this.sprites.block.framesMax
            this.framesCurrent = 0
          }
          break

      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.framesMax = this.sprites.death.framesMax
          this.framesCurrent = 0
        }
        break
      
      //Facing Left
      case 'idleL':
        if (this.image !== this.sprites.idleL.image) {
          this.image = this.sprites.idleL.image
          this.framesMax = this.sprites.idleL.framesMax
          this.framesCurrent = 0
        }
        break
      case 'runL':
        if (this.image !== this.sprites.runL.image) {
          this.image = this.sprites.runL.image
          this.framesMax = this.sprites.runL.framesMax
          this.framesCurrent = 0
        }
        break
      case 'jumpL':
        if (this.image !== this.sprites.jumpL.image) {
          this.image = this.sprites.jumpL.image
          this.framesMax = this.sprites.jumpL.framesMax
          this.framesCurrent = 0
        }
        break

      case 'fallL':
        if (this.image !== this.sprites.fallL.image) {
          this.image = this.sprites.fallL.image
          this.framesMax = this.sprites.fallL.framesMax
          this.framesCurrent = 0
        }
        break

      case 'attack1L':
        if (this.image !== this.sprites.attack1L.image) {
          this.image = this.sprites.attack1L.image
          this.framesMax = this.sprites.attack1L.framesMax
          this.framesCurrent = 0
        }
        break
      case 'attack2L':
          if (this.image !== this.sprites.attack2L.image) {
            this.image = this.sprites.attack2L.image
            this.framesMax = this.sprites.attack2L.framesMax
            this.framesCurrent = 0
          }
          break

      case 'takeHitL':
        if (this.image !== this.sprites.takeHitL.image) {
          this.image = this.sprites.takeHitL.image
          this.framesMax = this.sprites.takeHitL.framesMax
          this.framesCurrent = 0
        }
        break

        case 'blockL':
          if (this.image !== this.sprites.blockL.image) {
            this.image = this.sprites.blockL.image
            this.framesMax = this.sprites.blockL.framesMax
            this.framesCurrent = 0
          }
          break

      case 'deathL':
        if (this.image !== this.sprites.deathL.image) {
          this.image = this.sprites.deathL.image
          this.framesMax = this.sprites.deathL.framesMax
          this.framesCurrent = 0
        }
        break
      
    }
  }
}
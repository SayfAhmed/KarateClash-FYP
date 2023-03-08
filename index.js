const canvas = document.querySelector('canvas');
const CanvasConst = canvas.getContext('2d'); 

canvas.width = 1024
canvas.height = 576

CanvasConst.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const Stage = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './images/Stage.png'
})

//Player 1
const player1 = new Players({
    position:{
    x: 50,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
   imageSrc: 'GokuIdle',
   framesMax: 1
    
})

//Player 2
const player2 = new Players({
    position:{
        x: 900,
        y: 0
        },
        velocity: {
            x: 0,
            y: 0
        },
        offset: {
            x: -50,
            y: 0
        },
        colour: 'green'
})


const keys = {
    //Player 1
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },

    //Player 2
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }

}


decreaseTime()

//An infinate loop that makes sure that our animation works frame by frame
function animate(){
    window.requestAnimationFrame(animate)
    CanvasConst.fillStyle = 'Black'
    CanvasConst.fillRect(0, 0, canvas.width, canvas.height)
    Stage.update()
    player1.update()
    player2.update()

    player1.velocity.x = 0 //This makes sure that we are not travelling along the x-axis when a key is not being held
    player2.velocity.x = 0 //This makes sure that we are not travelling along the x-axis when a key is not being held
    
    
    //Player 1 Movement
    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -3.5
    } 
    else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 3.5
    }

    
    //Player 2 Movement
    if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 3.5
    } 
    else if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -3.5
    }
    
    
    //Player 1's Hitbox detection looking for Player2
    if (
        PlayerCollision({
            pc1: player2,
            pc2: player1
        }) &&
        player1.isAttacking
    )   {
        player1.isAttacking = false
        player2.health -= 20
        document.querySelector('#Player2Health').style.width = player2.health + '%'
        console.log('Player 2 has been hit')
    }

    //Player 2's Hitbox detection looking for Player1
    if (
        PlayerCollision({
            pc1: player1,
            pc2: player2
        }) &&
        player2.isAttacking
    )   {
        player2.isAttacking = false
        player1.health -= 20
        document.querySelector('#Player1Health').style.width = player1.health + '%'
        console.log('Player 1 has been hit')
    }

    //End Game based on health
    if (player2.health <= 0 || player1.health <= 0){
        WinDecider({player1, player2, timerID})
    }
}

animate()


//event listeners
window.addEventListener('keydown', (event) => {
    switch (event.key){
//Player 1
        case 'd':
            keys.d.pressed = true
            player1.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player1.lastKey = 'a'
            break
        case 'w':
            player1.velocity.y = -17
            break
        case 'r':
            player1.attack()
            break
        
    //Player 2
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            player2.velocity.y = -17
            break
        case 'm':
            player2.attack()
            break
    }

})
window.addEventListener('keyup', (event) => {
    switch (event.key){
    //Player 1 Keys
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

    //Player 2 Keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }

})
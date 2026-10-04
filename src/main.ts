//
import './style.css'
import {Player} from './game/Player'
import {Obstacle} from './game/Obstacle'
import {checkCollision} from './game/collision'
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
    <h1> TS Runner </h1>
    <canvas id="game"></canvas>
`
const canvas = document.querySelector<HTMLCanvasElement>('#game')!
canvas.width = 800
canvas.height = 300
const ctx = canvas.getContext('2d')
// defensive coding for catching a possible failure to retrieve the API object.
if (!ctx) {
    throw new Error('Could not initialize 2D canvas context')
}

const context: CanvasRenderingContext2D = ctx
ctx.fillStyle = '#222'
// player object
const player = new Player()
// obstacle object 
const obstacle = new Obstacle()


// How to train your jump, Event listener that adds negative velocity so that the player object jumps.
const jumpVelocity = -600
window.addEventListener('keydown', (event) => {
    const jumpPressed = event.code === 'Space' || event.code === 'ArrowUp'
    if (gameOver && event.code === 'Space') {
        resetGame()
    }
    else if (jumpPressed) {
        player.jump(jumpVelocity)
    }
})
// Reset Function
function resetGame() {
    gameOver = false
    score = 0
    player.x = 50
    player.y = canvas.height - player.height
    player.velocityY = 0
    player.isGrounded = true
    obstacle.x = canvas.width
    obstacleSpeed = 300
}
// The function used to remove and draw the player object.
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#222'

    context.fillRect(
        player.x,
        player.y,
        player.width,
        player.height,
    )

    context.fillRect(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height,
    )

    context.font = '20px sans-serif'
    context.textAlign = 'left'
    context.fillText(`Score: ${score}`, 20, 20)

    if (gameOver) {
        context.font = '32px sans-serif'
        context.textAlign = 'center'
        context.fillText(
            'GAME OVER',
            canvas.width / 2,
            canvas.height / 2
        )
    }
}
// 1500 pixels / second² for grav.
const gravity = 1500
let obstacleSpeed = 300
// The function that controls the speed for the player/obstacle object by accounting for however much real time passes between frames (deltaTime -> real time seconds),
function update(deltaTime: number) {
    const groundY = canvas.height - player.height
    player.update(deltaTime, gravity, groundY)
    obstacle.update(deltaTime, obstacleSpeed)

    if (obstacle.x + obstacle.width <= 0) {
        obstacle.x = canvas.width
        score += 1
        obstacleSpeed += 15
    }

    if (checkCollision(player, obstacle)) {
        gameOver = true
    }
}
// GAME VARIABLES
let gameOver = false
let score = 0
// Used in game loop to find how many miliseconds have passed.
let previousTime = 0
// The function that handles the animation loop of the game.
function gameLoop(currentTime: number) {
    const deltaTime = (currentTime - previousTime) / 1000
    previousTime = currentTime

    if (!gameOver) {
        update(deltaTime)
    }

    render()
    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
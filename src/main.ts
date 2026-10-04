//
import './style.css'
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

// player object and its' properties
ctx.fillStyle = '#222'
const player = {
    x: 50,
    y: 200,
    width: 40,
    height: 50,
    velocityY: 0,
    isGrounded: false,
}

// How to train your jump, Event listener that adds negative velocity so that the player object jumps.
const jumpVelocity = -600
window.addEventListener('keydown', (event) => {
    const jumpPressed = event.code === 'Space' || event.code === 'ArrowUp'
    if ( jumpPressed && player.isGrounded) {
        player.velocityY = jumpVelocity
        player.isGrounded= false
    }
})

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
}
// 1500 pixels / second² for grav.
const gravity = 1500
// The function that controls the speed of falling for the player object by accounting for however much real time passes between frames (deltaTime -> real time seconds),
function update(deltaTime: number) {
    player.velocityY += gravity * deltaTime
    player.y += player.velocityY * deltaTime

    const groundY = canvas.height - player.height
    if (player.y >= groundY) {
        player.y = groundY
        player.velocityY = 0
        player.isGrounded = true
    } else {
        player.isGrounded = false
    }
}

// Used in game loop to find how many miliseconds have passed.
let previousTime = 0
// The function that handles the animation loop of the game.
function gameLoop(currentTime: number) {
    const deltaTime = (currentTime - previousTime) / 1000
    previousTime = currentTime

    update(deltaTime)
    render()

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
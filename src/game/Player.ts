export class Player{
    x: number
    y: number
    width: number
    height: number
    velocityY: number
    isGrounded: boolean

    constructor(){
        this.x = 50
        this.y = 200
        this.width = 40
        this.height = 50
        this.velocityY= 0
        this.isGrounded = false
    }

    // jump behaviour
    jump(jumpVelocity: number){
        if (!this.isGrounded){
            return
        }

        this.velocityY = jumpVelocity
        this.isGrounded = false
    }

    // physics behaviour
    update(deltaTime: number, gravity: number, groundY: number){
        this.velocityY += gravity * deltaTime
        this.y += this.velocityY * deltaTime

        if (this.y >= groundY){
            this.y = groundY
            this.velocityY = 0
            this.isGrounded = true
        } else{
            this.isGrounded = false
        }
    }
}
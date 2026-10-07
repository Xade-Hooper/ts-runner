export class Obstacle{
    x: number
    y: number
    width: number
    height: number

    constructor(groundY: number){
        this.width = 50
        this.height = 70 
        this.x = 600
        this.y = groundY - this.height
    }

    //physics behaviour
    update(deltaTime: number, speed: number){
        this.x -= speed * deltaTime
    }
}
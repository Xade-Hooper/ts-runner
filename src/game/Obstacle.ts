export class Obstacle{
    x: number
    y: number
    width: number
    height: number

    constructor(){
        this.x = 600
        this.y = 200
        this.width = 50
        this.height = 100
    }

    //physics behaviour
    update(deltaTime: number, speed: number){
        this.x -= speed * deltaTime
    }
}
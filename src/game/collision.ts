export interface Rectangle{
    x: number
    y: number
    width: number
    height: number
}
export function checkCollision(a: Rectangle, b: Rectangle){
    const isSeparated =
    /*left*/ a.x + a.width <= b.x ||
    /*right*/a.x >= b.x + b.width ||
    /*above*/a.y + a.height <= b.y ||
    /*below*/a.y >= b.y + b.height
    return !isSeparated
}
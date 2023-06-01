// Loads the image and draws the sprite onto canvas
class CollisionBlock {
    constructor({position}) {
        this.position = position
        this.width = 16
        this.height = 16
    }
    // method to draw sprites onto canvas
    draw () {
        //determine color and opacity of the fill-style (R, G, B, Opacity) (0-255)
        context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        context.fillRect (this.position.x, this.position.y, this.width, this.height)
    }
    // This will call the draw method and redraw the sprite on the canvas.
    update () {
        this.draw()
    }
}
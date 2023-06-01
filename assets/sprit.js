// Loads the image and draws the sprite onto canvas
class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }
    // method to draw sprites onto canvas
    draw () {
        if (!this.image) return
        context.drawImage(this.image, this.position.x, this.position.y)
    }
    // This will call the draw method and redraw the sprite on the canvas.
    update () {
        this.draw()
    }
}
// Loads the image and draws the sprite onto canvas
class Sprite {
    constructor({ position, imageSrc, scale = 1}) {
        this.position = position
        this.scale = scale
        this.image = new Image()
        this.image.onload = () => {
            this.width = this.image.width * this.scale
            this.height = this.image.height * this.scale
        }
        this.image.src = imageSrc
    }
    // method to draw sprites onto canvas
    draw() {
        if (!this.image) return

        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )
    }
    // This will call the draw method and redraw the sprite on the canvas.
    update() {
        this.draw()
    }
}
// Loads the image and draws the sprite onto canvas
class CollisionBlock {
    constructor({position }) {
        
        this.position = position
        this.width = 16
        this.height = 16

        this.image = new Image ();
        this.image.src = './assets/images/game_background_1/layers/platform1.png'
    }
    // method to draw sprites onto canvas
    draw () {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    // This will call the draw method and redraw the sprite on the canvas.
    update () {
        this.draw()
    }
}
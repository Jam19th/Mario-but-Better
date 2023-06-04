// Loads the image and draws the sprite onto canvas
class CollisionBlock {
    constructor({ position, width = 64, height = 32 }) {

        this.position = position
        this.width = width
        this.height = height

        this.image = new Image();
        this.image.onload = () => {
            // Call the update method to redraw the canvas when the image has finished loading
            this.update();
        };
        this.image.src = './assets/images/game_background_1/layers/platform1.png'
    }
    // method to draw sprites onto canvas
    draw() {

        // Calculate the scaling factor
        // const scale = {
        //     x: canvas.width / (5760 / this.width), 
        //     y: canvas.height / (1080 / this.height),
        // };

        // context.fillStyle = 'rgba(255, 0, 0, 0.5)'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.drawImage(
            this.image,
            this.position.x,
            // this.position.x * scale.x,
            this.position.y,
            // this.position.y * scale.y,
            this.width,
            this.height
        );
    }
    // This will call the draw method and redraw the sprite on the canvas.
    update() {
        this.draw()
    }
}

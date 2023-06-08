class Block {
    constructor({ position, width = 64, height = 32, imagePath }) {
        this.position = position;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.onload = () => {
            // Call the update method to redraw the canvas when the image has finished loading
            this.update();
        };
        this.image.src = imagePath;
    }

    // method to draw sprites onto canvas
    draw() {
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    // This will call the draw method and redraw the sprite on the canvas.
    update() {
        this.draw();
    }
}

// Child class for PlatformBlock
class PlatformBlock extends Block {
    constructor({ position, width, height }) {
        super({ position, width, height, imagePath: './assets/images/game_background_1/layers/platform1.png' });
    }
}

// Child class for DeathBlock
class DeathBlock extends Block {
    constructor({ position, width, height }) {
        super({ position, width, height, imagePath: './assets/images/game_background_1/layers/platform5.png' });
    }
}

// Child class for WinBlock
class WinBlock extends Block {
    constructor({ position, width, height }) {
        super({ position, width, height, imagePath: './assets/images/game_background_1/layers/5.png' });
    }
}

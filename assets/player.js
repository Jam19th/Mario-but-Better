// Creates the player object and defines the properties of their positions
class playerCharacter extends Sprite {
    //creates a new player object and defines the initial position through an argument provided but the const player variable
    constructor({
        position,
        collisionBlocks,
        imageSrc,
        scale = 1,
        animations,
    }) {
        super({ imageSrc, scale });
        this.position = position;
        //Makes the velocity increase overtime
        this.velocity = {
            x: 0,
            y: 1,
        };
        //
        this.collisionBlocks = collisionBlocks;

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 10,
            height: 10,
        };

        //
        this.animations = animations;
        //loops through the different animations of the player
        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;

            //associates an image with an action
            this.animations[key].image = image;
        }

        //constructs the camerabox object
        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 200,
            height: 80,
        }
    }

    //switches sprite gif
    switchSprite(key) {
        if (this.image === this.animations[key] || !this.loaded) return;

        this.currentFrame = 0
        this.image = this.animations[key].image;
    }

    //updates camerabox to stay on the player
    updateCameraBox() {
        this.camerabox = {
            position: {
                // positions camerabox on player
                x: this.position.x - 130,
                y: this.position.y - 40,
            },
            //size of the camera box
            width: 325,
            height: 150,
        }
    }

    checkForHorizontalCanvasCollisions() {
        if (this.hitbox.position.x + this.hitbox.width >= this.velocity.x && this.velocity.x >= 5759 ||
            this.hitbox.position.x + this.velocity.x <= 0
        ) {
            this.velocity.x = 0
        }
    }

    //moves camera to the right
    shouldPanCameraToTheLeft({ canvas, camera }) {
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
        const scaledDownCanvasWidth = canvas.width

        if (cameraboxRightSide >= 5760) return
        if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
    }

    //moves camera to the left
    shouldPanCameraToTheRight({ camera }) {
        if (this.camerabox.position.x <= 0) return

        if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x
        }
    }

    //moves camera up
    shouldPanCameraDown({ camera }) {
        if (this.camerabox.position.y + this.velocity.y <= 0) return

        if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y
        }
    }

    //moves camera down
    shouldPanCameraUp({ canvas, camera }) {
        if (this.camerabox.position.y + this.camerabox.height + this.velocity.y >= 1080) return

        const scaledDownCanvasHeight = canvas.height

        if (this.camerabox.position.y + this.camerabox.height >=
            Math.abs(camera.position.y) + scaledDownCanvasHeight) {
            camera.position.y -= this.velocity.y
        }
    }

    //Changes coordinates of the player object
    update() {
        //
        this.updateHitBox();

        this.updateCameraBox();

        context.fillStyle = 'rgba(0, 0, 255, .1)'
        context.fillRect(
            this.camerabox.position.x,
            this.camerabox.position.y,
            this.camerabox.width,
            this.camerabox.height)

        // draws rectangles on the player sprite 
        context.fillStyle = 'rgba(0, 255, 0, 0.1)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        //draws rectangles on the player hit box
        context.fillStyle = 'rgba(255, 0, 0, 0.5)'
        context.fillRect(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.width,
            this.hitbox.height)

        this.draw();

        // passes in the velocity parameter and strength of gravity
        this.position.x += this.velocity.x;

        this.updateHitBox();

        //
        this.checkForHorizontalCollisions();

        //
        this.applyGravity();

        this.updateHitBox();

        //
        this.checkForVerticalCollisions();
    }

    //update hitbox position and size
    updateHitBox() {
        this.hitbox = {
            position: {
                // position of the hitbox
                x: this.position.x + 45,
                y: this.position.y + 40,
            },
            // size of the hitbox
            width: 20,
            height: 40,
        };
    }

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (collision({
                object1: this.hitbox,
                object2: collisionBlock,
            })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0

                    // offsets the image by the hit box rather then the image size
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width

                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0

                    // offsets the image by the hit box rather then the image size
                    const offset = this.hitbox.position.x - this.position.x

                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break;
                }
            }
        }
    }


    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
        //Determines if the player position is hitting the bottom of canvas
    }

    checkForVerticalCollisions() {
        for (var i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision({
                object1: this.hitbox,
                object2: collisionBlock,
            })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    // offsets the image by the hit box rather then the image size
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }
}

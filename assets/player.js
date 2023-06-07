// Creates the player object and defines the properties of their positions
class playerCharacter extends Sprite {
    //creates a new player object and defines the initial position through an argument provided but the const player variable
    constructor({
        position,
        collisionBlocks,
        deathCollisionBlocks,
        winCollisionBlocks,
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

        this.position = position;
        this.initialPosition = { ...position };

        //passes the collision blocks
        this.collisionBlocks = collisionBlocks;
        this.deathCollisionBlocks = deathCollisionBlocks;
        this.winCollisionBlocks = winCollisionBlocks;

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
                x: 0,
                y: 0,
            },
            width: cameraWidth,
            height: cameraHeight,
        }
    }

    resetPosition() {
        this.position.x = this.initialPosition.x;
        this.position.y = this.initialPosition.y;
    }

    //switches sprite gif
    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return;

        this.currentFrame = 0
        this.image = this.animations[key].image;
    }

    //updates camerabox to stay on the player
    updateCameraBox() {
        this.camerabox = {
            position: {
                // positions camerabox on the player position
                x: this.position.x - canvas.width / 2 + this.width / 2,
                y: this.position.y - canvas.height / 2 + this.height / 2,
            },
            //size of the camera box
            width: canvas.width,
            height: canvas.height,
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
        const playerCenterX = this.hitbox.position.x + this.hitbox.width / 2;
        const cameraLeftBoundary = camera.position.x + canvas.width * 0.2;
        const cameraRightBoundary = camera.position.x + canvas.width * 0.8;

        if (playerCenterX < cameraLeftBoundary) {
            const distance = cameraLeftBoundary - playerCenterX;
            camera.position.x -= distance;
        } else if (playerCenterX > cameraRightBoundary) {
            const distance = playerCenterX - cameraRightBoundary;
            camera.position.x += distance;
        }


        // const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width

        // if (cameraboxRightSide >= 5760) return
        // if (cameraboxRightSide >= canvas.width + Math.abs(camera.position.x)) {
        //     camera.position.x -= this.velocity.x
        //     // Adjust the position of the camera box to stay centered on the hitbox
        //     this.camerabox.position.x -= this.velocity.x;
        // }
    }

    //moves camera to the left
    shouldPanCameraToTheRight({ canvas, camera }) {
        const playerCenterX = this.hitbox.position.x + this.hitbox.width / 2;
        const cameraLeftBoundary = camera.position.x + canvas.width * 0.2;
        const cameraRightBoundary = camera.position.x + canvas.width * 0.8;

        if (playerCenterX < cameraLeftBoundary) {
            const distance = cameraLeftBoundary - playerCenterX;
            camera.position.x -= distance;
        } else if (playerCenterX > cameraRightBoundary) {
            const distance = playerCenterX - cameraRightBoundary;
            camera.position.x += distance;
        }


        // if (this.camerabox.position.x <= 0) return

        // if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
        //     camera.position.x -= this.velocity.x;
        //     // Adjust the position of the camera box to stay centered on the hitbox
        //     this.camerabox.position.x -= this.velocity.x;
        // }
    }

    //moves camera up
    // shouldPanCameraDown({ canvas, camera }) {
    //     const playerCenterY = this.hitbox.position.y + this.hitbox.height / 2;
    //     const cameraTopBoundary = camera.position.y + canvas.height * 0.2;
    //     const cameraBottomBoundary = camera.position.y + canvas.height * 0.8;

    //     if (playerCenterY < cameraTopBoundary) {
    //         const distance = cameraTopBoundary - playerCenterY;
    //         camera.position.y -= distance;
    //     } else if (playerCenterY > cameraBottomBoundary) {
    //         const distance = playerCenterY - cameraBottomBoundary;
    //         camera.position.y += distance;
    //     }


    //     // if (this.camerabox.position.y + this.velocity.y <= 0) return

    //     // if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
    //     //     camera.position.y -= this.velocity.y
    //     //     // Adjust the position of the camera box to stay centered on the hitbox
    //     //     this.camerabox.position.y -= this.velocity.y;
    //     // }
    // }

    //moves camera down
    // shouldPanCameraUp({ canvas, camera }) {
    //     const playerCenterY = this.hitbox.position.y + this.hitbox.height / 2;
    //     const cameraTopBoundary = camera.position.y + canvas.height * 0.2;
    //     const cameraBottomBoundary = camera.position.y + canvas.height * 0.8;

    //     if (playerCenterY < cameraTopBoundary) {
    //         const distance = cameraTopBoundary - playerCenterY;
    //         camera.position.y -= distance;
    //     } else if (playerCenterY > cameraBottomBoundary) {
    //         const distance = playerCenterY - cameraBottomBoundary;
    //         camera.position.y += distance;
    //     }


    //     // if (this.camerabox.position.y + this.camerabox.height + this.velocity.y >= 1080) return

    //     // if (this.camerabox.position.y + this.camerabox.height >=
    //     //     Math.abs(camera.position.y) + canvas.height) {
    //     //     camera.position.y -= this.velocity.y
    //     //     // Adjust the position of the camera box to stay centered on the hitbox
    //     //     this.camerabox.position.y -= this.velocity.y;
    //     // }
    // }

    //Changes coordinates of the player object
    update() {
        //passes in the hitbox before the camerabox
        this.updateHitBox();
        //passes ing the camerabox
        this.updateCameraBox();

        //draws rectangles on the camera box
        context.fillStyle = 'rgba(0, 0, 255, .1)'
        context.fillRect(
            this.camerabox.position.x,
            this.camerabox.position.y,
            this.camerabox.width,
            this.camerabox.height)
        // draws rectangles on the player sprite 
        context.fillStyle = 'rgba(0, 255, 0, 0.5)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        //draws rectangles on the player hit box
        context.fillStyle = 'rgba(255, 0, 0, 0.5)'
        context.fillRect(
            this.hitbox.position.x,
            this.hitbox.position.y,
            this.hitbox.width,
            this.hitbox.height)

        //passes in draw from the sprite class
        this.draw();
        // passes in the velocity parameter and strength of gravity
        this.position.x += this.velocity.x;
        //passes in the hitbox before horizontal collisions
        this.updateHitBox();
        //passes in horizontal collisions
        this.checkForHorizontalCollisions();
        //passes in gravity
        this.applyGravity();
        //passes in the hitbox before Vertical collisions
        this.updateHitBox();
        //passes in horizontal collisions
        this.checkForVerticalCollisions();

        // passes in camera panning methods
        this.shouldPanCameraToTheLeft({ canvas, camera });
        this.shouldPanCameraToTheRight({ canvas, camera });
        // this.shouldPanCameraDown({ canvas, camera });
        // this.shouldPanCameraUp({ canvas, camera });
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

    // checks for collision with platforms and death blocks and win blocks
    checkForHorizontalCollisions() {
        //collision with platforms
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

        //collision for death blocks
        for (let i = 0; i < this.deathCollisionBlocks.length; i++) {
            const deathCollisionBlocks = this.deathCollisionBlocks[i]

            if (collision({
                object1: this.hitbox,
                object2: deathCollisionBlocks,
            })) {

                this.deathAction()
                break
            }
        }

        //collision for win blocks
        for (let i = 0; i < this.winCollisionBlocks.length; i++) {
            const winCollisionBlocks = this.winCollisionBlocks[i]

            if (collision({
                object1: this.hitbox,
                object2: winCollisionBlocks,
            })) {

                this.winAction()
                break
            }
        }
    }

    deathAction() {
        // Get the modal element
        const modal = document.getElementById("deathModal");

        // Get the close button inside the modal
        const closeButton = modal.querySelector(".close");

        const audioElement = document.getElementById('deathAudio');
        audioElement.volume = 0.2;
        audioElement.play();


        // Display the modal
        modal.style.display = "block";

        // Reload the page after clicking the close button
        closeButton.addEventListener("click", () => {
            location.reload();
        });

        // Reload the page after clicking outside the modal
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                location.reload();
            }
        });

        // Reset player position (optional)
        this.resetPosition();
    }

    winAction() {
        // Get the modal element
        const modal = document.getElementById("winModal");

        // Get the close button inside the modal
        const closeButton = modal.querySelector(".close");

        const audioElement = document.getElementById('winAudio');
        audioElement.volume = 0.2;
        audioElement.play();

        // Display the modal
        modal.style.display = "block";

        // Reload the page after clicking the close button
        closeButton.addEventListener("click", () => {
            location.reload();
        });

        // Reload the page after clicking outside the modal
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                location.reload();
            }
        });

        // Reset player position (optional)
        this.resetPosition();
    }

    applyGravity() {
        //Determines if the player position is hitting the bottom of canvas
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision({
                object1: this.hitbox,
                object2: collisionBlock,
            })) {
                if (this.velocity.y > 0) {
                    // Check if the player is moving downward (jumping)
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

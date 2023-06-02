// Creates the player object and defines the properties of their positions
class playerCharacter extends Sprite {
    //creates a new player object and defines the initial position through an argument provided but the const player variable
    constructor({ position, collisionBlocks, imageSrc, scale = 0.5}) {
        super({imageSrc, scale})
        this.position = position;
        //Makes the velocity increase overtime
        this.velocity = {
            x: 0,
            y: 1,
        }
        //
        this.collisionBlocks = collisionBlocks
    }
    //Changes coordinates of the player object
    update() {
        context.fillStyle = 'rgba(0, 255, 0, 0.1)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.draw()

        // passes in the velocity parameter and strength of gravity 
        this.position.x += this.velocity.x

        //
        this.checkForHorizontalCollisions()

        //
        this.applyGravity()

        //
        this.checkForVerticalCollisions()
    }

    checkForHorizontalCollisions() {
        for (var i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    break
                }

                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x + collisionBlock.width - 0.01
                    break
                }

                console.log('We are colliding')
            }
        }
    }

    applyGravity() {
        this.position.y += this.velocity.y
        //Determines if the player position is hitting the bottom of canvas
        this.velocity.y += gravity
    }

    checkForVerticalCollisions() {
        for (var i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            if (
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    break
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height - 0.01
                    break
                }

                console.log('We are colliding')
            }
        }
    }
}

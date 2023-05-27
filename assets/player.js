// Creates the player object and defines the properties of their positions
class playerCharacter {
    //creates a new player object and defines the initial position through an argument provided but the const player variable
    constructor(position) {
        this.position = position;
        //Makes the velocity increase overtime
        this.velocity = {
            x: 0,
            y: 1,
        }

        //determines the height of the player
        this.height = 100;
    }
    //Create the player object
    draw() {
        context.fillStyle = 'red';

        //(starting x position, starting y position , width, height)
        context.fillRect(this.position.x, this.position.y, 100, this.height)
    }
    //Changes coordinates of the player object
    update() {
        this.draw()

        // passes in the velocity parameter and strength of gravity 
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //Determines if the player position is hitting the bottom of canvas
        if (this.position.y + this.height + this.velocity.y < canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

const player = new playerCharacter({
    x: 0,
    y: 0,
})

const player2 = new playerCharacter({
    x: 300,
    y: 100,
})
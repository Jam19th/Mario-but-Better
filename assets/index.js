// creates a new canvas and determines the API version
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//determines canvas size 
canvas.width = 1270
canvas.height = 610


const platformCollisions2D = []
for (let i=0; i< platformCollisions.length; i += 36) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

console.log(platformCollisions2D)

//variable to determine strength of gravity
const gravity = .5

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

// loads background sprite
const background = new Sprite({
    position: {
        x: 0, 
        y: 0
    },
    imageSrc: './assets/images/game_background_1/game_background_1.png'
});

// Fills shapes with a color
context.fillStyle = '#FFFFFF';

//creates a rectangle and determines the size of it(starting x position, starting y position , width, height)
context.fillRect(5, 5, canvas.width, canvas.height)

// Creates a variable and assigns properties to the movement codes
const codes = {
    arrowRight: {
        pressed: false,
    },
    arrowLeft: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
}

// Animates the playerCharacter to fall down the screen
function animatePlayer() {
    //Update the position of a player character on the screen, before the next repaint of the webpage
    window.requestAnimationFrame(animatePlayer);

    // Fills shapes with a color
    context.fillStyle = '#FFFFFF';

    //creates a rectangle and determines the size of it(starting x position, starting y position , width, height)
    context.fillRect(0, 0, canvas.width, canvas.height)

    // save and restore prevents the code from refreshing forever 
    context.save();
    context.translate(0, -background.image.height + canvas.height);
    //Puts the background images onto canvas
    background.update()
    context.restore();

    //Calls the draw and update function to o draw the player character and update the position of the player character
    player.update()
    player2.update()

    // Sets and updates players position on the x coordinates if key is pressed. Change the value to change the speed of the player character
    player.velocity.x = 0
    if (codes.arrowRight.pressed) player.velocity.x = 3
    else if (codes.arrowLeft.pressed) player.velocity.x = -3
}
animatePlayer();

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowRight':
            codes.arrowRight.pressed = true;
            break
        case 'ArrowLeft':
            codes.arrowLeft.pressed = true;
            break
        // change the value to change the height jump
        case 'Space':
            player.velocity.y = -15;
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'ArrowRight':
            codes.arrowRight.pressed = false;
            break
        case 'ArrowLeft':
            codes.arrowLeft.pressed = false;
            break
    }
})
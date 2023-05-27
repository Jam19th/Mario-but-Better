// creates a new canvas and determines the API version
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//determines canvas size 
canvas.width = 1024
canvas.height = 576

//variable to determine strength of gravity
const gravity = .5

// Fills shapes with a color
context.fillStyle = '#FFFFFF';

//creates a rectangle and determines the size of it(starting x position, starting y position , width, height)
context.fillRect(5, 5, canvas.width, canvas.height)

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
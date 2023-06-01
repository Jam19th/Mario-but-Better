// creates a new canvas and determines the API version
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//determines canvas size 
canvas.width = 1270
canvas.height = 610

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

//Parent array
const platformCollisions2D = []
//loops through array for all platforms
for (let i = 0; i < platformCollisions.length; i += 36) {
    //pushes in new sub-array
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

//stores all or the collision arrays
const platformCollisionBlocks = []
//
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 2121) {
            //pushes in a new collision block
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                })
            )
        }
    })
})


//variable to determine strength of gravity
const gravity = .5

const player = new playerCharacter({
    position: {
    x: 100,
    y: 0,
    },
    collisionBlocks: platformCollisionBlocks,
})

// loads background sprite
const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/images/game_background_1/game_background_1.png'
});

// Fills shapes with a color
context.fillStyle = '#FFFFFF';

//creates a rectangle and determines the size of it(starting x position, starting y position , width, height)
context.fillRect(5, 5, canvas.width, canvas.height)

// Creates a codes variable and assigns properties to the movement codes
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
    background.update();
    context.restore();

    context.save();
    context.scale(4, 4)
    // context.translate(0, -background.image.height + canvas.height);
    //
    platformCollisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update()
    });

    //Calls the draw and update function to o draw the player character and update the position of the player character
    player.update()

    // Sets and updates players position on the x coordinates if key is pressed. Change the value to change the speed of the player character
    player.velocity.x = 0
    if (codes.arrowRight.pressed) player.velocity.x = 3
    else if (codes.arrowLeft.pressed) player.velocity.x = -3

    context.restore();


    
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
            player.velocity.y = -10;
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
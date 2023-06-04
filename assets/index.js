// creates a new canvas and determines the API version
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//determines canvas size 
canvas.width = 1910
canvas.height = 915

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
const gravity = .2

const player = new playerCharacter({
    //starting position of the player
    position: {
        x: 100,
        y: 10,
    },
    collisionBlocks: platformCollisionBlocks,
    imageSrc: './assets/images/Knight Animations/__Idle.gif',
    //Declaring which sprite we are using
    animations: {
        Idle: {
            imageSrc: './assets/images/Knight Animations/__Idle.gif',
        },
        Run: {
            imageSrc: './assets/images/Knight Animations/__Run.gif',
        },
        // RunLeft: {
        //     imageSrc: './assets/images/Knight Animations/__Run-Left.xcf',
        // },
        Jump: {
            imageSrc: './assets/images/Knight Animations/__Jump.gif',
        },
        Fall: {
            imageSrc: './assets/images/Knight Animations/__JumpFallInbetween.gif',
        },
        Death: {
            imageSrc: './assets/images/Knight Animations/__Death.gif',
        },
        Crouch: {
            imageSrc: './assets/images/Knight Animations/__Crouch.gif',
        },
    }
})

// loads background sprite
const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/images/game_background_1/game_background_1_ext.png'
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
    arrowDown: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
}

const backgroundImageHeight = 1080

const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + canvas.height,
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
    context.translate(camera.position.x, camera.position.y);
    //Puts the background images onto canvas
    background.update();
    context.restore();

    context.save();
    context.scale(4, 4)
    //
    platformCollisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update()
    });

    player.checkForHorizontalCanvasCollision()

    //Calls the draw and update function to draw the player character and update the position of the player character
    player.update()

    // Sets and updates players position on the x coordinates if key is pressed.
    // Changes sprite animation
    if (codes.arrowRight.pressed) {
        player.switchSprite('Run')
        //player run speed
        player.velocity.x = 1
        //moves the camera position to the right
        player.shouldPanCameraToTheLeft({ canvas, camera })
    }
    else if (codes.arrowLeft.pressed) {
        player.switchSprite('Run')
        //player run speed
        player.velocity.x = -1
        //moves the camera position to the left
        player.shouldPanCameraToTheRight({ camera })
    }
    else if (codes.arrowDown.pressed) {
        player.switchSprite('Crouch')
    }
    else if (player.velocity.y === 0) {
        player.switchSprite('Idle')
    }

    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({ camera })
        player.switchSprite('Jump')
    }
    else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({ canvas, camera })
        player.switchSprite('Fall')
    }

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
        case 'ArrowDown':
            codes.arrowDown.pressed = true;
            break
        // change the value to change the height jump
        case 'Space':
            player.velocity.y = -7;
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'ArrowRight':
            codes.arrowRight.pressed = false;
            player.velocity.x = 0;
            break
        case 'ArrowLeft':
            codes.arrowLeft.pressed = false;
            player.velocity.x = 0;
            break
        case 'ArrowDown':
            codes.arrowDown.pressed = false;
            break
    }
})


// creates a new canvas and determines the API version
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

//determines canvas size 
canvas.width = 1910
canvas.height = 1080

//stores all or the collision arrays
const platformCollisionBlocks = []
//Parent array
const platformCollisions2D = []
//loops through array for all platforms
for (let i = 0; i < platformCollisions.length; i += 159) {
    //pushes in new sub-array
    platformCollisions2D.push(platformCollisions.slice(i, i + 159))
}
// iterates over each row and column of the platform collisions
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 2121) {
            //pushes in a new collision block
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 32,
                    },
                })
            )
        }
    })
})

// stores all the death collision blocks
const deathBlocks = [];
// parent array
const deathBlocks2D = [];
// loops through the array for deathBlocks
for (let i = 0; i < deathCollisions.length; i += 159) {
    // pushes in a new sub-array
    deathBlocks2D.push(deathCollisions.slice(i, i + 159));
}
// iterates over each row and column of the death collisions
deathBlocks2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 4242) {
            // pushes in a new death collision block
            deathBlocks.push(
                new DeathBlock({
                    position: {
                        x: x * 64,
                        y: y * 32,
                    },
                })
            );
        }
    });
});

// stores all the win collision blocks
const winBlocks = [];
// parent array
const winBlocks2D = [];
// loops through the array for all platforms
for (let i = 0; i < winCollisions.length; i += 159) {
    // pushes in a new sub-array
    winBlocks2D.push(winCollisions.slice(i, i + 159));
}
// iterates over each row and column of the win collisions
winBlocks2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 4243) {
            // pushes in a new win collision block
            winBlocks.push(
                new WinBlock({
                    position: {
                        x: x * 64,
                        y: y * 32,
                    },
                })
            );
        }
    });
});

//variable to determine strength of gravity
const gravity = .2

// creates a player character object
const player = new playerCharacter({
    //starting position of the player
    position: {
        x: 100,
        y: 10,
    },

    //player constructor property : const of = [] makes it available in player.js
    collisionBlocks: platformCollisionBlocks,
    deathCollisionBlocks: deathBlocks,
    winCollisionBlocks: winBlocks,

    imageSrc: './assets/images/Knight Animations/__Idle.gif',
    //Declaring which sprite we are using
    animations: {
        Idle: {
            imageSrc: './assets/images/Knight Animations/__Idle.gif',
        },
        Run: {
            imageSrc: './assets/images/Knight Animations/__Run.gif',
        },
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
    imageSrc: './assets/images/game_background_1/game_background_1_ext.png',
    scale: 1,
});



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

// Height of the background image
const backgroundImageHeight = 1080

// Camera object to track the position of the viewport
const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + canvas.height,
    },
}

// variables to track if the player can jump
let canJump = true;
let isJumping = false;

//variables to track the player's movement
let isMoving = false;

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
    // context.scale(3, 3)
    context.translate(camera.position.x, camera.position.y);
    //Puts the background images onto canvas
    background.update();
    context.restore();

    //animates collision blocks
    context.save();
    // scales the platform image (x, y)
    // context.scale(2, 2)
    context.translate(camera.position.x, camera.position.y);
    // Updates each collision block
    platformCollisionBlocks.forEach((collisionBlock) => {
        collisionBlock.width = 64;
        collisionBlock.height = 32;
        collisionBlock.update()
    });
    deathBlocks.forEach((deathBlocks) => {
        deathBlocks.width = 64;
        deathBlocks.height = 32;
        deathBlocks.update()
    });
    winBlocks.forEach((winBlocks) => {
        winBlocks.width = 64;
        winBlocks.height = 32;
        winBlocks.update()
    });
    
    context.restore();

    // Checks for horizontal collision with the canvas boundaries
    player.checkForHorizontalCanvasCollisions()

    //Calls the draw and update function to draw the player character and update the position of the player character
    player.update()

    // Sets and updates players position on the x coordinates if key is pressed.
    // Changes sprite animation
    if (codes.arrowRight.pressed) {
        player.switchSprite('Run');
        //player run speed
        player.velocity.x = 3;
        //moves the camera position to the right
        player.shouldPanCameraToTheLeft({ canvas, camera })
        isMoving = true;
    }
    else if (codes.arrowLeft.pressed) {
        player.switchSprite('Run');
        //player run speed
        player.velocity.x = -3;
        //moves the camera position to the left
        player.shouldPanCameraToTheRight({ camera });
        isMoving = true;
    }
    else {
        player.velocity.x = 0;
        isMoving = false;
    }
    // Update previousMovingState when the player is moving
    if (codes.arrowRight.pressed || codes.arrowLeft.pressed) {
        // Player is moving
        isMoving = true;
    }
    else {
        // Player is not moving
        isMoving = false;
    }
    // Check if the player is moving 
    if (isMoving) {
        player.switchSprite('Run');
    } else {
        player.switchSprite('Idle');
    }

    if (codes.arrowDown.pressed) {
        player.switchSprite('Crouch')
    }

    // When the player is on the ground, allow jumping again
    if (player.velocity.y === 0) {
        player.switchSprite('Idle');
        canJump = true;
        isJumping = false;
    }
    // Jump action
    if (codes.space.pressed && canJump) {
        player.velocity.y = -10;
        canJump = false;
        isJumping = true;
    }

    // Handles the player jumping animation and camera movement
    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({ camera })
        player.switchSprite('Jump')
    }
    else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({ canvas, camera })
        player.switchSprite('Fall')
    }
    else if (player.velocity.y === 0 && isJumping) {
        player.switchSprite('Idle');
    }

}
// Calls the animatePlayer function to start the animation loop
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
        case 'Space':
            if (canJump) {
                // change the value to change the height jump
                player.velocity.y = -10;
                // Prevent multiple jumps
                canJump = false;
                isJumping = true;
            }
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
        case 'Space':
            if (player.velocity.y === 0) {
                isJumping = false;
            }
            break;
    }
})

function showTitleScreen() {
    const modal = document.getElementById("titleModal");
    modal.style.display = "block";
}

showTitleScreen();

// Hide title screen and start the game when clicked
window.addEventListener("click", () => {
    const modal = document.getElementById("titleModal");
    modal.style.display = "none";
});

// creates a new canvas and determines the API version
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


function resizeCanvas() {
    // Set the canvas dimensions to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

//an event listener to the window's resize event
window.addEventListener('resize', resizeCanvas);

// Height and width of the canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Adjusted camera dimensions to fit the screen
const cameraWidth = canvasWidth;
const cameraHeight = canvasHeight;

// stores all the collision arrays
const platformCollisionBlocks = [];
// Parent array
const platformCollisions2D = [];
// loops through array for all platforms
for (let i = 0; i < platformCollisions.length; i += 90) {
    // pushes in new sub-array
    platformCollisions2D.push(platformCollisions.slice(i, i + 90));
}
// iterates over each row and column of the platform collisions
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 3602) {
            // pushes in a new collision block
            platformCollisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 64,
                        y: y * 32,
                    },
                })
            );
        }
    });
});

// stores all the death collision blocks
const deathBlocks = [];
// parent array
const deathBlocks2D = [];
// loops through the array for deathBlocks
for (let i = 0; i < deathCollisions.length; i += 90) {
    // pushes in a new sub-array
    deathBlocks2D.push(deathCollisions.slice(i, i + 90));
}
// iterates over each row and column of the death collisions
deathBlocks2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 3601) {
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
for (let i = 0; i < winCollisions.length; i += 90) {
    // pushes in a new sub-array
    winBlocks2D.push(winCollisions.slice(i, i + 90));
}
// iterates over each row and column of the win collisions
winBlocks2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 3603) {
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

// variable to determine strength of gravity
const gravity = 0.2;

// loads background sprite
const background = new Sprite({
    position: {
        x: -2500,
        y: -100,
    },
    imageSrc: './assets/images/game_background_1/game_background_1_ext.png',
    scale: 1.5,
});

// creates a player character object
const player = new playerCharacter({
    // starting position of the player
    position: {
        x: 40,
        y: 10,
    },
    collisionBlocks: platformCollisionBlocks,
    deathCollisionBlocks: deathBlocks,
    winCollisionBlocks: winBlocks,
    imageSrc: './assets/images/Knight Animations/__Idle.gif',
    // Declaring which sprite we are using
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
};

// Height of the background image
// const backgroundImageWidth = 5760;
// const backgroundImageHeight = 1080;

// Camera object to track the position of the viewport
const camera = {
    position: {
        x: 0,
        y: 0,
    },
};

// variables to track if the player can jump
let canJump = true;
let isJumping = false;

// variables to track the player's movement
let isMoving = false;

// Animates the playerCharacter 
function animatePlayer() {
    // Update the position of a player character on the screen, before the next repaint of the webpage
    window.requestAnimationFrame(animatePlayer);

    // Fills shapes with a color
    context.fillStyle = '#FFFFFF';

    // Creates a rectangle and determines the size of it (starting x position, starting y position, width, height)
    context.fillRect(0, 0, canvas.width, canvas.height);

    // save and restore prevent the code from refreshing forever
    context.save();
    // scales the image (x, y)
    // context.scale(1, 1.18);
    // context.scale(2, 2);
    context.translate(camera.position.x, camera.position.y);
    // Puts the background images onto canvas
    background.update();
    context.restore();

    // animates collision blocks
    context.save();
    // Updates each platform collision block
    platformCollisionBlocks.forEach((collisionBlock) => {
        collisionBlock.width = 64;
        collisionBlock.height = 32;
        collisionBlock.update();
    });
    // Updates each death collision block
    deathBlocks.forEach((deathBlock) => {
        deathBlock.width = 64;
        deathBlock.height = 32;
        deathBlock.update();
    });
    // Updates each win collision block
    winBlocks.forEach((winBlock) => {
        winBlock.width = 64;
        winBlock.height = 32;
        winBlock.update();
    });
    context.restore();

    // Checks for horizontal collision with the canvas boundaries
    player.checkForHorizontalCanvasCollisions();

    // Calls the draw and update function to draw the player character and update the position of the player character
    player.update();

    // Sets and updates player's position on the x coordinates if key is pressed.
    // Changes sprite animation
    if (codes.arrowRight.pressed) {
        player.switchSprite('Run');
        // player run speed
        player.velocity.x = 3;
        // moves the camera position to the right
        camera.position.x += player.velocity.x;
        isMoving = true;
    } else if (codes.arrowLeft.pressed) {
        player.switchSprite('Run');
        // player run speed
        player.velocity.x = -3;
        // moves the camera position to the left
        camera.position.x += player.velocity.x;
        isMoving = true;
    } else {
        player.velocity.x = 0;
        isMoving = false;
    }
    // Update previousMovingState when the player is moving
    if (codes.arrowRight.pressed || codes.arrowLeft.pressed) {
        // Player is moving
        isMoving = true;
    } else {
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
        player.switchSprite('Crouch');
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
        player.switchSprite('Jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('Fall');
    } else if (player.velocity.y === 0 && isJumping) {
        player.switchSprite('Idle');
    }
}
// Calls the animatePlayer function to start the animation loop
animatePlayer();

// adds audio file to the game loop
window.onload = function () {
    const audioElement = document.getElementById('mainGameAudio');
    audioElement.volume = 0.2;
    // audioElement.play();
};

window.addEventListener('keydown', (event) => {
    // Prevent default behavior of the space key
    if (event.code === 'Space', 'ArrowRight', 'ArrowLeft', 'ArrowDown') {
        event.preventDefault();
    }
    switch (event.code) {
        case 'ArrowRight':
            codes.arrowRight.pressed = true;
            break;
        case 'ArrowLeft':
            codes.arrowLeft.pressed = true;
            break;
        case 'ArrowDown':
            codes.arrowDown.pressed = true;
            break;
        case 'Space':
            if (canJump) {
                // change the value to change the height jump
                player.velocity.y = -10;
                // Prevent multiple jumps
                canJump = false;
                isJumping = true;
            }
            break;
    }
});

window.addEventListener('keyup', (event) => {
    // Prevent default behavior of the space key
    if (event.code === 'Space', 'ArrowRight', 'ArrowLeft', 'ArrowDown') {
        event.preventDefault();
    }
    switch (event.code) {
        case 'ArrowRight':
            codes.arrowRight.pressed = false;
            player.velocity.x = 0;
            break;
        case 'ArrowLeft':
            codes.arrowLeft.pressed = false;
            player.velocity.x = 0;
            break;
        case 'ArrowDown':
            codes.arrowDown.pressed = false;
            break;
        case 'Space':
            if (player.velocity.y === 0) {
                isJumping = false;
            }
            break;
    }
});
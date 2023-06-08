function showTitleScreen() {
    const modal = document.getElementById("titleModal");
    modal.style.display = "block";
}
showTitleScreen();

//hide the title screen and start the game
function startGame() {
    const modal = document.getElementById("titleModal");
    modal.style.display = "none";
}
// Hide title screen and start the game
window.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        startGame();
    }
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

// Creates the collision blocks
function createCollisionBlocks(collisionArray, blockClass, blockSymbol) {
    // stores all the collision blocks
    const collisionBlocks = [];
    // parent array
    const collisionBlocks2D = [];
    // loops through the array for all blocks
    for (let i = 0; i < collisionArray.length; i += 90) {
        // pushes in a new sub-array
        collisionBlocks2D.push(collisionArray.slice(i, i + 90));
    }
    // iterates over each row and column of the collisionArray
    collisionBlocks2D.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === blockSymbol) {
                // pushes in a new collision block
                collisionBlocks.push(
                    new blockClass({
                        position: {
                            x: x * 64,
                            y: y * 32,
                        },
                    })
                );
            }
        });
    });
    return collisionBlocks;
}
const platformCollisionBlocks = createCollisionBlocks(
    platformCollisions,
    PlatformBlock,
    3602
);
const deathBlocks = createCollisionBlocks(
    deathCollisions,
    DeathBlock,
    3601
);
const winBlocks = createCollisionBlocks(
    winCollisions,
    WinBlock,
    3603
);

// variable to determine strength of gravity
const gravity = 0.2;

// loads background sprite
const background = new Sprite({
    position: {
        x: -2500,
        y: 0,
    },
    imageSrc: './assets/images/game_background_1/game_background_1_ext.png',
    scale: 1.25,
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
    // animates collision blocks
    context.save();
    // scales the image (x, y)
    // context.scale(.7, .7);
    // context.translate(0, 0);
    // context.translate(camera.position.x, camera.position.y);
    background.update();

    function updateCollisionBlocks(blocks) {
        blocks.forEach((block) => {
            block.width = 64;
            block.height = 32;
            block.update();
        });
    }
    // Updates each platform collision block
    updateCollisionBlocks(platformCollisionBlocks);
    // Updates each death collision block
    updateCollisionBlocks(deathBlocks);
    // Updates each win collision block
    updateCollisionBlocks(winBlocks);

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
    }
    else if (codes.arrowLeft.pressed) {
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
    }
    else {
        // Player is not moving
        isMoving = false;
    }
    // Check if the player is moving
    if (isMoving) {
        player.switchSprite('Run');
    }
    else {
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
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('Fall');
    }
    else if (player.velocity.y === 0 && isJumping) {
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

// handle player movement key events
function handleMovementKey(event, isKeyDown) {
    switch (event.code) {
        case 'ArrowRight':
            codes.arrowRight.pressed = isKeyDown;
            player.velocity.x = isKeyDown ? 3 : 0;
            break;
        case 'ArrowLeft':
            codes.arrowLeft.pressed = isKeyDown;
            player.velocity.x = isKeyDown ? -3 : 0;
            break;
        case 'ArrowDown':
            codes.arrowDown.pressed = isKeyDown;
            break;
        case 'Space':
            if (isKeyDown && canJump) {
                player.velocity.y = -10;
                canJump = false;
                isJumping = true;
            }
            break;
    }
}

window.addEventListener('keydown', (event) => {
    if (
        event.code === 'Space' ||
        event.code === 'ArrowRight' ||
        event.code === 'ArrowLeft' ||
        event.code === 'ArrowDown'
    ) {
        event.preventDefault();
    }
    handleMovementKey(event, true);
});

window.addEventListener('keyup', (event) => {
    if (
        event.code === 'Space' ||
        event.code === 'ArrowRight' ||
        event.code === 'ArrowLeft' ||
        event.code === 'ArrowDown'
    ) {
        event.preventDefault();
    }
    handleMovementKey(event, false);
});

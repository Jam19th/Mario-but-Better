// Get player and platforms
const player = document.getElementById('player');
const platforms = document.querySelectorAll('.platform');

// Set player properties
let playerX = 50;
let playerY = 340;
let playerSpeed = 4;
let playerJumpHeight = 100;
let jumping = false;
let jumpCount = 0;

function movePlayer(event) {
  // Check if the left arrow key is pressed
  if (event.keyCode === 37) {
    position -= 1; // Move left by 10 pixels
  }
  // Check if the right arrow key is pressed
  else if (event.keyCode === 39) {
    position += 1; // Move right by 10 pixels
  }

  // Update the position of the asset
  asset.style.left = `${position}px`;
}

 // Attach the event listener to the keydown event
 document.addEventListener('keydown', movePlayer);

// Move player left or right
// function movePlayer(direction) {
//   if (direction === 'left' && playerX > 0) {
//     playerX -= playerSpeed;
//   } else if (direction === 'right' && playerX < 580) {
//     playerX += playerSpeed;
//   }
//   player.style.left = playerX + 'px';
// }

// Make player jump
function jump() {
  if (!jumping && jumpCount < 2) {
    jumping = true;
    jumpCount++;
    let jumpInterval = setInterval(() => {
      playerY -= playerSpeed * 2;
      player.style.top = playerY + 'px';
      if (jumpCount === 1 && playerY <= 240 + playerJumpHeight) {
        jumping = false;
        jumpCount = 0;
        clearInterval(jumpInterval);
      }
      if (jumpCount === 2 || playerY <= 240) {
        jumping = false;
        jumpCount = 0;
        clearInterval(jumpInterval);
        fall();
      }
    }, 10);
  }
}

// Make player fall
function fall() {
  let fallInterval = setInterval(() => {
    playerY += playerSpeed * 2;
    player.style.top = playerY + 'px';
    if (playerY >= 340) {
      clearInterval(fallInterval);
    }
  }, 10);
}

// Check if player is on a platform
function isOnPlatform() {
  let onPlatform = false;
  platforms.forEach(platform => {
    if (
      playerX + 20 > platform.offsetLeft &&
      playerX < platform.offsetLeft + platform.offsetWidth &&
      playerY + 40 >= platform.offsetTop &&
      playerY + 40 <= platform.offsetTop + 5
    ) {
      onPlatform = true;
      jumping = false;
      jumpCount = 0;
}})
}

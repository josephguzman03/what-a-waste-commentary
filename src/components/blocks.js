// Define the animation container
const animationContainer = document.getElementById('animation-container');

// Define the interval between each falling block
const blockInterval = 1000; // milliseconds

// Function to check collision between blocks
function checkCollision(block) {
    const blocks = document.querySelectorAll('.falling-object');
    const rect1 = block.getBoundingClientRect();
    for (const otherBlock of blocks) {
        if (otherBlock !== block) {
            const rect2 = otherBlock.getBoundingClientRect();
            if (!(rect1.right < rect2.left || 
                  rect1.left > rect2.right || 
                  rect1.bottom < rect2.top || 
                  rect1.top > rect2.bottom)) {
                return true; // Collision detected
            }
        }
    }
    return false; // No collision detected
}

// Function to create a falling block
function createFallingBlock() {
    const block = document.createElement('div');
    block.classList.add('falling-object');
    block.style.left = `${Math.random() * (animationContainer.offsetWidth - 20)}px`;
    animationContainer.appendChild(block);

    // Animate the falling block
    let yPos = 0;
    const animationId = setInterval(() => {
        yPos += 2; // Adjust the falling speed as needed
        block.style.top = `${yPos}px`;

        // Check if the block has collided with another block or reached the bottom
        if (checkCollision(block) || yPos >= animationContainer.offsetHeight - 20) {
            clearInterval(animationId);
        }
    }, 10); // Adjust the animation interval as needed
}

// Function to continuously create falling blocks
function startAnimation() {
    setInterval(createFallingBlock, blockInterval);
}

// Start the animation
startAnimation();
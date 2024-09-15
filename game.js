// Game board configuration
var boxSize = 25; // Size of each box in the grid
var rows = 20; // Number of rows in the game board
var cls = 20; // Number of columns in the game board
var board; // Canvas element for the game board
var context; // 2D rendering context for the canvas

// Snake head initial position
var SnakeX = boxSize * 5; // Initial X position of the snake head
var SnakeY = boxSize * 5; // Initial Y position of the snake head

// Snake body
var Snakebody = []; // Array to store the snake body segments

// Food position
var foodX; // X position of the food
var foodY; // Y position of the food

// Snake velocity
var velocityX = 0; // Horizontal velocity of the snake
var velocityY = 0; // Vertical velocity of the snake

var gameOver = false;

// Initialize the game when the window loads
window.onload = function(){
    board = document.getElementById("board"); // Get the canvas element
    board.height = rows * boxSize; // Set the canvas height
    board.width = cls * boxSize; // Set the canvas width
    context = board.getContext("2d"); // Get the 2D rendering context
    
    placefood(); // Place the initial food
    document.addEventListener("keyup", changeDirection); // Listen for keyboard input
    update(); // Initial update call
    setInterval(update, 1000/10); // Set game loop to update 10 times per second
}

// Main game loop function
function update(){
    if(gameOver){
        return;
    }
    // Clear the board
    context.fillStyle = "black";                       
    context.fillRect(0, 0, board.width, board.height); 
    
    // Draw the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, boxSize, boxSize);

    // Check if the snake has eaten the food
    if(SnakeX == foodX && SnakeY == foodY){
        Snakebody.push([foodX, foodY]); // Add new segment to snake body
        placefood(); // Place new food
    }

    // Move the body segments
    for(let i = Snakebody.length - 1; i > 0; i--) {
        Snakebody[i] = Snakebody[i - 1];
    }

    // Move the first segment to the previous head position
    if(Snakebody.length) {
        Snakebody[0] = [SnakeX, SnakeY];
    }

    // Draw the snake head
    context.fillStyle = "lime";
    context.fillRect(SnakeX, SnakeY, boxSize, boxSize);

    // Update snake head position
    SnakeX += velocityX * boxSize;
    SnakeY += velocityY * boxSize;

    // Draw the snake body
    for(let i = 0; i < Snakebody.length; i++){
        context.fillRect(Snakebody[i][0], Snakebody[i][1], boxSize, boxSize);
    }

    // Game over conditions: check if snake hits the boundary
    if(SnakeX < 0 || SnakeX >= cls * boxSize || SnakeY < 0 || SnakeY >= rows * boxSize) {
        gameOver = true;
        alert("Game over");
    }

    // Check if the snake hits itself
    for(let i = 0; i < Snakebody.length; i++){
        if(SnakeX == Snakebody[i][0] && SnakeY == Snakebody[i][1]){
            gameOver = true;
            alert("Game over");
        }
    }
}

// Handle direction changes based on key input
function changeDirection(e){
    if((e.code == "ArrowUp" || e.code == "KeyW") && velocityY != 1){
        velocityX = 0;
        velocityY = -1; 
    } else if((e.code == "ArrowDown" || e.code == "KeyS") && velocityY != -1){
        velocityX = 0;
        velocityY = 1; 
    } else if((e.code == "ArrowRight" || e.code == "KeyD") && velocityX != -1){
        velocityX = 1;
        velocityY = 0; 
    } else if((e.code == "ArrowLeft" || e.code == "KeyA") && velocityX != 1){
        velocityX = -1;
        velocityY = 0; 
    }  
}

// Place food at a random position on the board
function placefood(){
    foodX = Math.floor(Math.random() * cls) * boxSize; // Random X position
    foodY = Math.floor(Math.random() * rows) * boxSize; // Random Y position
}

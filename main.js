//Canvas Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 512;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

const keys = [];
const scoreElement = document.getElementById("score");

// Player  
const player = {
    x: 450,
    y: 450,
    width: 32,
    height: 36,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
    scaled: false,
    conquered: false,
    scale: 2,
};

const enemy = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 6,
    moving: false,
    scaled: false,
    scale: 2,
};

//Fruit
class fruit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.frameX = 9;
        this.frameY = 2;
        this.speed = 9;
        this.moving = false;
        this.scaled = false;
        this.scale = 2;
        this.eaten = false;
    }
}

let fruits = [
    new fruit(120, 210),
    new fruit(205, 79),
    new fruit(280, 60),
    new fruit(450, 80),
    new fruit(150, 390), //bridge bottom 
    new fruit(200, 390),
    new fruit(250, 390),
    new fruit(300, 390),
    new fruit(350, 390),
    new fruit(150, 335), //bridge top
    new fruit(200, 335),
    new fruit(250, 335),
    new fruit(300, 335),
    new fruit(350, 335),
];

let animationFrame;
const playerSprite = new Image();
playerSprite.src = "/assets/pygmy/pygmy-hippo-walk.png";
const background = new Image();
background.src = "/assets/lake_background.png";
const fruitSprite = new Image();
fruitSprite.src = "/assets/fruit.png";
const enemySprite = new Image();
enemySprite.src = "assets/darthvader.png";
const retryButton = document.getElementById('retry');


window.onload = () => {
    document.getElementById("retry").addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementsByClassName("win")[0].style.display = 'none';
        document.getElementsByClassName("lose")[0].style.display = 'none';
        stopAnimation();  // Stop the current animation
        resetGame();      // Reset game state
        startAnimating(15);  // Restart the animation loop
        // console.log("i'm listening");
    });

    startAnimating(15);  // Start the animation at 15 frames per second
};

function resetGame() { // Reset player position, score, and any other game-related variables
    player.x = 450;
    player.y = 450;
    enemy.x = 0;
    enemy.y = 0;
    score = 0;
    player.conquered = false;
    fruits = [
        new fruit(120, 210),
        new fruit(205, 79),
        new fruit(280, 60),
        new fruit(450, 80),
        new fruit(150, 390), //bridge bottom 
        new fruit(200, 390),
        new fruit(250, 390),
        new fruit(300, 390),
        new fruit(350, 390),
        new fruit(150, 335), //bridge top
        new fruit(200, 335),
        new fruit(250, 335),
        new fruit(300, 335),
        new fruit(350, 335),
    ];
}

//Draw images
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawFruit() {
    // fruits = fruits.filter(fruit => !fruit.eaten); // Remove eaten fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
        checkFruit(i);
    }
}

//Check if fruit is eaten or not
function checkFruit(i) {
    const fruit = fruits[i];
    if (player.x + player.width >= fruit.x && //left side of player and right side of fruit
        player.x <= fruit.x + fruit.width && //right side of player and left side of fruit
        player.y + player.height >= fruit.y && //bottom side of player and top side of fruit
        player.y <= fruit.y + fruit.height) { //top side of player and bottom side of fruit
        fruit.eaten = true;
        fruits.splice(i, 1); //remove fruit
        score++; //updating score
    } else {
        drawSprite(fruitSprite, fruit.width * fruit.frameX, fruit.height * fruit.frameY, fruit.width, fruit.height,
            fruit.x, fruit.y, fruit.width, fruit.height);
        console.log('eaten2:', fruit.eaten);
    }
    // console.log(fruit.eaten);
}

//Enemy 
function moveEnemy() {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
        enemy.x += (dx / distance) * enemy.speed;
        enemy.y += (dy / distance) * enemy.speed;
    }
}

function checkEnemy() {
    if (enemy.x + enemy.width >= player.x && //left side of enemy and right side of player
        enemy.x <= player.x + player.width && //right side of enemy and left side of player
        enemy.y + enemy.height >= player.y && //bottom side of enemy and top side of player
        enemy.y <= player.y + player.height) //top side of enemy and bottom side of player
    {
        player.conquered = true;
        console.log('eaten3:', player.conquered);
    } else {

        console.log('eaten4:', player.conquered);
    }
}


function displayGameOver() {
    // Clear the canvas
    document.getElementsByClassName("lose")[0].style.display = 'block'; //Reveal Message
}

function displayWinMessage() {
    // Clear the canvas
    document.getElementsByClassName("win")[0].style.display = 'block'; //Reveal Message
}

//Arrow Keys
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    player.moving = true;
    // console.log(keys);
});
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer() { //change into switch??
    if (keys[38] && player.y > 0) { //up
        player.y -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys[37] && player.x > 0) { //left
        player.x -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys[40] && player.y < canvas.height - player.height) { //down
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys[39] && player.x < canvas.width - player.width) { //right
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}

function drawBackground() {
    ctx.filter = `brightness(${0.6})`;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';

}

// retryButton.addEventListener('click', () => {
//     animate(); // Call the function to restart the animation
//   });

function stopAnimation() {
    cancelAnimationFrame(animationFrame);
}

//Player Speed
let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    animationFrame = requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);//clears between each loop

        if (player.conquered) {
            displayGameOver(); // Show the game over message if the player is conquered
            return; // Stop the game loop by returning early
        } else if (fruits.length === 0) {
            // All fruits are eaten
            displayWinMessage();
            return;
        }

        drawBackground();

        drawFruit();
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y, player.width, player.height);
        drawSprite(enemySprite, enemy.width * enemy.frameX, enemy.height * enemy.frameY, enemy.width, enemy.height,
            enemy.x, enemy.y, enemy.width, enemy.height);
        movePlayer();
        moveEnemy();
        checkEnemy();

        handlePlayerFrame();

        scoreElement.textContent = "Score: " + score;


    }
}

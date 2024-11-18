//Canvas Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
ctx.font = '50px Georgia';

const keys = [];
let fruits = [];

// Mouse Interactivity 
// let canvasPosition = canvas.getBoundingClientRect(); 

// const mouse = {
//     x: canvas.width/2, 
//     y: canvas.height/2, 
//     click : false
// }
// canvas.addEventListener('mousedown', function(event){
//     mouse.x = event.x - canvasPosition.left;  
//     mouse.y = event.y - canvasPosition.top;
// });

// Player  

const player = {
    x: 200,
    y: 300,
    width: 32,
    height: 36,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
    scaled: false,
    scale: 2,
};

// const fruit = {
//     x: 100,
//     y: 300,
//     width: 16,
//     height: 16,
//     frameX: 0,
//     frameY: 0,
//     speed: 9,
//     moving: false,
//     scaled: false,
//     scale: 2,
//     eaten: false,
// };

class fruit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.moving = false;
        this.scaled = false;
        this.scale = 2;
        this.eaten = false;
    }
}

// let x; 
// let y;
// let fruitArray = new fruit(x, y);
console.log("fruts: ", fruit.scaled);

const playerSprite = new Image();
playerSprite.src = "/assets/pygmy/pygmy-hippo-walk.png";
const background = new Image();
background.src = "/assets/tattooine-game-background.png";
const fruitSprite = new Image();
fruitSprite.src = "/assets/fruit.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function arrayFruit(x, y) {
    // for(let i = 0; i < 5; i++) {
    let fruitArray = new fruit(x, y);
    fruits.push(fruitArray);
    console.log("fruit.scaled: ", fruitArray.scaled);
   // console.log('fruit pushed index: ', fruits[i]);

    // }
}

function drawFruit() {
    //let fruitArray = new fruit(1, 2);
    arrayFruit(300, 200);
    //console.log('fruit.x: ', fruitArray.x);
    //console.log('fruitArray.y: ', fruitArray.y);
    arrayFruit(200, 100);
    //console.log('fruitArray.x: ', fruitArray.x);
    //console.log('fruitArray.y: ', fruitArray.y);
    arrayFruit(400, 500);
    //console.log('fruitArray.x: ', fruitArray.x);
    //console.log('fruitArray.y: ', fruitArray.y);


    for (let i = 0; i < 4; i++) {

        checkFruit(i);
    }
}

function checkFruit(i, x, y) {
    

    if (player.x + player.width >= fruit.x && //left side of player and right side of fruit
        player.x <= fruit.x + fruit.width && //right side of player and left side of fruit
        player.y + player.height >= fruit.y && //bottom side of player and top side of fruit
        player.y <= fruit.y + fruit.height) { //top side of player and bottom side of fruit
        fruit.eaten = true;
        fruits.splice(i, 1); //remove dot
        console.log('eaten1:', fruit.eaten);
    } else {
        // drawSprite(fruitSprite, fruit.width * fruit.frameX, fruit.height * fruit.frameY, fruit.width, fruit.height,
        //     fruit.x, fruit.y, fruit.width, fruit.height);
        drawSprite(fruitSprite, fruit.width * fruit.frameX, fruit.height * fruit.frameY, fruit.width, fruit.height,
            fruit.x, fruit.y, fruit.width, fruit.height);
        console.log('eaten2:', fruit.eaten);


    }
    // console.log('not');
    // console.log(fruit.eaten);
}

// function scalePlayer() { 
//     if (!player.scaled) { 
//         player.width *= player.scale; 
//         player.height *= player.scale; 
//         player.scaled = true; // Set the flag to true after scaling }

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

/*class Player {
    constructor(){
        this.x = canvas.width/2; 
        this.y = canvas.height/2;
        this.radius = 50; 
        this.angle = 0; 
        this.frameX = 0; 
        this.frameY = 0; 
        this.frame = 0; 
        this.spriteWidth = 498; //changes based on image file
        this.spriteHeight = 327;
    }
    update(){ //updates player based on where mouse is
        node.addEventListener('keydown', function(event) {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        });

    }
}*/


//player speed

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clears between each loop
        //ctx.drawImage(background, 0, 0, canvas.width, canvas.height); //turn x to poisiton for moving backround
        // drawSprite(fruitSprite, fruit.width * fruit.frameX, fruit.height * fruit.frameY, fruit.width, fruit.height,
        //     fruit.x, fruit.y, fruit.width, fruit.height);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y, player.width, player.height);
        drawFruit();
        movePlayer();
        handlePlayerFrame();









        // if (player.x + player.width >= fruit.x){
        //     console.log("colliding)");
        // }

        // if (player.x + player.width >= fruit.x){
        //     console.log("colliding)");
        // }


    }
}

startAnimating(15);


// function draw() {
//     ctx.strokeRect(5, 5, 25, 15);
//     ctx.scale(2, 2);
//     ctx.strokeRect(5, 5, 25, 15);
//     ctx.scale(2, 2);
//     ctx.strokeRect(5, 5, 25, 15);
//     ctx.scale(2, 2);
//     ctx.strokeRect(5, 5, 25, 15);
//   }


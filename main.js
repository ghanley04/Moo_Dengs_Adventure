//Canvas Setup
    const canvas = document.getElementById('canvas1'); 
    const ctx = canvas.getContext('2d'); 
    canvas.width = 500; 
    canvas.height = 500; 

    let score = 0; 
    let gameFrame = 0; 
    ctx.font = '50px Georgia'; 

    const keys = [];

// Mouse Interactivity 
let canvasPosition = canvas.getBoundingClientRect(); 

const mouse = {
    x: canvas.width/2, 
    y: canvas.height/2, 
    click : false
}
canvas.addEventListener('mousedown', function(event){
    mouse.x = event.x - canvasPosition.left;  
    mouse.y = event.y - canvasPosition.top;
});

// Player  

    const player = {
        x: 0, 
        y: 0, 
        width: 40, 
        height: 72, 
        frameX: 0,
        frameY: 0,
        speed: 9, 
        moving: false 

    };

const playerSprite = new Image(); 
playerSprite.src = "chewie.png";
const backround = new Image(); 
backround.src = "backround.png";

// Animation Backround 

//let position = 0; 
function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawingImage(background, 0, 0, canvas.width, canvas.height); //turn x to poisiton for moving backround
    //position++;
    requestAnimationFrame(animate); 
}
animate();

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
        this.sproteHeight = 327;
    }
    update(){ //updates player based on where mouse is
        node.addEventListener('keydown', function(event) {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        });

    }
}*/
    
// Enemies 
// Animation Loop 

//Canvas Setup
    const canvas = document.getElementById('canvas1'); 
    const ctx = canvas.getContext('2d'); 
    canvas.width = 500; 
    canvas.height = 500; 

    let score = 0; 
    let gameFrame = 0; 
    ctx.font = '50px Georgia';

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
class Player {
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

    }
}
    
// Enemies 
// Animation Loop
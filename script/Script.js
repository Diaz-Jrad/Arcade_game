window.onload = letStart;
//Define globals variables
let canvas, ctx, w, h; 
let mousePos;

let player, IA, ball;

//Variables which define the ball speed 
let speedBall;

//Variables which defines the IA speed
let speedIA;

//Use to regulate the listener on the space bar
//If player is on the start screen : state = 0
//If the game is in progress : state = 1
//If the player is on the game over screen : state = 2
let state;

//Init the level of difficulties
let selectedLVL;
// audio game
let music = new Audio('./music/music.mp3');
let hit = new Audio('./music/hit.mp3');
let lose = new Audio('./music/lose.mp3');
let win = new Audio('./music/win.mp3');

$(window).on('resize', function(){
      var win = $(this); //this = window
      win.height() = 600
      win.width() = 500
});

//Start's screen
function letStart() {
  music.play();
  music.volume = 0.4;
  state = 0; 

  //Init globals variables
  canvas = document.querySelector("#tennisCourt");
  w = canvas.width; 
  h = canvas.height;  
  ctx = canvas.getContext('2d');

  canvas.addEventListener('mousemove', mouseMoved);
  window.addEventListener('keypress', spacePressed);
  window.addEventListener('click', chooseLevel);
  
  ctx.clearRect(0,0,w,h); 
  displayMessage('The original PONG' ,'60px' , 'white',  45 ,100);
  displayMessage('Click to choose your level :' ,'40px' , 'white',  60 ,220);
  displayMessage('Beginner' ,'30px' , 'white',  60 ,280);
  displayMessage('Intermediate' ,'30px' , 'white', 225 ,280);
  displayMessage('Expert' ,'30px' , 'white',  435 ,280);


   
  //Display the selected level in red
  if(selectedLVL === 1) {
    ctx.clearRect(0,0,w,h); 
    displayMessage('The original PONG' ,'60px' , 'white',  45 ,100);
    displayMessage('Click to choose your level :' ,'40px' , 'white',  60 ,220);
    displayMessage('Beginner' ,'30px' , 'red',  60 ,280);
    displayMessage('Intermediate' ,'30px' , 'white', 225 ,280);
    displayMessage('Expert' ,'30px' , 'white',  435 ,280);
    displayMessage('Press space bar to play' ,'40px', 'white' ,90 ,400); 
  }
  
  if(selectedLVL === 2) {
    ctx.clearRect(0,0,w,h); 
    displayMessage('The original PONG' ,'60px' , 'white',  45 ,100);
    displayMessage('Click to choose your level :' ,'40px' , 'white',  60 ,220);
    displayMessage('Beginner' ,'30px' , 'white',  60 ,280);
    displayMessage('Intermediate' ,'30px' , 'red', 225 ,280);
    displayMessage('Expert' ,'30px' , 'white',  435 ,280);
    displayMessage('Press space bar to play' ,'40px', 'white' ,90 ,400); 
  } 
  
  if(selectedLVL === 3) {
    ctx.clearRect(0,0,w,h); 
    displayMessage('The original PONG' ,'60px' , 'white',  45 ,100);
    displayMessage('Click to choose your level :' ,'40px' , 'white',  60 ,220);
    displayMessage('Beginner' ,'30px' , 'white',  60 ,280);
    displayMessage('Intermediate' ,'30px' , 'white', 225 ,280);
    displayMessage('Expert' ,'30px' ,'red', 435 ,280);
    displayMessage('Press space bar to play' ,'40px', 'white' ,90 ,400); 
  }
  
  //If space was pressed before a choosing a level
  if(selectedLVL === -1) {
    ctx.clearRect(0,0,w,h); 
    displayMessage('The original PONG' ,'60px' , 'white',  45 ,100);
    displayMessage('Click to choose your level :' ,'40px' , 'red',  60 ,220);
    displayMessage('Beginner' ,'30px' , 'white',  60 ,280);
    displayMessage('Intermediate' ,'30px' , 'white', 225 ,280);
    displayMessage('Expert' ,'30px' , 'white',  435 ,280);
  }
}

function gamePlay() {
    
  state = 1; 
  //Hidden the mouse cursor during the game 
  document.getElementById('cursor').style.cursor = 'none';
  
  //Define player, IA and ball as variables
  player = {
    x:580,
    y:210,
    width:10,
    height:60,
    color:'white',
    point: 0 }
  
  IA = {
    x:10,           
    y:210, 
    width:10,
    height:60,
    color:'white',
    point:0,
    speedY:0,
    angleHit:60*Math.random() }
    
  ball = {
    x:300,
    y:250,
    radius:8,
    speedX:speedBall,
    speedY:0,
    color:'white' }
  
  //Ready to go !
  hereWeGO();
}

function hereWeGO() {

  //While no player has gained 10 points, the game continuous 
  if(player.point !== 10 & IA.point !== 10 ) {
    
    ctx.clearRect(0, 0, w, h);

    //Draw the ball and the IA
    drawFilledRectangle(player);
    drawFilledRectangle(IA);
    drawFilledBall(ball);
  
    displayScore(IA, 240, 50);  
    displayScore(player, 330, 50);
  
    centerTennisCourt();
  
    movePlayerWithMouse();
    moveBall(); 
    moveIA();
  
    //Ask for a new animation frame
    requestAnimationFrame(hereWeGO); 
  }

  //Once the 10 points was reached, display of the 'game over' screen
  else { gameOver(); }
}

//Game over's screen
function gameOver(){

  state = 2;
   
  if(player.point === 10) {
    ctx.clearRect(0,0,w,h);
    displayScore(IA, 240, 50);
    displayScore(player, 330, 50);
    win.play();
    displayMessage('YOU WIN !', '80px', 'white', 95, 200);
    displayMessage('Click to reset', '40px', 'white', 180, 320);
    displayMessage('Press space bar to replay', '40px', 'white', 75, 400);
  }
  if(IA.point === 10) {
    ctx.clearRect(0,0,w,h);
    displayScore(IA, 240, 50);
    displayScore(player, 330, 50);
    lose.play();
    displayMessage('YOU LOSE !', '80px', 'white', 80, 200);
    displayMessage('Click to reset', '40px', 'white', 180, 320);
    displayMessage('Press space bar to replay', '40px', 'white', 75, 400);
  } 
}   

//Init the selected level of difficulties 
function chooseLevel () {
   
  if(state === 0) {
    if (mousePos.x >= 60 & mousePos.x <= 185 
      & mousePos.y >= 255 & mousePos.y <= 280) {
      LVL1(); }
    if (mousePos.x >= 225 & mousePos.x <= 390 
      & mousePos.y >= 255 & mousePos.y <= 280) {
      LVL2(); }
    if (mousePos.x >= 435 & mousePos.x <= 525 
      & mousePos.y >= 255 & mousePos.y <= 280) {
      LVL3(); }
  }
  
  //Initializes the reset button of the game over screen 
  //which allows to return to the start screen 
  if(state === 2) {
    if (mousePos.x >= 180 & mousePos.x <= 415 
      & mousePos.y >= 285 & mousePos.y <= 320) {
      selectedLVL = 0;
      letStart(); }
  }
}

//Increases the speed of the ball and player according to the selected level
function LVL1() {
  speedBall = 7;
  speedIA = 3;
  
  selectedLVL = 1;
  letStart();
}

function LVL2() {  
  speedBall = 8;
  speedIA = 4;
    
  selectedLVL = 2;
  letStart(); 
} 
 
function LVL3() {  
  speedBall = 10;
  speedIA = 6;
   
  selectedLVL = 3;
  letStart();
}

function spacePressed(evt) {
  //If the game is not running 
  if(state === 0 | state === 2) { 

    //Load the game when the spacebar was pressed  
    if(evt.keyCode === 32) {
      //Before starting, control that a level as been selected
      if((state === 0 & selectedLVL !== 1)
         &(state === 0 & selectedLVL !== 2)
         &(state === 0 & selectedLVL !== 3)){
        selectedLVL =-1;
        letStart();
      }
      else { gamePlay(); }
    }
  }
} 
 
function mouseMoved(evt) {
  mousePos = getMousePos(canvas, evt);
  
  //If the game is on the Start screen
  if(state === 0) {
    //Display the mouse cursor as a pointer when it's on a clickable element
    if ( mousePos.x >= 60 & mousePos.x <= 185 
      & mousePos.y >= 255 & mousePos.y <= 280 ) { 
      document.getElementById('cursor').style.cursor = 'Pointer';}
    else if (mousePos.x >= 225 & mousePos.x <= 390 
      & mousePos.y >= 255 & mousePos.y <= 280) {
      document.getElementById('cursor').style.cursor = 'Pointer';}
    else if (mousePos.x >= 435 & mousePos.x <= 525
      & mousePos.y >= 255 & mousePos.y <= 280) {
      document.getElementById('cursor').style.cursor = 'Pointer';}
    else {document.getElementById('cursor').style.cursor = 'auto';}
  }
  //If the game is on the game over screen
  if(state === 2) {
    if (mousePos.x >= 180 & mousePos.x <= 415 
      & mousePos.y >= 285 & mousePos.y <= 320) {
      document.getElementById('cursor').style.cursor = 'Pointer';}
     else {document.getElementById('cursor').style.cursor = 'auto';}
  }
}

function getMousePos(canvas, evt) {
    
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function movePlayerWithMouse() {
  //We only move the y value of player 
  //The player can only be moved on the canvas (between 0px and 500px)
  if(mousePos !== undefined & mousePos.y <= (h-player.height)) {
  player.y = mousePos.y; 
  }
}
 
function moveIA() {  
 
  //IA moves according to its position relative to the ball. To make it possible,
  //initialize the distance between the IA and the ball before each move(Distance With Ball)
  //If DWB is positive, then the ball is lower than the IA and inversely
  //'angleHit' is a random value that gives the direction of the next shot of the IA. Reset after each shot
  let DWB = ball.y - IA.y - IA.angleHit;    
  
  //The speed of the IA varies according to the distance to the ball
  //Gives the feeling that the IA reacts smartly according to the situation
  if (Math.abs(DWB) >= 250) { 
    IA.speedY = speedIA *8;
  }
  if (Math.abs(DWB) < 250 & Math.abs(DWB) >= 200) { 
    IA.speedY = speedIA *5; 
  }
  if (Math.abs(DWB) < 200 & Math.abs(DWB) >= 120) { 
    IA.speedY = speedIA *3; 
  }   
  if (Math.abs(DWB) < 120 & Math.abs(DWB) >= 80) {
    IA.speedY = speedIA *2;  
  } 
  if (Math.abs(DWB) < 80 & Math.abs(DWB) >= 30) { 
    IA.speedY = speedIA; 
  }
  if (Math.abs(DWB) < 30 & Math.abs(DWB) >= 0) { 
    IA.speedY = speedIA *0.5; 
  }

  //IA can only move on the canvas
  if((IA.y - IA.speedY) >= 0 & (IA.y + IA.height + IA.speedY) <= h) {  
    //The ball is never go really right. Getting DWB = 0 is practically impossible.
    //When DWB is close to 0, the IA is not stable. We only move it between -3 and 3 to avoid this
    if(Math.abs(DWB) > 3) {   
      if(DWB > 0) {
        IA.y += IA.speedY; 
      }   
      if(DWB < 0) {
        IA.y -= IA.speedY;
      }  
    } 
  } 
  //With the condition above, if the IA touches an edge of the canvas, it does not move anymore.
  //To avoid this, we force him to take off on the other side 
  else { 
    if(IA.y - IA.speedY <= 0) {
      IA.y += IA.speedY;
    }
    if((IA.y + IA.height + IA.speedY) >= h) {
      IA.y -= IA.speedY;
    }
  }
}

function moveBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  
  testCollisionWithPlayers(ball, player); 
  testCollisionWithPlayers(ball, IA); 
  testCollisionWithWalls(ball); 
} 
  
//Detect collisions between players and ball
function hitTheBall(x0, y0, w0, h0, cx, cy, r) {
  let testX=cx;
  let testY=cy;
  if (testX <= x0) testX=x0;
  if (testX >= (x0+w0)) testX=(x0+w0);
  if (testY <= y0) testY=y0;
  if (testY >= (y0+h0)) testY=(y0+h0);
  return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY)) <= r*r);
}

//cut players into 15 part length 4.
//Depending on which part touche the ball, returns it with a different trajectory
//ball.speedY varies from 3 to -3 with a step of 0.375 
//It allow player to make precise shoot
function testCollisionWithPlayers(ball, players) {
  if(hitTheBall(players.x, players.y,
                players.width, players.height,
                ball.x, ball.y, ball.radius)) { 
     
    //The ball starts in the opposite direction after the collision
    //Accelerate the ball after each collision
    ball.speedX = -ball.speedX *1.05;
    
    //Multiplies the vertical movement speed of the ball as 
    //the horizontal speed increases to maintain the proportion
    let ySpeedMultiplier = Math.abs(ball.speedX *(1/6))

    //Initialize the angle of the next shot of the IA after each collision
    IA.angleHit = IA.height * Math.random(); 

    //With which angle? 
    if(ball.y <= players.y) {
    ball.speedY = -3 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y) & ball.y < (players.y + 4)) {
    ball.speedY = -2.625 * ySpeedMultiplier; 
    } 
    if(ball.y >= (players.y + 4) & ball.y < (players.y + 8)) {
    ball.speedY = -2.25 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 8) & ball.y < (players.y + 12)) {
    ball.speedY = -1.875 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 12) & ball.y < (players.y + 16)) {
    ball.speedY = -1.5 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 16) & ball.y < (players.y + 20)) {
    ball.speedY = -1.125 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 20) & ball.y < (players.y + 24)) {
    ball.speedY = -0.75 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 24) & ball.y < (players.y + 28)) {
    ball.speedY = -0.375 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 28) & ball.y < (players.y + 32)) {
    ball.speedY = 0 * ySpeedMultiplier;
    }  
    if(ball.y >= (players.y + 32) & ball.y < (players.y + 36)) {
    ball.speedY = 0.375 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 36) & ball.y < (players.y + 40)) {
    ball.speedY = 0.75 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 40) & ball.y < (players.y + 44)) {
    ball.speedY = 1.125 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 44) & ball.y < (players.y + 48)) {
    ball.speedY = 1.5 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 48) & ball.y < (players.y + 52)) {
    ball.speedY = 1.875 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 52) & ball.y < (players.y + 56)) {
    ball.speedY = 2.25 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + 56) & ball.y < (players.y + 60)) {
    ball.speedY = 2.625 * ySpeedMultiplier;
    }
    if(ball.y >= (players.y + players.height)) {
    ball.speedY = 3 * ySpeedMultiplier; 
    }
  }
}  

function testCollisionWithWalls(ball) {
  //COLLISION WITH VERTICAL WALLS ?
  if((ball.x + ball.radius) > w) {
    //The ball hit the right wall : IA win 1 point
    IA.point += 1;
    hit.play();
    //Put ball and IA at gamePlay position
    ball.x      = 300;
    ball.y      = 250; 
    ball.speedX = -speedBall;
    ball.speedY = 0;
    IA.y        = 210; 
  }
      
  else if((ball.x -ball.radius) < 0) {
    //The ball hit the left wall : player win 1 point 
    player.point += 1;
    hit.play();
    ball.x      = 300;
    ball.y      = 250; 
    ball.speedX = speedBall;
    ball.speedY = 0;
    IA.y        = 210; 
  }
  
  //COLLISIONS WTH HORIZONTAL WALLS ?
  if((ball.y + ball.radius) >= h) {
    //The ball hit the right wall
    //change horizontal direction
    ball.speedY = -ball.speedY;
    ball.y = h - ball.radius; }
  
  else if((ball.y -ball.radius) <= 0) {
    //The ball hit the left wall
    ball.speedY = -ball.speedY;
    ball.Y = ball.radius; }  
}

//Construct the boundary of the land
function centerTennisCourt() {
  let i = 0;
  while (i < h) {
    let line = {
      x:w/2,
      y:i,
      width:3,
      height:41,
      color:'white' }
    drawFilledRectangle(line);   
    i += line.height + 5;
  }
}

//Display the score
function displayScore(r, x, y) {
  ctx.save();
 
  ctx.font='55px Arial';
  ctx.fillStyle = r.color;
  ctx.fillText(r.point, x, y);
     
  ctx.restore();
}

//Draw the players
function drawFilledRectangle(r) {
  ctx.save();
  ctx.translate(r.x, r.y);
  
  ctx.fillStyle = r.color;
  ctx.fillRect(0, 0, r.width, r.height); 
      
  ctx.restore();
}
 
//Draw the ball
function drawFilledBall(c) {
  ctx.save();
  ctx.translate(c.x, c.y); 
   
  ctx.fillStyle = c.color;
  ctx.beginPath();
  ctx.arc(0, 0, c.radius, 0, 2*Math.PI);
  ctx.fill(); 
 
  ctx.restore();
} 

//display differents messages on the canvas 
function displayMessage(msg, size, color, x, y) {
  ctx.save();
  
  ctx.font = size + ' ' + 'Arial'; 
  ctx.fillStyle = color;
  ctx.fillText(msg, x, y);
     
  ctx.restore();
} 
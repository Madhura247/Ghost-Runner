var tower, climbers, ghost;
var towerimage, doorImage, climberImage;
var climberGroup, DoorGroup;
var gameState = "PLAY";

function preload(){
  towerimage = loadImage("tower.png");
  doorImage = loadImage("door.png"); 
  climberImage = loadImage("climber.png");
  ghostimage1 = loadImage("ghost-standing.png");
  ghostimage2 = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas (600, 600);
  spookySound.loop();
  tower = createSprite(300, 300);
  tower.addImage("towerImage", towerimage);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 300);
  ghost.addImage("ghostStanding", ghostimage1);
  ghost.addImage("ghostJumping", ghostimage2);
  ghost.scale = 0.5;

  climberGroup = new Group();
  DoorGroup = new Group();
}



function draw(){
  background (0);
  
  if (gameState === "PLAY") {
    
  if (tower.y>600) {
      tower.y = 300;
  }
  
  if (keyDown("space")) {
      ghost.velocityY = -10
  }
  
  if (keyDown("right")) {
      ghost.x = ghost.x + 5;
  }
  
  if (keyDown("left")) {
      ghost.x = ghost.x - 5;
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
  }

  if (ghost.y >= 600) {
      gameState = "end";
  }
  
  spawnDoors();
  drawSprites();
  }
  
  else if (gameState === "end") {
    background (0);
    textSize (40);
    stroke ("yellow");
    fill ("yellow");
    text ("Game Over", 230, 250);
  }
  
}

function spawnDoors() {
  if (frameCount%250 === 0){
  var door = createSprite(Math.round(random(100, 500)), 0);
  door.addImage("doorimage", doorImage);                 door.velocityY = 1;    
  DoorGroup.add(door);  
    
  var climbers = createSprite(door.x, door.y + 50);
    climbers.addImage ("climberimage",climberImage);
    climbers.velocityY = 1;     
    climberGroup.add(climbers);
  
  ghost.depth = door.depth;
  ghost.depth = ghost.depth+1;
  
  door.lifetime = 600;
  climbers.lifetime = 600; 
  }
}
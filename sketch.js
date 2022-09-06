var PLAY = 1;
var END = 0;
var gameState = 1;


var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOver,gameOverImg;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("gameover.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1.5;
  
  doorsGroup= createGroup();
  climbersGroup=createGroup();
  invisibleBlockGroup=createGroup();

  ghost = createSprite(300,500)
  ghost.addImage(ghostImg)
  ghost.scale=0.5

  ghost.setCollider("rectangle",0,0,150,150);
  ghost.debug= false

  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.4

}

function draw() {
  background(200);
  
   

    if(tower.y > 400){
      tower.y = 300
    }

    drawSprites()
    doors();

   if(keyDown("right_arrow"))  {
    ghost.x +=3
   }
   if(keyDown("left_arrow"))  {
    ghost.x -=3
   }
   if(keyDown("up_arrow"))  {
    ghost.y -=3
   }
   if(keyDown("down_arrow"))  {
    ghost.y +=3
 
  }
   


  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    gameState=END;
    gameOver.visible = true;
    ghost.destroy();
    
    tower.velocityY=0; 
    invisibleBlock.velocityY=0;
    door.velocityY=0;
    
    climber.velocityY=0 ;
    
   }
 
}




function doors(){

  if(frameCount % 200 ===0){
    
   door = createSprite(200,-50) 
   door.addImage(doorImg)
   door.velocityY=1
   door.x=Math.round(random(120,400))
   doorsGroup.add(door)
   door.lifetime=600


   climber= createSprite(200,10)
   climber.lifetime=600
   climbersGroup.add(climber)
   climber.addImage(climberImg)
   climber.velocityY=1
   climber.x=door.x

   invisibleBlock=createSprite(200,15)
   invisibleBlock.width=climber.width
   invisibleBlock.height=2
   invisibleBlock.velocityY=1
   invisibleBlock.x=door.x
   invisibleBlockGroup.add(invisibleBlock)
   invisibleBlock.lifetime=600
}

}
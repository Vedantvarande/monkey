
var monkey , monkey_running,monkeyCollided,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstacleGroup;
var score = 0;
var gameState = PLAY;
var PLAY = 0;
var END = 1;
var surTime = 0;

var invisibleWall;
function preload()
{
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeyCollided = loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}


function setup() 
{
  createCanvas(400,400);
  
  bananasGroup=createGroup();
  obstacleGroup=createGroup();
  
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale=0.1;
  monkey.addAnimation("collide",monkeyCollided);
 
  ground = createSprite(400,350,900,10);
  
  invisibleWall = createSprite(400,350,900,10);
  invisibleWall.visible=false;
  
}


function draw() 
{
  background("skyblue");
  
  bananas();
  obstacles();
  
  
  surTime=Math.ceil(frameCount/frameRate())
  fill(0);
  stroke(0);
  textSize(20);
  text("SURVIVAL TIME:"+surTime,209,30);
  text("Score:"+score,90,30);
 
  if(keyDown("space") && monkey.y >= 255) 
    {
      monkey.velocityY = -9; 
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleWall); 
  
  if(monkey.isTouching(bananasGroup))
    {
     score++;
     bananasGroup.destroyEach();
    } 
  
  if(monkey.isTouching(obstacleGroup))
    {
      monkey.y = 310;
      monkey.scale = 0.12;
      monkey.changeAnimation("collide", monkeyCollided);
      monkey.velocityY=0;
      
      obstacleGroup.setVelocityXEach(0);
      bananasGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      bananasGroup.setLifetimeEach(-1);
      
      surTime = 0;
      
      fill(0);
      stroke(0);
      textSize(20);
      text("GameOver",150,180);
    }

  
  
  drawSprites();
 
}


function bananas()
{
  
  if(frameCount% 80 === 0)
  {
  banana = createSprite(420,200,40,40);
  banana.addImage("bananas",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-4;
  banana.lifetime=220;
  bananasGroup.add(banana);
  }
}


function obstacles()
{
  if(frameCount % 200 === 0)
    {
      obstacle = createSprite(410,330,40,40);
      obstacle.addImage("obs",obstacleImage);
      obstacle.scale=0.1;
      obstacle.velocityX=-4;
      obstacle.setCollider("circle", 0, 0, 180);
      obstacle.debug=false;
      obstacle.lifetime=220;
      obstacleGroup.add(obstacle);
    }
}



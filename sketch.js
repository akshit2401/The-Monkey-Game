var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var survival=0;
var ground;
var yb;
var gameState="play";
var gameOver,gameOverImage;
var backgroundI;
var death=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOverImage=loadImage("gameOver.png");
  
  backgroundI=loadImage("background.png");
}



function setup() {
  createCanvas(400,400);

  monkey=createSprite(100,200,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.12;
  
  ground=createSprite(0,390,800,10);
  ground.velocityX=-5;
  ground.visible=false;
  
  gameOver=createSprite(200,170,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale=1;
  gameOver.visible=false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw() {
  background(backgroundI);
  
  fill("black");
  textSize(20);
  text("score:"+score,300,30);
  text("survival time:"+survival,100,30);
  
  if(ground.x<0){
      ground.x=ground.width/2;
    }
  
  if(gameState==="play"){
    monkey.velocityY=monkey.velocityY+0.8;       
    
    survival=Math.ceil(frameCount/frameRate());
    
    
    //console.log(score);
    
    if((keyDown("space") || touches.length>0)&& monkey.y>=120){
      monkey.velocityY=-12;
      touches=[];
    }
  
    monkey.collide(ground);
  
    if(monkey.isTouching(foodGroup)){
        foodGroup.destroyEach();
        score=score+1;
        if(score%10===0){      
           monkey.scale=monkey.scale+0.03;
        }
       } 
    
    if(monkey.isTouching(obstaclesGroup)){
      death=death+1;
      monkey.scale=monkey.scale-0.03;
      obstaclesGroup.destroyEach();
      score=score-1; 
    }
    console.log(death);
   if(death===2){
     gameState="end";
    }
    
    bananas();
    rock();
  }
  
  if(gameState==="end"){
     gameOver.visible=true;
     monkey.x=500;
     obstaclesGroup.destroyEach();
     foodGroup.destroyEach();
    
  }
  
   
  drawSprites();
}

function bananas(){
  if(frameCount%80===0){
    yb=Math.round(random(120,200));
    banana=createSprite(400,yb,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=150;
    
    foodGroup.add(banana);
  }
}

function rock(){
  if(frameCount%300===0){
    obstacle=createSprite(400,370,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.2;
    obstacle.lifetime=150;
    obstaclesGroup.add(obstacle);
  }
}

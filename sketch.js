var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  climbersGroup= new Group();
  coinGroup= new Group();
 // frog.debug=true
}

function draw(){
  background(0);
 
  


  
  if (gameState === "play") {
  
    if(keyDown("space")){
      frog.velocityY= -10
    }
    frog.velocityY=frog.velocityY+0.8
    if(keyDown("left")){
      frog.x-=3
    }
    if(keyDown("right")){
      frog.x+=3
    }

    if(frog.isTouching(coinGroup))
    {
      score+=10;
      coinGroup.destroyEach();
    }
    if(gameState==="play" && frog.y>450){
      gameState="end"
    
    }

    spawnCoin()
  }
  
  if (gameState === "end"){
    ocean.visible= false
    stroke("yellow");
    fill("red");
    textSize(40);
    text("GAME OVER" ,180,250)
    climbersGroup.setVelocityYEach(0)
    coinGroup.setVelocityYEach(0)
    frog.velocityY=0;

    

  }
  frog.collide(climbersGroup)
  drawSprites();
  stroke("yellow");
  fill("black");
  textSize(20);
  text("SCORE : "+ score, 450,30)
}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same
   var climber= createSprite(Math.round(random(50,500)),0,90,10)
   climber.addImage(climberImg);
   climber.scale=0.4
   climber.velocityY=3;
   //climber.debug=true;
   climber.setCollider('rectangle',0,0,climber.width-30,30)
    climbersGroup.add(climber)
    climbersGroup.setLifetimeEach(200);
   var coin= createSprite(climber.x,climber.y-50,90,10)
   coin.addImage(coinImg);
   coin.scale=0.1
   coin.velocityY=3;
   coinGroup.add(coin)
   //coin.debug=true;
   coinGroup.setLifetimeEach(200);

   coin.depth=frog.depth
   climber.depth=frog.depth
   frog.depth+=1; 
  }
}



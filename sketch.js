var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,
swordImg,gameOverImg;
var treasureCollection = 0;
var cashGroup,diamondsGroup,jwelleryGroup,swordGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg =loadAnimation("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
  
path = createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;
  
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("circle",0,0,500);

cashGroup = new Group();
diamondsGroup = new Group();
jwelleryGroup = new Group();
swordGroup = new Group();

}

function draw() {
  background(0);

  if(gameState===PLAY){
    boy.x = World.mouseX;
    
    edges = createEdgeSprites();
    boy.collide(edges);
    
    if(path.y > height ){
    path.y = height/2;
    }
    
    if (cashGroup.isTouching(boy)) {
      cashGroup.destroyEach();
      treasureCollection = treasureCollection+50;
    }
    else if (diamondsGroup.isTouching(boy)) {
      diamondsGroup.destroyEach();
      treasureCollection = treasureCollection+150;
      
    }else if(jwelleryGroup.isTouching(boy)) {
      jwelleryGroup.destroyEach();
      treasureCollection = treasureCollection + 100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;

        boy.addAnimation("SahilRunning",gameOverImg);
        boy.x = width/2;
        boy.y = height/2;
        boy.scale=0.6;
        
        path.velocityY = 0;
        
        cashGroup.destroyEach();
        diamondsGroup.destroyEach();
        jwelleryGroup.destroyEach();
        swordGroup.destroyEach();
        
        cashGroup.setVelocityYEach(0);
        diamondsGroup.setVelocityYEach(0);
        jwelleryGroup.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
      }
    }
     
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
  }

  drawSprites();
  textSize(20);
  fill("white");
  text("Treasure: "+treasureCollection,width-150,30);

}

function createCash() {
  if (World.frameCount % 180 == 0) {
  cash = createSprite(Math.round(random(50, width-50),40,
  10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 180;
  cashGroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 400 == 0) {
  diamonds = createSprite(Math.round(random(50, width-50),40,10,     10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 180;
  diamondsGroup.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 280 == 0) {
  jwellery = createSprite(Math.round(random(50, width-50),40,     10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 180;
  jwelleryGroup.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 200 == 0) {
  sword = createSprite(Math.round(random(50, width-50),40,
  10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 180;
  swordGroup.add(sword);
  }
}
var player, playerImage;
var banana, bananaImage;
var jungle, jungleImage;
var stone, stoneImage;

function preload() {
  playerImage =
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg");
}
 function setup(){
   createCanvas(600, 600);
  
  //creating background
  background = createSprite(0,0,600,600);
  background.addImage(jungleImage);
  background.scale = 2;
  background.visible = true;
   
   
 monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey);
  monkey.scale = 0.1;

  bGroup = createGroup();
  oGroup = createGroup();

  score = 0;

}


function draw() {

  background(255);


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }



  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  spawnFood();
  spawnObstacles();

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);


  if (oGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    oGroup.setVelocityXEach(0);
    bGroup.setVelocityXEach(0);
    oGroup.setLifetimeEach(-1);
    bGroup.setLifetimeEach(-1);
  }

   if(monkey.isTouching(bGroup)){
     bGroup.destroyEach();
   }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 100, 50);
}



function spawnFood() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    banana.addImage(bananaImage);
    banana.scale = 0.05;

    bGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;
 
    obstacle.lifetime = 300;

    oGroup.add(obstacle);
  }
}




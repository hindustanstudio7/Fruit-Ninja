var PLAY = 1;
var END = 0;
var gameState = PLAY;

var knife, fruit1, fruit2, fruit3, fruit4, enemy1, enemy2;

var knifeImage, fruit1Image, fruit2Image, fruit3Image, fruit4Image, enemy_moving;

var fruitGroup, enemyGroup;

var score = 0;

var gameOverImage, gameOver_sound;

function preload() {

  //load images of  the objects
  knifeImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  enemy1Image = loadImage("alien1.png");
  enemy2Image = loadImage("alien2.png");
  cuttingSound = loadSound("knifeSwooshSound.mp3")
  gameOver_sound = loadSound("gameover.mp3")
  gameOverImage = loadImage("gameover.png")

}

function setup() {
  createCanvas(600, 600);

  // creating knife
  knife = createSprite(480, 220, 20, 50);
  knife.addImage(knifeImage);
  knife.scale = 0.7;

  //creating groups
  fruitGroup = new Group();
  enemyGroup = new Group();

}

function draw() {
  background("lightblue");

  //score board
  text("Score: " + score, 500, 50);

  //function od play state
  if (gameState === PLAY) {
    //moving knife with the mouse pointer
    knife.x = mouseX;
    knife.y = mouseY;

    //calling the function to create fruit
    fruits();

    //calling the function to create enemy
    enemies();

    //cutting the fruit and increasing score
    if (knife.isTouching(fruitGroup)) {
      score = score + 1
      fruitGroup.destroyEach();
      cuttingSound.play();
    }

    //to end the game and change its state
    if (knife.isTouching(enemyGroup)) {
      gameState = END;
      gameOver_sound.play();
    }
  }

  //functions of ens state
  else if (gameState === END) {

    //changing knife image to game over image
    knife.addImage(gameOverImage);
    knife.x = 300;
    knife.y = 300;
    knife.scale = 1;

    //destroying the sprites
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
  }

  drawSprites();
}

//creating the fruits
function fruits() {
  var rand = Math.round(random(1, 4));
  console.log(rand);

  //to make the fruits come randomly
  if (frameCount % 80 === 0) {
    var fruit = createSprite(600, 165, 10, 40);
    //fruit.velocityX = -(7 + score/5);
    fruit.scale = 0.2;

    switch (rand) {
      case 1:
        fruit.addImage(fruit1Image)
        break;
      case 2:
        fruit.addImage(fruit2Image)
        break;
      case 3:
        fruit.addImage(fruit3Image)
        break;
      case 4:
        fruit.addImage(fruit4Image)
        break;
    }
    //giving lifetime to fruit
    fruit.setLifetime = 100;

    //fruit to come from random Y position
    fruit.y = Math.round(random(50, 410));

    position = Math.round(random(1, 2))
    if (position == 1) {
      fruit.x = 500;
      fruit.velocityX = -(7 + score / 5);
    } else if (position == 2) {
      fruit.x = 50;
      fruit.velocityX = (7 + score / 5);
    }
    fruitGroup.add(fruit);
  }
}

//creating enemies
function enemies() {
  var rand = Math.round(random(1, 2));

  //generating random enemies
  if (frameCount % 150 === 0) {
    var enemy = createSprite(600, 165, 10, 40);
    enemy.velocityX = -(8 + score / 10);

    switch (rand) {
      case 1:
        enemy.addImage(enemy1Image);
        break;
      case 2:
        enemy.addImage(enemy2Image);
    }

    //giving lifetime to enemy
    enemy.lifetime = 100

    //enemy to come from random Y position
    enemy.y = Math.round(random(100, 300));
    enemyGroup.add(enemy);
  }
}
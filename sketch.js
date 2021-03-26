
var database;
var item;
var foodLeft;
var foodStock;

function preload()
{
 dogimg1 = loadImage("images/sadDog.png");
 dogimg2 = loadImage("images/happyDog.png");
 bottle = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(200, 400, 20, 20);
  dog.addImage(dogimg1);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readFood, showError);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("addFood");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {
  
  background("white");

  drawSprites();
  if(keyWentDown(UP_ARROW)){
    writeFood(item);
    dog.addImage(dogimg2);
  }

  milkDisplay();

}

function feedDog(x){
  dog.addImage(dogimg2);
  foodStock : x;
  x = x - 1;
  if(x < 0){
    x = 0;
  }
  database.ref('/').set({
    Food:x,
  feedTime: hour()
  })
}


function readFood(data){
  item = data.val();
}

function showError(){
  console.log("errorInReadingDatabase");
}

function addFoods(){
  item++
  database.ref('/').update({
    Food:item
  })
}

function milkDisplay(){
  var x = 80;
  var y = 100;
  imageMode(CENTER);
  if(item !== 0){
    for(var i = 0; i < item; i++){
      if(i% 10 === 0){
        x = 80;
        y = y + 50;
      }
      image(bottle, x, y, 50, 50);
      x = x + 30;
    }
  }
}


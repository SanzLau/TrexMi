//VARIABLES
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstacle;
var newImage;

//FUNCIÓN DONDE SE GUARDAN LAS IMÁGENES Y ANIMACIONES.
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
 
}

function setup() { 
  createCanvas(600, 200);  //crea canvas del juego.

  trex = createSprite(50,160,20,50);   //Crea sprite se trex
  trex.addAnimation("running", trex_running);   //Se agrega animación al sprite
  trex.scale = 0.5;  //Se cambia de tamaño
  
  ground = createSprite(200,180,400,20);  //Crea sprite del suelo
  ground.addImage("ground",groundImage);   ///Se agrega imagen al suelo
  ground.x = ground.width /2;  //  
  ground.velocityX = -4;  //Velocidad al suelo hacia la izquierda
  
  invisibleGround = createSprite(200,190,400,10); //Crea suelo invisible
  invisibleGround.visible = false; //El suelo se hace invisible.

  console.log("Miguel tiene "+13+ " años") //Concatenación

  
}

function draw() {
  background(180);
    
  //El trex brinca al presionar la barra espaciadora solo cuando la posición de Y del trex es mayor o igual a 150.
  if(keyDown("space") && trex.y>=150) {
    trex.velocityY = -10; //Velocidad hacia arriba
  }
  
  trex.velocityY = trex.velocityY + 0.8    //Da gravedad al trex
  
  // Regresa el suelo a la mitad del canvas para simular el movimiento.
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //Trex colisiona contra el suelo invisible para no caer.
  trex.collide(invisibleGround);
  
  //Aparecer nubes
  spawnClouds();
  //Aparecer obstaculos
  spawnObstacles();
  
  drawSprites(); //Dibuja los sprites
}

//FUNCIÓN QUE CREA LAS NUBES
function spawnClouds() {
  
  //Las nubes aparecen cada 60 cuadros
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))  //Las nubes aparecen de forma aleatoria en Y.
    cloud.scale = 0.4;
    cloud.velocityX = -3;

    //Tiempo de vida de nubes
    cloud.lifetime = 200;
    
    //ajustar la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

// FUNCIÓN QUE CREA LOS OBSTACULOS.
function spawnObstacles(){
  //Las obstaculos aparecen cada 60 cuadros.
  if (frameCount % 60 === 0) {
   obstacle= createSprite(600,165,10,40);
   obstacle.velocityX =-6;
}
}
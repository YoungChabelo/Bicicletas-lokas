var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 
//cosas nuevas
var FM4,FM95,FMlofi
var FM4img,FM95img,FMlofiimg;
var Caroline,Gorillaz,Megalovania;
var ra;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");

  //radio
  FM4img = loadImage("images/FM4.png");
  FM95img = loadImage("images/FM95.png");
  FMlofiimg = loadImage("images/FMLOFI.png");

  Caroline = loadSound("sound/caroline.mp3");
  Gorillaz = loadSound("sound/gorillaz.mp3");
  Megalovania = loadSound("sound/lofi.mp3");

}


function setup(){
  
createCanvas(1400,300);
// Fondo en movimiento
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//crear el niño que corre
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//establece el colisionador para el mainCyclist
mainCyclist.setCollider("rectangle",0,0,1300,1400);
mainCyclist.debug = true;
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();

//Radiodifusoras
FM4 = createSprite(1300,250);
FM4.addImage(FM4img);
FM4.scale=0.4;

FM95 = createSprite(1300,150);
FM95.addImage(FM95img);
FM95.scale=0.6;

FMlofi = createSprite(1300,50);
FMlofi.addImage(FMlofiimg);
FMlofi.scale=0.3;

}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ distance,900,30);
  text("Presiona S para quitar la musica",800,250);
  text("Presiona alguna estacion para escuchar musica",800,270);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //código para reiniciar el fondo
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //código para reproducir el sonido de la campana del ciclista
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //crear jugadores oponentes de forma continua
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }

    if(keyDown("s")){
      Megalovania.stop();
      Gorillaz.stop();
      Caroline.stop();
    }
    
    if(mousePressedOver(FM4)){
      Caroline.play();
      Gorillaz.stop();
      Megalovania.stop();
    }
    if(mousePressedOver(FM95)){
      Gorillaz.play();
      Caroline.stop();
      Megalovania.stop();
    }
    if(mousePressedOver(FMlofi)){
      Megalovania.play();
      Gorillaz.stop();
      Caroline.stop();
    }



    /*if(pinkCG.isTouching(mainCyclist) || (yellowCG.isTouching(mainCyclist) || redCG.isTouching(mainCyclist) )*/
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Agrega aquí el código para mostrar la instrucción de reinicio del juego, en forma de texto
    text("Presiona GAMEOVER para reiniciar",500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    Megalovania.stop();
    Gorillaz.stop();
    Caroline.stop();

    //escribe la condición para llamar reset( )
   if(mousePressedOver(gameOver)) {
      reset();
      }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

//crea aquí la función de reinicio
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
}






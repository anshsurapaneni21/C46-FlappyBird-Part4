var player;

var topObstacleGroup, bottomObstacleGroup;

var gameState;

var LBottomBlockimg, LTopBlockimg;

var MBottomBlockimg, MTopBlockimg;

var SBottomBlockimg, STopBlockimg;

var DayBackground

var Background;

var FlappyBird;

var restart, restart1;

function preload(){
    FlappyBird = loadImage("images/FlappyBird.png");

    LBottomBlockimg = loadImage("images/BottomBlockLarge.png");
    LTopBlockimg = loadImage("images/TopBlockLarge.png");

    MBottomBlockimg = loadImage("images/BottomBlockMedium.png");
    MTopBlockimg = loadImage("images/TopBlockMedium.png");

    SBottomBlockimg = loadImage("images/BottomBlockSmall.png");
    STopBlockimg = loadImage("images/TopBlockSmall .png");

    DayBackground = loadImage("images/FlappyBirdBackgroundDay.png");

    restart = loadImage("images/restart.png");
}


function setup(){
    createCanvas(displayWidth, displayHeight);

    
    Background = createSprite(displayWidth/2,displayHeight/2);
    Background.addImage(DayBackground)
    Background.velocityX = -2;

    player = createSprite(40,height/2,50,50);
    //player.velocityX = 1;
    player.addImage(FlappyBird);
    player.scale = 0.5;

    restart1 = createSprite(displayWidth/2,displayHeight/2,20,20);
    restart1.visible = false;
    restart1.addImage(restart);

    topObstacleGroup = new Group();

    bottomObstacleGroup = new Group();

    gameState = "PLAY";

}

function draw(){
    background(0);

    if(gameState == "PLAY"){
        if(keyDown("space")){
            player.velocityY = -5;
        }
        player.velocityY+=0.5;

        if(player.isTouching(topObstacleGroup) || player.isTouching(bottomObstacleGroup)){
            gameState = "END";
        }
        topObstacles();
        bottomObstacles();
        if(Background.x < displayWidth/2 - 300){
            Background.x = displayWidth/2;
        }

    }
    else if(gameState == "END"){
        player.velocityY = 0;
        topObstacleGroup.setVelocityXEach(0);
        bottomObstacleGroup.setVelocityXEach(0);
        restart1.visible = true;
        if(mousePressedOver(restart1)){
            restartfunction();
        }

    }
    drawSprites();
}

function topObstacles(){
    if(frameCount%100 === 0){
        var topObstacle = createSprite(width,random(100,200),50,random(100,350));
        var randomNumber = Math.round(random(1,2));
        switch(randomNumber){
            case 1 :
                console.log("tl");
                topObstacle.addImage(LTopBlockimg);
                break;
            case 2 :
                console.log("tm");
                topObstacle.addImage(MTopBlockimg);
                break;
            //case 3 :
                //topObstacle.addImage(STopBlockimg);
                //break;
            default:
                break;
        }
        topObstacle.velocityX = -6;
        topObstacle.lifetime = width/6;
        topObstacleGroup.add(topObstacle);
        
    }
}

function bottomObstacles(){
    if(frameCount%100 === 0){
        var bottomObstacle = createSprite(width,height-random(10,50),50,random(100,350));
        var randomNumber = Math.round(random(1,2));
        switch(randomNumber){
            case 1 :
                console.log("bl");
                bottomObstacle.addImage(LBottomBlockimg);
                break;
            case 2 :
                console.log("bm");
                bottomObstacle.addImage(MBottomBlockimg);
                break;
            //case 3 :
                //bottomObstacle.addImage(SBottomBlockimg);
                //break;
            default:
                break;
        }
        bottomObstacle.velocityX = -6;
        bottomObstacle.lifetime = width/6;
        bottomObstacleGroup.add(bottomObstacle);
    }

}

function restartfunction(){
    //count = 0;
    gameState = "PLAY";
    topObstacleGroup.destroyEach();
    bottomObstacleGroup.destroyEach();
    restart1.visible = false;
}

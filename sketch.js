const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var particles;
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = -100;
var turn = 0;
gameState = "start";

function setup() {
  createCanvas(450, 700);
  engine = Engine.create();
  world = engine.world;

  //ground = new Ground(width/2,height,width,20);
    
    //divisions loop
    for (var k = 0; k <=width; k = k + 50) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }

    //plinko loop
    for (var j = 50; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }
    for (var j = 30; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,125));
    }
     for (var j = 50; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }
     for (var j = 30; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,225));
    }
    for (var j = 50; j <=width; j=j+50) {
        plinkos.push(new Plinko(j,275));
     }
      for (var j = 30; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,325));
     }
  mousePressed();
}

function draw() {
  background(0);  
  Engine.update(engine);
  
  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }
  for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

  if (particles !== null) {
    particles.display();
    var pos = particles.body.position;
    //score management
    if(pos.y > 650) {

      if(pos.x > 0 && pos.x < 50 || pos.x > 400 && pos.x < 450) {
        score = score+100;
        particles = null;
        if (turn>=6) gameState = "end";
      } 
      if(pos.x > 50 && pos.x < 100 || pos.x > 350 && pos.x < 400) {
        score = score+200;
        particles = null;
        if (turn>=6) gameState = "end";
      } 
      if(pos.x > 100 && pos.x < 150 || pos.x > 300 && pos.x < 350) {
        score = score+300;
        particles = null;
        if (turn>=6) gameState = "end";
      } 
      if(pos.x > 150 && pos.x < 200 || pos.x > 250 && pos.x < 300) {
        score = score+400;
        particles = null;
        if (turn>=6) gameState = "end";
      }
      if( pos.x > 200 && pos.x < 250) {
        score = score+500;
        particles = null;
        if (turn>=6) gameState = "end";
      }


    }
  }

  if(gameState === "end") {
    push();
    fill("yellow")
    textSize(25);8
    text("GAME OVER",150,45);
    fill("red")
    textSize(20)
    text("Press Space To Play Angain",100,105)
    pop();
  }

  //limit chances
  if(turn === 7) {
    gameState = "end";
    turn = 0;
  }

  //score text
  if(score > -1) {
    fill("white");
    textFont("goergia");
    textSize(30);
    text("Score: "+score,180,380);
    fill(177, 242, 255);
    textSize(15)
    text("Challenge for you to score above 2300 in 5 Turns",90,300)
  }
  //score info
  textFont("goergia");
  fill("white")
  textSize(20)
  text("100    200    300    400    500    400    300    200    100",8,500);

}

//mousePressed
function mousePressed() {
    if (gameState !== "end") {
      turn++;
      particles = new Particle(mouseX, 10, 10, 10);
    }
}

//restart
function keyPressed() {
  if(keyCode === 32) {
      if(gameState === "end") {
        gameState = "start";
        score = 0;
      }
    }
}
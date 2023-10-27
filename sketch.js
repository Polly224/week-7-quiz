// variables, you know the deal.
let table;
let img;
let questionHeight = 0
let correctlyAnsweredAmount = 0;
let correctAnswer;
let selectedQuestion;
let questionsList = [];
let waitingScreen = false;
let mainMenuRn = false;
let youFuckedUp = false;

function preload(){
  // load the silly quiz thumbnail and table including the questions from the assets folder.
  table = loadTable("assets/Questions.csv", "csv", "header");
  img = loadImage("assets/SILLY.png");
}


function setup() {
  // load the canvas, background, set the list of questions to empty in order to fill it up with the whole list again.
  createCanvas(800, 600);
  background(220)
  questionsList = [];
  correctlyAnsweredAmount = 0;
  for (let i = 0; i < table.getColumnCount(); i++) {
    questionsList.push(i)
  }
  selectedQuestion = random(questionsList);
  mainMenu();
}

function draw() {
  // shows the amount of correctly answered questions at the top left of the screen.
  if(!mainMenuRn){
    text(correctlyAnsweredAmount.toString() + "/10", 50, 50);
  }
}

function question(gay, qA){
  // this function is called every time a question is displayed on the screen,
  // it lets the other functions know which of the answers is correct, as well as displaying the question and 4 answers.
  if(gay){
    console.log("gay");
  }
  if(questionsList.length > 0){
    background(220)
    fill("white");
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < 2; j++){
        rect(i * 400, 200 + j * 200, 400, 200);
      }
    }
    fill("black")
    textAlign(CENTER, CENTER);
    textSize(parseInt(qA[6]));
    text(qA[0], 400, 100)
    textSize(30)
    questionHeight = 0;
    if(qA.length > 5){
      for(let i = 0; i < 4; i++) {
        if(i > 1){
          questionHeight = 1
        }
        text(qA[i + 1], (i % 2) * 400 + 200, 300 + 200 * questionHeight);
      }
    }
  }
  correctAnswer = qA[5];
}

function mouseClicked(){
  // detects which of the buttons the mouse is hovering over when you click the mouse so you can select the option you want to.
  // it calls the "buttonGotPressed()" function, which is explained inside said function.
  if(!mainMenuRn && !waitingScreen){
    if(mouseX < 400 && mouseY > 200 && mouseY < 400){
      buttonGotPressed("1");
    }
    if(mouseX < 400 && mouseY > 400 && mouseY < 600){
      buttonGotPressed("3");
    }
    if(mouseX > 400 && mouseX < 800 && mouseY > 200 && mouseY < 400){
      buttonGotPressed("2");
    }
    if(mouseX > 400 && mouseX < 800 && mouseY > 400 && mouseY < 600){
      buttonGotPressed("4");
    }
  }
}

function buttonGotPressed(butNum){
  // takes the number received from mouseClicked() and checks if it's the same as correctAnswer,
  // which is defined in question(). also triggers the intermission() function when done checking.
  if(correctAnswer.indexOf(butNum) > -1 && correctlyAnsweredAmount < 10){
    correctlyAnsweredAmount += 1;
    intermission(1);
  } else{
    intermission(0);
  }
  for (let i = 0; i < questionsList.length; i++) {
    if(questionsList[i] == selectedQuestion){
      questionsList.splice(i, 1);
      break;
    }
  }
  selectedQuestion = random(questionsList);
}
function intermission(buh){
  // triggered after selecting one of the answers to the displayed question. if the player answered correctly
  // and they haven't reached 10 correct answers yet, the quiz lets them know they did it correctly,
  // otherwise it's back to the start.
  background(220);
  textSize(50);
  if(correctlyAnsweredAmount < 10){
      if(buh == 1){
      text("Correct answer!", 400, 200);
      textSize(30);
      text("Press enter for the next question!!!", 400, 300);
      waitingScreen = true;
    }
    if(buh == 0){
      text("Wrong answer... :(", 400, 200);
      textSize(30);
      text("Press enter to restart, dumbass!", 400, 300);
      youFuckedUp = true;
    }
  } else {
    text("You won! Great Job!", 400, 200);
    textSize(30);
    text("Reload the page to start again if you wanna :)", 400, 300);
  }

}

function keyPressed(){
  // decides what to do when the player presses enter with very professional variable names.
    if(waitingScreen){
      if(key == "Enter"){
        if(correctlyAnsweredAmount < 10){
          question(true, table.getColumn(selectedQuestion));
        waitingScreen = false;
        }
      }
    }
    if(mainMenuRn){
      if(key == "Enter"){
        question(true, table.getColumn(selectedQuestion));
        mainMenuRn = false;
      }
    }
    if(youFuckedUp){
      if(key == "Enter"){
        setup();
        waitingScreen = false;
      }
    }
}

function mainMenu(){
  // shows the main menu. triggered on setup and when pressing enter after getting a question wrong.
  youFuckedUp = false;
  background(220);
  mainMenuRn = true;
  image(img, 100, 0);
  fill("black")
  textAlign(CENTER);
  textSize(50)
  text("Press enter to begin!", 400, 500);
}
const title = document.querySelector("#level-title");
const greenBtn = document.querySelector("#green");
const redBtn = document.querySelector("#red");
const yellowBtn = document.querySelector("#yellow");
const blueBtn = document.querySelector("#blue");
const body = document.body;

const greenSound = new Audio("./sounds/green.mp3");
const redSound = new Audio("./sounds/red.mp3");
const yellowSound = new Audio("./sounds/yellow.mp3");
const blueSound = new Audio("./sounds/blue.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");

const buttons = [greenBtn, redBtn, yellowBtn, blueBtn];
const sounds = [greenSound, redSound, yellowSound, blueSound, wrongSound];

const colors = ["green", "red", "yellow", "blue"];

let soundsPlayed = [];
let playerPlayed = [];

let currentLevel = 0;
let randomNumber = 0;

let gameStarted = false;

document.body.addEventListener("keydown", (e) => {
  if (gameStarted === false) {
    gameStarted = true;
    generateNextSound();
  }
});

function generateRandomIndex() {
  randomNumber = Math.trunc(Math.random() * 4);
}

function updateLevel() {
  currentLevel++;
  title.textContent = `Level ${currentLevel}`;
}

function generateNextSound() {
  generateRandomIndex();
  title.textContent = `Level ${currentLevel}`;
  // Style on play
  buttons[randomNumber].classList.add("pressed");

  setTimeout(() => {
    buttons[randomNumber].classList.remove("pressed");
  }, 100);

  // Functionality
  sounds[randomNumber].play();
  soundsPlayed.push(colors[randomNumber]);
}

let state = false;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    if (gameStarted === true) {
      // Style on press
      buttons[i].classList.add("pressed");

      setTimeout(() => {
        buttons[i].classList.remove("pressed");
      }, 100);

      // Functionality

      playerPlayed.push(colors[i]);
      sounds[i].play();
      state = false;

      if (playerPlayed.length === soundsPlayed.length) {
        soundsPlayed.forEach((e, i) => {
          if (e === playerPlayed[i]) {
            state = true;
          } else {
            gameStarted = false;
            state = false;
            sounds[4].play();
            body.classList.add("game-over");
            title.textContent = `You lost at level ${currentLevel}!`;
            setTimeout(() => {
              body.classList.remove("game-over");
            }, 200);
            setTimeout(() => {
              title.textContent = `Game Over, Press Any Key to Restart`;
              currentLevel = 0;
              soundsPlayed = [];
              playerPlayed = [];
            }, 2000);
          }
        });
        if (state === true && gameStarted === true) {
          updateLevel();
          setTimeout(() => {
            generateNextSound();
          }, 500);
          playerPlayed = [];
        }
      }
    }
  });
}

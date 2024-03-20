import inquirer from "inquirer";

type UserInput = {
  gussedNumber: number;
};

let attempts: number = 3;
let play: boolean = true;

let randomNumber: number = Math.floor(Math.random() * 10 + 1);
console.log("Please guess number between 1 to 10 in 3 attempts: ");

while (play) {
  while (attempts > 0) {
    await startGuess();
    attempts--;
  }
  await playAgain();
}

async function startGuess() {
  const answer: UserInput = await inquirer.prompt([
    {
      type: "number",
      name: "gussedNumber",
      message: "Please enter your gussed number between 1 to 10: ",
    },
  ]);

  if (answer.gussedNumber == randomNumber) {
    console.log("Hurry! you gussed right number!");
    attempts = 0;
    play = false;
  } else {
    console.log("You guessed wrong number!");
    if (answer.gussedNumber > randomNumber) {
      console.log("Guess a lower number!");
    } else {
      console.log("Guess a higher number!");
    }
    console.log(`You have ${attempts - 1} attempts left`);
    // play = false;
  }
}

async function playAgain() {
  const answer = await inquirer.prompt([
    {
      name: "playAgain",
      message: "wanna play again?",
      type: "confirm",
    },
  ]);

  if (answer.playAgain === true) {
    attempts = 3;
    randomNumber = Math.floor(Math.random() * 10 + 1);
  } else {
    console.log("exiting game...");
    play = false;
  }
}

import inquirer from "inquirer";

type AnserType = {
  userInput: string;
};

type PlayAgain = {
  userInput: boolean;
};

let play: boolean = true;

console.log("Welcome to Words Counter App!");

while (play) {
  await wordCounter();
  await playAgain();
}

async function wordCounter() {
  const answers: AnserType = await inquirer.prompt([
    {
      type: "input",
      message: "Enter your sentence for word counting: ",
      name: "userInput",
    },
  ]);

  const result = answers.userInput.trim().split(" ");

  console.log(`Your sentence word count is ${result.length}`);
}

async function playAgain() {
  const answer: PlayAgain = await inquirer.prompt([
    {
      type: "confirm",
      message: "Wanna count words for something else? ",
      name: "userInput",
    },
  ]);

  if (answer.userInput === true) {
    play = true;
  } else {
    play = false;
  }
}

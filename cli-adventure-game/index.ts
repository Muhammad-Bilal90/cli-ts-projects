import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";

class Player {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  fuelDecrease() {
    let fuel = this.fuel - 25;
    this.fuel = fuel;
  }
  fuelIncrease() {
    this.fuel = 100;
  }
}

class Opponent {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  fuelDecrease() {
    let fuel = this.fuel - 25;
    this.fuel = fuel;
  }
  fuelIncrease() {
    this.fuel = 100;
  }
}

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 5000);
  });
};
async function welcome() {
  let rainbowTitle = chalkAnimation.neon(
    chalk.bold("Welcome to Cli Adventure Game!")
  );

  await sleep();
  rainbowTitle.stop();
}
await welcome();

let playAgain: boolean = true;

let player = await inquirer.prompt([
  {
    type: "input",
    name: "playerName",
    message: "Please enter your name: ",
  },
]);

let opponent = await inquirer.prompt([
  {
    type: "list",
    name: "opponentName",
    choices: ["Skeleton", "Assassin", "Zombie"],
    message: "Please select your Opponent: ",
  },
]);

let p1 = new Player(player.playerName);
let o1 = new Opponent(opponent.opponentName);

console.log(`${p1.name} VS ${o1.name}`);
while (playAgain) {
  if (opponent.opponentName == "Skeleton") {
    let operation = await inquirer.prompt([
      {
        type: "list",
        name: "operation",
        choices: ["Attack", "Drink Portion", "Run for Life"],
        message: "Select opertion to perform: ",
      },
    ]);
    if (operation.operation == "Attack") {
      let num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuelDecrease();
        console.log(
          `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.red(
            `${p1.fuel}`
          )}`
        );
        console.log(
          `${chalk.bold.blue(`${o1.name}`)}'s fuel is now: ${chalk.bold.green(
            `${o1.fuel}`
          )}`
        );
        if (p1.fuel <= 0) {
          console.log(
            `${chalk.bold.blue(`${p1.name}`)}, ${chalk.bold.red(
              "You Loose better luck next time. :("
            )}`
          );
          playAgain = false;
        }
      }
      if (num <= 0) {
        o1.fuelDecrease();
        console.log(
          `${chalk.bold.blue(`${o1.name}`)}'s fuel is now: ${chalk.bold.red(
            `${o1.fuel}`
          )}`
        );
        console.log(
          `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.green(
            `${p1.fuel}`
          )}`
        );
        if (o1.fuel <= 0) {
          console.log(
            `${chalk.bold.green("Congratulations!")}, ${chalk.bold.blue(
              `${p1.name}`
            )}, ${chalk.bold.green("You WIN.")}`
          );
          playAgain = false;
        }
      }
    }
    if (operation.operation == "Drink Portion") {
      p1.fuelIncrease();
      console.log(
        `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.green(
          `${p1.fuel}`
        )}`
      );
    }
    if (operation.operation == "Run for Life") {
      console.log(
        `${chalk.bold.blue(`${p1.name}`)}, ${chalk.bold.red(
          "You Loose better luck next time. :("
        )}`
      );
      playAgain = false;
    }
  }
  if (opponent.opponentName == "Assassin") {
    let operation = await inquirer.prompt([
      {
        type: "list",
        name: "operation",
        choices: ["Attack", "Drink Portion", "Run for Life"],
        message: "Select opertion to perform: ",
      },
    ]);
    if (operation.operation == "Attack") {
      let num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuelDecrease();
        console.log(
          `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.red(
            `${p1.fuel}`
          )}`
        );
        console.log(
          `${chalk.bold.blue(`${o1.name}`)}'s fuel is now: ${chalk.bold.green(
            `${o1.fuel}`
          )}`
        );
        if (p1.fuel <= 0) {
          console.log(
            `${chalk.bold.blue(`${p1.name}`)}, ${chalk.bold.red(
              "You Loose better luck next time. :("
            )}`
          );
          playAgain = false;
        }
      }
      if (num <= 0) {
        o1.fuelDecrease();
        console.log(
          `${chalk.bold.blue(`${o1.name}`)}'s fuel is now: ${chalk.bold.red(
            `${o1.fuel}`
          )}`
        );
        console.log(
          `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.green(
            `${p1.fuel}`
          )}`
        );
        if (o1.fuel <= 0) {
          console.log(
            `${chalk.bold.green("Congratulations!")}, ${chalk.bold.blue(
              `${p1.name}`
            )}, ${chalk.bold.green("You WIN.")}`
          );
          playAgain = false;
        }
      }
    }
    if (operation.operation == "Drink Portion") {
      p1.fuelIncrease();
      console.log(
        `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.green(
          `${p1.fuel}`
        )}`
      );
    }
    if (operation.operation == "Run for Life") {
      console.log(
        `${chalk.bold.blue(`${p1.name}`)}, ${chalk.bold.red(
          "You Loose better luck next time. :("
        )}`
      );
      playAgain = false;
    }
  }
  if (opponent.opponentName == "Zombie") {
    let operation = await inquirer.prompt([
      {
        type: "list",
        name: "operation",
        choices: ["Attack", "Drink Portion", "Run for Life"],
        message: "Select opertion to perform: ",
      },
    ]);
    if (operation.operation == "Attack") {
      let num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuelDecrease();
        console.log(
          `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.red(
            `${p1.fuel}`
          )}`
        );
        console.log(
          `${chalk.bold.blue(`${o1.name}`)}'s fuel is now: ${chalk.bold.green(
            `${o1.fuel}`
          )}`
        );
        if (p1.fuel <= 0) {
          console.log(
            `${chalk.bold.blue(`${p1.name}`)}, ${chalk.bold.red(
              "You Loose better luck next time. :("
            )}`
          );
          playAgain = false;
        }
      }
      if (num <= 0) {
        o1.fuelDecrease();
        console.log(
          `${chalk.bold.blue(`${o1.name}`)}'s fuel is now: ${chalk.bold.red(
            `${o1.fuel}`
          )}`
        );
        console.log(
          `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.green(
            `${p1.fuel}`
          )}`
        );
        if (o1.fuel <= 0) {
          console.log(
            `${chalk.bold.green("Congratulations!")}, ${chalk.bold.blue(
              `${p1.name}`
            )}, ${chalk.bold.green("You WIN.")}`
          );
          playAgain = false;
        }
      }
    }
    if (operation.operation == "Drink Portion") {
      p1.fuelIncrease();
      console.log(
        `${chalk.bold.blue(`${p1.name}`)}'s fuel is now: ${chalk.bold.green(
          `${p1.fuel}`
        )}`
      );
    }
    if (operation.operation == "Run for Life") {
      console.log(
        `${chalk.bold.blue(`${p1.name}`)}, ${chalk.bold.red(
          "You Loose better luck next time. :("
        )}`
      );
      playAgain = false;
    }
  }
}

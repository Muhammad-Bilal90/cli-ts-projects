import inquirer from "inquirer";
import { faker } from "@faker-js/faker";

type User = {
  id: number;
  name: string;
  pin: number;
  accountNumber: number;
  balance: number;
};

type UserPin = {
  pin: number;
};

let play: boolean = true;

function createUser() {
  let users: User[] = [];

  for (let i = 1; i < 6; i++) {
    let user: User = {
      id: Math.floor(Math.random() * 90000) + 10000,
      name: faker.person.fullName(),
      pin: 1000 + i, // Math.floor(Math.random() * 10000)
      accountNumber: Math.floor(Math.random() * 900000000),
      balance: 100000 * i,
    };

    users.push(user);
  }

  return users;
}
let currentUser: User;
let users = createUser();
console.log("Welcome to Cli ATM Machine! \n");

async function atmMachine() {
  const userPin: UserPin = await inquirer.prompt({
    type: "password",
    name: "pin",
    message: "Enter your pin number! ",
  });

  currentUser = users.find((user: User) => user.pin == userPin.pin)!;

  if (currentUser) {
    console.log(`Welcome to ATM Machine ${currentUser.name}`);
  } else {
    console.log("Invalid PIN!");
    play = false;
  }
}

await atmMachine();

async function atmActions() {
  const features = await inquirer.prompt({
    type: "list",
    message: "Select the operation you want to perform: ",
    name: "operation",
    choices: ["Withdraw Cash", "Check Balance", "Exit"],
  });

  if (features.operation === "Withdraw Cash") {
    let amount: { amount: number } = await inquirer.prompt({
      type: "number",
      name: "amount",
      message: "Enter Amount you want to withdraw: ",
    });

    if (amount.amount > currentUser.balance) {
      console.log("Insufficient Balance!");
      console.log(`Your total balance is ${currentUser.balance}`);
      return playAgain();
    } else {
      console.log("Transaction Successfull!");
      currentUser.balance = currentUser.balance - amount.amount;
      console.log(`Now your total balance is ${currentUser.balance}`);
      return playAgain();
    }
  }
  if (features.operation === "Check Balance") {
    console.log(`Your Balance is ${currentUser.balance}`);
    return playAgain();
  }
  if (features.operation === "Exit") {
    console.log("Exiting...");
    play = false;
  }
}

async function playAgain() {
  let again = await inquirer.prompt({
    type: "confirm",
    name: "playAgain",
    message: "wanna use any other operation?",
  });

  if (again.playAgain === true) {
    play = true;
  } else {
    console.log("Exiting...");
    play = false;
  }
}

while (play) {
  if (currentUser!) {
    await atmActions();
  }
}

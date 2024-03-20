#! /usr/bin/env node
// importing necessary packages
import inquirer from "inquirer";
// importing operations modules
import { add } from "./modules/addition.js";
import { subtract } from "./modules/subtraction.js";
import { multiply } from "./modules/multiplication.js";
import { divide } from "./modules/division.js";
let play = true;
console.log("Welcome!");
while (play) {
    await calculator();
    await startAgain();
}
// creating main function for calculator
async function calculator() {
    const answers = await inquirer.prompt([
        {
            name: "num1",
            type: "number",
            message: "Enter first number",
        },
        {
            name: "num2",
            type: "number",
            message: "Enter second number",
        },
        {
            name: "operator",
            type: "list",
            choices: ["Add (+)", "Subtract (-)", "Multiply (*)", "Divide (/)"],
            message: "Select Operator?",
        },
    ]);
    // destructuring the answers object to get properties directly in variable
    const { num1, num2, operator } = answers;
    if (num1 && num2 && operator) {
        if (operator === "Add (+)") {
            console.log("Your answer is:", add(num1, num2));
            play = false;
        }
        else if (operator === "Subtract (-)") {
            console.log("Your answer is:", subtract(num1, num2));
            play = false;
        }
        else if (operator === "Multiply (*)") {
            console.log("Your answer is:", multiply(num1, num2));
            play = false;
        }
        else if (operator === "Divide (/)") {
            console.log("Your answer is:", divide(num1, num2));
            play = false;
        }
    }
    else {
        console.log("Please perform operation properly to proceed!");
        play = false;
    }
}
// creating start again function to run the calculator again if needed
async function startAgain() {
    const playAgain = await inquirer.prompt([
        {
            type: "confirm",
            name: "permissionGranted",
            message: "Want to use calcultor again?",
        },
    ]);
    if (playAgain.permissionGranted) {
        console.log("Welcome back...");
        play = true;
    }
    else {
        console.log("exiting...");
        play = false;
    }
}

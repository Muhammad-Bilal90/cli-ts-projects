import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

console.log("Welcome to Countdown Timer App");
const userInput = await inquirer.prompt([
  {
    type: "input",
    name: "finalDate",
    message: "Enter the target date and time (format: YYYY-MM-DD HH:mm:ss):",
    validate: (input: any) => {
      const parsedDate = Date.parse(input);
      return isNaN(parsedDate)
        ? "Invalid date format. Please use YYYY-MM-DD HH:mm:ss format."
        : true;
    },
  },
]);

const finalDate = new Date(userInput.finalDate);

function startCountdown(finalDate: any) {
  setInterval(() => {
    console.clear();
    const currentTime = new Date();
    const timeDifference = differenceInSeconds(finalDate, currentTime);

    if (timeDifference <= 0) {
      console.log("Countdown expired!");
      process.exit();
    }
    let days = Math.floor(timeDifference / (3600 * 24));
    let hours = Math.floor((timeDifference % (3600 * 24)) / 3600);
    let minutes = Math.floor((timeDifference % 3600) / 60);
    let seconds = timeDifference % 60;

    let countdownText = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    console.log("Countdown:", countdownText);
  }, 1000);
}

startCountdown(finalDate);

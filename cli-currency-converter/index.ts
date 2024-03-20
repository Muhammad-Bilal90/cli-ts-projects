import inquirer from "inquirer";

type PKRType = {
  PKR: number;
  USD: number;
  GBP: number;
  DIN: number;
  AED: number;
  EUR: number;
};

type USDType = {
  USD: number;
  PKR: number;
  GBP: number;
  DIN: number;
  AED: number;
  EUR: number;
};

type GBPType = {
  GBP: number;
  PKR: number;
  USD: number;
  DIN: number;
  AED: number;
  EUR: number;
};

type DINType = {
  DIN: number;
  USD: number;
  GBP: number;
  PKR: number;
  AED: number;
  EUR: number;
};

type AEDType = {
  AED: number;
  USD: number;
  GBP: number;
  DIN: number;
  PKR: number;
  EUR: number;
};

type EURType = {
  EUR: number;
  USD: number;
  GBP: number;
  DIN: number;
  AED: number;
  PKR: number;
};

type ConvertionRatesType = {
  PKR: PKRType;
  USD: USDType;
  GBP: GBPType;
  DIN: DINType;
  AED: AEDType;
  EUR: EURType;
};

type AnswersType = {
  convertFrom: "PKR" | "USD" | "GBP" | "DIN" | "AED" | "EUR";
  convertTo: "PKR" | "USD" | "GBP" | "DIN" | "AED" | "EUR";
  amount: number;
};

let convertionRates: ConvertionRatesType = {
  PKR: {
    PKR: 1,
    USD: 0.0036,
    GBP: 0.0028,
    DIN: 0.0011,
    AED: 0.013,
    EUR: 0.0032,
  },
  USD: {
    USD: 1,
    PKR: 281.34,
    GBP: 0.78,
    DIN: 0.31,
    AED: 3.67,
    EUR: 0.91,
  },
  GBP: {
    GBP: 1,
    PKR: 358.65,
    USD: 1.27,
    DIN: 0.39,
    AED: 4.68,
    EUR: 1.16,
  },
  DIN: {
    DIN: 1,
    USD: 3.28,
    GBP: 2.57,
    PKR: 922.34,
    AED: 11.87,
    EUR: 2.97,
  },
  AED: {
    AED: 1,
    USD: 0.27,
    GBP: 0.21,
    DIN: 0.084,
    PKR: 76.6,
    EUR: 0.25,
  },
  EUR: {
    EUR: 1,
    USD: 1.1,
    GBP: 0.86,
    DIN: 0.34,
    AED: 4.05,
    PKR: 310.22,
  },
};

let play: boolean = true;

console.log("Welcome to Currency Converter App!");

while (play) {
  await currencyConverter();
  await playAgain();
}

async function currencyConverter() {
  const answers: AnswersType = await inquirer.prompt([
    {
      type: "list",
      message: "Choose the currency you want to convert from: ",
      name: "convertFrom",
      choices: Object.keys(convertionRates),
    },
    {
      type: "list",
      message: "Choose the currency you want to convert in: ",
      name: "convertTo",
      choices: Object.keys(convertionRates),
    },
    {
      type: "number",
      message: "Enter you amount: ",
      name: "amount",
    },
  ]);

  let { convertFrom, convertTo, amount } = answers;
  if (convertFrom && convertTo && amount) {
    let changedRate = convertionRates[convertFrom][convertTo] * amount;
    console.log(
      `Your convertion from ${convertFrom} to ${convertTo} is ${convertTo}:${changedRate.toFixed(
        2
      )}`
    );
  }
}

async function playAgain() {
  let again = await inquirer.prompt({
    type: "confirm",
    name: "playAgain",
    message: "Want to cenvert something again? ",
  });

  if (again.playAgain === true) {
    play = true;
  } else {
    play = false;
  }
}

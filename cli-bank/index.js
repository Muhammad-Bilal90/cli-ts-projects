import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
// Customer Class
class Customer {
    name;
    email;
    mobNo;
    accountNo;
    constructor(name, email, mobNo, accountNo) {
        this.name = name;
        this.email = email;
        this.mobNo = mobNo;
        this.accountNo = accountNo;
    }
}
// Bank Class
class Bank {
    customers = [];
    accounts = [];
    addCustomer(customerObj) {
        this.customers.push(customerObj);
    }
    addAccount(accountObj) {
        this.accounts.push(accountObj);
    }
    DepositeAmount(amountObj) {
        let index = this.accounts.findIndex((item) => item.accountNo == amountObj.accountNo);
        this.accounts.splice(index, 1, amountObj);
    }
}
let bank = new Bank();
let play = true;
console.log("Welcome to Cli Bank App \n");
for (let i = 1; i < 6; i++) {
    let name = faker.person.fullName();
    let email = faker.internet.email();
    let mobNo = parseInt(faker.phone.number("92##########"));
    let accountNo = 10000 + i;
    let balance = 100000 * i;
    let newCustomer = new Customer(name, email, mobNo, accountNo);
    bank.addCustomer(newCustomer);
    bank.addAccount({ accountNo, balance });
}
// console.log(bank);
let currentUser;
async function authenticate() {
    let authentication = await inquirer.prompt({
        type: "number",
        message: "Plaese Enter your account number to continue... ",
        name: "accNo",
    });
    currentUser = bank.customers.find((item) => item.accountNo === authentication.accNo);
    if (currentUser) {
        console.log(`Welcome ${currentUser.name}`);
    }
    else {
        console.log("Invalid Account Number!");
    }
}
await authenticate();
async function bankOperations(bank) {
    let operations = await inquirer.prompt({
        type: "list",
        message: "Select the operation you want to perform: ",
        name: "operation",
        choices: ["Cash Deposite", "Cash Withdraw", "Check Balance", "Exit"],
    });
    let userAccount = bank.accounts.find((item) => item.accountNo == currentUser.accountNo);
    if (operations.operation === "Cash Deposite") {
        let depositAmount = await inquirer.prompt({
            type: "number",
            name: "amount",
            message: "Enter Deposit amount: ",
        });
        let newBalance = userAccount?.balance + depositAmount.amount;
        bank.DepositeAmount({
            accountNo: currentUser.accountNo,
            balance: newBalance,
        });
        console.log(`${currentUser.name} your new balance is PKR:${newBalance}`);
        return playAgain();
    }
    if (operations.operation === "Cash Withdraw") {
        let depositAmount = await inquirer.prompt({
            type: "number",
            name: "amount",
            message: "Enter Deposit amount: ",
        });
        if (depositAmount.amount > userAccount?.balance) {
            console.log("Insufficient Balance!");
            console.log(`Your balance is ${userAccount?.balance}`);
            return playAgain();
        }
        else {
            let newBalance = userAccount?.balance - depositAmount.amount;
            bank.DepositeAmount({
                accountNo: currentUser.accountNo,
                balance: newBalance,
            });
            console.log(`${currentUser.name} your new balance is PKR:${newBalance}`);
            return playAgain();
        }
    }
    if (operations.operation === "Check Balance") {
        console.log(`${currentUser.name} your balance is PKR:${userAccount?.balance}`);
        return playAgain();
    }
    if (operations.operation === "Exit") {
        play = false;
        console.log("Exiting...");
    }
}
async function playAgain() {
    let again = await inquirer.prompt({
        type: "confirm",
        name: "again",
        message: "wanna use any other operation? ",
    });
    if (again.again === true) {
        play = true;
    }
    else {
        play = false;
    }
}
while (play) {
    await bankOperations(bank);
}

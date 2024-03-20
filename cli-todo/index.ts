import inquirer from "inquirer";

let todos: string[] = ["Work", "Lunch", "Diner", "Repeat"];
let play: boolean = true;

while (play) {
  await todoActions();
  await playAgain();
}

async function todoActions() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "Select the operation you want to perform: ",
      name: "options",
      choices: ["View", "Add", "Update", "Delete"],
    },
  ]);
  if (answers.options === "View") {
    console.log(todos);
  }
  if (answers.options === "Add") {
    const addTodo = await inquirer.prompt([
      {
        type: "input",
        message: "Add Todo... ",
        name: "todoItem",
      },
    ]);
    todos.push(addTodo.todoItem);
    console.log(todos);
  }
  if (answers.options === "Update") {
    const updateTodo = await inquirer.prompt([
      {
        type: "list",
        message: "Update Todo... ",
        name: "todoItem",
        choices: todos.map((item) => item),
      },
    ]);
    let index = todos.indexOf(updateTodo.todoItem);

    console.log(todos);
    const addTodo = await inquirer.prompt([
      {
        type: "input",
        message: "Add Todo... ",
        name: "todoItem",
      },
    ]);
    todos.splice(index, 1, addTodo.todoItem);
    console.log(todos);
  }

  if (answers.options === "Delete") {
    const deleteTodo = await inquirer.prompt([
      {
        type: "list",
        message: "Delete Todo... ",
        name: "todoItems",
        choices: todos.map((item) => item),
      },
    ]);

    let todoAfterDelete = todos.filter((item) => item !== deleteTodo.todoItems);
    todos = todoAfterDelete;
    console.log(todos);
  }
}

async function playAgain() {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      message: "Wanna use again? ",
      name: "playAgain",
    },
  ]);

  if (answers.playAgain === true) {
    play = true;
  } else {
    console.log("exiting...");
    play = false;
  }
}

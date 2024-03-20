import inquirer from "inquirer";

export type QuizTypes = {
  question: string;
  answer: string;
  options: string[];
};

export type QuizContentTypes = {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
};

type UserAnswer = {
  quizAnswer: string;
};
type PlayAgain = {
  again: boolean;
};

type UserName = {
  name: string;
};
let play: boolean = true;

const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

const quizData = async (): Promise<QuizTypes[]> => {
  const response = await fetch("https://opentdb.com/api.php?amount=5");
  const { results } = await response.json();
  const quiz: QuizTypes[] = results.map((questionsObj: QuizContentTypes) => {
    return {
      question: questionsObj.question,
      answer: questionsObj.correct_answer,
      options: shuffleArray(
        questionsObj.incorrect_answers.concat(questionsObj.correct_answer)
      ),
    };
  });

  return quiz;
};

let quizContent: QuizTypes[] = await quizData();

console.log("Welcome to Cli Quiz App! \n");

const userName: UserName = await inquirer.prompt([
  {
    type: "input",
    message: "What is Your Name? ",
    name: "name",
  },
]);

async function startQuiz() {
  let score: number = 0;

  for (let i = 0; i < 5; i++) {
    const answers: UserAnswer = await inquirer.prompt([
      {
        type: "list",
        message: quizContent[i].question,
        name: "quizAnswer",
        choices: quizContent[i].options,
      },
    ]);

    if (answers.quizAnswer === quizContent[i].answer) {
      score++;
    }
  }

  console.log(
    `${userName.name}, You scored ${score} out of ${quizContent.length} in the quiz.`
  );
}

// startQuiz();
async function playAgain() {
  const again: PlayAgain = await inquirer.prompt([
    {
      type: "confirm",
      message: "Wanna play quiz again? ",
      name: "again",
    },
  ]);

  if (again.again === true) {
    quizContent = await quizData();
    play = true;
  } else {
    play = false;
  }
}

while (play) {
  await startQuiz();
  await playAgain();
}

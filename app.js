const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Transfer Markup Language",
      "Hyper Text Markup Language",
      "High-Level Text Markup Language",
      "Home Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which of the following is not a valid HTML tag?",
    options: ["<div>", "<span>", "<section>", "<paragraph>"],
    answer: "paragraph",
  },
  {
    question:
      "Which programming language is commonly used for adding interactivity to web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question:
      "Which of the following is not a valid way to declare a variable in JavaScript?",
    options: [
      "var myVar = 10;",
      "let myVar = 10;",
      "const myVar = 10;",
      "myVar = 10;",
    ],
    answer: "myVar = 10;",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");
const timerElement = document.getElementById("timer");
const showCorrectnessAnswer = document.getElementById("answer");
const nextQuestionButton = document.getElementById("nextQuestion");
const questionTime = 5;
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const options = [...questionData.options];

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = options[i];

    const optionText = document.createTextNode(options[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);

  let timeLeft = questionTime;
  timerElement.textContent = `Time Left: ${timeLeft} seconds`;

  function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearTimeout(timer);
      checkAnswer();
    } else {
      timer = setTimeout(updateTimer, 1000);
    }
  }

  timer = setTimeout(updateTimer, 1000);
}

const answerElement = document.createElement("div");
answerElement.className = "selectedAnswer";

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      showCorrectnessAnswer.style.color = "green";
      answerElement.innerHTML = "Your answer is correct";
      showCorrectnessAnswer.innerHTML = "";

      showCorrectnessAnswer.appendChild(answerElement);
      score++;
    } else {
      showCorrectnessAnswer.style.color = "red";
      answerElement.innerHTML = `Your answer is incorrect. Correct Answer is ${quizData[currentQuestion].answer}`;
      showCorrectnessAnswer.innerHTML = "";
      showCorrectnessAnswer.appendChild(answerElement);
    }
    clearTimeout(timer);
  } else {
    currentQuestion++;
    if (currentQuestion === 5) displayResult();

    clearTimeout(timer);
    console.log("check answer");
    displayQuestion();
  }
}

function nextQuestion() {
  answerElement.innerHTML = "";
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;

    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      clearTimeout(timer);
      displayQuestion();
    } else {
      console.log(currentQuestion);
      displayResult();
    }
  } else {
    currentQuestion++;
    if (currentQuestion === 5) displayResult();

    clearTimeout(timer);
    console.log("check answer");
    displayQuestion();
  }
}

function displayResult() {
  timerElement.innerHTML = "";
  nextQuestionButton.style.display = "none";
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

submitButton.addEventListener("click", checkAnswer);
nextQuestionButton.addEventListener("click", nextQuestion);

displayQuestion();

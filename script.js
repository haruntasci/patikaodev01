
// const questions -> a constant variable with questions and answers

const questions = [
    {
        question: "Which of these terms best describes git?",
        answers: [
            { text: "Issue Tracking System", correct: false },
            { text: "Integrated Development Environment", correct: false },
            { text: "Distributed Version Control System", correct: true },
            { text: "Web-Based Repository Hosting Service ", correct: false }

        ]
    },
    {
        question: "Which of these terms best describes GitHub?",
        answers: [
            { text: "Issue Tracking System", correct: false },
            { text: "Web-Based Repository Hosting Service ", correct: true },
            { text: "Integrated Development Environment", correct: false },
            { text: "Distributed Version Control System", correct: false }

        ]
    },
    {
        question: "What command do you run to view the commit history of your repository?",
        answers: [
            { text: "git commit -h", correct: false },
            { text: "git log", correct: true },
            { text: "git past", correct: false },
            { text: "git history", correct: false }

        ]
    },
    {
        question: "How do you check the state of your local git repository since your last commit?",
        answers: [
            { text: "git commit", correct: false },
            { text: "git check", correct: false },
            { text: "git diff", correct: false },
            { text: "git status", correct: true }

        ]
    },
    {
        question: "What's the git command that downloads your repository from GitHub to your computer?",
        answers: [
            { text: "git clone", correct: true },
            { text: "git push", correct: false },
            { text: "git commit", correct: false },
            { text: "git fork", correct: false }

        ]
    },
    {
        question: "Which of the following commands show changes between commits?",
        answers: [
            { text: "git diff", correct: true },
            { text: "git commit", correct: false },
            { text: "git show", correct: false },
            { text: "git reset", correct: false }

        ]
    },
    {
        question: "Which of the following commands is used in switching between branches?",
        answers: [
            { text: "git checkout", correct: true },
            { text: "git merge", correct: false },
            { text: "git branch", correct: false },
            { text: "git switch", correct: false }

        ]
    }

];
//Elements are defined
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

const resetState = () => {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

const showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

const handleNextButton = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
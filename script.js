const questions = [
    {
        question: "Who is the present Prime Minister of India?",
        answers: [
            { text: "Sri Narendra Modi", correct: true },
            { text: "Sri Manmohan Singh", correct: false },
            { text: "Pt. Jawaharlal Nehru", correct: false },
            { text: "Sri Nitin Gadkari", correct: false },
        ]
    },
    {
        question: "Who is the Home Minister of India?",
        answers: [
            { text: "Sri Narendra Modi", correct: false },
            { text: "Sri Amit Shah", correct: true },
            { text: "Pt. Jawaharlal Nehru", correct: false },
            { text: "Sri Nitin Gadkari", correct: false },
        ]
    },
    {
        question: "Who is the Finance Minister of India?",
        answers: [
            { text: "Smt. Menka Gandhi", correct: false },
            { text: "Sri Amit Shah", correct: false },
            { text: "Nirmala Sitharaman", correct: true },
            { text: "Sri Nitin Gadkari", correct: false },
        ]
    },
    {
        question: "Who is the President of India?",
        answers: [
            { text: "Sri Ram Nath Kovind", correct: false },
            { text: "Smt. Droupadi Murmu", correct: true },
            { text: "Nirmala Sitharaman", correct: false },
            { text: "Sri Nitin Gadkari", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answersBtn = document.getElementById("ans-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetButtons();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Store correct answer in data attribute
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetButtons() {
    nextBtn.style.display = "none";
    while (answersBtn.firstChild) {
        answersBtn.removeChild(answersBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disable all buttons after selecting an answer
    Array.from(answersBtn.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct"); // Highlight correct answer
        }
    });

    nextBtn.style.display = "block";
}

// "Next" button logic
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetButtons();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Restart Quiz";
    nextBtn.style.display = "block";
    nextBtn.addEventListener("click", startQuiz);
}

startQuiz();

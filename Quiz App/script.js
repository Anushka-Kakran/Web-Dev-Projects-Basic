const questions = [
    {
        question: "Which is largest animal in the world?",
        answer:[

            {text: "Shark" , correct: false},
            {text: "Blue whale" , correct: true},
            {text: "Elephant" , correct: false},
            {text: "Giraffe" , correct: false},

        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answer:[

            {text: "Vatican city" , correct: true},
            {text: "Bhutan" , correct: false},
            {text: "Nepal" , correct: false},
            {text: "Shri Lanka" , correct: false},

        ]
    },
    {
        question: "Which is largest desert in the world?",
        answer:[

            {text: "Kalahari" , correct: false},
            {text: "Gobi" , correct: false},
            {text: "Sahara" , correct: false},
            {text: "Antarctica" , correct: true},

        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer:[

            {text: "Asia" , correct: false},
            {text: "Australia" , correct: true},
            {text: "Arctic" , correct: false},
            {text: "Africa" , correct: false},

        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
     questionElement.innerHTML = questionNo + ". " + currentQuestion.
     question;

     currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
     });
}

function resetState(){
    nextbutton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct"); 
        score++;  
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
            
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++ ; 
    if(currentQuestionIndex < questions.length){
        showQuestion();

    }else{
        showScore();
    }
}


nextbutton.addEventListener("click" , () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();

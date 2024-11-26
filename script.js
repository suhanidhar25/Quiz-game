const questions = [
    {
        question: "Which is the longset river in the world?",
        answers: [
            { text: "Niger", correct: false },
            { text: "Amazon", correct: false },
            { text: "Nile", correct: true },
            { text: "Yangtze", correct: false },
        ]
    },

    {
        question: "Which is the largest flower in the world?",
        answers: [
            { text: "Jasmine", correct: false },
            { text: "Rafflesia", correct: true },
            { text: "Rose", correct: false },
            { text: "Sunflower", correct: false },
        ]
    },

    {
        question: "What is the tallest waterfall in the world?",
        answers: [
            { text: "Angel Falls", correct: true },
            { text: "Niagara Falls", correct: false },
            { text: "Wailua Falls", correct: false },
            { text: "Sutherland Falls", correct: false },
        ]
    },

    {
        question: "How many rings appear on the Olympic flag?",
        answers: [
            { text: "5", correct: true },
            { text: "2", correct: false },
            { text: "7", correct: false },
            { text: "3", correct: false },
        ]
    },

    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Caravaggio", correct: false },
            { text: "Leonardo Da Vinci", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Raphael", correct: false },
        ]
    }
];

const questionelement = document.getElementById("question");
const anselement = document.getElementById("ans-buttons");
const nextbutton = document.getElementById("next-btn");


let currQuesidx = 0;
let score = 0;

function startQuiz() {
    currQuesidx = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currques = questions[currQuesidx];
    let Qno = currQuesidx + 1;
    questionelement.innerHTML = Qno + "." + currques.question;

    currques.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        anselement.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAns);
    });
}

function resetState(){
    nextbutton.style.display="none";
    while(anselement.firstChild){
        anselement.removeChild(anselement.firstChild);
    }
}


function selectAns(e){
    const selectbtn=e.target;
    const isCorrect=selectbtn.dataset.correct==="true";
    if(isCorrect){
        selectbtn.classList.add("correct");
        score++;
    }
    else{
        selectbtn.classList.add("incorrect");
    }

    Array.from(anselement.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbutton.style.display="block";
}

function showScore(){
    resetState();
    questionelement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextbutton.innerHTML="Play Again";
    nextbutton.style.display="block";
}

function handlenextbtn(){
    currQuesidx++;
    if(currQuesidx<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currQuesidx<questions.length){
        handlenextbtn();
    }
    else{
        startQuiz();
    }
});
startQuiz();

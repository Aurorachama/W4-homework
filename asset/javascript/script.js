var questionNumber = 1;
var playerScore = 0;  
var wrongAttempt = 0; 
var indexNumber = 0; 
var timeLeft =50;
var initialEl = document.getElementById('initial');
var timerEl = document.getElementById('timer');
var startButtonEl = document.getElementById('start-button');
var scoreButtonEl = document.getElementById('scoreboard-button');
var initialBoardEl = document.getElementById('your-initial');
var scoreBoardEl = document.getElementById('your-score');
var highinitialEl = localStorage.getItem('saved-initial');
var highscoreEl= localStorage.getItem('saved-score');
var initialDisplayEl = document.getElementById('display-initial');
var scoreDisplayEl = document.getElementById('display-score');
var clearButtonEl = document.getElementById('clear-score');
console.log(highinitialEl);
console.log(highscoreEl);

 const questions = [
    {
        question: "What HTML element would javascript be put into?",
        optionA: 'script',
        optionB: 'link',
        optionC: 'li',
        optionD: 'js',
        correctOption: "optionA"
    },

    {
        question: "What is the correct syntax to refer an script?",
        optionA: "href",
        optionB: "src",
        optionC: "class",
        optionD: "ref",
        correctOption: "optionB"
    },

    {
        question: "How to create a function in JavaScript?",
        optionA: "function = functionName()",
        optionB: "function : functionName()",
        optionC: "function functionName()",
        optionD: "function 'functionName'()",
        correctOption: "optionC"
    },

    {
        question: "How to call a function named 'getID'?",
        optionA: "call getID()",
        optionB: "getID()",
        optionC: "call : getID()",
        optionD: "call(getID)",
        correctOption: "optionB"
    },

    {
        question: "What is the correct way to start an if statement in javasrcipt?",
        optionA: "if (i>0){",
        optionB: "if i>0{",
        optionC: "if {(i>0)",
        optionD: "if : i>0 {",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is the logical operator means not equal to?",
        optionA: "/=",
        optionB: "?=",
        optionC: "!=",
        optionD: "(=)",
        correctOption: "optionC"
    },

    {
        question: "How to declare a variable in JavaScript?",
        optionA: "var age;",
        optionB: "variable age;",
        optionC: "v age;",
        optionD: "int age;",
        correctOption: "optionA"
    },

    {
        question: "What will the following code return? Boolean (1>2)",
        optionA: "Undefined",
        optionB: "false",
        optionC: "true",
        optionD: "0",
        correctOption: "optionB"
    },

    {
        question: "How to write an JavaScript array?",
        optionA: "var name = []",
        optionB: "var name = ()",
        optionC: "var name =",
        optionD: "var name = & &",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is not a JavaScript logical operator?",
        optionA: "+=",
        optionB: "!=",
        optionC: "&&",
        optionD: "~=",
        correctOption: "optionD"
    }

]

function countdown (){
    var timeInterval = setInterval(function(){
        
        if (timeLeft<=0){
            handleEndGame();
            timerEl.textContent = "";
            clearInterval;
        }
        else{
            timeLeft--;
            timerEl.textContent = timeLeft;
        }
    },1000);
}

var shuffledQuestions = []

function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

function NextQuestion(index) {
    handleQuestions();
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null;

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
    }


    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 500)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id;
            document.getElementById(wrongLabelId).style.backgroundColor = "red";
            document.getElementById(correctOption).style.backgroundColor = "green";
            wrongAttempt++;
            timeLeft= timeLeft-50;
            timerEl.textContent = timeLeft;

            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 500)  
            
            }
        })
    }



function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()

    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {

    document.getElementById('right-answers').innerHTML = playerScore;
    document.getElementById('scoreboard').style.display = "flex";
    initialBoardEl.textContent = localStorage.getItem('saved-initial');
    scoreBoardEl.textContent = localStorage.getItem('saved-score');
}

function closeScoreboard() {
    initialBoardEl.textContent = localStorage.getItem('saved-initial');
    scoreBoardEl.textContent = localStorage.getItem('saved-score');

    if(playerScore>highscoreEl){
        localStorage.setItem("saved-initial",document.getElementById('initial').value);
        localStorage.setItem("saved-score", playerScore);
    }

}

function entryContent() {
    document.getElementById('start-content').style.display = "flex";
}

startButtonEl.addEventListener('click',function (){
    //event.preventDefault;
    console.log("start");
    document.getElementById('start-content').style.display = "none";
    document.getElementById('game-quiz-container').style.display = "flex";
    //document.getElementById('game-option-container').style.display = "flex";
    NextQuestion(0);
    countdown();
    //initialDisplayEl.textContent = localStorage.getItem['saved-initial'];
    //scoreDisplayEl.textContent = localStorage.getItem['saved-score'];
    initialDisplayEl.textContent = highinitialEl;
    scoreDisplayEl.textContent = highscoreEl;
});

scoreButtonEl.addEventListener('click',closeScoreboard);

clearButtonEl.addEventListener('click',function(){
    localStorage.clear();
});
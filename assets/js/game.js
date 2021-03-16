var time = document.getElementById("time");
var score = 0;
var scoreDisplay=document.getElementById("score");
var startButton = document.getElementById("startButton");
var body = document.body
var game = document.getElementById("game");
var questions = [
    {
        q: "How do you add javascript to a webpage?",
        a: "a. You use the link tag.",
        b: "b. You use the script tag.",
        c: "c. You use the link tag or the script tag.",
        d: "d. None of the above.",
        userAnswer: null,
        answer: "b"
    },
    {
        q: "When does javascript execute?",
        a: "a. After the page loads.",
        b: "b. When you click a button.",
        c: "c. As the page loads.",
        d: "d. None of the above.",
        userAnswer: null,
        answer: "c",
    },
    {
        q: "How do you create a function in javascript?",
        a: "a. function functionName(){}",
        b: "b. var functionName = function(){}",
        c: "c. Both a & b",
        d: "d. None of the above.",
        userAnswer: null,
        answer: "c",
    },
    {
        q: "How do you retrieve information from local storage?",
        a: "a. localStorage.setItem()",
        b: "b. localStorage()",
        c: "c. localStorage.itemName",
        d: "d. localStorage.getItem()",
        userAnswer: null,
        answer: "d"
    },
    {
        q: "When do you use an if else statement?",
        a: "a. When you've already used an if statement.",
        b: "b. It is the same as an if statement you can use either.",
        c: "c. It is the same as an else statement.",
        d: "d. None of the above.",
        userAnswer: null,
        answer: "a"
    }
]
var savedScore = [];
var highScoreButton = document.getElementById("highScore");
var questionNumber = 0

//timer function
var timeLeft = 60;
function timer() {
    var countdown = setInterval(function(){
        if (timeLeft> 0){
            console.log(timeLeft)
            time.textContent = timeLeft;
            timeLeft--;
        }
        else if (timeLeft === 0 ){
            clearInterval(countdown);
            game.innerHTML = "";
            endGame();
        }
    }, 1000);
}
//function to record the user answer and recall the ask question function if there are more questions to ask.
function chooseAnswer(answer){
    questions[questionNumber].userAnswer = answer;
    game.innerHTML="";
    checkAnswer();
    questionNumber++;
    if(questionNumber >= questions.length) {
        console.log("done")
        score = score + timeLeft;
        endGame();
    }
    else{
        askQuestion();
    }  
}
//function to check if the answer is correct then add to the score or take away time
function checkAnswer(){
    if (questions[questionNumber].userAnswer===questions[questionNumber].answer){
        score++;
        scoreDisplay.textContent = score;
        console.log(score);
        console.log(questionNumber)
    }
    else {
        timeLeft = timeLeft - 10;
        console.log(score);
        scoreDisplay.textContent = score;
        console.log(timeLeft);
        console.log(questionNumber);
    }
}
//function to write out all of the questions and answers and send to the choose answer function when clicked
function askQuestion(){
    game.innerHTML = "";
    var q = document.createElement("p");
    q.innerHTML = questions[questionNumber].q;
    console.log(q)
    game.appendChild(q);
    var a = document.createElement("button");
    a.innerHTML = questions[questionNumber].a;
    a.setAttribute("class","answerChoice");
    a.onclick = function(){chooseAnswer("a")}
    var b = document.createElement("button");
    b.innerHTML = questions[questionNumber].b;
    b.setAttribute("class","answerChoice")
    b.onclick = function(){chooseAnswer("b")}
    var c = document.createElement("button");
    c.innerHTML = questions[questionNumber].c;
    c.setAttribute("class","answerChoice")
    c.onclick = function(){chooseAnswer("c")}
    var d = document.createElement("button");
    d.innerHTML = questions[questionNumber].d;
    d.setAttribute("class", "answerChoice")
    d.onclick = function(){chooseAnswer("d")}
    console.log(a, b, c, d)
    game.appendChild(a);
    game.appendChild(b);
    game.appendChild(c);
    game.appendChild(d);
}
//function to end the game, show the score and offer to save the score
function endGame(){
    timeLeft = 0;
    time.textContent = "";
    scoreDisplay.innerHTML = "";
    var finalScore = document.createElement("p");
    finalScore.innerHTML = "Your score is: " + score;
    game.appendChild(finalScore);
    var entryLabel = document.createElement("label")
    entryLabel.setAttribute("for","initials");
    entryLabel.innerHTML = "Enter Initials:"
    var enterInitials = document.createElement("input");
    enterInitials.setAttribute("type", "text");
    enterInitials.setAttribute("id", "initials");
    enterInitials.setAttribute("name", "initials");
    game.appendChild(entryLabel);
    game.appendChild(enterInitials);
    var submit = document.createElement("button");
    submit.setAttribute("id","submitButton");
    submit.innerHTML= "Submit!";
    game.appendChild(submit);
    submit.onclick = function(){highScoreSaver()};
}
// function to save the score into the local storage
function highScoreSaver(){
    var highScore = score;
    var initials = document.querySelector("input[name = 'initials']").value;
    var scoreDataObj = {
        initial: initials,
        gameScore: highScore
    }
    getHighScores();
    console.log(savedScore)
    savedScore.push(scoreDataObj);
    console.log(savedScore);
    localStorage.setItem("highScore", JSON.stringify(savedScore));
}
// function to retrieve the saved scores from local storage
function getHighScores(){
    var highScore = localStorage.getItem("highScore");
    if(!highScore){
        return false;
    }
    savedScore = JSON.parse(highScore);
}
//function to write out the saved scores when the high score button is clicked
function displayHighScores(){
    game.innerHTML = "";
    getHighScores();
    for (var i = 0 ; i < savedScore.length; i++){
        var highScoreDisplay = document.createElement("p");
        highScoreDisplay.innerHTML = savedScore[i].initial + ":" + savedScore[i].gameScore;
        game.appendChild(highScoreDisplay);
    }
}
//button event listeners
startButton.onclick = function(){ askQuestion(), timer()};
highScoreButton.onclick = function(){ displayHighScores()};

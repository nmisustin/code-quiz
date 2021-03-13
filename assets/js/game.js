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
            console.log(score);
        }
    }, 1000);
}
//game function
   //cycle through an array of question objects
   // use charAt(0) to verify answer.
   var questionNumber = 0
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
    function endGame(){
        timeLeft = 0;
        time.textContent = "";
        scoreDisplay.innerHTML = "";
        var finalScore = document.createElement("p");
        finalScore.innerHTML = score;
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
        submit.innerHTML= "Submit!";
        game.appendChild(submit);
    }
    function startGame() {
        startButton.onclick = function(){askQuestion(), timer()};
    }
startGame();
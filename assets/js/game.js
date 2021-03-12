var time = document.getElementById("time");
var score = 0;
var scoreDisplay=document.getElementById("score");
var startButton = document.getElementById("startButton");
var body = document.body
var game = document.getElementById("game");
var questions = [
    {
        q: "This is a question",
        a: "a. answer 1",
        b: "b. answer 2",
        c: "c. answer 3",
        d: "d. answer 4",
        userAnswer: null,
        answer: "b",
        answered: false
    },
    {
        q: "This is a question",
        a: "a. answer 1",
        b: "b. answer 2",
        c: "c. answer 3",
        d: "d. answer 4",
        userAnswer: null,
        answer: "c",
        answered: false
    },
    {
        q: "This is a question",
        a: "a. answer 1",
        b: "b. answer 2",
        c: "c. answer 3",
        d: "d. answer 4",
        userAnswer: null,
        answer: "a",
        answered: false
    }
]

//timer function
var timeLeft = 60;
function timer() {
    var countdown = setInterval(function(){
        if (timeLeft> 0){
            console.log(timeLeft)
            timeLeft--;
        }
        else if (timeLeft === 0){
            clearInterval(countdown);
            console.log("game over");
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
        }
        else{
            askQuestion();
        }  
   }
   function checkAnswer(){
       if (questions[questionNumber].userAnswer===questions[questionNumber].answer){
           score++;
           console.log(score);
           console.log(questionNumber)
       }
       else {
            timeLeft = timeLeft - 5;
            console.log(score);
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
    function startGame() {
        startButton.onclick = function(){askQuestion()};
    }
startGame();
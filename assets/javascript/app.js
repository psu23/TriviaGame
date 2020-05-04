//Define variables

var triviaArr = [

    {question: "What does apple start with?",
    answers: ["A", "B", "C", "D"],
    correctAns: "A"},

    {question: "What does banana start with?",
    answers: ["A", "B", "C", "D"],
    correctAns: "B"},

    {question: "What does cat start with?",
    answers: ["A", "B", "C", "D"],
    correctAns: "C"},

    {question: "What does dog start with?",
    answers: ["A", "B", "C", "D"],
    correctAns: "D"},
    
    {question: "What does ear start with?",
    answers: ["E", "F", "G", "H"],
    correctAns: "E"},

    {question: "What does frog start with?",
    answers: ["E", "F", "G", "H"],
    correctAns: "F"},

    {question: "What does grass start with?",
    answers: ["E", "F", "G", "H"],
    correctAns: "G"},
     
    {question: "What does hear start with?",
    answers: ["E", "F", "G", "H"],
    correctAns: "H"},

    {question: "What does indigo start with?",
    answers: ["G", "H", "I", "J"],
    correctAns: "I"},

    {question: "What does jelly start with?",
    answers: ["G", "H", "I", "J"],
    correctAns: "J"}
    
];
var triviaIndex = 0;
var totalCorrect = 0;
var totalIncorrect = 0;
var totalUnanswered = 0;
var isAnswered = false;
var timeLeft = 15;
var intervalId;


//Define functions

function pickQuestion() {
    isAnswered = false;
    timeLeft = 15;//reset timeLeft to 15 (seconds)
    intervalId = setInterval(timer, 1000);//timer will count down from 15 sec.
    
    if (isAnswered === false) {
        timer();//start the timer if the question has not been answered
    }

    var corr = triviaArr[triviaIndex].correctAns;
    var ques = triviaArr[triviaIndex].question;
    var answ;
    $("#question").html(ques);

    for (var i = 0; i < 4; i++) {
        answ = triviaArr[triviaIndex].answers[i];
        $("#answers").append('<p class = ansClass id=' + i + '>' + answ + '</p>');
    }

    $("p").click(function() {
        if($(this).text() === corr) {
            isAnswered = true;
            $("#question").text("Correct. The answer is: " + corr);
            userCorrect();
        }

        else {
            isAnswered = true;
            $("#question").text("Incorrect. The answer is: " + corr);
            userIncorrect();
        }

    });
}

function timer() {
    if (timeLeft === 0) {
        isAnswered = true;
        clearInterval(intervalId);
        $("#question").text("The answer is: " + triviaArr[triviaIndex].correctAns);//Cannot use the variable corr because it's not in scope
        noAnswer();
    }
    else if (isAnswered === true) {
        clearInterval(intervalId);
    }
    else {
        timeLeft--;
        $("#timer").text("Time remaining: " + timeLeft);
    }
    
}

function userCorrect() {
    totalCorrect++;
    endQuestion();
}

function userIncorrect() {
    totalIncorrect++;
    endQuestion();
}

function noAnswer() {
    totalUnanswered++;
    endQuestion();
}

function endQuestion() {

    $(".ansClass").remove();
    //make something that shows an image when the answer is revealed
    triviaIndex++;

    if (triviaIndex < triviaArr.length) {
        setTimeout(function() {
            pickQuestion();
            //do something to remove image
    }, 3000)}//removes question after 3 seconds

    else {
        setTimeout(function() {
            $("#question").remove();
            //do something to remove image
            $("#timer").remove();

            $("#answers").append('<p class = ansClass gameOver>Correct: ' + totalCorrect + '</p>');
            $("#answers").append('<p class = ansClass gameOver>Wrong: ' + totalIncorrect + '</p>');
            $("#answers").append('<p class = ansClass gameOver>Unanswered: ' + totalUnanswered + '</p>');

            setTimeout(function() {
                location.reload();
            }, 7000);
        }, 5000);
    };

}

function begin() {
    $("#start").remove();
    totalCorrect = 0;
    totalIncorrect = 0;
    totalUnanswered = 0;
    pickQuestion();
    console.log("Begin")
}

$("#start").on("click", function() {
    begin();
})

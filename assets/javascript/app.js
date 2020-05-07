//Define variables
$(document).ready(function() {//embed entire code in document.ready for jQuery use

var triviaArr = [ //define triviaArr as array of various questions grouped with their respective choices,..  
//..correct answer and an image to appear upon completion of the user answering the question
    {question: "Where was the Declaration of Independence signed?",
    answers: ["Philadelphia City Hall", "Independence Hall", "Congress Hall", "Liberty Hall"],
    correctAns: "Independence Hall",
    image: ("assets/images/independence.jpg")},

    {question: "What is the former prison in Fairmount where notorious criminals like Al Capone were held, that is still open for tours and 'haunted house' events during the Halloween season?",
    answers: ["Alcatraz", "Folsom Prison", "Pennsylvania State Penitentiary", "Eastern State Penitentiary"],
    correctAns: "Eastern State Penitentiary",
    image: ("assets/images/eastern.jpg")},

    {question: "Which street in Philadelphia is America's oldest residential street?",
    answers: ["Elfreth's Alley", "Acorn Street", "Penn's Alley", "Aviles Street"],
    correctAns: "Elfreth's Alley",
    image: ("assets/images/elfreth.jpg")},

    {question: "Which cheesesteak establishment in Passyunk Square is a neighbor and competitor of Pat's King of Steaks?",
    answers: ["Jim's", "Geno's", "Sonny's", "Abner's"],
    correctAns: "Geno's",
    image: ("assets/images/geno.jpg")},
    
    {question: "What is the other (more commonly used) name of the Washington Square West neighborhood?",
    answers: ["Chinatown", "Logan Square", "Gayborhood", "Old City"],
    correctAns: "Gayborhood",
    image: ("assets/images/gayborhood.jpg")},

    {question: "Located in Center City, what is the name of the large enclosed public market where merchants sell produce and prepared foods?",
    answers: ["Reading Terminal Market", "Benjamin Franklin Market", "Lancaster Market", "Union Market"],
    correctAns: "Reading Terminal Market",
    image: ("assets/images/reading.jpg")},

    {question: "In which part of Philadelphia does the show 'It's Always Sunny in Philadelphia' take place?",
    answers: ["North Philadelphia", "South Philadelphia", "East Philadelphia", "West Philadelphia"],
    correctAns: "South Philadelphia",
    image: ("assets/images/south.jpg")},
     
    {question: "Philadelphia is a city of many firsts for America. Which of the following is, however, not something Philadelphia has?",
    answers: ["America's first zoo", "America's first hospital", "Oldest continually running market in America", "Oldest continually running theater in the world"],
    correctAns: "Oldest continually running market in America",
    image: ("assets/images/lancaster.jpg")},

    {question: "Philadelphia became home to the first general purpose computer (which weighed 27 tons) in which year?",
    answers: ["1946", "1956", "1966", "1976"],
    correctAns: "1946",
    image: ("assets/images/computer.jpg")},

    {question: "What was Philadehlphia's football team before the Eagles?",
    answers: ["Penn Flyers", "Reading Lions", "Passyunk Pros", "Frankford Yellow Jackets"],
    correctAns: "Frankford Yellow Jackets",
    image: ("assets/images/frankford.jpg")}
    
];
var triviaIndex = 0;//defines the number of the question that will be asked
var totalCorrect = 0;
var totalIncorrect = 0;
var totalUnanswered = 0;
var isAnswered = false;//define a variable that determines whether user should answer the question, so a timer function be started
var timeLeft = 15;//user will have 15 seconds to answer question
var intervalId;//define a global variable that will determine the intervals of the timer function 

//Define functions

function pickQuestion() {//this function picks the question, and shows its appropriate 
    isAnswered = false;//(re)set isAnswered variable to false
    timeLeft = 15;//reset timeLeft to 15 (seconds)
    intervalId = setInterval(timer, 1000);//timer will count down from 15 sec.
    
    if (isAnswered === false) {
        timer();//start the timer if the question has not been answered
    }

    var corr = triviaArr[triviaIndex].correctAns;//create shorthand variables for the current q's correct answer..
    var ques = triviaArr[triviaIndex].question;//..question..
    var answ;//..and the 4 choices that will be appended with a for loop.
    $("#question").html(ques);//add the question to the question div in the html on the page

    for (var i = 0; i < 4; i++) {
        answ = triviaArr[triviaIndex].answers[i];
        $("#answers").append('<p class = ans-class id=' + i + '>' + answ + '</p>');
    }//this loop appends the four choices of the current question

    $(".ans-class").click(function() {//needed to define ansClass above so that other p's, if clicked (like the question) the script would still run
        if($(this).text() === corr) {//if the text clicked matches the correct answer..
            isAnswered = true;
            $("#question").text("Correct. The answer is " + corr);
            userCorrect();//..show the answer is right and run the userCorrect function
        }

        else {
            isAnswered = true;
            $("#question").text("Incorrect. The answer is " + corr);
            userIncorrect();//..otherwise run the userIncorrect function
        }

    });
}

function timer() {//if question is answered, or time runs out, reset the interval, otherwise, take one second off (from 15) every 1000 milliseconds (1 sec)
    if (timeLeft === 0) {
        isAnswered = true;//if time runs out, mark the question as answered so that intervals and questions can be reset
        clearInterval(intervalId);
        $("#question").text("The answer is: " + triviaArr[triviaIndex].correctAns);//Cannot use the variable corr because it's not in scope
        noAnswer();//run no answer script
    }
    else if (isAnswered === true) {
        clearInterval(intervalId);
    }
    else {
        timeLeft--;
        $("#timer").text("Time remaining: " + timeLeft);
    }
    
}
//these next three functions are called upon based on whether the user answered the questions in/correctly or did not answer
function userCorrect() {
    totalCorrect++;
    endQuestion();//end question function is called
}

function userIncorrect() {
    totalIncorrect++;
    endQuestion();
}

function noAnswer() {
    totalUnanswered++;
    endQuestion();
}

function endQuestion() {//endQuestion removes the answers, replaces it with the appropriate result and an 
//..image representing the answer
    $(".ans-class").remove();
    $("#image-div").append('<img class = ans-img width = "400" src = "' + triviaArr[triviaIndex].image + '">');//give image a class so that it can be remove()-d later
    triviaIndex++;//..increment the trivia index to the next, so that next question in the array will be called upon

    if (triviaIndex < triviaArr.length) {
        setTimeout(function() {
            pickQuestion();
            $('.ans-img').remove();
    }, 3000)}//remove question and image after 3 seconds

    else {//if all questions have been answered, remove the questions, answers and images, and show results
        setTimeout(function() {
            $("#question").remove();
            $('.ans-img').remove();
            $("#timer").remove();

            $("#answers").append('<p class = end-result gameOver>You scored: ' + ((totalCorrect/10) * 100) + '%! </p>');
            $("#answers").append('<p class = ans-class gameOver>Correct: ' + totalCorrect + '</p>');
            $("#answers").append('<p class = ans-class gameOver>Wrong: ' + totalIncorrect + '</p>');
            $("#answers").append('<p class = ans-class gameOver>Unanswered: ' + totalUnanswered + '</p>');

            setTimeout(function() {
                location.reload();
            }, 10000);//after the final results are shown for 10 seconds, refresh the page to start the game again
        }, 3000);//show the results 3 seconds after the last question is answered ("happens" before the previous line)
    };

}

function begin() {//upon clicking start button defined below,..
    $("#start").remove();//..remove the start button..
    totalCorrect = 0;//..set scores to zero..
    totalIncorrect = 0;
    totalUnanswered = 0;
    pickQuestion();//..run pick Question function
}

$("#start").on("click", function() {
    begin();
})

});
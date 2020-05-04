//Define variables

var triviaArr = [

    {question: "Where was the Declaration of Independence signed?",
    answers: ["Philadelphia City Hall", "Independence Hall", "Congress Hall", "Liberty Hall"],
    correctAns: "Independence Hall",
    image: ("assets/images/independence.jpg")},

    {question: "What is the former prison in Fairmount where notorious criminals like Al Capone were held, that is still open for tours and 'haunted house' events during the Halloween season?",
    answers: ["Alcatraz", "Folsom Prison", "Pennsylvania State Penitentiary", "Eastern State Penitentiary"],
    correctAns: "Eastern State Penitentiary",
    image: ("assets/images/eastern.jpg")},

    {question: "What street in Philadelphia is America's oldest residential street?",
    answers: ["Elfreth's Alley", "Acorn Street", "Penn's Alley ", "Aviles Street"],
    correctAns: "Elfreth's Alley",
    image: ("assets/images/elfreth.jpg")},

    {question: "Which cheesesteak establishment in Passyunk Square is a neighbor and competitor of Pat's King of Steaks?",
    answers: ["Jim's", "Geno's", "Sonny's", "Abner's"],
    correctAns: "Geno's",
    image: ("assets/images/geno.jpg")},
    
    {question: "What is the other more commonly used name of the Washington Square West neighborhood?",
    answers: ["Chinatown", "Logan Square", "Gayborhood", "Old City"],
    correctAns: "Gayborhood",
    image: ("assets/images/gayborhood.jpg")},

    {question: "Located in Center City, what is the name of the large enclosed public market where merchants sell produce and prepared foods?",
    answers: ["Reading Terminal Market", "Benjamin Franklin Market", "Lancaster Market", "Union Market"],
    correctAns: "Reading Terminal Market",
    image: ("assets/images/reading.jpg")},

    {question: "Which section of Philadelphia does the show 'It's Always Sunny in Philadelphia' take place?",
    answers: ["North Philadelphia", "South Philadelphia", "East Philadelphia", "West Philadelphia"],
    correctAns: "South Philadelphia",
    image: ("assets/images/south.jpg")},
     
    {question: "Philadelphia is a city of many firsts for America. Which of the following is not a title Philadelphia can possess?",
    answers: ["America's first zoo", "America's first hospital", "Oldest continually running market in America", "Oldest continually running theater"],
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
            $("#question").text("Correct. The answer is " + corr);
            userCorrect();
        }

        else {
            isAnswered = true;
            $("#question").text("Incorrect. The answer is " + corr);
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
    $("#answers").append('<img class = ansImg width = "200" src = "' + triviaArr[triviaIndex].image + '">');//give image a class so that it can be remove()-d later
    triviaIndex++;

    if (triviaIndex < triviaArr.length) {
        setTimeout(function() {
            pickQuestion();
            $('.ansImg').remove();
    }, 3000)}//remove question and image after 3 seconds

    else {
        setTimeout(function() {
            $("#question").remove();
            $('.ansImg').remove();
            $("#timer").remove();

            $("#answers").append('<p class = ansClass gameOver>You scored: ' + ((totalCorrect/10) * 100) + '% </p>');
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

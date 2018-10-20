$(document).ready(function () {
    var options = [{
            question: "What was Mulans fake name when she joined the army?",
            choice: ["Mulan", "Ping", "George", "Jack"],
            answer: 1,
            photo: "assets/images/ping.gif"
        },

        {
            question: "How many sisters did Ariel have in the Little Mermaid?",
            choice: ["6", "3", "7", "5"],
            answer: 0,
            photo: "assets/images/mermaid.gif"
        },

        {
            question: "What is Olafs favorite season?",
            choice: ["Fall", "Winter", "Summer", "Spring"],
            answer: 2,
            photo: "assets/images/olaf.gif"
        },

        {
            question: "In the Lion King, where does Mufasa and his family live?",
            choice: ["Lion Land", "Africa", "Pride Rock", "Tilted Towers"],
            answer: 2,
            photo: "assets/images/lion.gif"
        },

        {
            question: "What was the bear's name in The Jungle Book?",
            choice: ["Barry", "Mowgli", "Greg", "Baloo"],
            answer: 3,
            photo: "assets/images/baloo2.gif"
        },

        {
            question: "Who is the villin in Peter Pan?",
            choice: ["Captain Crook", "Captain Hook", "Captain Cook", "Bill"],
            answer: 1,
            photo: "assets/images/hook.gif"
        },

        {
            question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
            choice: ["Dinah", "Diane", "Garfield", "Snowball"],
            answer: 0,
            photo: "assets/images/kitty.gif"
        }
    ];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];



    $("#reset").hide();
    //start button
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time's up! The correct answer was: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }


    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];


        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);

            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);

        }

        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct and wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }

    //hide picture
    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;

            //run the score screen 
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's your score: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }
    //reset game
    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})
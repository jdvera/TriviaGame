window.onload = function() {

var question1 = {
	text: "Who is Roose Bolton's Wife?",
	choices: ["A: Wanda Frey", "B: Walda Frey", "C: Roslin Frey", "D: Waldra Frey"],
	answer: 1,
	image: "one.jpg"
};

var question2 = {
	text: "What is the name of House Tarly's Sword?",
	choices: ["A: Heartsbane", "B: Longclaw", "C: Ice", "D: Widow's Wail"],
	answer: 0,
	image: "two.jpg"
};

var question3 = {
	text: "What city is NOT in Slaver's Bay?",
	choices: ["A: Meereen", "B: Yunkai", "C: Astapor", "D: Volantis"],
	answer: 3,
	image: "three.jpg"
};

var question4 = {
	text: "Xaro Xhoan Daxos invokes what ancient right to vouch for Daenerys?",
	choices: ["A: Parley", "B: Doreah", "C: Sumai", "D: Quaithe"],
	answer: 2,
	image: "four.gif"
};

var question5 = {
	text: 'Finish this phrase: "What\'s dead may never die,..."',
	choices: ["A: but rises again harder and stronger", "B: Answer 2", "C: Answer 3", "D: Answer 4"],
	answer: 0,
	image: "five.gif"
};

var question6 = {
	text: 'Old Nan is Hodor\'s _______.',
	choices: ["A: Mother", "B: Aunt", "C: Grandmother", "D: Great-Grandmother"],
	answer: 3,
	image: "six.gif"
};

var question7 = {
	text: 'What island is Messandai from?',
	choices: ["A: Lys", "B: Naath", "C: Myr", "D: Pentos"],
	answer: 1,
	image: "seven.png"
};

var question8 = {
	text: 'During Tyrion\'s Trial by Combat in the Eyrie, who does Bronn fight?',
	choices: ["A: Ser Vardis", "B: Answer 2", "C: Answer 3", "D: Answer 4"],
	answer: 3,
	image: "eight.gif"
};

var question9 = {
	text: 'What is Sansa\'s pseudonym while staying in the Eyrie with Littlefinger?',
	choices: ["A: Dove", "B: Mae", "C: Alayne", "D: Sarah"],
	answer: 2,
	image: "nine.gif"
};

var questionsList = [question1, question2, question3, question4, question5, question6, question7, question8, question9];

var interval;
var counter;
var numRight;
var numWrong;
var currentQuestion;




//-------------------------------------------------- Main Menu
var mainMenu = function() {
	newButton("Start", "start", "#question");
}




//-------------------------------------------------- Start New Game
var startGame = function() {
	numRight = 0;
	numWrong = 0;
	currentQuestion = 0;
	loadQuestion()
}




//-------------------------------------------------- Next Question
var loadQuestion = function() {
	if (numWrong + numRight == 9) {
		numWrong = 0;
		numRight = 0;
	}
	$("#images").empty();
	$("#answer-choices").empty();
	$("#question").text(questionsList[currentQuestion].text);
	for (var i = 0; i < 4; i++) {
		var answerChoice = $("<div>");
		answerChoice.addClass("choice");
		answerChoice.attr("value", i);
		answerChoice.text(questionsList[currentQuestion].choices[i]);
		$("#answer-choices").append(answerChoice);
	};
	timer("#visible-timer");
}




//-------------------------------------------------- Check Answer
var checkAnswer = function(clickedAnswer) {
	if (clickedAnswer) {
		var num = $(this).attr("value");
		if (num == questionsList[currentQuestion].answer) {
			correctAnswer();
		}
		else {
			$("#question").html("WRONG");
			wrongAnswer();
		}
		clickedAnswer = false;
	}
	else {
		$("#question").html("No Time Left :(");
		wrongAnswer();
	}
	insertImage();
	timer("#hidden-timer");
	currentQuestion++;
}




// -------------------------------------------------- Correct Answer screen
var correctAnswer = function() {
	$("#visible-timer").empty();
	$("#question").html("Correct!");
	$("#answer-choices").empty();
	numRight++;
}




// --------------------------------------------------- Wrong Answer screen
var wrongAnswer = function() {
	$("#visible-timer").empty();
	$("#answer-choices").html("Actual Answer: " + questionsList[currentQuestion].choices[questionsList[currentQuestion].answer]);
	numWrong++;
}




//---------------------------------------------------- Game Over
 var endScreen = function() {
 	$("#visible-timer").html("GAME OVER");
 	$("#question").html("Number Correct: " + numRight + "<br>Number Wrong: " + numWrong);
 	$("#answer-choices").empty();
 	$("#images").empty();
 	newButton("Start Over", "start", "#answer-choices");
 }




//-------------------------------------------------- Timer
var timer = function(elementId) {
	clearInterval(interval);

	// Set the start time as approprite
	if (elementId == "#visible-timer") {
		counter = 15;
	} else {
		counter = 3;
	}

	// Display the Start Time
	$(elementId).text("Time Left: " + counter + " seconds")

	// Countdown
	interval = setInterval(function() {
		// reduce counter by 1 every second
	    counter--;

	    //display new counter value
	    $(elementId).text("Time Left: " + counter + " seconds")

	    // If the user is looking at the questions
	    if (counter == 0 && elementId == "#visible-timer") {
	    	checkAnswer(false);
	    } 

	    // if the user is on post-question screen
	    else if (counter == 0 && elementId == "#hidden-timer"){
	    	if (numWrong + numRight == 9) {
	    		clearInterval(interval);
	    		endScreen();
	    		return;
	    	}
	    	else {
	    	loadQuestion();
	    	}
	    }
	}, 1000);
};




//----------------------------------------------------- New Button
var newButton = function (buttonText, desiredClass, htmlId) {
	var btn = $("<button>");
	btn.addClass(desiredClass);
	btn.html(buttonText);
	$(htmlId).append(btn);
};




//----------------------------------------------------- Insert Image
var insertImage = function() {
	var img = $("<img>");
	img.attr("src", "assets/images/" + questionsList[currentQuestion].image);
	$("#images").append(img);
}




//----------------------------------------------------- Run on Load
mainMenu();
$("#page-wrapper").on("click", ".start", startGame);
$("#page-wrapper").on("click", ".choice", {clickedAnswer: true}, checkAnswer);
}
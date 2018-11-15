$(document).ready(function() {

var questionCounter = 0;


var ansTimeout = 2000;


var correct = 0;
var incorrect = 0;
var missed = 0;


var userAns = [];


var questions = [
{
	question: "Which one of the following is one of the four noble truths in Buddhism?",
	choices: ["Everyone is a god", "All of life is suffering", "Follow your own truth"],
	choicesAnswer: 1
},
{
	question: "Which one of the following is one of the five pillars of Islam?",
	choices: ["To fast 3 days every month", "Establish Shariah Law", "Pray 5 times a day, canonically, at least"],
	choicesAnswer: 2
},
{
	question: "Which of the following is one of the ten commandments in Judaism?",
	choices: ["Do whatever you want", "You are not allowed to fornicate", "Pray 3 times a day at least"],
	choicesAnswer: 1
},
{
	question: "Which of the following is one of the beatitudes in Christianity?",
	choices: ["Blessed are the wealthy", "Blessed are the meek", "Blessed are the learned"],
	choicesAnswer: 1
},];

//Function to submit answers
function submitAns() {
	$("#submit").on("click", function(e) {
		e.preventDefault();
		userAns.length = 0;
			
		//Record user answer to question
		var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
		userAns.push(userSelection);
		console.log(userAns);
		nextQuestions();
	});
};
	
//Creating question timer variables & functions
var timeLeft = 8;
var increment;

function runTimer() {
	increment = setInterval(decrement, 1000);
};

function decrement() {
	timeLeft--;
	$("#time-left").html("Time remaining: " + timeLeft + " seconds");
	if (timeLeft === 0) {
		stopTimer();
		userAns.length = 0;		
		//Record user answer to question
		var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
		userAns.push(userSelection);
		console.log(userAns);
		nextQuestions();
	};
};

function resetTimer() {
	timeLeft = 8;
	$("#time-left").html("Time remaining: " + timeLeft + " seconds");
};

function displayTimer() {
	$("#time-left").html("Answer Review");
};

function stopTimer() {
	clearInterval(increment);
};

//Function to display the given response options
function createRadios() {
	var responseOptions = $("#responses");
	//Empty array for user answer
	responseOptions.empty();
		
	for (var i = 0; i < questions[questionCounter].choices.length; i++) {
		responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="twd-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
	};
};

//Function to display the given question
function displayQuest() {
	clearQuestions();
	resetTimer();
	$(".questionX").html(questions[questionCounter].question);
	//Calling the function to display the response options
	createRadios();
	//Creating submit button
	$("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Submit" + '</button>');
	runTimer()
	submitAns();
};

//Display start page
function displayStart() {
	$("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "Start Trivia" + '</a>');
	//Start game
	$("#start-button").on("click", function(event) {
		event.preventDefault();
		//Displays the first question
		questionOne();
		resetTimer();
	});
};

//Reset for end of game
function reset() {
	questionCounter = 0;
	correct = 0;
	incorrect = 0;
	missed = 0;
	userAns = [];
	resetTimer();
};

//Display end page
function displayEnd() {
	clearQuestions();
	$("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Trivia" + '</a>');
	//Restart game
	$("#restart-button").on("click", function(event) {
		event.preventDefault();
		//Displays the first question
		reset();
		clearQuestions();
		displayStart();
	});
};

//Function to clear the question
function clearQuestions() {
	var questionDiv = $(".questionX");
	questionDiv.empty();

	var responsesDiv = $("#responses");
	responsesDiv.empty();

	var submitDiv = $("#submit-div");
	submitDiv.empty();

	var contentDiv = $("#content");
	contentDiv.empty();

	stopTimer();
};

//Showing whether answer was right/wrong
function checkQuestions() {
	clearQuestions();
	var correctAnswer = questions[questionCounter].choicesAnswer;
	if (userAns[0] == questions[questionCounter].choicesAnswer) {
		$("#content").append('<h3>'+"Congratulations! You chose the right answer!" + '</h3>');
		correct++;
		displayTimer();
	}
	else if (userAns[0] === undefined) {
		$("#content").append('<h3>'+"Time's up!" + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
		missed++;
		displayTimer();
	}
	else {
		$("#content").append('<h3>'+"You chose the wrong answer." + '</h3><br><br><h3>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
		incorrect++;
		displayTimer();
	};
};

//Function to change the question 
function nextQuestions() {
	checkQuestions();
	//Incrementing the count by 1
	questionCounter++;
	//If the count is the same as the length of the question array, the counts reset to 0
	if (questionCounter === questions.length) {
		setTimeout(displayEnd, ansTimeout);
	} 
	else {
		setTimeout(displayQuest, ansTimeout);
	};
};

//Function to call the first question
function questionOne() {
	var startContent = $("#content");
	startContent.empty(); 
	displayQuest();
};

//Displays the start page
displayStart();

});
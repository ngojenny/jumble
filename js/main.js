//Object of Game: users select which level they want to play, unscramble as many words as possible in under 1 minute
//with each successful unscramble, points are added to the user's total

var jumbleApp = {

};

jumbleApp.init = function() {
	jumbleApp.jumbleWordArray();
}

//create an arrays of words that represents different levels of game

var currentLevel = [];

var levelOne = ['ketchup', 'grape', 'bread', 'apple', 'pickle', 'cider', 'cookies', 'chocolate', 'ramen', 'spinach', 'carrot', 'broccoli', 'pear', 'mango', 'eggs', 'pizza', 'mustard', 'candy', 'muffin', 'bacon', 'rice', 'kale'];

// var levelTwo = ['usa', 'canada', 'spain', 'france', 'brazil', 'mexico'];

currentLevel = levelOne;
console.log(currentLevel);


//create a function that shuffles the array
jumbleApp.jumbleWordArray = function() {
	var shuffledArray = _.shuffle(currentLevel);
	console.log(shuffledArray);

	jumbleApp.shuffleCharacters(shuffledArray);
}

//create a function that shuffles the characters for each item in the array
jumbleApp.shuffleCharacters = function(shuffledArray) {
	var scrambledWordsArray = shuffledArray.map(function(individualWord) {
		return _.shuffle(_.shuffle(individualWord));
	});

	console.log(scrambledWordsArray);
	jumbleApp.displayJumbledWordsArray(scrambledWordsArray);
	jumbleApp.displayUnjumbledWordsArray(shuffledArray);
}

var scrambledWordsArrayIndex = 0;
//create a function at puts the iterates through the array and pulls out the first item and displays it on the page
jumbleApp.displayJumbledWordsArray = function(scrambledWordsArray) {
	// console.log(scrambledWordsArray[i]);
	// var i = 0;

	// $('#outPut').html('<span class="tile">' +scrambledWordsArray[0] + '</span>');
	$('#outPut').append(scrambledWordsArray[0]);

	$('.nxtBtn').on('click', function(){
		jumbleApp.nextJumbledPrompt(scrambledWordsArray);
	});

	$('#userAnswersForm').on('submit', function(e){
		e.preventDefault();
		var usersInput = $('input[type=text]').val();
		var answerKeyDiv = document.getElementById('answerKey');
		var answerKey = answerKeyDiv.innerHTML;

		if (usersInput === answerKey) {
			jumbleApp.nextJumbledPrompt(scrambledWordsArray);
		} else {
			return false
			console.log('try again')
		}
	});
	$('.nxtBtn').on('click', function(){
		jumbleApp.subtractPoints();
	});

}

jumbleApp.nextJumbledPrompt = function(scrambledWordsArray) {
	scrambledWordsArrayIndex = scrambledWordsArrayIndex + 1;
	$('#outPut').empty();
	$('#outPut').append(scrambledWordsArray[scrambledWordsArrayIndex]);
	if(scrambledWordsArrayIndex === scrambledWordsArray.length){
		alert('congrats! ready for the next level?');
		// currentLevel = levelTwo;
		// jumbleApp.jumbleWordArray();
	} else {

	}
}

var shuffledArrayIndex = 0;
//create a function that shows/stores the unscrambled word
jumbleApp.displayUnjumbledWordsArray = function(shuffledArray) {

	$('#answerKey').append(shuffledArray[0]);

	$('.nxtBtn').on('click', function(){
		jumbleApp.nextAnswerKey(shuffledArray);
	});


	$('#userAnswersForm').on('submit', function(e){
		e.preventDefault();
		var usersInput = $('input[type=text]').val();
		var answerKeyDiv = document.getElementById('answerKey');
		var answerKey = answerKeyDiv.innerHTML;
		
		if (usersInput === answerKey) {
			jumbleApp.nextAnswerKey(shuffledArray);
			jumbleApp.addPoints(shuffledArray);
			$('input[type=text]').val('');
		} else {
			$('input[type=text]').val('');
			return false
			console.log('try again')
		}
	});
}

jumbleApp.nextAnswerKey = function(shuffledArray) {
	shuffledArrayIndex = shuffledArrayIndex + 1;
	$('#answerKey').empty();
	$('#answerKey').append(shuffledArray[shuffledArrayIndex]);
}


var usersScore = 0;

//store users' answers in a variable
//if users score matches answer key add points to their total
jumbleApp.addPoints = function() {
	var usersInput = $('input[type=text]').val();
	var answerKeyDiv = document.getElementById('answerKey');
	var answerKey = answerKeyDiv.innerHTML;
	
	usersScore = usersScore + 10;	
	
	console.log(usersInput);

	jumbleApp.displayUsersScore(usersScore);
}

jumbleApp.subtractPoints = function() {
	var usersInput = $('input[type=text]').val();
	var answerKeyDiv = document.getElementById('answerKey');
	var answerKey = answerKeyDiv.innerHTML;
	
	usersScore = usersScore - 5;	
	
	console.log(usersInput);

	jumbleApp.displayUsersScore(usersScore);
}

//display user's score on the page
jumbleApp.displayUsersScore = function(usersScore) {
	console.log(usersScore);
	$('span.score').text(usersScore);
}

//create a 1 minute timer
jumbleApp.onTimer = function() {
	$('.playBtn').on('click', function(){
		// jumbleApp.onTimer();
		var node = document.getElementById('promptUser');
		if(node.parentNode) {
			node.parentNode.removeChild(node);
		}

		var seconds = 60;
		var countdown = window.setInterval(function(){
			$('.seconds').html(seconds);
			seconds = seconds - 1;
			if(seconds < 0) {
				window.clearInterval(countdown);
				// alert('Times Up!');
			}
		}, 1000);
	});
}

$(document).ready(function(){
	jumbleApp.init();
	jumbleApp.onTimer();
});
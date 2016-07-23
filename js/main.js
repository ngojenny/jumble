//Object of Game: users select which level they want to play, unscramble as many words as possible in under 1 minute
//with each successful unscramble, points are added to the user's total

var jumbleApp = {

};

jumbleApp.init = function() {
	jumbleApp.jumbleWordArray();
}

//create an array of words


var levelOne = ['ketchup', 'grape', 'bread', 'apple', 'pickle', 'cider', 'cookies', 'chocolate', 'ramen', 'spinach', 'carrot', 'broccoli', 'pear'];

console.log(levelOne);
//create a function that shuffles the array
jumbleApp.jumbleWordArray = function() {
	var shuffledArray = _.shuffle(levelOne);
	console.log(shuffledArray);

	jumbleApp.shuffleCharacters(shuffledArray);
}

//create a function that shuffles the characters for each item in the array
jumbleApp.shuffleCharacters = function(shuffledArray) {
	var scrambledWordsArray = shuffledArray.map(function(individualWord) {
		return _.shuffle(individualWord);
	});

	console.log(scrambledWordsArray);
	jumbleApp.displayArray(scrambledWordsArray);
	jumbleApp.unscrambled(shuffledArray);
}


//create a function at puts the iterates through the array and pulls out the first item and displays it on the page
jumbleApp.displayArray = function(scrambledWordsArray) {
	// console.log(scrambledWordsArray[i]);
	var i = 1;
	var print = document.getElementById('outPut');
	print.innerHTML = scrambledWordsArray[0];

	$('.nxtBtn').on('click', function(){
		nextElement();
	});

	$('#userAnswersForm').on('submit', function(){
		nextElement();
	});

	function nextElement() {
		print.innerHTML = scrambledWordsArray[i];
		i = (i + 1)%(scrambledWordsArray.length);
	}
}


//create a function that shows/stores the unscrambled word
jumbleApp.unscrambled = function(shuffledArray) {
	var i = 0;
	var print = document.getElementById('outPut');

	$('#answerKey').append(shuffledArray[0]);

	$('.nxtBtn').on('click', function(){
		returnNextElement();
	});

	jumbleApp.compare(shuffledArray);
	$('#userAnswersForm').on('submit', function(){
		returnNextElement();
	});

	function returnNextElement() {
		i = (i + 1)%(shuffledArray.length);
		$('#answerKey').empty();
		$('#answerKey').append(shuffledArray[i]);
	}
}


var usersScore = 0;

//store users' answers in a variable
//if users score matches answer key add points to their total
jumbleApp.compare = function(shuffled) {
	$('form.userAnswers').on('submit', function(e){
		e.preventDefault();
		var usersInput = $('input[type=text]').val();
		var answerKeyDiv = document.getElementById('answerKey');
		var answerKey = answerKeyDiv.innerHTML;

		console.log(answerKey)
		if (usersInput === answerKey) {
			usersScore = usersScore + 1;
		} else {
			console.log('try again')
		}

		$('input[type=text]').val('');
		console.log(usersInput);
		jumbleApp.displayUsersScore(usersScore);
	});
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
		var seconds = 60;
		var countdown = window.setInterval(function(){
			$('span').html(seconds);
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
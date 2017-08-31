function generateWinningNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
    let unshuffled = array.length;
    let temp;
    let randomSelection;
  
    // While there remain elements to shuffle…
    while (unshuffled) {
      // Pick a remaining element…
      randomSelection = Math.floor(Math.random() * unshuffled--);
      // And swap it with the current element.
      temp = array[unshuffled];
      array[unshuffled] = array[randomSelection];
      array[randomSelection] = temp;
    }
  
    return array;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
    if(this.playersGuess > this.winningNumber) return this.playersGuess - this.winningNumber;
    else return this.winningNumber - this.playersGuess;
}

Game.prototype.isLower = function() {
    if(this.playersGuess < this.winningNumber) return true;
    else return false;
}

Game.prototype.playersGuessSubmission = function(num){
    if((num === 'not a number') || num > 100 || num < 1){
        throw 'That is an invalid guess.';
    } else {
        this.playersGuess = num;
    }
    return this.checkGuess();
}

// Game.prototype.checkGuess = function(){
//     if(this.playersGuess === this.winningNumber) return 'You Win!';
//     else if(this.pastGuesses.includes(this.playersGuess)) return 'You have already guessed that number.';
//     else this.pastGuesses.push(this.playersGuess);
//     if(this.pastGuesses.length === 5) return 'You Lose.';
//     else if(this.difference() < 10) return 'You\'re burning up!';
//     else if(this.difference() > 10 && this.difference() < 25) return 'You\'re lukewarm.';
//     else if(this.difference() < 50 && this.difference() > 25) return 'You\'re a bit chilly.';
//     else if(this.difference() < 100) return 'You\'re ice cold!';
// }

Game.prototype.checkGuess = function(){
    if(this.playersGuess === this.winningNumber){
        $('#hint, #go-button').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!';
    } else {
        if(this.pastGuesses.includes(this.playersGuess)){
            return 'You have already guessed that number.';
        } else {
            this.pastGuesses.push(this.playersGuess);
            
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            
            if(this.pastGuesses.length === 5){
                $('#hint, #go-button').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            } else {
                if(this.isLower()) $('#subtitle').text("Guess Higher!");
                else $('#subtitle').text("Guess Lower!");
                if(this.difference() < 10) return 'You\'re burning up!';
                else if(this.difference() > 10 && this.difference() < 25) return 'You\'re lukewarm.';
                else if(this.difference() < 50 && this.difference() > 25) return 'You\'re a bit chilly.';
                else if(this.difference() < 100) return 'You\'re ice cold!';
            }
        }
    }
}

//Why is this not on the prototype??

// Game.prototype.newGame = function () {
//     return new Game();
// }
var newGame = function() {
    return new Game();
}

Game.prototype.provideHint = function() {
    let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    console.log('hint array', shuffle(hintArray));
    return shuffle(hintArray);
}




function makeAGuess(game) {
    var guess = $('#players-input').val();
    $('#players-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    console.log(output);
    $('#title').text(output);
}



$(document).ready(function() {
    var game = new Game();

    $('#go-button').click(function() {
       makeAGuess(game);
    })

    $('#players-input').keypress(function(event) {
        if ( event.which === 13 ) {
           makeAGuess(game);
        }
    })
    $('#hint').click(function() {
        var hints = game.provideHint();
        console.log(hints);
        $('#title').text('The winning number is ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2]);
    });
    
    $('#reset').click(function() {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('#guess-list').children().text('-');
        $('#hint, #go-button').prop("disabled",false);
    })

})




function guessingGame() {
    const newRandomNumber = 60; //Math.floor(Math.random()) * 100;
    let gameWon = false;
    let count = 1;

    return function(guess){
        if(gameWon) return "The game is over, you already won!";

        if(guess < 0 || guess > 99){
            return "please enter a valid number between 1 and 99";
            count++;
        }
        if(guess < newRandomNumber){
            count ++;
            return `${guess} is too low!`;
        }else if(guess > newRandomNumber){
            count ++;
            return  `${guess} is too high!`;
        }else{
            gameWon = true;
            return `You win! You found ${guess} in ${count} guesses.`;
        }
    }
}

module.exports = { guessingGame };

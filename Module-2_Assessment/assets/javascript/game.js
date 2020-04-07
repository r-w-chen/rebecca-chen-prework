let words = ["BEETHOVEN", "MOZART", "BACH", "CHOPIN", "TCHAIKOVSKY", "DEBUSSY", "HANDEL", "BRAHMS", "HAYDN", "LISZT"];
let wordsGuessedCorrectly = [];
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); //creates array of alphabet
let underscoreHTML = "";
let currentWord = "";
let currentGuess = ""; //will display the letters as they are guessed
let game = {
  //game properties
  guessesLeft: 6,
  lettersGuessed: [],
  winNumber: 0,

  //game methods
  generateWord: function() {
    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    if (wordsGuessedCorrectly.includes(currentWord)){
    currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    }
    for (i = 0; i < currentWord.length; i++) {
      underscoreHTML += "_ "
    }
    document.querySelector("#currentWord").innerText = underscoreHTML;

    return currentWord;
  },

  updateWord: function(letter) { //replaces '_' with each correct letter
    currentGuess = currentWord.split('').map(letter => (this.lettersGuessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.querySelector('#currentWord').innerHTML = currentGuess;
    //will need to include code to advance to next level once there are no more "_".
  },
  checkGuess: function(guess) {
    if (currentWord.indexOf(guess) >= 0) {
      this.updateWord();
      // this.checkGameWon();
    } else if (currentWord.indexOf(guess) === -1) {
      this.guessesLeft--;
      document.querySelector("#guessesRemaining").innerHTML = this.guessesLeft;
      //check if the incorrect guess is also NOT in the guessedList
    }
  },
  showGuesses: function(guess) {
    if (this.lettersGuessed.includes(guess) === false) {
      this.lettersGuessed.push(guess);
      document.querySelector("#lettersGuessedArray").innerHTML = this.lettersGuessed.join();
    }
  },
  checkGuessComplete: function(){
    if (currentGuess === currentWord){
      wordsGuessedCorrectly.push(currentWord);
      words.splice(words.indexOf(currentWord), 1);
      this.winNumber++;
      document.querySelector("#winCounter").innerHTML = this.winNumber;
      this.reset();
      console.log(this.generateWord());
    }
  },
  reset: function(){
    alphabet = alphabet.concat(this.lettersGuessed);
    this.guessesLeft = 6;
    this.lettersGuessed = [];
    underscoreHTML = "";
    currentGuess = "";
    currentWord = "";
  },
  checkGameWon: function(){
    if (this.guessesLeft === 0){
      document.querySelector("#header").innerHTML = "Game Over! Press any key to restart."
      words = words.concat(wordsGuessedCorrectly);
      wordsGuessedCorrectly = [];
      this.winNumber = 0;
      this.reset();
      console.log(this.generateWord());
    }
    else if(words.length === 0){
      document.querySelector("#header").innerHTML = "You won! Refresh the page to play again."
    }
  }
}

console.log(game.generateWord());
document.addEventListener("keydown", function(event) {
  const pressedKey = event.key.toUpperCase();
  if (alphabet.includes(pressedKey)) {
    game.showGuesses(pressedKey);
    game.checkGuess(pressedKey);
    alphabet.splice(alphabet.indexOf(pressedKey), 1);
    game.checkGuessComplete();
    game.checkGameWon();
  }
});


let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); //creates array of alphabet
let headerHTML = document.querySelector("#header");
let winNumberHTML = document.querySelector("#winNumber");
let currentWordHTML = document.querySelector("#currentWord");
let guessesLeftHTML = document.querySelector("#guessesLeft");
let lettersGuessedHTML = document.querySelector("#lettersGuessed");

let game = {
  //game properties
  words: ["BEETHOVEN", "MOZART", "BACH", "CHOPIN", "TCHAIKOVSKY", "DEBUSSY", "HANDEL", "BRAHMS", "HAYDN", "LISZT"],
  wordsGuessedCorrectly: [],
  currentWord : "",
  currentGuess: "",
  underscore: "",
  guessesLeft: 6,
  lettersGuessed: [],
  winNumber: 0,

  //game methods
  generateRandomWord: function(){
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
  },
  displayWord: function() {
    this.generateRandomWord();
    if (this.wordsGuessedCorrectly.includes(this.currentWord)){
    this.generateRandomWord();
    }
    for (i = 0; i < this.currentWord.length; i++) {
      this.underscore += "_ "
    }
    currentWordHTML.innerText = this.underscore;

    return this.currentWord;
  },

  updateWord: function(letter) { //replaces '_' with each correct letter
    this.currentGuess = this.currentWord.split('').map(letter => (this.lettersGuessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    currentWordHTML.innerHTML = this.currentGuess;
  },
  checkGuess: function(guess) {
    if (this.currentWord.indexOf(guess) >= 0) {
      this.updateWord();
      // this.checkGameWon();
    } else if (this.currentWord.indexOf(guess) === -1) {
      this.guessesLeft--;
      guessesLeftHTML.innerHTML = this.guessesLeft;
    }
  },
  showGuesses: function(guess) {
    if (this.lettersGuessed.includes(guess) === false) {
      this.lettersGuessed.push(guess);
      lettersGuessedHTML.innerHTML = this.lettersGuessed.join();
    }
  },
  checkGuessComplete: function(){
    if (this.currentGuess === this.currentWord){
      this.wordsGuessedCorrectly.push(this.currentWord);
      this.words.splice(this.words.indexOf(this.currentWord), 1);
      this.winNumber++;
      winNumberHTML.innerHTML = this.winNumber;
      this.reset();
      console.log(this.displayWord());
    }
  },
  reset: function(){
    alphabet = alphabet.concat(this.lettersGuessed);
    this.guessesLeft = 6;
    this.lettersGuessed = [];
    this.underscore = "";
    this.currentGuess = "";
    this.currentWord = "";
    guessesLeftHTML.innerHTML = this.guessesLeft;
    lettersGuessedHTML.innerHTML = this.lettersGuessed;
  },
  checkGameWon: function(){
    if (this.guessesLeft === 0){
      headerHTML.innerHTML = "Game Over! Press any key to restart."
      this.words = this.words.concat(this.wordsGuessedCorrectly);
      this.wordsGuessedCorrectly = [];
      this.winNumber = 0;
      winNumberHTML.innerHTML = this.winNumber;
      this.reset();
      console.log(this.displayWord());
    }
    else if(this.wordsGuessedCorrectly.length === 10){
      headerHTML.innerHTML = "You won! Refresh the page to play again."
    }
  }
}

console.log(game.displayWord());
document.addEventListener("keydown", function(event) {
  const pressedKey = event.key.toUpperCase();
  if (alphabet.includes(pressedKey)) {
    game.showGuesses(pressedKey);
        game.checkGameWon();
    game.checkGuess(pressedKey);
    alphabet.splice(alphabet.indexOf(pressedKey), 1);
    game.checkGuessComplete();

  }
});

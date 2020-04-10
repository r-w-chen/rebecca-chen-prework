let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); //creates array of alphabet
let audio = new Audio("");
let headerHTML = document.querySelector("#header");
let composerHTML = document.querySelector(".composer");
let winNumberHTML = document.querySelector("#winNumber");
let currentWordHTML = document.querySelector("#currentWord");
let guessesLeftHTML = document.querySelector("#guessesLeft");
let lettersGuessedHTML = document.querySelector("#lettersGuessed");
let game = {
  //game properties
  words: ["BEETHOVEN", "MOZART", "BACH", "CHOPIN", "TCHAIKOVSKY", "DEBUSSY", "HANDEL", "BRAHMS", "HAYDN", "LISZT"],
  wordsGuessedCorrectly: [],
  currentWord: "",
  currentGuess: "",
  previousWord: "",
  underscore: "",
  guessesLeft: 6,
  lettersGuessed: [],
  winNumber: 0,

  //game methods
  generateRandomWord: function() {
    this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
  },

  displayWord: function() {
    this.generateRandomWord();
    while (this.wordsGuessedCorrectly.includes(this.currentWord)) {
      if (game.wordsGuessedCorrectly.length === game.words.length) {
        break;
      } else{
        this.generateRandomWord();
      }
    }
    for (i = 0; i < this.currentWord.length; i++) {
      this.underscore += "_ "
    }
    currentWordHTML.innerText = this.underscore;
    console.log(game.currentWord);
  },

  updateWord: function(letter) { //replaces '_' with each correct letter
    this.currentGuess = this.currentWord.split('').map(letter => (this.lettersGuessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    currentWordHTML.innerHTML = this.currentGuess;
  },
  playSong: function(){
    audio.pause();
    audio = new Audio("assets/audio/" + this.currentWord + ".mp3");
    audio.play();
  },
  updateComposer: function(){
    if(this.winNumber > 1){
        document.querySelector("." + this.previousWord).classList.add("invisible");
    }
    document.querySelector("." + this.currentWord).classList.remove("invisible");
    composerJPG.src = `assets/images/${this.currentWord}.jpg`
    this.playSong();
    this.previousWord = this.currentWord;
  },
  checkGuess: function(guess) {
    if (this.currentWord.indexOf(guess) >= 0) {
      this.updateWord();
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

  checkGuessComplete: function() {
    if (this.currentGuess === this.currentWord) {
      this.winNumber++;
      this.updateComposer();
      this.wordsGuessedCorrectly.push(this.currentWord);

      winNumberHTML.innerHTML = ` ${this.winNumber}`;
      this.resetRound();
      this.displayWord();

    }
  },

  resetRound: function() {
    alphabet = alphabet.concat(this.lettersGuessed);
    this.guessesLeft = 6;
    this.lettersGuessed = [];
    this.underscore = "";
    this.currentGuess = "";
    this.currentWord = "";
    guessesLeftHTML.innerHTML = this.guessesLeft;
    lettersGuessedHTML.innerHTML = this.lettersGuessed;
  },

  checkGameWon: function() {
    if (this.guessesLeft === 0) {
      headerHTML.innerHTML = "Game Over! Refresh the page to try again."
    } else if (this.wordsGuessedCorrectly.length === 10) {
      headerHTML.innerHTML = "You won! Refresh the page to play again."
    }
  }
}


game.displayWord();

document.addEventListener("keydown", function(event) {
  const pressedKey = event.key.toUpperCase();
  if (game.guessesLeft === 0 || game.wordsGuessedCorrectly.length === 10){
    //do nothing
  }
  else if (alphabet.includes(pressedKey)) {
    game.showGuesses(pressedKey);
    game.checkGuess(pressedKey);
    alphabet.splice(alphabet.indexOf(pressedKey), 1);
    game.checkGuessComplete();
    game.checkGameWon();

  }
});

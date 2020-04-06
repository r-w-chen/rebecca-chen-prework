

const words = ["beethoven", "mozart", "bach", "chopin", "tchaikovsky", "debussy", "handel", "brahms", "haydn", "liszt"]
let underscoreHTML = "";
let randomWord = "";
let wordsGuessedCorrectly = []; //will need to use this to prevent randomWord from repeating already guessed words

let game = {
  //game properties
  guessesLeft: 12,
  lettersGuessed: [],
  winNumber: 0,

  //game methods
  generateWord: function(){
    randomWord = words[Math.floor(Math.random() * words.length)];
    for(i=0; i<randomWord.length; i++){
      underscoreHTML += "_ "
    }
    document.querySelector("#currentWord").innerText = underscoreHTML;
    wordsGuessedCorrectly.push(randomWord);
    // return randomWord;
  },
  checkGuess: function(key){
    console.log("checking..." + key)
  }
}
console.log(game.generateWord());
document.addEventListener("keydown", function(event){
  game.checkGuess(event.key.toUpperCase());
  console.log(randomWord);
});

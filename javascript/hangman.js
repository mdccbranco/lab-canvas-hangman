class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    return this.words[Math.floor(Math.random()*this.words.length)];
  }

  checkIfLetter(keyCode) {
    if(keyCode > 64 && keyCode < 91) return true;
    return false;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter)  
  }

  addCorrectLetter(letter) {
    if(!this.guessedLetters.includes(letter))
      this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    if(!this.letters.includes(letter)) {
      this.errorsLeft -= 1;
      this.letters.push(letter); 
    }
  }

  checkGameOver() {
    if(this.errorsLeft > 0) return false;
    return true;
  }

  checkWinner() {
    let allLetters = true;
    this.secretWord.split('').forEach(letter => {
      if(!this.guessedLetters.includes(letter))
      allLetters = false;
    })
    return allLetters;
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    // hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  console.log(hangman.secretWord)
  if (hangman.checkIfLetter(event.keyCode) && !hangman.checkWinner()) {
    const pressedLetter = event.key;
    if (hangman.checkClickedLetters(pressedLetter)) {
      if (hangman.secretWord.includes(pressedLetter)) {
        hangman.addCorrectLetter(pressedLetter);
        hangmanCanvas.secretWord.split('').forEach((letter,idx) => {
          if(letter === pressedLetter)
          hangmanCanvas.writeCorrectLetter(idx)
        })
        if(hangman.checkWinner()){
          hangmanCanvas.winner();
        }
    } else {
      console.log(hangman.letters)
      if (!hangman.letters.includes(pressedLetter) && !hangman.checkGameOver()) {
        hangman.addWrongLetter(pressedLetter);
        hangmanCanvas.writeWrongLetter(pressedLetter,hangman.errorsLeft);
      }
    }
  }
}
});

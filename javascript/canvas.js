class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById("hangman").getContext("2d");
    this.secretWord = secretWord;
    this.imgOver= new Image();
    this.imgOver.src="./images/gameover.png";
    this.imgWin= new Image();
    this.imgWin.src="./images/awesome.png";
    this.w=600;
    this.h=600;
    this.gainAudio= new Audio('./audio/YouAreAwesome.mp3');
    this.overAudio= new Audio('./audio/GameOver.mp3');
    this.initialAudio= new Audio('./audio/initial.wav');
    this.goodAudio= new Audio('./audio/good.wav');
    this.opssAudio= new Audio('./audio/opsss.wav');
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.context.strokeStyle = "black";
    this.context.lineWidth = 3;
    this.context.beginPath();
    this.context.moveTo(this.w / 6, (this.h / 6) * 5);
    this.context.lineTo((this.w / 6) * 2, (this.h / 6) * 5);
    this.context.lineTo(this.w / 6 + this.w / 12,(this.h / 6) * 5 - this.h / 12);
    this.context.closePath();
    this.context.stroke();
    //forca
    this.context.beginPath();
    this.context.moveTo(this.w / 6 + this.w / 12,(this.h / 6) * 5 - this.h / 12);
    this.context.lineTo(this.w / 6 + this.w / 12, this.h / 6 - this.h / 12);
    this.context.lineTo((this.w / 6) * 4, this.h / 6 - this.h / 12);
    this.context.lineTo((this.w / 6) * 4, this.h / 6 + this.h / 24);
    this.context.stroke();
    this.drawLines();
  }

  drawLines() {
    this.secretWord.split("").forEach((letter, idx) => {
      this.context.beginPath();
      this.context.moveTo(500 + idx * 75, 500);
      this.context.lineTo(550 + idx * 75, 500);
      this.context.stroke();
    });
  }

  writeCorrectLetter(index) {
    this.goodAudio.play();
    this.context.textAlign = "rigth";
    this.context.textBaseline = "Bottom";
    this.context.font = "60px Arial";
    this.context.fillStyle = "green";
    this.context.fillText(this.secretWord[index],505 + index * 75,495);
  }

  writeWrongLetter(letter, errorsLeft) {
    this.opssAudio.play();
    this.context.textAlign = "rigth";
    this.context.textBaseline = "Bottom";
    this.context.font = "60px Arial";
    this.context.fillStyle = "red";
    this.context.fillText(letter, 700+ 50*(10-errorsLeft), 100);
    this.drawHangman(errorsLeft)
  }

  drawHangman(errorsLeft) {
    if (errorsLeft === 9) {
      //cabeça
      this.context.beginPath();
      this.context.arc((this.w / 6) * 4,this.h / 6 + this.h / 24 + this.h / 24,this.h / 24,0,Math.PI * 2);
      this.context.stroke();
    }
    if (errorsLeft === 8) {
      //corpo
      this.context.beginPath();
      this.context.moveTo(
        (this.w / 6) * 4,
        this.h / 6 + this.h / 24 + this.h / 12
      );
      this.context.lineTo((this.w / 6) * 4, this.h / 2);
      this.context.stroke();
    }
    if (errorsLeft === 7) {
      //perna direita
      this.context.lineTo(
        (this.w / 6) * 4 + this.w / 12,
        this.h / 2 + this.h / 12
      );
      this.context.stroke();
    }
    if (errorsLeft === 6) {
      //perna esquerda
      this.context.moveTo((this.w / 6) * 4, this.h / 2);
      this.context.lineTo(
        (this.w / 6) * 4 - this.w / 12,
        this.h / 2 + this.h / 12
      );
      this.context.stroke();
    }
    if (errorsLeft === 5) {
      //braço direito
      this.context.moveTo((this.w / 6) * 4, this.h / 3);
      this.context.lineTo(
        (this.w / 6) * 4 + this.w / 12,
        this.h / 3 + this.h / 12
      );
      this.context.stroke();
    }
    if (errorsLeft === 4) {
      //braço esquerdo
      this.context.moveTo((this.w / 6) * 4, this.h / 3);
      this.context.lineTo(
        (this.w / 6) * 4 - this.w / 12,
        this.h / 3 + this.h / 12
      );
      this.context.stroke();
    }
    if (errorsLeft === 3) {
      //olho direito
      this.context.beginPath();
      this.context.arc(
        (this.w / 6) * 4 + this.h / 64,
        this.h / 6 + this.h / 24 + this.h / 32,
        this.h / 128,
        0,
        Math.PI * 2
      );
      this.context.stroke();
    }
    if (errorsLeft === 2) {
      //olho esquerdo
      this.context.beginPath();
      this.context.arc(
        (this.w / 6) * 4 - this.h / 64,
        this.h / 6 + this.h / 24 + this.h / 32,
        this.h / 128,
        0,
        Math.PI * 2
      );
      this.context.stroke();
    }
    if (errorsLeft === 1) {
      //NARIZ
      this.context.beginPath();
      this.context.moveTo((this.w / 6) * 4, this.h / 6 + this.h / 12);
      this.context.lineTo(
        (this.w / 6) * 4,
        this.h / 6 + this.h / 12 + this.h / 64
      );
      this.context.stroke();
    }
    if (errorsLeft === 0) {
      //boca
      this.context.beginPath();
      this.context.arc(
        (this.w / 6) * 4,
        this.h / 6 + this.h / 12 + this.h / 24,
        this.h / 54,
        (7 * Math.PI) / 4,
        (5 * Math.PI) / 4,
        true
      );
      this.context.stroke();
      //olho direito X

      this.context.save();
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.font = "20px Arial";

      this.context.fillStyle = "red";
      this.context.beginPath();
      this.context.fillText(
        "X",
        (this.w / 6) * 4 + this.h / 64,
        this.h / 6 + this.h / 24 + this.h / 30
      );
      this.context.stroke();
      //olho esquerdo X
      this.context.beginPath();
      this.context.fillText(
        "X",
        (this.w / 6) * 4 - this.h / 64,
        this.h / 6 + this.h / 24 + this.h / 30
      );
      this.context.stroke();
      this.context.restore();
      this.gameOver();
    }
  }

  gameOver =()=> {
    setTimeout(()=>{
      // colocar imagem de perdeu
      // ctx.drawImage(whichImage, x, y, width, height);
      this.overAudio.play();
      this.context.drawImage(this.imgOver,this.w/2,this.h/4)
    },600)
  };
  
  winner =()=> {
    setTimeout(()=>{
      // colocar imagem de acertou
      this.gainAudio.play();
      this.context.drawImage(this.imgWin,this.w/4,0)
    },600)
  };
}

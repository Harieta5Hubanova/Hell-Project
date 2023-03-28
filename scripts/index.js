console.log('JS Loaded!');
const canvas = document.getElementById('hell');
const ctx = canvas.getContext('2d');
const gamePage = new Image();
gamePage.src = '../image/game-page.jpeg';
const background = new Image();
const errorAudio = new Audio();
errorAudio.src = '../sounds/error.mp3';
const correctAudio = new Audio();
correctAudio.src = '../sounds/correct.mp3';
const victoryAudio = new Audio();
victoryAudio.src = '../sounds/victorysound.mp3';
const gameOverAudio = new Audio();
gameOverAudio.src = '../sounds/gameover.mp3';

//const initialAudio = new Audio();
//initialAudio.src = '../sounds/game-of-thrones-theme-song-ringtone-30782.mp3';
//initialAudio.volume = 0.1;

function getRandomMovie(bestMovies) {
  const randomIndex = Math.floor(Math.random() * bestMovies.length);

  const movie = bestMovies[randomIndex];
  background.src = movie.src;

  return movie.title;
}
// let dashedName = getRandomMovie(bestMovies);
// console.log(dashedName.split);

const element = document.getElementById('start');

element.addEventListener('click', () => {
  console.log('click');
  element.style.display = 'none';
  canvas.classList.remove('hidden');
  //initialAudio.play();
  actualGameBackground();
  updateCanvas();
});

let randomTitle = getRandomMovie(bestMovies);

let dashedName = updateName();

let numberOfGuesses = 5;

function updateCanvas() {
  if (!dashedName.split('').includes('-')) {
    console.log('here');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 80, 0, 1000, 700);
    victoryAudio.play();
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gamePage, 80, 0, gamePage.width, gamePage.height);
    ctx.font = '50px Arial';

    ctx.fillText(dashedName, 360, 300);
    ctx.font = '40px Arial';
    ctx.fillText(`Guesses: ${numberOfGuesses}`, 950, 50);
  }
}

function actualGameBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gamePage, 80, 0, gamePage.width, gamePage.height);
}

function updateName() {
  const letters = randomTitle.split('');
  console.log(letters);
  const dashedArray = letters.map(letter => {
    if (letter === ' ') {
      return letter;
    } else {
      return '-';
    }
  });
  return dashedArray.join('');
}

document.addEventListener('keydown', event => {
  if (numberOfGuesses > 0) {
    if (randomTitle.includes(event.key)) {
      console.log('MATCHED', event.key);
      const selectedLetter = event.key.toUpperCase();
      const indexes = [];

      for (let i = 0; i < randomTitle.length; i++) {
        if (randomTitle[i].toUpperCase() === selectedLetter) {
          indexes.push(i);
        }
      }

      dashedName = dashedName.split('');

      indexes.forEach(letter => {
        dashedName[letter] = selectedLetter;
      });

      dashedName = dashedName.join('');
      correctAudio.play();
      updateCanvas();
    } else {
      numberOfGuesses -= 1;
      errorAudio.play();
      updateCanvas();
    }
  }
  gameOver();
});
function gameOver() {
  if (numberOfGuesses === 0) {
    actualGameBackground();
    ctx.font = '100px Arial';
    ctx.fillText('GAME OVER', 400, 300);
    gameOverAudio.play();
  }
}
function gameWon() {
  if (!dashedName.split('').includes('-')) {
    background.src = randomTitle.src;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, 1500, 700);
  }
}
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'Enter':
      numberOfGuesses = 5;
      getRandomMovie();
      updateCanvas();
  }
});

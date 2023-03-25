console.log('JS Loaded!');
const canvas = document.getElementById('hell');
const ctx = canvas.getContext('2d');
const gamePage = new Image();
gamePage.src = '../image/game-page.jpeg';
const background = new Image();

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
  canvas.classList.remove('hidden');
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
    ctx.drawImage(background, 0, 0, 1500, 700);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gamePage, 0, 0, gamePage.width, gamePage.height);
    ctx.font = '60px Arial';

    ctx.fillText(dashedName, 450, 300);
    ctx.font = '50px Arial';
    ctx.fillText(`Guesses: ${numberOfGuesses}`, 1000, 50);
  }
}

function actualGameBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(gamePage, 0, 0, gamePage.width, gamePage.height);
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

      updateCanvas();
    } else {
      numberOfGuesses -= 1;
      updateCanvas();
    }
  }
  gameOver();
});
function gameOver() {
  if (numberOfGuesses === 0) {
    actualGameBackground();
    ctx.font = '100px Arial';
    ctx.fillText('GAME OVER', 500, 300);
  }
}
function gameWon() {
  if (!dashedName.split('').includes('-')) {
    background.src = randomTitle.src;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, 1500, 700);
  }
}

//function gameWon() {
//if (randomTitle === 'pulp   fiction') {
// ctx.clearRect(0, 0, canvas.width, canvas.length);
// ctx.drawImage((src = '/image/PulpFiction.jpeg'), 0, 0, 1500, 700);
//}
//}

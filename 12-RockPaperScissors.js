

let score = JSON.parse(localStorage.getItem('score')) || {
  computerWins: 0,
  humanWins: 0,
  ties: 0
};

//score = JSON.parse(localStorage.getItem('score'));
//console.log(score);
updateScoreElement();
//Computer: Pick a random move.
function PickRandomMove() {
  const randomMove = Math.random();
  let computerMove = '';

  if (randomMove >= 0 && randomMove < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomMove >= 1 / 3 && randomMove < 2 / 3) {
    computerMove = 'paper';
  }
  else if (randomMove >= 2 / 3 && randomMove <= 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

// Display if human wins/loses/ties by comparing the computer and human move when a button is clicked.
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const playButton = document.querySelector('.js-auto-play-button');
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = PickRandomMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    playButton.textContent = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    playButton.textContent = 'Auto play';
  }
}

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.body.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'r': playGame('rock');
      break;
    case 'p': playGame('paper');
      break;
    case 's': playGame('scissors');
      break;
    case 'a': autoPlay();
      break;
    case ' ': resetScore();
      break;
  }
});


function playGame(humanMove) {
  let computerMove = PickRandomMove();
  let result = '';
  let message = `You picked ${humanMove} - Computer picked ${computerMove} - Results: `;

  if (humanMove === 'rock') {
    if (computerMove === humanMove) {
      result = 'It\' a tie!';
      score.ties++;
    }
    else if (computerMove === 'scissors') {
      result = 'You win!';
      score.humanWins++;
    }
    else {
      result = 'You lose!';
      score.computerWins++;
    }
  }
  else if (humanMove === 'paper') {
    if (computerMove === humanMove) {
      result = 'It\'s a tie!';
      score.ties++;
    }
    else if (computerMove === 'rock') {
      result += 'You win!';
      score.humanWins++;
    }
    else {
      result = 'You lose!';
      score.computerWins++;
    }
  }
  else if (humanMove === 'scissors') {
    if (computerMove == humanMove) {
      result = 'It\'s a tie!';
      score.ties++;
    }
    else if (computerMove === 'paper') {
      result = 'You win!';
      score.humanWins++;
    }
    else {
      result = 'You lose!';
      score.computerWins++
    }
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img class="move-icon" src="imgs/${humanMove}-emoji.png" alt="Rock move">
<img class="move-icon" src="imgs/${computerMove}-emoji.png" alt="scissors move">Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.humanWins}, Losses: ${score.computerWins}, Ties: ${score.ties}`;
}

//reset score
document.querySelector('.js-reset-button').addEventListener('click', resetScore);

function resetScore() {
  const pElement = document.createElement('p');
  pElement.innerHTML = `Are you sure you want to reset the score? <button class="js-yes-button">Yes</button> <button class="js-no-button">No</button>`;
  document.body.appendChild(pElement);
  const yesButton = document.querySelector('.js-yes-button');
  const noButton = document.querySelector('.js-no-button');

  yesButton.addEventListener('click', () => {
    score.computerWins = 0;
    score.humanWins = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.body.removeChild(pElement);
    return;
  });

  noButton.addEventListener('click', () => {
    document.body.removeChild(pElement);
    return;
  });
}



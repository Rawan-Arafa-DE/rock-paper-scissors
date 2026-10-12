const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();




let isAutoPlaying = false;
let intervalId;


document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  })

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })


document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  })

  document.body.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'r' )
    {
      playGame('rock');
    }
    else if (key === 'p')
    {
      playGame('paper');
    }
    else if (key === 's')
    {
      playGame('scissors');
    }
  })






function autoPlay() {

  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button ').innerHTML = `Stop Play`
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button ').innerHTML = `Auto Play`
  }
}







function playGame(playerMove) {
  let result;
  const computerMove = pickComputerMove();
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "YOU LOST.";
    } else if (computerMove === "paper") {
      result = "YOU WON.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "YOU WON.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "YOU LOST.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "YOU LOST.";
    } else if (computerMove === "scissors") {
      result = "YOU WON.";
    }
  }

  if (result === "Tie.") {
    score.ties++;
  } else if (result === "YOU LOST.") {
    score.losses++;
  } else if (result === "YOU WON.") {
    score.wins++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-move").innerHTML =
    `You <img class="move-icon" src="icons/${playerMove}-emoji.png" alt=""> <img class="move-icon" src="icons/${computerMove}-emoji.png" alt="" > Computer`;
}

function pickComputerMove() {
  let computerMove;
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.ties};`;
}

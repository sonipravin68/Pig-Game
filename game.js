// selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const newGamebtn = document.querySelector(".btn--new");

// selecting the rolldice butten
const btnRollDice = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

// starting conditions
const newgame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

newgame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// add evenlistener for the functionality for roll dice
btnRollDice.addEventListener("click", function () {
  if (playing) {
    // generating the random number in dice roll
    const randomeNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    // dice.src = `images/dice-${randomeNumber}.png`;

    // display the random number in dice
    const randomeDiceImage = `dice-${randomeNumber}.png`;

    const randomeImageSource = `images/${randomeDiceImage}`;

    dice.setAttribute("src", randomeImageSource);

    // check for rolled 1: if true , switch to next player

    if (randomeNumber !== 1) {
      // Add dice to current score
      currentScore += randomeNumber;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switching to next player

      switchPlayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      // Switch the the next
      switchPlayer();
    }
  }
});

newGamebtn.addEventListener("click", newgame);

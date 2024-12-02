const gameContainer = document.getElementById("game-container");
const basket = document.getElementById("basket");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");

// Game variables
let score = 0;
let lives = 3;
let basketSpeed = 15;
let starSpeed = 5;
let starInterval = 1000;
let gameInterval; // Store the interval for star creation
let gameOver = false; // Flag to check if the game is over

// Load sound files (Uncomment when using sound files)
// const starCaughtSound = new Audio("./sounds/ding.mp3");
// const starMissedSound = new Audio("./sounds/miss.mp3");

// Move basket with arrow keys
document.addEventListener("keydown", (event) => {
  if (gameOver) return; // Prevent movement if the game is over

  const basketPosition = basket.offsetLeft;
  if (event.key === "ArrowLeft" && basketPosition > 0) {
    basket.style.left = basketPosition - basketSpeed + "px";
  }
  if (
    event.key === "ArrowRight" &&
    basketPosition < gameContainer.offsetWidth - basket.offsetWidth
  ) {
    basket.style.left = basketPosition + basketSpeed + "px";
  }
});

// Create a falling star
function createStar() {
  if (gameOver) return; // Prevent star creation if the game is over

  const star = document.createElement("div");
  star.classList.add("star");

  // Determine if the star is normal or bonus
  const isBonus = Math.random() < 0.2; // 20% chance of bonus star
  if (isBonus) {
    star.style.background = "red";
    star.dataset.type = "bonus"; // Set type to bonus
  } else {
    star.dataset.type = "normal"; // Set type to normal
  }

  star.style.left = Math.random() * (gameContainer.offsetWidth - 20) + "px";
  gameContainer.appendChild(star);

  let fallingInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(fallingInterval);
      return; // Stop processing if the game is over
    }

    const starTop = star.offsetTop;
    const basketTop = basket.offsetTop;
    const basketLeft = basket.offsetLeft;
    const basketRight = basketLeft + basket.offsetWidth;

    // Move star down
    star.style.top = starTop + starSpeed + "px";

    // Check if the star is caught
    if (
      starTop + star.offsetHeight >= basketTop &&
      star.offsetLeft >= basketLeft &&
      star.offsetLeft <= basketRight
    ) {
      // Increase score differently for normal and bonus stars
      if (star.dataset.type === "bonus") {
        score += 5; // Bonus star gives 5 points
      } else {
        score++;
      }
      scoreElement.textContent = score;
      // starCaughtSound.play();
      clearInterval(fallingInterval);
      star.remove();
      adjustDifficulty();
    }

    // Check if the star hits the ground
    if (starTop > gameContainer.offsetHeight) {
      lives--;
      livesElement.textContent = lives;
      // starMissedSound.play();
      clearInterval(fallingInterval);
      star.remove();

      if (lives === 0) {
        endGame();
      }
    }
  }, 30);
}

// Adjust game difficulty
function adjustDifficulty() {
  if (score % 10 === 0) {
    starSpeed += 1;
    if (starInterval > 200) starInterval -= 100;
  }
}

// End the game
function endGame() {
  gameOver = true; // Set the gameOver flag
  clearInterval(gameInterval); // Stop star generation
  alert("Game Over! Your score: " + score);
  window.location.reload();
}

// Start the game
function startGame() {
  gameInterval = setInterval(createStar, starInterval);
}

startGame();
// گیم ختم کرنے کا فنکشن
function endGame() {
    gameOver = true; // گیم ختم ہو گیا
    clearInterval(gameInterval); // ستارے بننے کا عمل بند کر دیں
    alert("Game Over! Your score: " + score); // صارف کو سکور دکھائیں
    window.location.reload(); // گیم کو دوبارہ شروع کریں
  }
  
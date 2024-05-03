const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
let cardsChosen = [];
let cardsChosenIds = [];
let cardsMatched = [];

// Shuffle function to randomize card values
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Initialize the game
function initializeGame() {
  const shuffledCards = shuffle(cardValues);
  const gameBoard = document.getElementById('game-board');

  shuffledCards.forEach((value, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', index);
    // Initially hide the card value
    card.textContent = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Function to flip a card
function flipCard() {
  const cardId = this.getAttribute('data-id');
  this.textContent = cardValues[cardId];
  cardsChosen.push(cardValues[cardId]);
  cardsChosenIds.push(cardId);
  this.removeEventListener('click', flipCard);

  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

// Function to check if the two chosen cards match
function checkForMatch() {
  const cards = document.querySelectorAll('.card');
  const [firstId, secondId] = cardsChosenIds;

  if (cardsChosen[0] === cardsChosen[1]) {
    cards[firstId].classList.add('hidden');
    cards[secondId].classList.add('hidden');
    cardsMatched.push(cardsChosen[0]);
  } else {
    cards[firstId].textContent = '';
    cards[secondId].textContent = '';
    cards[firstId].addEventListener('click', flipCard);
    cards[secondId].addEventListener('click', flipCard);
  }

  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsMatched.length === cardValues.length / 2) {
    alert('Congratulations! You win!');
  }
}

// Restart the game
function restartGame() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear the game board
  cardsChosen = [];
  cardsChosenIds = [];
  cardsMatched = [];
  initializeGame(); // Reinitialize the game
}

// Handle form submission
document.getElementById('survey-form').addEventListener('submit', function(event) {
  event.preventDefault();
  // Here you can handle the form submission, for example, by sending the data to a server
  alert('Thank you for your feedback!');
});

// Call initializeGame when the page loads
window.addEventListener('load', initializeGame);
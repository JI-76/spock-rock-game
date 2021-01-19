// spockrockgame.js

// Import module
import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';


//  Add const to handle HTML Elements:
// Use document.getElementById() with Id attribute
// Use document.querySelector() with Class name attribute or the Element name itself (only 1 of these HTML elements per webpage)
const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

// All game icons except Refresh Icon
const allGameIcons = document.querySelectorAll('.far');

// Icons
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

// console.log(allGameIcons);

// Add global variable to Choices:
let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

// Reset all 'selected' Icons
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });

  stopConfetti();
  removeConfetti();
};

// Reset Score and playerChoice \ computerChoice
function resetAll() {

  // For Player:
  // reset score to 0
  playerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  // reset choice text to blank
  playerChoiceEl.textContent = '';

  // For Computer:
  // reset score to 0
  computerScoreNumber = 0;
  computerScoreEl.textContent = computerScoreNumber;
  // reset choice text to blank
  computerChoiceEl.textContent = '';

  // remove result text
  resultText.textContent = '';

  // reset icons
  resetSelected();
};
// set global access for function resetAll()
window.resetAll = resetAll;

// Random Computer Choice
function computerRandomChoice() {
  // provides 0 < number < 1
  const computerChoiceNumber = Math.random();
  // console.log(computerChoiceNumber);

  // split choice into 5 ranges to map computer choice to an Icon
  if (computerChoiceNumber < 0.2) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  };
  // console.log(computerChoice);
};

// Passing Computer selection value and styling it
function displayComputerChoice() {

  // console.log(computerChoice);

  // Apply 'selected' styling and update computerChoice
  switch(computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;

    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;

    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
    
    default:
      break;
  };
};

// Check results; increase scores; update resultText 
function updateScore(playerChoice) {

  // console.log(playerChoice, computerChoice);
  // Tie
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    // use Player choice as the target key in the choices[] array to see it's associated defeats[] array
    const choice = choices[playerChoice];
    // console.log(choice);
    // console.log(choice.defeats.indexOf(computerChoice));

    // if Computer choice is contained in the defeats[] array, then Player wins round
    //  Positive 1 or 0 indicates that Computer choice is in the defeats[] array, then Player wins round
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = "You Won!";
      // increment Player Score
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
    //  Negative -1 indicates that Computer choice is NOT in the defeats[] array, then Computer wins round
      resultText.textContent = "You Lost!";      
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    };
  };
};

// Call functions to process each turn
// function checkResult() {
  function checkResult(playerChoice) {  
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
};

// Passing Player selection value and styling it
function select(playerChoice) {
  
  // console.log(playerChoice);
  
  // resetSelected();
  // checkResult();
  checkResult(playerChoice);

  // Apply 'selected' styling and update playerChoice
  switch(playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;

    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
  
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;
    
    default:
      break;
  };
};
// set global access for function select()
window.select = select;

// On startup, set initial values
resetAll();

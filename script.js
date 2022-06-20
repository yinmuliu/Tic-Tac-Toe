// get the elements needed to work on
const blocks = document.querySelectorAll('.block'); //return an array of blocks
const playersTurn = document.querySelector('.playersTurn')
const announceWin = document.querySelector('.announcer');
const restartButton = document.querySelector('.game-restart');


// define the initial variables - so they are ready for change in later functions
let currentPlayer = 'Player X'
let board = ['','','','','','','','','']

// put X & O in the block when click

// create a function to identify which block is clicked.
const clickBlock = (clickBlockEvent) => {
    let clickedBlock = clickBlockEvent.target;
    let clickedBlockIndex = clickedBlock.dataset['blockIndex'];
    // when clicked, pop up individual signs for each player
    if (currentPlayer === 'Player X') {
        clickedBlock.innerHTML = 'X';
    } else {
        clickedBlock.innerHTML = 'O';
    }
    // switch to another player
    switchPlayer();
}

// create a for loop to add event handler for each block, so they respond to clicks
for (let block of blocks) {
    block.addEventListener('click', clickBlock)
}

// create a function to change player after each click
const switchPlayer = () => {
    if (currentPlayer === 'Player X') {
        currentPlayer = 'Player O'
        playersTurn.innerHTML = 'Player O'
    } else {
        currentPlayer = 'Player X'
        playersTurn.innerHTML = 'Player X'
    }
}

// create a win condition array
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// 1. when a.3 signs in 1-4-8, 2-4-6, 0-3-6, 1-4-7, 2-5-8, 0-1-2, 3-4-5, 6-7-8
// it is a win
// create a function called isWin returns boolean
// create a function called printWin returns a string (to game status)
// 2.pop up "player wins!/It's a tie!" in game status


// clear game board
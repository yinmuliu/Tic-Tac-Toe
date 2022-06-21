// get the elements needed to work on
const blocks = document.querySelectorAll('.block'); //return an array of blocks
const playersTurn = document.querySelector('.playersTurn') // for displaying player's turn
const announceWin = document.querySelector('.announcer');
const restartButton = document.querySelector('.game-restart');


// define the initial variables - so they are ready for change in later functions
let currentPlayer = 'Player X'
let indexFilled = {};



// create a function to identify which block is clicked.
// BUG: when the block is clicked again, the sign will alter
const handleClick = (clickBlockEvent) => {
    let clickedBlock = clickBlockEvent.target;
    let clickedBlockIndex = clickedBlock.dataset['blockIndex'];
    // console.log(clickBlock.innerHTML) - undefined
    // when clicked, pop up individual signs for each player
    if (currentPlayer === 'Player X' && clickedBlock.innerHTML === '') {
        clickedBlock.innerHTML = 'X';
        console.log(clickedBlock.innerHTML)
    } else if (currentPlayer === 'Player O' && clickedBlock.innerHTML === '') {
        clickedBlock.innerHTML = 'O';
        console.log(clickedBlock.innerHTML)
    } else {

    }
    checkWin(clickedBlockIndex);
    switchPlayer();
}

// create a for loop to add event handler for each block, so they respond to clicks
for (let block of blocks) {
    block.addEventListener('click', handleClick, {once: true})
}

// create a function to change player in display after each click
const switchPlayer = () => {
    if (currentPlayer === 'Player X') {
        currentPlayer = 'Player O'
        playersTurn.innerHTML = 'Player O'
    } else {
        currentPlayer = 'Player X'
        playersTurn.innerHTML = 'Player X'
    }
}

// create a win condition array, those are the combination when the player wins
const winCondition = [
    [0, 1, 2],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [3, 4, 5],
]

// create a function to check win and return a string to announce win
const checkWin = (index) => {
    // create a propertyIndex variable to convert block index to string
    let propertyIndex = index.toString()
    // populate the object with block index as key and current player name as value
    indexFilled[propertyIndex] = currentPlayer;
    // loop the wining condition to check for wins
    for (let wins of winCondition) {
        // define move variables that returns the indices of win combination index
        let move0 = wins[0]
        let move1 = wins[1]
        let move2 = wins[2]
        // create a if-else condition to check winner
        // indexFilled[move0] returns the value (player name) that occupied the object key (block index)
        if (indexFilled[move0] === 'Player X' && indexFilled[move1] === 'Player X' && indexFilled[move2] === 'Player X') {
            // when player X fill the right block index combination, it wins
            console.log(`Player X wins`);
            return `Player X wins`
        } else if (indexFilled[move0] === 'Player O' && indexFilled[move1] === 'Player O' && indexFilled[move2] === 'Player O') {
            // when player O fill the right block index combination, it wins
            console.log(`Player O wins`);
            return `Player O wins`
        } 
    }
    // create a condition to check tie: when all blocks has been filled but no winning condition is satisfied
    if (Object.keys(indexFilled).length === 9) {
        console.log(`It's a tie!`); 
        return `It's a tie`
    }

}

// create a function called printWin returns a string (to game status)
// 2.pop up "player wins!/It's a tie!" in game status


// clear game board
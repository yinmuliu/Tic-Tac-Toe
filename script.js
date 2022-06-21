// get the elements needed to work on
const blocks = document.querySelectorAll('.block'); //return an array of blocks
const playersTurn = document.querySelector('.playersTurn') // for displaying player's turn
const winMessage = document.querySelector('.announcer');
const restartButton = document.querySelector('.game-restart');


// define the initial variables - so they are ready for change in later functions
let currentPlayer = 'Player X'
let indexFilled = {};

// create a function for actions after the blocks are clicked
const handleClick = (clickBlockEvent) => {
    let clickedBlock = clickBlockEvent.target;
    let clickedBlockIndex = clickedBlock.dataset['blockIndex'];

    // Place sign
    placeSign(currentPlayer, clickedBlock)
    // Check for win
    checkWin(clickedBlockIndex)
    // Switch turn
    switchPlayer();
    
    // if (checkWin(clickedBlockIndex)) {
    //     endGame()
    // } else {
    //     switchPlayer()
    // }
}

// add event handler for each block, so they respond to clicks only once
for (let block of blocks) {
    block.addEventListener('click', handleClick, {once: true})
}


// place a sign in the block when it is clicked
const placeSign = (player, clickedBlock) => {
    if (player === 'Player X') {
        clickedBlock.innerHTML = 'X';
    } else if (player === 'Player O') {
        clickedBlock.innerHTML = 'O';
    }
}

// change player in display after each click
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

// check win and return a boolean
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
            winMessage.innerHTML = `Player X wins!`
            winMessage.style.visibility = 'visible'
            return true
        } else if (indexFilled[move0] === 'Player O' && indexFilled[move1] === 'Player O' && indexFilled[move2] === 'Player O') {
            // when player O fill the right block index combination, it wins
            winMessage.innerHTML = `Player O wins!`
            winMessage.style.visibility = 'visible'
            return true
        } 
    }
    // create a condition to check tie: when all blocks has been filled but no winning condition is satisfied
    if (Object.keys(indexFilled).length === 9) {
        winMessage.innerHTML = `It's a tie!`
        winMessage.style.visibility = 'visible'
        return true
    } else {
        return false
    }
}

// end the game when there is a game result
const endGame = () => {
    
}
// get the elements needed to work on
const blocks = document.querySelectorAll('.block'); //return an array of blocks
const playersTurn = document.querySelector('.playersTurn') // for displaying player's turn
const winMessage = document.querySelector('.announcer');
const hiddenResultPage = document.getElementById('resultpage');
const playAgainButton = document.querySelector('.playagain');
const addPlayerXScore = document.getElementById('playerXScore')
const addPlayerOScore = document.getElementById('playerOScore')


// define the initial variables - so they are ready for change in later functions
let currentPlayer = 'Player X'
let indexFilled = {};
let playerXScore = 0;
let playerOScore = 0;

// create a function for actions after the blocks are clicked
const handleClick = (clickBlockEvent) => { 
    let clickedBlock = clickBlockEvent.currentTarget;
    let clickedBlockIndex = clickedBlock.dataset['blockIndex'];
    // check if the block is filled
    if (clickedBlock.innerHTML === '') {
        // if empty, can place sign and then set cursor to not allowed
        placeSign(currentPlayer, clickedBlock)                                          
        // check if there is a winner/a tie
        if (checkWin(clickedBlockIndex)) {
            showResult()
        } else {
            switchPlayer()
        }
    }
}

// add event handler for each block, so they respond to clicks only once
for (let block of blocks) {
    block.addEventListener('click', handleClick)
}


// place a sign in the block when it is clicked
const placeSign = (player, clickedBlock) => {
    if (player === 'Player X') {
        // let catPaw = document.createElement('img');
        // catPaw.src = './images/img-cat.jpeg';
        // catPaw.width = 120;
        // clickedBlock.appendChild(catPaw);
        clickedBlock.innerHTML = 'X'
        clickedBlock.classList.add('playerX')
        
    } else if (player === 'Player O') {
        clickedBlock.innerHTML = 'O'
        clickedBlock.classList.add('playerO')
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
            return true
        } else if (indexFilled[move0] === 'Player O' && indexFilled[move1] === 'Player O' && indexFilled[move2] === 'Player O') {
            // when player O fill the right block index combination, it wins
            winMessage.innerHTML = `Player O wins!`
            return true
        } 
    }
    // create a condition to check tie: when all blocks has been filled but no winning condition is satisfied
    if (Object.keys(indexFilled).length === 9) {
        winMessage.innerHTML = `It's a tie!`
        return true
    } else {
        return false
    }
}

// end the game when there is a game result
const showResult = () => {
    // pop up hidden result section - display change to block
    hiddenResultPage.style.display = 'block';
    // add effect on popping up
}


// play the game again - when the "play again" button is clicked
const playAgain = () => {
    // hide result page
    hiddenResultPage.style.display = 'none';
    for (let block of blocks) {
        // clear the board
        block.innerHTML = ''
        block.classList.remove('playerO', 'playerX')
        // reset cursor to pointer
        block.style.cursor = 'pointer'
    }
    // reset object to empty
    indexFilled = {}
    // reset current player to the winner
    currentPlayer = 'Player X'
    // add score to the winner
    addScore()
}
playAgainButton.addEventListener('click', playAgain);

// add score to the winner
const addScore = () => {
    if (winMessage.innerHTML === `Player X wins!`) {
        playerXScore++;
    } else if (winMessage.innerHTML === `Player O wins!`) { 
        playerOScore++;
    }
    // add score to HTML
    addPlayerXScore.innerHTML = playerXScore;
    addPlayerOScore.innerHTML = playerOScore;
 }


// end the game
const endGame = () => {
    // reset the score to 0
    // go back to homepage
}


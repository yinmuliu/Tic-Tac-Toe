// get the elements needed to work on
const blocks = document.querySelectorAll('.block'); //return an array of blocks
const playersTurn = document.querySelector('.playersTurn') // for displaying player's turn
const winMessage = document.querySelector('.announcer');
const hiddenResultPage = document.getElementById('resultpage');
const playAgainButton = document.querySelector('.playagain');


// define the initial variables - so they are ready for change in later functions
let currentPlayer = 'Player X'
let indexFilled = {};

// create a function for actions after the blocks are clicked
const handleClick = (clickBlockEvent) => { 
    let clickedBlock = clickBlockEvent.currentTarget;
    let clickedBlockIndex = clickedBlock.dataset['blockIndex'];
    
    // check if the block is filled
    // BUG - exist in the if condition: need to check if there is no element in the block div?
    if (clickedBlock.innerHTML === '') {
        // if empty, can place sign and then set cursor to not allowed
        console.log(clickedBlock);
        placeSign(currentPlayer, clickedBlock)                                          
    } else {
        // else if it is not clicked, set the cursor to pointer
    }
    
    // check if there is a winner/a tie
    if (checkWin(clickedBlockIndex)) {
        showResult()
    } else {
        switchPlayer()
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
        // clickedBlock.style.cursor = 'not-allowed'
        
    } else if (player === 'Player O') {
        clickedBlock.innerHTML = 'O'
        clickedBlock.classList.add('playerO')
        // clickedBlock.style.cursor = 'not-allowed'

    }
}

// change player in display after each click
const switchPlayer = () => {
    console.log(currentPlayer)
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
            console.log('checkWin - Player X wins')
            winMessage.innerHTML = `Player X wins!`
            // winMessage.style.visibility = 'visible'
            return true
        } else if (indexFilled[move0] === 'Player O' && indexFilled[move1] === 'Player O' && indexFilled[move2] === 'Player O') {
            // when player O fill the right block index combination, it wins
            console.log('checkWin - Player O wins')
            winMessage.innerHTML = `Player O wins!`
            // winMessage.style.visibility = 'visible'
            return true
        } 
    }
    // create a condition to check tie: when all blocks has been filled but no winning condition is satisfied
    if (Object.keys(indexFilled).length === 9) {
        winMessage.innerHTML = `It's a tie!`
        // winMessage.style.visibility = 'visible'
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
    // addScore()
    
}
playAgainButton.addEventListener('click', playAgain);

// add score to the winner
// const addScore = () => {
//     let playerXScore = parseInt(document.getElementById('playerXScore').innerHTML)
//     let playerOScore = parseInt(document.getElementById('playerOScore').innerHTML)
//     if (winMessage.innerHTML === `Player X wins!`) {
        
//         playerXScore++;
//     } else if (winMessage.innerHTML = `Player O wins!`) {
        
//         playerOScore++;
//     }
//     console.log(playerXScore);
    // add score to webpage display

        // if winner = x, score increment by 1
        // if winner = o, score increment by 1
        // if tie, no score increment
// }


// end the game
const endGame = () => {
    // reset the score to 0
    // go back to homepage
}


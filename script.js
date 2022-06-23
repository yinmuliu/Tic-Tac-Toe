// get the elements needed to work on
const blocks = document.querySelectorAll('.block'); //return an array of blocks
const playersTurn = document.querySelector('.playersTurn') // for displaying player's turn
const winMessage = document.querySelector('.announcer');
const hiddenResultPage = document.getElementById('resultpage');
const playAgainButton = document.querySelector('.playagain');
const endGameButton = document.querySelector('.game-end')
const addPlayerXScore = document.getElementById('playerXScore')
const addPlayerOScore = document.getElementById('playerOScore')

// define the initial variables - so they are ready for change in later functions
let currentPlayer = 'Kitty'
let playSounds = true
let indexFilled = {};
let playerXScore = 0;
let playerOScore = 0;

// define audio file 
const meowSound = new Audio('./audio/meow.wav')
const woofSound = new Audio('./audio/woof.wav')
const buttonSound = new Audio('./audio/click.wav')
const winSound = new Audio('./audio/win.wav')
const tieSound = new Audio('./audio/tie.wav')

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
            if (playSounds) {
                winSound.play()
            }
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
    if (player === 'Kitty') {
        // let catPaw = document.createElement('img');
        // catPaw.src = './images/img-cat.jpeg';
        // catPaw.width = 120;
        // clickedBlock.appendChild(catPaw);
        clickedBlock.innerHTML = 'X'
        clickedBlock.classList.add('playerX')
        if (playSounds) {
            meowSound.play()
        }
    } else if (player === 'Doggo') {
        clickedBlock.innerHTML = 'O'
        clickedBlock.classList.add('playerO')
        if (playSounds) {
            woofSound.play()
        }
    }
}

// change player in display after each click
const switchPlayer = () => {
    if (currentPlayer === 'Kitty') {
        currentPlayer = 'Doggo'
        playersTurn.innerHTML = 'Doggo'
    } else {
        currentPlayer = 'Kitty'
        playersTurn.innerHTML = 'Kitty'
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
        if (indexFilled[move0] === 'Kitty' && indexFilled[move1] === 'Kitty' && indexFilled[move2] === 'Kitty') {
            // when player X fill the right block index combination, it wins
            winMessage.innerHTML = `Kitty wins!`
            return true
        } else if (indexFilled[move0] === 'Doggo' && indexFilled[move1] === 'Doggo' && indexFilled[move2] === 'Doggo') {
            // when player O fill the right block index combination, it wins
            winMessage.innerHTML = `Doggo wins!`
            return true
        } 
    }
    // create a condition to check tie: when all blocks has been filled but no winning condition is satisfied
    if (Object.keys(indexFilled).length === 9) {
        winMessage.innerHTML = `It's a tie!`
        if (playSounds) {
            tieSound.play()
        }
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

const resetBoard = () => {
    for (let block of blocks) {
        // clear the board
        block.innerHTML = ''
        block.classList.remove('playerO', 'playerX')
        // reset cursor to pointer
        block.style.cursor = 'pointer'
    }
    // reset object to empty
    indexFilled = {}
}


// play the game again - when the "play again" button is clicked
const playAgain = () => {
    // hide result page
    hiddenResultPage.style.display = 'none';
    // add score to the winner
    resetBoard()
    addScore()
}
playAgainButton.addEventListener('click', playAgain);

// add score to the winner
const addScore = () => {
    if (winMessage.innerHTML === `Kitty wins!`) {
        playerXScore++;
    } else if (winMessage.innerHTML === `Doggo wins!`) { 
        playerOScore++;
    }
    // add score to HTML
    addPlayerXScore.innerHTML = playerXScore;
    addPlayerOScore.innerHTML = playerOScore;
    // switch player
    switchPlayer()
 }


// end the game
const endGame = () => {
    // reset the score to 0
    resetBoard()
    playerXScore = 0;
    playerOScore = 0;
    addPlayerXScore.innerHTML = 0;
    addPlayerOScore.innerHTML = 0;
}
endGameButton.addEventListener('click', endGame)





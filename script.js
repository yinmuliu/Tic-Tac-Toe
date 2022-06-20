// put X & O in the block when click

// define blocks as an array of blocks in the gameboard
const blocks = document.querySelectorAll('.block') //return an array of blocks
// when a block is clicked, change the background image of the clicked block
// create a function to identify which block is clicked.
const clickBlock = (clickBlockEvent) => {
    let clickedBlock = clickBlockEvent.target;
    let clickedBlockIndex = clickedBlock.dataset['blockIndex'];
    console.log(clickedBlock.dataset);
    console.log(clickedBlockIndex);
}

// create a for loop to add event handler for each block
for (let i of blocks) {
    i.addEventListener('click', clickBlock)
}


// when click block 0, change the background image in block 0

// change X & O when players take turns

// create a win condition
// 1. when a.3 signs in 1-4-8, 2-4-6, 0-3-6, 1-4-7, 2-5-8, 0-1-2, 3-4-5, 6-7-8
// it is a win
// create a function called isWin returns boolean
// create a function called printWin returns a string (to game status)
// 2.pop up "player wins!/It's a tie!" in game status


// clear game board
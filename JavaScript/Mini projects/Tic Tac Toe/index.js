const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to initialize game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pr Empty
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // Green hatao
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}

initGame();

function swapturn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else if (currentPlayer === "O") {
        currentPlayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        if ( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }

            // Disable 

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            // Now we know it is the Winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });

    if(answer != ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return
    }
    
    // When there is no Winner or Tie
    
    let fillcount =0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillcount++;
        }
    })
    
    if(fillcount===9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

}


function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapturn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

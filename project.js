console.log("Running");


var playerRick = "R";
var playerMorty = "M";
var currPlayer = playerRick; // Shows current player 

var gameOver = false;
var board;
var currColumns;


//Setting how many rows & columns are in the table
var rows = 6;
var columns = 7;

//populates tiles upon website letting
window.onload = function () {
    setGame();
}

setTimeout(function() { alert("Morty, I need your help on an adventure! \n \nInstructions: To win Connect Four, all you have to do is connect four of your pieces in a row, much the same as tic tac toe. This can be done horizontally, vertically or diagonally. Each player will drop in one checker piece at a time. This will give you a chance to either build your row, or stop your opponent from getting four in a row. The game is over either when you or your friend reaches four in a row, or when all forty two slots are filled, ending in a stalemate."); }, 7000);
function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5] // adds an array so that not just any spot can be selected      

    for (let r = 0; r < rows; r++) { //Start at 0 add +1 until < 6 
        let row = [];
        for (let c = 0; c < columns; c++) { //Start at 0 add +1 until < 7
            //JS
            row.push(' ');

            //HTML
            // Add a div & assign the index <div id= “0-0” class= “tile”></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // example index of a piece = 5-1
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row); // adds tile to div body (board)
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    // “0-0” (index) ->(the dash splits the strings which returns an array of 2 values [“0”, “0”]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRick) {
        tile.classList.add("rick-piece")
        currPlayer = playerMorty;
    } else {
        tile.classList.add("morty-piece");
        currPlayer = playerRick
    }

    r -= 1;
    currColumns[c] = r;

    checkWinner();
}

function checkWinner() {
    //checks winning pieces by sliding horizontally then goes down to next row
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            //checks 3 ahead so that it doesn’t go out of bounds
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //checks vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //anti diagonally 
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //diagonally 
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRick) {
        winner.innerText = "Oh Geez Rick, You Won!";
    } else {
        winner.innerText = "I Programmed You To Believe That You Won Morty";
    }

    gameOver = true;
}


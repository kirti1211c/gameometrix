var board = [];
var rows = 8;
var col = 8;

var minesCount = 10;

var minesLocation = []

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;
var flagCount = 0;



window.onload = function () {
    startGame();
}

function setMines() {
    // minesLocation.push("1-1");
    // minesLocation.push("2-2");
    // minesLocation.push("2-1");
    // minesLocation.push("4-4");
    // minesLocation.push("5-5");

    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * col);

        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft--;
        }
    }
}



function startGame() {

    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const d = urlParams.get('diff')
    const t = urlParams.get('theme')
    console.log(d + t);

    if (d == "hard") {
        rows = 24;
        col = 24;
        minesCount = 99;
        document.getElementById("board").style.height = "955px";
        document.getElementById("board").style.width = "945px";

    }
    else if (d == "medium") {
        rows = 16;
        col = 16;
        minesCount = 40;
        document.getElementById("board").style.height = "635px";
        document.getElementById("board").style.width = "630px";

    }
    else {
        rows = 8;
        col = 8;
        minesCount = 10;
    }

    if (t == "dark") {
        document.body.style.backgroundColor = "#252627";
        document.getElementById("board").style.borderColor = "#3a3b3c";
        document.getElementById("board").style.backgroundColor = "#808080";
        document.body.style.color = "white";
        document.getElementById("flagButton").style.backgroundColor = "3a3b3c"
    }

    document.getElementById("minesCount").innerText = minesCount - flagCount;
    document.getElementById("flagButton").addEventListener("click", setFlag);
    setMines();

    // filling the board
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < col; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile)
            document.getElementById("board").append(tile);
            row.push(tile);
            tile.addEventListener("contextmenu", function (rightClick) {
                rightClick.preventDefault();
                let tile = this;
                if (tile.innerText == "" && !tile.classList.contains("tile-clicked")) {
                    tile.innerText = "🚩";
                    flagCount++;
                    document.getElementById("minesCount").innerText = minesCount - flagCount;
                }
                else if (tile.innerText == "🚩") {
                    tile.innerText = "";
                    flagCount--;
                    document.getElementById("minesCount").innerText = minesCount - flagCount;
                }
                return;
            });

        }
        board.push(row);
    }
    console.log(board)
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flagButton").style.backgroundColor = "lightgray";

    }
    else {
        flagEnabled = true;
        document.getElementById("flagButton").style.backgroundColor = "darkgray";
    }
}
function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    let tile = this;
    if (flagEnabled) {
        if (tile.innerText == "" && !tile.classList.contains("tile-clicked")) {
            tile.innerText = "🚩";
            flagCount++;
            document.getElementById("minesCount").innerText = minesCount - flagCount;
        }
        else if (tile.innerText == "🚩") {
            tile.innerText = "";
            flagCount--;
            document.getElementById("minesCount").innerText = minesCount - flagCount;
        }
        return;
    }

    if (minesLocation.includes(tile.id)) {
        // alert("GAME OVER")
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < col; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= col) {
        return;
    }

    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked")

    let minesFound = 0;

    minesFound += checkTile(r - 1, c - 1);
    minesFound += checkTile(r - 1, c);
    minesFound += checkTile(r - 1, c + 1);

    minesFound += checkTile(r, c - 1);
    minesFound += checkTile(r, c + 1);

    minesFound += checkTile(r + 1, c - 1);
    minesFound += checkTile(r + 1, c);
    minesFound += checkTile(r + 1, c + 1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        checkMine(r - 1, c - 1);
        checkMine(r - 1, c);
        checkMine(r - 1, c + 1);

        checkMine(r, c - 1);
        checkMine(r, c + 1);

        checkMine(r + 1, c - 1);
        checkMine(r + 1, c);
        checkMine(r + 1, c + 1);
    }


}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= col) {
        return 0;
    }

    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}






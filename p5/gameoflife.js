let size;
let numcol;
let numrow;
let myCanvas;
//starting variables for the grid
let startX;
let startY;

//boards are filled with zeros and alive cells are marked with ones
let board;
let nextboard;

function setup() {
    frameRate(10);
    myCanvas = createCanvas(windowWidth - 40, windowHeight - 40);
    myCanvas.parent("gameboard");

    size = 20;
    numcol = floor(width / size)
    numrow = floor(height / size)
    startX = (width - (size * numcol)) * 0.5;
    startY = (height - (size * numrow)) * 0.5;
    board = createBoard(numcol, numrow);
    randomizeBoard();
}

function windowResized() {
    resizeCanvas(windowWidth - 40, windowHeight - 40);
    numcol = floor(width / size)
    numrow = floor(height / size)
    nextboard = createBoard(numcol, numrow);
    for (let i = 0; i < numcol; i++) {
        for (let j = 0; j < numrow; j++) {
            if (board[i][j] != 0) {
                nextboard[i][j] = board[i][j];
            }
            else {
                nextboard[i][j] = 0;
            }
        }
    }
    board = nextboard;
}

function draw() {
    background('#1D1F29');
    //step();
    for (let i = 0; i < numcol; i++) {
        for (let j = 0; j < numrow; j++) {
            if (board[i][j] == 1) {
                fill('#4c5c96');
            } else {
                fill('#353849f2');
            }
            stroke('#1D1F29');
            rect(startX + i * size, startY + j * size, size - 1, size - 1)
        }
    }
}

function createBoard(x, y) {
    let b = new Array(x)
    for (let i = 0; i < x; i++) {
        b[i] = new Array(y);
    }
    return b;
}

function randomizeBoard() {
    for (let w = 0; w < numcol; w++) {
        for (let z = 0; z < numrow; z++) {
            if (w == 0 || w == numcol - 1 || z == 0 || z == numrow - 1) {
                board[w][z] = 0;
            }
            else {
                board[w][z] = floor(random(2));
            }
        }
    }
}

function step() {
    for (let x = 1; x < numcol - 1; x++) {
        for (let y = 1; y < numrow - 1; y++) {
            let neighbours = 0;
            for (let i = -1; i <= 1; i++) {
                for (let v = -1; v <= 1; v++) {
                    neighbours += board[x - i][y - v];
                }
            }
        }
    }

}

function mousePressed() {

}



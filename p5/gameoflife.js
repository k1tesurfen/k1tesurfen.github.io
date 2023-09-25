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
let pause;

function setup() {
    frameRate(5);
    myCanvas = createCanvas(windowWidth - 40, windowHeight-60);
    myCanvas.parent("gameboard");
    background('#1D1F29');
    pause = false;
    size = 20;
    numcol = floor(width / size)
    numrow = floor(height / size)
    startX = (width - (size * numcol)) * 0.5;
    startY = (height - (size * numrow)) * 0.5;
    board = createBoard(numcol, numrow);
    nextboard = createBoard(numcol, numrow);
    randomizeBoard();
    let strong = " ";
    for(let i=0;i<numcol; i++){
        for(let j=0; j<numrow; j++){
            strong += board[i][j];
        }
        print(strong);
        strong = " ";
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 40, windowHeight - 60);
    numcol = floor(width / size)
    numrow = floor(height / size)
    let temp= createBoard(numcol, numrow);
    for (let i = 0; i < numcol; i++) {
        for (let j = 0; j < numrow; j++) {
            if (board[i][j] == 1) {
                temp[i][j] = board[i][j];
            }
            else {
                temp[i][j] = 0;
            }
        }
    }
    board = temp;
}

function draw() {
    if(!pause){
        generate();
    }
    for (let i = 0; i < numrow; i++) {
        for (let j = 0; j < numcol; j++) {
            if (board[j][i] == 1) {
                fill('#4c5c96');
            } else {
                fill('#353849f2');
            }
            stroke('#1D1F29');
            rect(startX + j * size, startY + i * size, size - 1, size - 1)
        }
    }
}

function createBoard(x, y) {
    let b = new Array(x)
    for (let i = 0; i < x; i++) {
        b[i] = new Array(y);
    }
    for(let i = 0; i<x;i++){
        for(let j = 0; j<y; j++){
            b[i][j] = 0;
        }
    }
    return b;
}

function randomizeBoard() {
    for (let w = 0; w < numrow; w++) {
        for (let z = 0; z < numcol; z++) {
            if (w == 0 || w == numrow - 1 || z == 0 || z == numcol - 1) {
                board[z][w] = 0;
            }
            else {
                board[z][w] = floor(random(2));
            }
        }
    }
}

function clearBoard() {
    for (let w = 0; w < numcol; w++) {
        for (let z = 0; z < numrow; z++) {
            board[w][z] = 0;
        }
    }
}


function generate() {
    for (let x = 1; x < numcol - 1; x++) {
        for (let y = 1; y < numrow - 1; y++) {

            let neighbors = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    neighbors += board[x + i][y + j];
                }
            }

            neighbors -= board[x][y];

            if((board[x][y]==1) && (neighbors > 3)){
                nextboard[x][y] = 0;
            } else if((board[x][y]==1) && (neighbors < 2)){
                nextboard[x][y] = 0;
            } else if((board[x][y]==0) && (neighbors == 3)){
                nextboard[x][y] = 1;
            } else{
                nextboard[x][y] = board[x][y];
            }

        }
    }
    let temp = board;
    board = nextboard;
    next = temp;
}

function startGame(){
    pause = false;
}

function pauseGame(){
    pause = true;
}

function mousePressed() {
    let x = floor((mouseX-startX)/size);
    let y = floor((mouseY-startY)/size);
    if (x == 0 || x == numcol - 1 || y == 0 || y == numrow - 1) {
        board[x][y] = 0;
    }
    else{
        board[x][y] = sq(board[x][y] - 1);
    }
}



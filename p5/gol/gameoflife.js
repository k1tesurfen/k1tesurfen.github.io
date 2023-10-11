let sidelength;
let columns;
let rows;
//boards are filled with zeros and alive cells are marked with ones
let board;
let nextboard;
let myCanvas;
//starting variables for the grid
let startX;
let startY;

let pause;

function setup() {
  frameRate(8);
  myCanvas = createCanvas(windowWidth - 40, windowHeight - 60);
  myCanvas.parent('gameboard');
  background('#1D1F29');
  pause = false;
  sidelength = 20;
  columns = floor(width / sidelength);
  rows = floor(height / sidelength);
  startX = (width - sidelength * columns) * 0.5;
  startY = (height - sidelength * rows) * 0.5;
  board = createBoard(columns, rows);
  nextboard = createBoard(columns, rows);
  randomizeBoard();
}

function windowResized() {
  resizeCanvas(windowWidth - 40, windowHeight - 60);
  columns = floor(width / sidelength);
  rows = floor(height / sidelength);
  let temp = createBoard(columns, rows);
  //outer look for y. inner loop for x
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[j][i] == 1) {
        temp[j][i] = board[j][i];
      } else {
        temp[j][i] = 0;
      }
    }
  }
  board = temp;
}

function draw() {
  if (!pause) {
    nextStep();
  }
  //outer look for y. inner loop for x
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[j][i] == 1) {
        fill('#4c5c96');
      } else {
        fill('#353849f2');
      }
      stroke('#1D1F29');
      rect(startX + j * sidelength, startY + i * sidelength, sidelength, sidelength);
    }
  }
}

function createBoard(x, y) {
  let b = new Array(x);
  for (let i = 0; i < x; i++) {
    b[i] = new Array(y);
  }
  return b;
}

function randomizeBoard() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1) {
        board[i][j] = 0;
      } else {
        board[i][j] = floor(random(2));
      }
      nextboard[i][j] = 0;
    }
  }
}

function clearBoard() {
  for (let w = 0; w < columns; w++) {
    for (let z = 0; z < rows; z++) {
      board[w][z] = 0;
    }
  }
}

function nextStep() {
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x + i][y + j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) nextboard[x][y] = 0; // Loneliness
      else if (board[x][y] == 1 && neighbors > 3) nextboard[x][y] = 0; // Overpopulation
      else if (board[x][y] == 0 && neighbors == 3) nextboard[x][y] = 1; // Reproduction
      else nextboard[x][y] = board[x][y]; // Stasis
    }
  }
  let temp = board;
  board = nextboard;
  nextboard = temp;
}

function startGame() {
  pause = false;
}

function pauseGame() {
  pause = true;
}

function mousePressed() {
  let x = floor((mouseX - startX) / sidelength);
  let y = floor((mouseY - startY) / sidelength);
  if (x == 0 || x == columns - 1 || y == 0 || y == rows - 1) {
    board[x][y] = 0;
  } else {
    board[x][y] = sq(board[x][y] - 1);
  }
}

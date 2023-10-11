let sidelength;
let columns;

let values;

let myCanvas;

//starting variables for the grid
let startX;
let startY;

let pause;

function setup() {
  frameRate(8);
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('canvas');
  background('#1D1F29');
  pause = false;
  sidelength = 10;
  columns = floor(width / sidelength);
  rows = floor(width / sidelength);
  values = new Array(columns);
  randomizeValues();
  startX = (width - sidelength * columns) * 0.5;
  startY = (height - sidelength * rows) * 0.5;
  for (let j = 0; j < columns; j++) {
    stroke('#1D1F29');
    fill('#4c5c96');
    rect(j * sidelength, height, sidelength, -values[j]);
  }
  quickSort(0, values.length - 1);
}

function draw() {
  if (!pause) {
    for (let j = 0; j < columns; j++) {
      fill('#4c5c96');
      stroke('#1D1F29');
      rect(j * sidelength, height, sidelength, -values[j]);
    }
  }
}


function startGame() {
  pause = false;
}

function pauseGame() {
  pause = true;
}

function randomizeValues() {
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
  }
}

async function partition(left, right) {
  let pivot = values[right];
  let i = left - 1;
  for (let j = left; left < right - 1; j++) {
    if (values[j] < pivot) {
      i++;
      swap(values[j], values[i]);
    }
  }

  swap(values[i + 1], values[right]);
  return i + 1;
}

async function quickSort(left, right) {
  let mid;
  if (left < right) {
    mid = partition(values, left, right);
  }

  await Promise.all([quickSort(values, left, mid - 1), quickSort(values, mid + 1, right)])
}

function swap(pos1, pos2) {
  let temp = values[pos1];
  values[pos1] = values[pos2];
  values[pos2] = temp;
}




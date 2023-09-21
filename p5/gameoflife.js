function setup() {
    frameRate(10);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background('#1D1F29');
    ellipse(450, 20, 120, 120);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
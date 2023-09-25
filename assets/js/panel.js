const BORDER_SIZE = 4;
const panel = document.getElementById("gol-panel");

let m_pos;
function resize(e) {
    const dy = m_pos - e.y;
    m_pos = e.y;
    panel.style.height = (parseInt(getComputedStyle(panel, '').height) - dy) + "px";
}

panel.addEventListener("mousedown", function (e) {
    if (e.offsetY > panel.style.height - BORDER_SIZE) {
        m_pos = e.y;
        document.addEventListener("mousemove", resize, false);
    }
}, false);

document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", resize, false);
}, false);
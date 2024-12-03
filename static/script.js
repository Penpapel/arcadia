// Canvas and input setup
const canvas = document.getElementById("textCanvas");
const ctx = canvas.getContext("2d");
const input = document.getElementById("textInput");

// Resize the canvas to fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawText(input.value || "Type Here!");
}

// Draw a pixel-perfect grid behind the text
function drawGrid(x, y, width, height, blockSize) {
    ctx.strokeStyle = "#333"; // Grid line color
    ctx.lineWidth = 1; // Grid line width

    // Draw vertical lines
    for (let gx = x; gx <= x + width; gx += blockSize) {
        ctx.beginPath();
        ctx.moveTo(gx, y);
        ctx.lineTo(gx, y + height);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let gy = y; gy <= y + height; gy += blockSize) {
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + width, gy);
        ctx.stroke();
    }
}

// Draw the text on the canvas
function drawText(text) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!text) return;

    // Adaptive font size calculation
    const maxWidth = canvas.width * 0.8;
    let fontSize = 10;

    do {
        ctx.font = `${fontSize}px PixelifySans`;
        const textWidth = ctx.measureText(text).width;
        if (textWidth > maxWidth) break;
        fontSize += 1;
    } while (fontSize < canvas.height * 0.5);

    // Calculate text dimensions
    ctx.font = `${fontSize}px PixelifySans`;
    const textWidth = ctx.measureText(text).width;
    const textHeight = fontSize; // Approximate height from font size
    const x = (canvas.width - textWidth) / 2; // Centered horizontally
    const y = (canvas.height - textHeight) / 2; // Centered vertically

    // Draw the grid behind the text
    const blockSize = fontSize / 4; // Adjust for a 6x6 block grid
    drawGrid(x, y, textWidth, textHeight, blockSize);

    // Draw the text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

// Input event listener
input.addEventListener("input", () => {
    drawText(input.value);
});

// Resize canvas on window resize
window.addEventListener("resize", resizeCanvas);

// Initial setup
resizeCanvas();

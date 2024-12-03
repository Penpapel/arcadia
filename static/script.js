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

// Draw the text on the canvas
function drawText(text) {
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

    // Center text on the canvas
    ctx.font = `${fontSize}px PixelifySans`;
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

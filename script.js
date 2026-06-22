// BACKGROUND INTERACTIVE PARTICLES FOR THE FUTURISTIC CV
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 40;

// Handle window resizing safely
function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

window.addEventListener('resize', () => {
    resizeCanvas();
});

// Particle blueprint
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(189, 0, 255, 0.3)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around margins
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Populate particles
function init() {
    resizeCanvas();
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// Particle connections
function drawLines() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 110) {
                opacityValue = 1 - (distance / 110);
                ctx.strokeStyle = 'rgba(0, 240, 255, ' + opacityValue * 0.15 + ')';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Render loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    drawLines();
    requestAnimationFrame(animate);
}

// Initial triggers
init();
animate();

// Aesthetic Console Greetings & Logging 
console.log("%c[SYSTEM INITIALIZED] Welcome to Muhammad Azrhil Priyatna's Futuristic CV Console", "color: #00f0ff; font-weight: bold; font-size: 12px;");
console.log("%cStatus: Diagnostics secure. All telemetry indices nominal.", "color: #39ff14; font-family: monospace;");

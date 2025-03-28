// Αρχικές μεταβλητές για το παιχνίδι
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let player = { x: 50, y: 50, width: 30, height: 30, color: "blue" };
let zombies = [{ x: 300, y: 300, width: 30, height: 30, color: "green" }];
let bullets = [];
let lives = 5;
let isGameRunning = false;

// Κίνηση παίκτη με WASD
document.addEventListener("keydown", (event) => {
    if (event.key === "w") player.y -= 5;
    if (event.key === "s") player.y += 5;
    if (event.key === "a") player.x -= 5;
    if (event.key === "d") player.x += 5;
});

// Πυροβολισμοί
document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        let bullet = { x: player.x + player.width, y: player.y + player.height / 2, width: 10, height: 5, speed: 7 };
        bullets.push(bullet);
    }
});

// Κίνηση σφαιρών
function moveBullets() {
    bullets.forEach((bullet) => {
        bullet.x += bullet.speed;
    });
}

// Σχεδίαση παίκτη, ζόμπι και σφαιρών
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    zombies.forEach((zombie) => {
        ctx.fillStyle = zombie.color;
        ctx.fillRect(zombie.x, zombie.y, zombie.width, zombie.height);
    });

    bullets.forEach((bullet) => {
        ctx.fillStyle = "red";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Βασικός κύκλος παιχνιδιού
function gameLoop() {
    if (!isGameRunning) return;
    moveBullets();
    draw();
    requestAnimationFrame(gameLoop);
}

// Ξεκίνα το παιχνίδι
document.getElementById("startGameBtn").addEventListener("click", () => {
    isGameRunning = true;
    canvas.width = window.innerWidth;  // Για fullscreen
    canvas.height = window.innerHeight; // Για fullscreen
    gameLoop();
});

// Hamburger Menu Logic
document.getElementById("hamburgerMenu").addEventListener("click", () => {
    let menu = document.getElementById("menu");
    menu.classList.toggle("show"); // Εναλλάσσουμε το display
});

// Ανοίγει το παιχνίδι σε fullscreen όταν πατάς το "Game"
document.getElementById("gameBtn").addEventListener("click", () => {
    isGameRunning = true;
    canvas.width = window.innerWidth;  // Για fullscreen
    canvas.height = window.innerHeight; // Για fullscreen
    gameLoop();
    document.getElementById("menu").classList.remove("show");  // Κλείσιμο του μενού
});

// Ανοίγει το μενού ρυθμίσεων όταν πατάς το "Settings"
document.getElementById("settingsBtn").addEventListener("click", () => {
    alert("Ρυθμίσεις");
    // Εδώ μπορείς να προσθέσεις τις επιλογές ρυθμίσεων αν θες
});

// Κλείνει τη σελίδα όταν πατάς το "Exit"
document.getElementById("exitBtn").addEventListener("click", () => {
    window.close();  // Κλείνει το παράθυρο ή τη σελίδα
});

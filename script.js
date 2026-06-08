const canvas = document.getElementById('game-canvas');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startBtn = document.getElementById('start-btn');
const themeToggle = document.getElementById('theme-toggle');
const statusTag = document.getElementById('game-status-tag');

const boxScore = document.getElementById('box-score');
const boxLives = document.getElementById('box-lives');

let score = 0;
let lives = 3;
let gameActive = false;
let basketX = 275;
let fallingItems = [];
let gameInterval;
let spawnInterval;
let currentSpeed = 4.5;
let spawnRate = 1000;

// Interatividade: Alternador de Tema (Modo Eco Noturno)
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-eco');
    themeToggle.textContent = document.body.classList.contains('dark-eco') ? '☀️' : '🌱';
});

startBtn.addEventListener('click', startGame);

// Controle do Mouse Suave e Centralizado
canvas.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const rect = canvas.getBoundingClientRect();
    let relativeX = e.clientX - rect.left;
    basketX = relativeX - 50; // Largura do cesto é 100px
    
    if (basketX < 0) basketX = 0;
    if (basketX > 550) basketX = 550; // 650px largura - 100px cesto
    
    basket.style.left = basketX + 'px';
});

// Suporte Avançado de Teclado
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    if (e.key === 'ArrowLeft' && basketX > 0) {
        basketX -= 35;
    } else if (e.key === 'ArrowRight' && basketX < 550) {
        basketX += 35;
    }
    basket.style.left = basketX + 'px';
});

function startGame() {
    score = 0;
    lives = 3;
    currentSpeed = 4.5;
    gameActive = true;
    
    scoreDisplay.
const canvas = document.getElementById('game-canvas');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startBtn = document.getElementById('start-btn');

let score = 0;
let lives = 3;
let gameActive = false;
let basketX = 255;
let fallingItems = [];
let gameInterval;
let spawnInterval;
let currentSpeed = 4; // Velocidade inicial do jogo
let spawnRate = 1000; // Tempo inicial de surgimento (ms)

startBtn.addEventListener('click', startGame);

// Controle do Mouse aprimorado com limites precisos
canvas.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const rect = canvas.getBoundingClientRect();
    let relativeX = e.clientX - rect.left;
    basketX = relativeX - 45; // Centraliza a barra de 90px
    
    if (basketX < 0) basketX = 0;
    if (basketX > 510) basketX = 510; // 600px de largura - 90px da barra
    
    basket.style.left = basketX + 'px';
});

// Suporte para Teclado
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    if (e.key === 'ArrowLeft' && basketX > 0) {
        basketX -= 30;
    } else if (e.key === 'ArrowRight' && basketX < 510) {
        basketX += 30;
    }
    basket.style.left = basketX + 'px';
});

function startGame() {
    score = 0;
    lives = 3;
    currentSpeed = 4;
    gameActive = true;
    
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    startBtn.style.display = 'none';
    
    fallingItems.forEach(item => item.element.remove());
    fallingItems = [];

    gameInterval = setInterval(updateGame, 20);
    adjustDifficulty(); // Inicia o gerenciador de loops de geração
}

// Mecanismo de dificuldade adaptativa
function adjustDifficulty() {
    clearInterval(spawnInterval);
    if (!gameActive) return;

    // Conforme o score sobe, diminui o intervalo de spawn
    let rate = Math.max(400, spawnRate - (Math.floor(score / 50) * 100));
    
    spawnInterval = setInterval(() => {
        spawnItem();
    }, rate);
}

function spawnItem() {
    if (!gameActive) return;

    const types = [
        { icon: '💧', type: 'good' },
        { icon: '☀️', type: 'good' },
        { icon: '❌', type: 'bad' }
    ];
    
    const choice = types[Math.floor(Math.random() * types.length)];
    const element = document.createElement('div');
    element.className = 'item';
    element.textContent = choice.icon;
    element.style.top = '0px';
    element.style.left = Math.floor(Math.random() * 565) + 'px';
    canvas.appendChild(element);

    fallingItems.push({
        element: element,
        y: 0,
        type: choice.type,
        x: parseInt(element.style.left)
    });
}

function triggerFlash(className) {
    canvas.classList.add(className);
    setTimeout(() => {
        canvas.classList.remove(className);
    }, 150);
}

function updateGame() {
    // Aumenta a velocidade com base nos pontos de forma suave
    currentSpeed = 4 + Math.floor(score / 60);

    for (let i = fallingItems.length - 1; i >= 0; i--) {
        let item = fallingItems[i];
        item.y += currentSpeed;
        item.element.style.top = item.y + 'px';

        // Detecção de colisão precisa
        if (item.y >= 380 && item.y <= 400) {
            if (item.x + 35 >= basketX && item.x <= basketX + 90) {
                if (item.type === 'good') {
                    score += 10;
                    scoreDisplay.textContent = score;
                    triggerFlash('score-flash');
                    // Recalcula dificuldade se atingiu novo marco
                    if (score % 50 === 0) adjustDifficulty();
                } else {
                    lives--;
                    livesDisplay.textContent = lives;
                    triggerFlash('hit-flash');
                }
                item.element.remove();
                fallingItems.splice(i, 1);
                checkGameOver();
                continue;
            }
        }

        // Passou da base (Desperdício)
        if (item.y > 420) {
            if (item.type === 'good') {
                lives--;
                livesDisplay.textContent = lives;
                triggerFlash('hit-flash');
            }
            item.element.remove();
            fallingItems.splice(i, 1);
            checkGameOver();
        }
    }
}

function checkGameOver() {
    if (lives <= 0) {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        
        setTimeout(() => {
            alert(`Fim de Jogo! 🌱\nSua pontuação final: ${score} pontos.\nParabéns por apoiar o equilíbrio sustentável do nosso ecossistema agropecuário!`);
            startBtn.style.display = 'inline-block';
            startBtn.textContent = 'Jogar Novamente';
        }, 200);
    }
}
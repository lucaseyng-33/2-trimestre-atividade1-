// Seleção de elementos do DOM
const canvas = document.getElementById('game-canvas');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startBtn = document.getElementById('start-btn');

let score = 0;
let lives = 3;
let gameActive = false;
let basketX = 260;
let fallingItems = [];
let gameInterval;
let spawnInterval;

// Evento do botão de iniciar
startBtn.addEventListener('click', startGame);

// Movimento com o Mouse
canvas.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const rect = canvas.getBoundingClientRect();
    let relativeX = e.clientX - rect.left;
    basketX = relativeX - 40; // Centraliza a barra
    
    if (basketX < 0) basketX = 0;
    if (basketX > 520) basketX = 520;
    
    basket.style.left = basketX + 'px';
});

// Movimento com o Teclado
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    if (e.key === 'ArrowLeft' && basketX > 0) {
        basketX -= 25;
    } else if (e.key === 'ArrowRight' && basketX < 520) {
        basketX += 25;
    }
    basket.style.left = basketX + 'px';
});

function startGame() {
    // Reset do jogo
    score = 0;
    lives = 3;
    gameActive = true;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    startBtn.style.display = 'none';
    
    // Limpa itens antigos
    fallingItems.forEach(item => item.element.remove());
    fallingItems = [];

    // Loops do jogo (Loop de frames e gerador de itens)
    gameInterval = setInterval(updateGame, 20);
    spawnInterval = setInterval(spawnItem, 1000);
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
    element.style.left = Math.floor(Math.random() * 570) + 'px';
    canvas.appendChild(element);

    fallingItems.push({
        element: element,
        y: 0,
        type: choice.type,
        x: parseInt(element.style.left)
    });
}

function updateGame() {
    for (let i = fallingItems.length - 1; i >= 0; i--) {
        let item = fallingItems[i];
        item.y += 4; // Velocidade de queda
        item.element.style.top = item.y + 'px';

        // Verifica colisão com a barra de coleta
        if (item.y >= 360 && item.y <= 385) {
            if (item.x + 30 >= basketX && item.x <= basketX + 80) {
                if (item.type === 'good') {
                    score += 10;
                    scoreDisplay.textContent = score;
                } else {
                    lives--;
                    livesDisplay.textContent = lives;
                }
                item.element.remove();
                fallingItems.splice(i, 1);
                checkGameOver();
                continue;
            }
        }

        // Se passar do fundo sem colidir
        if (item.y > 400) {
            if (item.type === 'good') {
                // Deixar água ou energia sumir também tira vida (Desperdício)
                lives--;
                livesDisplay.textContent = lives;
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
        alert(`Fim de Jogo! Boa tentativa! Pontuação Final: ${score} pontos. Continue protegendo nossos recursos!`);
        startBtn.style.display = 'inline-block';
        startBtn.textContent = 'Jogar Novamente';
    }
}
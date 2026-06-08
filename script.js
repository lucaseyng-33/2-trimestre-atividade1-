// Game State Manager - Versão Comercial Competitiva
const canvas = document.getElementById('game-canvas');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const levelDisplay = document.getElementById('game-level');
const comboDisplay = document.getElementById('combo');
const startBtn = document.getElementById('start-btn');

// Botões da Loja
const buyIrrigationBtn = document.getElementById('buy-irrigation');
const buySolarBtn = document.getElementById('buy-solar');

// Configurações do Core Engine
let score = 0;
let lives = 3;
let level = 1;
let combo = 1.0;
let gameActive = false;
let basketX = 305;
let basketWidth = 90;
let fallingItems = [];
let gameInterval;
let spawnInterval;

// Balanço e Configuração de Spawn
let baseSpeed = 4.5;
let currentSpeed = 4.5;
let spawnRate = 900;

// Estado da Loja de Tecnologia
let upgrades = {
    irrigation: false,
    solarUsed: false
};

// Listeners de Ação
startBtn.addEventListener('click', startGame);
buyIrrigationBtn.addEventListener('click', purchaseIrrigation);
buySolarBtn.addEventListener('click', purchaseSolar);

// Rastreamento Dinâmico por Mouse
canvas.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const rect = canvas.getBoundingClientRect();
    let relativeX = e.clientX - rect.left;
    basketX = relativeX - (basketWidth / 2);
    
    // Trava de colisão nas bordas dinâmicas do canvas (700px total)
    if (basketX < 0) basketX = 0;
    if (basketX > (700 - basketWidth)) basketX = 700 - basketWidth;
    
    basket.style.left = basketX + 'px';
});

// Suporte Alternativo Total por Teclado
document.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    if (e.key === 'ArrowLeft' && basketX > 0) {
        basketX -= 35;
    } else if (e.key === 'ArrowRight' && basketX < (700 - basketWidth)) {
        basketX += 35;
    }
    basket.style.left = basketX + 'px';
});

function startGame() {
    // Reset Completo da Lógica
    score = 0;
    lives = 3;
    level = 1;
    combo = 1.0;
    basketWidth = 90;
    baseSpeed = 4.5;
    spawnRate = 900;
    gameActive = true;
    
    upgrades.irrigation = false;
    upgrades.solarUsed = false;
    basket.style.width = basketWidth + 'px';

    updateDashboard();
    startBtn.style.display = 'none';
    
    fallingItems.forEach(item => item.element.remove());
    fallingItems = [];

    // Start do Loop de Render
    gameInterval = setInterval(updateEngine, 1000 / 60); // 60 FPS estável
    runSpawner();
}

function runSpawner() {
    clearInterval(spawnInterval);
    if (!gameActive) return;
    spawnInterval = setInterval(spawnItem, spawnRate);
}

function spawnItem() {
    if (!gameActive) return;

    // Itens contextuais estruturados
    const types = [
        { icon: '💧', type: 'good' },
        { icon: '☀️', type: 'good' },
        { icon: '❌', type: 'bad' }
    ];
    
    const choice = types[Math.floor(Math.random() * types.length)];
    const element = document.createElement('div');
    element.className = 'item';
    element.textContent = choice.icon;
    element.style.top = '-40px';
    element.style.left = Math.floor(Math.random() * 660) + 'px'; // Previne overflow no canvas de 700px
    canvas.appendChild(element);

    fallingItems.push({
        element: element,
        y: -40,
        type: choice.type,
        x: parseInt(element.style.left)
    });
}

function updateEngine() {
    // Escalonamento Dinâmico de Dificuldade de Acordo com Nível
    currentSpeed = baseSpeed + (level * 0.7);
    spawnRate = Math.max(350, 900 - (level * 80));

    for (let i = fallingItems.length - 1; i >= 0; i--) {
        let item = fallingItems[i];
        item.y += currentSpeed;
        item.element.style.top = item.y + 'px';

        // Linha de Varredura do Coletor (Colisão em Y=410 até Y=435)
        if (item.y >= 400 && item.y <= 425) {
            if (item.x + 35 >= basketX && item.x <= basketX + basketWidth) {
                if (item.type === 'good') {
                    // Sistema Adaptativo de Combos
                    score += Math.floor(10 * combo);
                    combo = parseFloat((combo + 0.1).toFixed(1));
                    triggerScreenFlash('score-flash');
                } else {
                    lives--;
                    combo = 1.0; // Quebra do multiplicador
                    triggerScreenFlash('hit-flash');
                }
                
                item.element.remove();
                fallingItems.splice(i, 1);
                handleProgression();
                continue;
            }
        }

        // Passou direto pela base (Representa o Desperdício da Gestão)
        if (item.y > 450) {
            if (item.type === 'good') {
                lives--; // Desperdiçar recursos vitais gera dano ecológico
                combo = 1.0;
                triggerScreenFlash('hit-flash');
            }
            item.element.remove();
            fallingItems.splice(i, 1);
            handleProgression();
        }
    }
}

function handleProgression() {
    // Lógica Progressiva de Níveis
    let newLevel = Math.floor(score / 100) + 1;
    if (newLevel !== level) {
        level = newLevel;
        runSpawner(); // Atualiza a taxa de surgimento no laço principal
    }

    updateDashboard();
    checkMarketAvailability();
    checkGameOver();
}

function updateDashboard() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    levelDisplay.textContent = level;
    comboDisplay.textContent = combo + 'x';
}

function triggerScreenFlash(cssClass) {
    canvas.classList.add(cssClass);
    setTimeout(() => canvas.classList.remove(cssClass), 100);
}

// Mecânica de Verificação de Crédito na Loja
function checkMarketAvailability() {
    // Sensor de irrigação custa 50 pontos
    if (score >= 50 && !upgrades.irrigation) {
        buyIrrigationBtn.removeAttribute('disabled');
    } else {
        buyIrrigationBtn.setAttribute('disabled', 'true');
    }

    // Painel solar custa 100 pontos
    if (score >= 100 && !upgrades.solarUsed) {
        buySolarBtn.removeAttribute('disabled');
    } else {
        buySolarBtn.setAttribute('disabled', 'true');
    }
}

// Compras e Alteração Dinâmica de Parâmetros de Execução
function purchaseIrrigation() {
    if (score >= 50 && !upgrades.irrigation) {
        score -= 50;
        upgrades.irrigation = true;
        basketWidth = 130; // Aumenta a área de coleta física e visual
        basket.style.width = basketWidth + 'px';
        handleProgression();
    }
}

function purchaseSolar() {
    if (score >= 100 && !upgrades.solarUsed) {
        score -= 100;
        upgrades.solarUsed = true;
        lives += 1; // Recuperação Estratégica de Vida
        handleProgression();
    }
}

function checkGameOver() {
    if (lives <= 0) {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        
        // Bloqueia comandos da loja pós-jogo
        buyIrrigationBtn.setAttribute('disabled', 'true');
        buySolarBtn.setAttribute('disabled', 'true');

        setTimeout(() => {
            alert(`Simulação Concluída! 🌱\nFase Máxima Alcançada: Nível ${level}\nPontuação Total: ${score} pontos.\n\nO SENAR-PR e a SEED-PR agradecem o seu empenho em construir um futuro mais forte e equilibrado!`);
            startBtn.style.display = 'inline-block';
            startBtn.textContent = 'Reiniciar Operação';
        }, 150);
    }
}
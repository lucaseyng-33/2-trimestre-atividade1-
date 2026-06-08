/* Variáveis de Design Avançado */
:root {
    --primary-color: #1b4332;
    --secondary-color: #2d6a4f;
    --accent-color: #52b788;
    --light-accent: #d8f3dc;
    --bg-color: #f4f9f4;
    --card-bg: #ffffff;
    --text-color: #2d3748;
    --danger-color: #d90429;
    --radius: 16px;
    --transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Modo Escuro / Eco Alternativo */
body.dark-eco {
    --bg-color: #121814;
    --card-bg: #1e2621;
    --text-color: #e2e8f0;
    --primary-color: #52b788;
    --secondary-color: #74c69d;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
    transition: background-color 0.5s ease;
}

/* Botão de Tema */
.theme-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: none;
    background: var(--card-bg);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    font-size: 1.3rem;
    cursor: pointer;
    transition: var(--transition);
}
.theme-btn:hover { transform: scale(1.1) rotate(15deg); }

/* Cabeçalho de Impacto Visual */
header {
    background: linear-gradient(135deg, #0f2419 0%, var(--primary-color) 50%, var(--secondary-color) 100%);
    color: white;
    padding: 80px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.logo-space {
    font-size: 3rem;
    animation: float 3s ease-in-out infinite;
}

.header-container h1 {
    font-size: 3rem;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    margin: 10px 0;
}

.subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    margin-bottom: 20px;
}

.badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 24px;
    border-radius: 30px;
    font-weight: 600;
    backdrop-filter: blur(8px);
}

/* Layout Container */
.container {
    max-width: 1140px;
    margin: -30px auto 60px;
    padding: 0 20px;
    position: relative;
    z-index: 10;
}

/* Seção de Conscientização Avançada */
.info-section {
    background: var(--card-bg);
    padding: 40px;
    border-radius: var(--radius);
    box-shadow: 0 20px 40px rgba(0,0,0,0.03);
    margin-bottom: 40px;
    transition: background-color 0.5s ease;
}

.info-section h2 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 8px;
}

.intro-text {
    color: #718096;
    margin-bottom: 35px;
}

/* Cards Interativos Expandíveis (Hover) */
.grid-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.card {
    background: var(--bg-color);
    padding: 30px;
    border-radius: var(--radius);
    border: 1px solid rgba(0,0,0,0.03);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
}

.card:hover {
    transform: translateY(-8px);
    background: var(--card-bg);
    box-shadow: 0 15px 30px rgba(0,0,0,0.08);
}

.card[data-eco="agua"] { border-top: 5px solid #3a86ff; }
.card[data-eco="solo"] { border-top: 5px solid #38b000; }
.card[data-eco="energia"] { border-top: 5px solid #ffb703; }

.card-icon-wrapper {
    width: 60px;
    height: 60px;
    background: var(--card-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    margin-bottom: 15px;
}

.card-icon { font-size: 2rem; }

.card h3 {
    margin-bottom: 10px;
    color: var(--text-color);
}

/* Efeito revelação de texto */
.expanded-content {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: var(--transition);
    color: #4a5568;
    font-size: 0.95rem;
    margin-top: 0;
}

body.dark-eco .expanded-content { color: #cbd5e1; }

.card:hover .expanded-content {
    max-height: 120px;
    opacity: 1;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed rgba(0,0,0,0.1);
}

/* Área do Jogo */
.game-section {
    background: var(--card-bg);
    padding: 40px;
    border-radius: var(--radius);
    box-shadow: 0 20px 40px rgba(0,0,0,0.03);
    text-align: center;
    transition: background-color 0.5s ease;
}

.section-title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.game-indicator {
    background: #edf2f7;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #4a5568;
}

.game-stats {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 25px;
}

.stat-box {
    background: var(--bg-color);
    padding: 12px 25px;
    border-radius: 12px;
    font-weight: 800;
    font-size: 1.3rem;
    border: 2px solid transparent;
    transition: var(--transition);
}

/* Animações de impacto nos scores */
.pop-effect {
    animation: pop 0.3s ease;
    border-color: var(--accent-color);
}
.danger-effect {
    animation: pop 0.3s ease;
    border-color: var(--danger-color);
    color: var(--danger-color);
}

/* Tela de Jogo Estilizada */
#game-canvas {
    width: 100%;
    max-width: 650px;
    height: 440px;
    background: linear-gradient(to bottom, #7ac1eb 0%, #bfe3f7 100%);
    border: 6px solid var(--primary-color);
    border-radius: 20px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    cursor: none;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

/* Nuvens decorativas de fundo */
.sky-cloud {
    background: rgba(255,255,255,0.6);
    position: absolute;
    border-radius: 20px;
}
.sky-cloud.c1 { width: 80px; height: 30px; top: 40px; left: 10%; animation: floatCloud 20s linear infinite; }
.sky-cloud.c2 { width: 120px; height: 40px; top: 100px; right: 15%; animation: floatCloud 28s linear infinite reverse; }

/* Coletor Estilizado como Cesto de Palha */
.catcher {
    width: 100px;
    height: 25px;
    background: #8c6239;
    border-radius: 4px 4px 12px 12px;
    position: absolute;
    bottom: 15px;
    left: 275px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
}

.basket-texture {
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background: repeating-linear-gradient(45deg, #000, #000 4px, transparent 4px, transparent 8px);
}

.item {
    width: 40px;
    height: 40px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));
    transition: transform 0.1s linear;
}

/* Botão Moderno */
.btn-game {
    background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
    color: white;
    border: none;
    padding: 16px 45px;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 40px;
    cursor: pointer;
    margin-top: 30px;
    box-shadow: 0 6px 20px rgba(45, 106, 79, 0.3);
    transition: var(--transition);
}

.btn-game:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 25px rgba(45, 106, 79, 0.4);
}

/* Animações Keyframes */
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

@keyframes floatCloud {
    0% { transform: translateX(-100px); }
    100% { transform: translateX(750px); }
}

@keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
}

/* Rodapé */
footer {
    background-color: #0f2419;
    color: rgba(255,255,255,0.7);
    text-align: center;
    padding: 30px 20px;
    font-size: 0.95rem;
}
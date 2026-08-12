// --- 1. PORTAL DE ESCUTA (DESABAFO SIMULADO) ---
const ventForm = document.getElementById('ventForm');
const ventText = document.getElementById('ventText');
const responseBox = document.getElementById('responseBox');

if (ventForm) {
  ventForm.addEventListener('submit', (e) => {
    e.preventDefault();

    responseBox.innerHTML = `
      <strong>✨ Mensagem de Acolhimento:</strong><br>
      Obrigado por compartilhar seus sentimentos. Expressar o que sentimos é um passo importante para fortalecer a nossa mente e coração.<br><br>
      <em>Lembre-se: Nenhuma informação digitada foi salva ou enviada. Este formulário serve apenas como um exercício simbólico de alívio.</em><br><br>
      Se estiver passando por um momento difícil, procure um professor, pedagogo ou um adulto de confiança. Você não está sozinho!
    `;

    responseBox.classList.remove('hidden');
    ventText.value = '';
  });
}

// --- 2. QUIZ INTERATIVO (5 PERGUNTAS) ---
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');

// Respostas corretas
const correctAnswers = {
  q1: "A",
  q2: "B",
  q3: "A",
  q4: "B",
  q5: "B"
};

if (quizForm) {
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let score = 0;
    const totalQuestions = 5;

    // Obtém as respostas selecionadas pelo usuário
    const formData = new FormData(quizForm);

    for (let [question, answer] of formData.entries()) {
      if (correctAnswers[question] === answer) {
        score++;
      }
    }

    // Exibe o resultado final
    quizResult.innerHTML = `
      🏆 Resultado do Quiz:<br>
      Você acertou <strong>${score}</strong> de <strong>${totalQuestions}</strong> perguntas! <br>
      ${score === 5 ? "Incrível! Você é um verdadeiro Super Saiyajin do Respeito!" : "Bom trabalho! Continue aprendendo e praticando a empatia no dia a dia."}
    `;

    quizResult.classList.remove('hidden');
  });
}

// --- 3. GENKI DAMA INTERATIVA ---
let count = 0;

const powerBtn = document.getElementById('powerBtn');
const energyBall = document.getElementById('energyBall');
const message = document.getElementById('message');

const messages = [
  "A energia da empatia está crescendo!",
  "Sua atitude faz a diferença contra o preconceito!",
  "Mais um passo para um ambiente escolar seguro e acolhedor!",
  "Super Saiyajin do Respeito ativado!",
  "Juntos somos invencíveis contra a discriminação!"
];

if (powerBtn) {
  powerBtn.addEventListener('click', () => {
    count++;
    energyBall.innerText = count;

    const newSize = Math.min(120 + count * 2, 220);
    energyBall.style.width = `${newSize}px`;
    energyBall.style.height = `${newSize}px`;

    const randomIndex = Math.floor(Math.random() * messages.length);
    message.innerText = messages[randomIndex];
  });
}
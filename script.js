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

powerBtn.addEventListener('click', () => {
  count++;
  energyBall.innerText = count;

  // Efeito visual de expansão do Ki
  const newSize = Math.min(120 + count * 2, 220); // Aumenta o tamanho da esfera
  energyBall.style.width = `${newSize}px`;
  energyBall.style.height = `${newSize}px`;

  // Atualiza mensagem motivacional
  const randomIndex = Math.floor(Math.random() * messages.length);
  message.innerText = messages[randomIndex];
});
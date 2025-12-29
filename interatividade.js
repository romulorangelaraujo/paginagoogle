const canvas = document.getElementById("fogos");
const ctx = canvas.getContext("2d");

// Ajustar o tamanho do canvas para tela toda 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Atualizar tamanho se a tela for redimensionada
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particulas = [];

class Particula {
    constructor(x, y, cor) {
        this.x = x;
        this.y = y;
        this.color = cor;
        // Velocidade aleatória para explosão
        this.velocidadeX = (Math.random() - 0.5) * 8;
        this.velocidadeY = (Math.random() - 0.5) * 8;
        this.alpha = 1; // Opacidade inicial
        this.friction = 0.95; // Desaceleração
        this.gravity = 0.05; // Gravidade leve
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocidadeX *= this.friction;
        this.velocidadeY *= this.friction;
        this.velocidadeY += this.gravity;
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
        this.alpha -= 0.01; // Desaparecer aos poucos
    }
}

function criarFogos(x, y) {
    const cores = [
        "#4285F4", // Azul Google
        "#DB4437", // Vermelho Google
        "#F4B400", // Amarelo Google
        "#0F9D58", // Verde Google
    ];

    for (let i = 0; i < 40; i++) {
        const corAleatorio = cores[Math.floor(Math.random() * cores.length)];
        const particula = new Particula(x, y, corAleatorio);
        particulas.push(particula);
    }
}

// Loop de animação Global
function animar() {
    requestAnimationFrame(animar);

    // Limpa a tela para o próximo quadro
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach((particula, index) => {
        if (particula.alpha > 0) {
            particula.update();
            particula.draw();
        } else {
            particulas.splice(index, 1); // Remove partícula morta
        }
    });
}

// Inicia o loop de animação
animar();

// Evento: Solta fogos ao clicar especificamente no Logo do Google
const logo = document.getElementById('logo-google');
if (logo) {
    logo.addEventListener('click', (e) => {
        // Pega a posição exata do clique
        criarFogos(e.clientX, e.clientY);

        // Opcional: Soltar mais alguns aleatórios perto para mais efeito
        setTimeout(() => criarFogos(e.clientX + (Math.random() - 0.5) * 50, e.clientY + (Math.random() - 0.5) * 50), 100);
        setTimeout(() => criarFogos(e.clientX + (Math.random() - 0.5) * 50, e.clientY + (Math.random() - 0.5) * 50), 200);
    });
} else {
    // Caso o script carregue antes do DOM (embora esteja no fim do body agora)
    window.addEventListener('DOMContentLoaded', () => {
        const logoDelayed = document.getElementById('logo-google');
        if (logoDelayed) {
            logoDelayed.addEventListener('click', (e) => {
                criarFogos(e.clientX, e.clientY);
                setTimeout(() => criarFogos(e.clientX + (Math.random() - 0.5) * 50, e.clientY + (Math.random() - 0.5) * 50), 100);
            });
        }
    });
}

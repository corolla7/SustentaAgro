const btnAbrirMenu = document.getElementById('btnAbrirMenu');
const painelAcessibilidade = document.getElementById('painelAcessibilidade');

btnAbrirMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    painelAcessibilidade.classList.toggle('hidden');
});

document.addEventListener('click', () => {
    painelAcessibilidade.classList.add('hidden');
});
painelAcessibilidade.addEventListener('click', (event) => {
    event.stopPropagation();
});

let tamanhoAtualFonte = 100;
document.getElementById('btnAumentarTexto').addEventListener('click', () => {
    if (tamanhoAtualFonte < 140) {
        tamanhoAtualFonte += 10;
        document.documentElement.style.setProperty('--tamanho-base', `${tamanhoAtualFonte}%`);
    }
});
document.getElementById('btnDiminuirTexto').addEventListener('click', () => {
    if (tamanhoAtualFonte > 80) {
        tamanhoAtualFonte -= 10;
        document.documentElement.style.setProperty('--tamanho-base', `${tamanhoAtualFonte}%`);
    }
});
document.getElementById('btnResetTexto').addEventListener('click', () => {
    tamanhoAtualFonte = 100;
    document.documentElement.style.setProperty('--tamanho-base', '100%');
});

document.getElementById('btnTema').addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-tema');
    if (temaAtual === 'dark') {
        document.documentElement.removeAttribute('data-tema');
    } else {
        document.documentElement.setAttribute('data-tema', 'dark');
    }
});

let leituraVozHabilitada = false;
const btnToggleVoz = document.getElementById('btnToggleVoz');

btnToggleVoz.addEventListener('click', () => {
    leituraVozHabilitada = !leituraVozHabilitada;
    btnToggleVoz.innerText = leituraVozHabilitada ? "🔊 Leitura por Voz: LIGADA" : "🔊 Ativar Leitura por Voz";
    if (!leituraVozHabilitada) {
        window.speechSynthesis.cancel();
        removerFocosLeitura();
    }
});

function removerFocosLeitura() {
    document.querySelectorAll('.leitura-foco').forEach(el => el.classList.remove('leitura-foco'));
}

document.querySelectorAll('.texto-acessivel').forEach(elemento => {
    elemento.addEventListener('mouseenter', () => {
        if (!leituraVozHabilitada) return;
        removerFocosLeitura();
        elemento.classList.add('leitura-foco');
        falarTexto(elemento.innerText || elemento.textContent);
    });
    
    elemento.addEventListener('click', () => {
        if (!leituraVozHabilitada) return;
        removerFocosLeitura();
        elemento.classList.add('leitura-foco');
        falarTexto(elemento.innerText || elemento.textContent);
    });
});

function falarTexto(texto) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
}

function ouvirTextoExclusivo(idElemento) {
    const elemento = document.getElementById(idElemento);
    if (!elemento) return;
    falarTexto(elemento.innerText || elemento.textContent);
}

function toggleAccordion(headerObjeto) {
    const itemAtual = headerObjeto.parentElement;
    itemAtual.classList.toggle('ativo');
}

function toggleGlossarioInterno(event, elemento) {
    event.stopPropagation();
    elemento.classList.toggle('ativo');
}

const paginasHQ = [
    "imagens/hq_pagina1.png",
    "imagens/hq_pagina2.png",
    "imagens/hq_pagina3.png"
];
let indicePaginaAtual = 0;

function mudarPaginaHQ(direcao) {
    indicePaginaAtual += direcao;
    if (indicePaginaAtual < 0) {
        indicePaginaAtual = 0;
    } else if (indicePaginaAtual >= paginasHQ.length) {
        indicePaginaAtual = paginasHQ.length - 1;
    }
    document.getElementById("hqPagina").src = paginasHQ[indicePaginaAtual];
    document.getElementById("hqContador").innerText = `Pág. ${indicePaginaAtual + 1}`;
}

const menuToggle = document.getElementById('menuToggle');
const menuPrincipal = document.getElementById('menuPrincipal');
menuToggle.addEventListener('click', () => { 
    menuToggle.classList.toggle('active'); 
    menuPrincipal.classList.toggle('active'); 
});

document.getElementById('btnCalcular').addEventListener('click', () => {
    const hectares = parseFloat(document.getElementById('hectares').value);
    if (isNaN(hectares) || hectares <= 0) return;
    document.getElementById('textoResultado').innerHTML = `Simulação Pronta! Em <strong>${hectares} hectares</strong>, economiza-se <strong>${(hectares * 15000).toLocaleString('pt-BR')} litros</strong> de água por dia.`;
    document.getElementById('resultado').classList.remove('hidden');
});

const dadosQuiz = {
    pergunta: "Qual método assegura a longevidade ambiental e o ganho agrícola?",
    opcoes: ["A) Expansão de fronteiras com desmatamento.", "B) Monitoramento cirúrgico com sensores de precisão.", "C) Descontinuamento de toda tecnologia."],
    respostaCorreta: 1
};

function carregarQuiz() {
    document.getElementById('pergunta-quiz').innerText = dadosQuiz.pergunta;
    document.querySelectorAll('.btn-opcao').forEach((botao, idx) => botao.innerText = dadosQuiz.opcoes[idx]);
}

function verificarResposta(indice) {
    const fb = document.getElementById('feedback-quiz'); 
    fb.classList.remove('hidden');
    if (indice === dadosQuiz.respostaCorreta) { 
        fb.innerText = "🎉 Resposta Exata!"; 
        fb.className = "correto"; 
    } else { 
        fb.innerText = "❌ Alternativa Errada."; 
        fb.className = "errado"; 
    }
}

carregarQuiz();

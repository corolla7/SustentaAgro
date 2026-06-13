// =================================================================
// 1. CORREÇÃO DA ACESSIBILIDADE FLUTUANTE (ABRIR / FECHAR)
// =================================================================
const btnAbrirMenu = document.getElementById('btnAbrirMenu');
const painelAcessibilidade = document.getElementById('painelAcessibilidade');

btnAbrirMenu.addEventListener('click', (event) => {
    event.stopPropagation(); // Impede o clique de se propagar
    painelAcessibilidade.classList.toggle('hidden');
});

// Fecha o painel de acessibilidade se clicar em qualquer outro lugar da tela
document.addEventListener('click', () => {
    painelAcessibilidade.classList.add('hidden');
});
painelAcessibilidade.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita fechar ao usar as opções de dentro do painel
});


// =================================================================
// 2. SISTEMA VERTICAL REFORMADO (ACCORDION NATIVO)
// =================================================================
function toggleAccordion(headerObjeto) {
    const itemAtual = headerObjeto.parentElement;
    
    // Se quiser que apenas um painel abra por vez, descomente as linhas abaixo:
    // document.querySelectorAll('.accordion-item').forEach(item => {
    //    if(item !== itemAtual) item.classList.remove('ativo');
    // });

    itemAtual.classList.toggle('ativo');
}

// Controle do glossário interno dos painéis
function toggleGlossarioInterno(event, elemento) {
    event.stopPropagation(); // Evita interferir no fechamento do painel principal
    elemento.classList.toggle('ativo');
}


// =================================================================
// 3. CAROUSEL LOCAL DA HISTÓRIA EM QUANTINHOS (HQ)
// =================================================================
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


// =================================================================
// 4. MENU MOBILE, LEITURA DE VOZ E OUTRAS FUNÇÕES ADICIONAIS
// =================================================================
const menuToggle = document.getElementById('menuToggle');
const menuPrincipal = document.getElementById('menuPrincipal');
menuToggle.addEventListener('click', () => { menuToggle.classList.toggle('active'); menuPrincipal.classList.toggle('active'); });

let leituraVozHabilitada = false;
const btnToggleVoz = document.getElementById('btnToggleVoz');
btnToggleVoz.addEventListener('click', () => {
    leituraVozHabilitada = !leituraVozHabilitada;
    btnToggleVoz.innerText = leituraVozHabilitada ? "🔊 Leitura por Voz: LIGADA" : "🔊 Ativar Leitura por Voz";
    if (!leituraVozHabilitada) window.speechSynthesis.cancel();
});

function ouvirTextoExclusivo(idElemento) {
    window.speechSynthesis.cancel();
    const elemento = document.getElementById(idElemento);
    if (!elemento) return;
    const utterance = new SpeechSynthesisUtterance(elemento.innerText || elemento.textContent);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
}

document.getElementById('btnTema').addEventListener('click', () => {
    const temaTarget = document.documentElement.getAttribute('data-tema') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-tema', temaTarget);
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
    const fb = document.getElementById('feedback-quiz'); fb.classList.remove('hidden');
    if (indice === dadosQuiz.respostaCorreta) { fb.innerText = "🎉 Resposta Exata!"; fb.className = "correto"; } 
    else { fb.innerText = "❌ Alternativa Errada."; fb.className = "errado"; }
}
carregarQuiz();

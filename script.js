// =================================================================
// CONTROLE DO CAROUSEL LOCAL DA HISTÓRIA EM QUADRINHOS (HQ)
// =================================================================

// Lista ordenada das páginas presentes na sua pasta "imagens" do GitHub
const paginasHQ = [
    "imagens/hq_pagina1.png",
    "imagens/hq_pagina2.png",
    "imagens/hq_pagina3.png" // Adicione quantas páginas tiver na sua pasta
];

let indicePaginaAtual = 0;

function mudarPaginaHQ(direcao) {
    indicePaginaAtual += direcao;

    // Impede o usuário de ir além da primeira ou última página
    if (indicePaginaAtual < 0) {
        indicePaginaAtual = 0;
    } else if (indicePaginaAtual >= paginasHQ.length) {
        indicePaginaAtual = paginasHQ.length - 1;
    }

    // Atualiza a imagem no HTML e o contador visual
    document.getElementById("hqPagina").src = paginasHQ[indicePaginaAtual];
    document.getElementById("hqContador").innerText = `Pág. ${indicePaginaAtual + 1}`;
}

// O restante das funções das abas e acessibilidade continuam as mesmas do script anterior...
const triggersAba = document.querySelectorAll('.aba-trigger');
const conteudosAba = document.querySelectorAll('.aba-conteudo');
triggersAba.forEach(trigger => {
    trigger.addEventListener('click', () => {
        triggersAba.forEach(t => { t.classList.remove('ativa'); t.setAttribute('aria-selected', 'false'); });
        conteudosAba.forEach(c => c.classList.remove('ativa'));
        trigger.classList.add('ativa');
        trigger.setAttribute('aria-selected', 'true');
        const idAlvo = trigger.getAttribute('data-target');
        document.getElementById(idAlvo).classList.add('ativa');
    });
});
const menuToggle = document.getElementById('menuToggle');
const menuPrincipal = document.getElementById('menuPrincipal');
menuToggle.addEventListener('click', () => { menuToggle.classList.toggle('active'); menuPrincipal.classList.toggle('active'); });
document.querySelectorAll('.menu a').forEach(link => { link.addEventListener('click', () => { menuToggle.classList.remove('active'); menuPrincipal.classList.remove('active'); }); });
let leituraVozHabilitada = false;
const btnToggleVoz = document.getElementById('btnToggleVoz');
btnToggleVoz.addEventListener('click', () => {
    leituraVozHabilitada = !leituraVozHabilitada;
    if (leituraVozHabilitada) { btnToggleVoz.innerText = "🔊 Leitura por Voz: LIGADA"; } 
    else { btnToggleVoz.innerText = "🔊 Ativar Leitura por Voz"; window.speechSynthesis.cancel(); }
});
function ouvirTextoExclusivo(idElemento) {
    window.speechSynthesis.cancel();
    const elemento = document.getElementById(idElemento);
    if (!elemento) return;
    let textoLimpo = elemento.innerText || elemento.textContent;
    const utterance = new SpeechSynthesisUtterance(textoLimpo);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
}
const btnTema = document.getElementById('btnTema');
btnTema.addEventListener('click', () => {
    const temaTarget = document.documentElement.getAttribute('data-tema') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-tema', temaTarget);
});
function toggleGlossario(elemento) { elemento.classList.toggle('ativo'); }
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

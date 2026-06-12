// =================================================================
// 1. ENGINE INTERATIVO DAS ABAS (TABS) REMODELADAS
// =================================================================
const triggersAba = document.querySelectorAll('.aba-trigger');
const conteudosAba = document.querySelectorAll('.aba-conteudo');

triggersAba.forEach(trigger => {
    trigger.addEventListener('click', () => {
        // Remove estado ativo de todas as abas
        triggersAba.forEach(t => {
            t.classList.remove('ativa');
            t.setAttribute('aria-selected', 'false');
        });
        conteudosAba.forEach(c => c.classList.remove('ativa'));

        // Ativa a aba atual
        trigger.classList.add('ativa');
        trigger.setAttribute('aria-selected', 'true');
        const idAlvo = trigger.getAttribute('data-target');
        document.getElementById(idAlvo).classList.add('ativa');
    });
});

// Menu Hambúrguer Mobile Avançado
const menuToggle = document.getElementById('menuToggle');
const menuPrincipal = document.getElementById('menuPrincipal');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    menuPrincipal.classList.toggle('active');
});

// Fecha o menu automaticamente quando clicar em um link no celular
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuPrincipal.classList.remove('active');
    });
});

// =================================================================
// 2. SISTEMA DE LEITURA ACESSÍVEL POR VOZ
// =================================================================
let leituraVozHabilitada = false;
const btnToggleVoz = document.getElementById('btnToggleVoz');

btnToggleVoz.addEventListener('click', () => {
    leituraVozHabilitada = !leituraVozHabilitada;
    if (leituraVozHabilitada) {
        btnToggleVoz.classList.add('ativo');
        btnToggleVoz.innerText = "🔊 Leitura por Voz: LIGADA";
    } else {
        btnToggleVoz.classList.remove('ativo');
        btnToggleVoz.innerText = "🔊 Ativar Leitura por Voz";
        window.speechSynthesis.cancel();
    }
});

function ouvirTextoExclusivo(idElemento) {
    window.speechSynthesis.cancel();
    const elemento = document.getElementById(idElemento);
    if (!elemento) return;

    let textoLimpo = elemento.innerText || elemento.textContent;
    const utterance = new SpeechSynthesisUtterance(textoLimpo);
    
    const vozes = window.speechSynthesis.getVoices();
    let vozSelecionada = vozes.find(v => v.lang === 'pt-BR' && (v.name.includes('Google') || v.name.includes('Natural')));
    
    if (!vozSelecionada) vozSelecionada = vozes.find(v => v.lang === 'pt-BR');
    if (vozSelecionada) utterance.voice = vozSelecionada;

    utterance.lang = 'pt-BR';
    utterance.rate = 0.92;

    elemento.classList.add('foco-leitura-ativo');
    utterance.onend = () => elemento.classList.remove('foco-leitura-ativo');

    window.speechSynthesis.speak(utterance);
}

// =================================================================
// 3. ENGINES AUXILIARES (TEMA, SIMULADOR, GLOSSÁRIO E QUIZ)
// =================================================================
const btnTema = document.getElementById('btnTema');
btnTema.addEventListener('click', () => {
    const temaTarget = document.documentElement.getAttribute('data-tema') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-tema', temaTarget);
});

function toggleGlossario(elemento) {
    elemento.classList.toggle('ativo');
}

// Controle do Widget de Acessibilidade
const btnAbrirMenu = document.getElementById('btnAbrirMenu');
const painelAcessibilidade = document.getElementById('painelAcessibilidade');

btnAbrirMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    const visivel = painelAcessibilidade.classList.toggle('hidden');
    btnAbrirMenu.setAttribute('aria-expanded', !visivel);
});

document.addEventListener('click', (e) => {
    if (!painelAcessibilidade.contains(e.target) && e.target !== btnAbrirMenu) {
        painelAcessibilidade.classList.add('hidden');
        btnAbrirMenu.setAttribute('aria-expanded', 'false');
    }
});

// Gerenciador de Fontes (REM)
let escalaFonteAtual = 100;
const atualizarTamanhoFonte = () => document.documentElement.style.fontSize = `${escalaFonteAtual}%`;

document.getElementById('btnAumentarTexto').addEventListener('click', () => { if (escalaFonteAtual < 130) { escalaFonteAtual += 10; atualizarTamanhoFonte(); } });
document.getElementById('btnDiminuirTexto').addEventListener('click', () => { if (escalaFonteAtual > 90) { escalaFonteAtual -= 10; atualizarTamanhoFonte(); } });
document.getElementById('btnResetTexto').addEventListener('click', () => { escalaFonteAtual = 100; atualizarTamanhoFonte(); });

// Simulador Hídrico
document.getElementById('btnCalcular').addEventListener('click', () => {
    const hectares = parseFloat(document.getElementById('hectares').value);
    if (isNaN(hectares) || hectares <= 0) return;
    const litros = hectares * 15000;
    document.getElementById('textoResultado').innerHTML = `Simulação Pronta! Em <strong>${hectares} hectares</strong>, a engenharia de precisão economiza <strong>${litros.toLocaleString('pt-BR')} litros</strong> de água por dia.`;
    document.getElementById('resultado').classList.remove('hidden');
});

// Quiz Engine
const dadosQuiz = {
    pergunta: "Em consonância com as metas do IBGE e ODS de sustentabilidade, qual método assegura a longevidade ambiental e o ganho agrícola?",
    opcoes: [
        "A) Expansão de fronteiras com base em desmatamento preventivo.",
        "B) Monitoramento cirúrgico de lavouras através de sensores de precisão e gotejamento sustentável.",
        "C) Cessão total e descontinuamento imediato de toda tecnologia ou maquinário do ecossistema de campo."
    ],
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
        fb.innerText = "🎉 Resposta Exata! A integração de tecnologia preserva ecossistemas sem comprometer o abastecimento.";
        fb.className = "correto";
    } else {
        fb.innerText = "❌ Alternativa Errada. O foco é unir evolução digital à conservação ambiental.";
        fb.className = "errado";
    }
}
carregarQuiz();

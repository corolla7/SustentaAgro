// =================================================================
// 1. ENGINE DE AUDIOVISUAL INTERNO - VOZ NATURAL MELHORADA
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
    executarSintetizadorHumano(idElemento);
}

function executarSintetizadorHumano(idElemento) {
    window.speechSynthesis.cancel();

    const elemento = document.getElementById(idElemento);
    if (!elemento) return;

    let textoLimpo = elemento.innerText || elemento.textContent;
    const utterance = new SpeechSynthesisUtterance(textoLimpo);
    
    // Força a varredura profunda pelas vozes nativas de alta performance brasileiras
    const vozes = window.speechSynthesis.getVoices();
    let vozSelecionada = vozes.find(v => v.lang === 'pt-BR' && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Microsoft')));
    
    if (!vozSelecionada) {
        vozSelecionada = vozes.find(v => v.lang === 'pt-BR' || v.lang.includes('pt'));
    }

    if (vozSelecionada) utterance.voice = vozSelecionada;

    utterance.lang = 'pt-BR';
    utterance.rate = 0.90;  // Velocidade cadenciada humana
    utterance.pitch = 1.0; 

    elemento.classList.add('foco-leitura-ativo');

    utterance.onend = () => {
        elemento.classList.remove('foco-leitura-ativo');
    };

    window.speechSynthesis.speak(utterance);
}

if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// =================================================================
// 2. CONTROLE FLUIDO DE FONTE (MÉTODO REM SEGURO)
// =================================================================
let escalaFonteAtual = 100; 

const atualizarTamanhoFonte = () => {
    document.documentElement.style.fontSize = `${escalaFonteAtual}%`;
};

document.getElementById('btnAumentarTexto').addEventListener('click', () => {
    if (escalaFonteAtual < 140) { 
        escalaFonteAtual += 10;
        atualizarTamanhoFonte();
    }
});

document.getElementById('btnDiminuirTexto').addEventListener('click', () => {
    if (escalaFonteAtual > 85) { 
        escalaFonteAtual -= 10;
        atualizarTamanhoFonte();
    }
});

document.getElementById('btnResetTexto').addEventListener('click', () => {
    escalaFonteAtual = 100;
    atualizarTamanhoFonte();
});

// =================================================================
// 3. WIDGET FLUTUANTE BEHAVIOR
// =================================================================
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

// =================================================================
// 4. MOTOR DO GLOSSÁRIO, TEMAS E SIMULADORES
// =================================================================
function toggleGlossario(elemento) {
    document.querySelectorAll('.glossario-item').forEach(item => {
        if(item !== elemento) item.classList.remove('ativo');
    });
    elemento.classList.toggle('ativo');
}

const elementosParaAnimar = document.querySelectorAll('.animar-subir');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visivel');
    });
}, { threshold: 0.1 });

elementosParaAnimar.forEach(el => scrollObserver.observe(el));
document.querySelector('.hero-conteudo').classList.add('visivel');

// Gerenciamento Estável de Temas
const btnTema = document.getElementById('btnTema');
btnTema.addEventListener('click', () => {
    const temaTarget = document.documentElement.getAttribute('data-tema') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-tema', temaTarget);
});

document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('menuPrincipal').classList.toggle('active');
});

document.getElementById('btnCalcular').addEventListener('click', () => {
    const hectares = parseFloat(document.getElementById('hectares').value);
    if (isNaN(hectares) || hectares <= 0) return;
    const litros = hectares * 15000;
    document.getElementById('textoResultado').innerHTML = `Simulação Completa! Em <strong>${hectares} hectares</strong>, a engenharia de gotejamento gera economia de até <strong>${litros.toLocaleString('pt-BR')} litros</strong> diários.`;
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

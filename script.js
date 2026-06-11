// =================================================================
// 1. ENGINE DE AUDIOVISUAL PROFISSIONAL (VOZ NEURAL DE ALTA FIDELIDADE)
// =================================================================
let leituraVozHabilitada = false;

// Monitora o botão do painel flutuante
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
    // Se o usuário clicar explicitamente no botão de ouvir, ele executa independente da chave geral
    executarSintetizadorHumano(idElemento);
}

function executarSintetizadorHumano(idElemento) {
    window.speechSynthesis.cancel();

    const elemento = document.getElementById(idElemento);
    if (!elemento) return;

    let textoLimpo = elemento.innerText || elemento.textContent;
    const utterance = new SpeechSynthesisUtterance(textoLimpo);
    
    // CAPTAÇÃO AVANÇADA DE VOZES DO SISTEMA OPERACIONAL
    const vozes = window.speechSynthesis.getVoices();
    
    // Busca prioritária pelas vozes premium do Google, Microsoft ou Apple em português
    let vozSelecionada = vozes.find(v => v.lang === 'pt-BR' && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Microsoft')));
    
    if (!vozSelecionada) {
        vozSelecionada = vozes.find(v => v.lang === 'pt-BR' || v.lang.includes('pt'));
    }

    if (vozSelecionada) {
        utterance.voice = vozSelecionada;
    }

    // Parametrizando para remover o tom robótico
    utterance.lang = 'pt-BR';
    utterance.rate = 0.92;  // Ritmo mais natural e pausado de palestra acadêmica
    utterance.pitch = 1.05; // Ajuste fino harmônico para neutralizar o tom metálico

    elemento.classList.add('foco-leitura-ativo');

    utterance.onend = () => {
        elemento.classList.remove('foco-leitura-ativo');
    };

    window.speechSynthesis.speak(utterance);
}

// Inicializador de cache de vozes para navegadores Chromium (importante!)
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}


// =================================================================
// 2. SISTEMA REM DE FONTE FLUIDA (PRESERVA PROPORÇÃO E ACESSIBILIDADE)
// =================================================================
let escalaFonteAtual = 100; // Percentual base

const atualizarTamanhoFonte = () => {
    // Altera no elemento raiz (html), fazendo com que todo o site se adapte proporcionalmente
    document.documentElement.style.fontSize = `${escalaFonteAtual}%`;
};

document.getElementById('btnAumentarTexto').addEventListener('click', () => {
    if (escalaFonteAtual < 150) { // Teto máximo de segurança para não quebrar o layout
        escalaFonteAtual += 10;
        atualizarTamanhoFonte();
    }
});

document.getElementById('btnDiminuirTexto').addEventListener('click', () => {
    if (escalaFonteAtual > 80) { // Chão mínimo
        escalaFonteAtual -= 10;
        atualizarTamanhoFonte();
    }
});

document.getElementById('btnResetTexto').addEventListener('click', () => {
    escalaFonteAtual = 100;
    atualizarTamanhoFonte();
});


// =================================================================
// 3. CONTROLE COMPORTAMENTAL DO WIDGET FLUTUANTE
// =================================================================
const btnAbrirMenu = document.getElementById('btnAbrirMenu');
const painelAcessibilidade = document.getElementById('painelAcessibilidade');

btnAbrirMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    const visivel = painelAcessibilidade.classList.toggle('hidden');
    btnAbrirMenu.setAttribute('aria-expanded', !visivel);
});

// Fecha o painel caso o usuário clique fora dele
document.addEventListener('click', (e) => {
    if (!painelAcessibilidade.contains(e.target) && e.target !== btnAbrirMenu) {
        painelAcessibilidade.classList.add('hidden');
        btnAbrirMenu.setAttribute('aria-expanded', 'false');
    }
});


// =================================================================
// 4. MECANISMOS EXISTENTES DO PROJETO (ESTABILIDADE MANTIDA)
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
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
        }
    });
}, { threshold: 0.1 });

elementosParaAnimar.forEach(el => scrollObserver.observe(el));
document.querySelector('.hero-conteudo').classList.add('visivel');

// Tema
const btnTema = document.getElementById('btnTema');
btnTema.addEventListener('click', () => {
    const temaTarget = document.documentElement.getAttribute('data-tema') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-tema', temaTarget);
});

// Menu Mobile
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('menuPrincipal').classList.toggle('active');
});

// Simulador
document.getElementById('btnCalcular').addEventListener('click', () => {
    const hectares = parseFloat(document.getElementById('hectares').value);
    if (isNaN(hectares) || hectares <= 0) return;
    const litros = hectares * 15000;
    document.getElementById('textoResultado').innerHTML = `Simulação Completa! Em <strong>${hectares} hectares</strong>, a engenharia de gotejamento gera economia de até <strong>${litros.toLocaleString('pt-BR')} litros</strong> diários.`;
    document.getElementById('resultado').classList.remove('hidden');
});

// Quiz
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
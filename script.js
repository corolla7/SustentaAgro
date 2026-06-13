document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. MENU MOBILE (HAMBÚRGUER)
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const menuPrincipal = document.getElementById('menuPrincipal');
    
    if (menuToggle && menuPrincipal) {
        menuToggle.addEventListener('click', () => { 
            menuToggle.classList.toggle('active'); 
            menuPrincipal.classList.toggle('active'); 
        });
    }

    // ==========================================
    // 2. CARROSSEL RESPONSIVO (DESLOCAMENTO CORRIGIDO)
    // ==========================================
    const trilho = document.getElementById('trilhoCarrossel');
    const slides = document.querySelectorAll('.carrossel-slide');
    const containerIndicadores = document.getElementById('indicadoresCarrossel');
    
    let slideIndice = 0;
    const totalSlides = slides.length;
    let intervaloCarrossel;

    if (trilho && containerIndicadores && totalSlides > 0) {
        containerIndicadores.innerHTML = ""; 

        // Cria os pontinhos indicadores na tela
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('indicador');
            if (idx === 0) dot.classList.add('ativo');
            dot.addEventListener('click', () => {
                irParaSlide(idx);
                reiniciarAutoplay();
            });
            containerIndicadores.appendChild(dot);
        });

        const listaIndicadores = containerIndicadores.querySelectorAll('.indicador');

        function atualizarIndicadores() {
            listaIndicadores.forEach((dot, idx) => {
                if (idx === slideIndice) {
                    dot.classList.add('ativo');
                } else {
                    dot.classList.remove('ativo');
                }
            });
        }

        // A CORREÇÃO ESTÁ AQUI: move exatamente 100% puro por imagem para alinhar na tela
        function irParaSlide(indice) {
            slideIndice = indice;
            trilho.style.transform = `translateX(-${slideIndice * 100}%)`;
            atualizarIndicadores();
        }

        function proximoSlideAutomatico() {
            slideIndice = (slideIndice + 1) % totalSlides;
            irParaSlide(slideIndice);
        }

        function iniciarAutoplay() {
            intervaloCarrossel = setInterval(proximoSlideAutomatico, 4000);
        }

        function reiniciarAutoplay() {
            clearInterval(intervaloCarrossel);
            iniciarAutoplay();
        }

        // Inicializa o carrossel na primeira imagem corretamente
        irParaSlide(0);
        iniciarAutoplay();
    }

    // ==========================================
    // 3. PAINÉIS ACCORDION (BOTÕES DESTRANCADOS)
    // ==========================================
    window.toggleAccordion = function(headerObjeto) {
        const itemAtual = headerObjeto.parentElement;
        itemAtual.classList.toggle('ativo');
    };

    // ==========================================
    // 4. GLOSSÁRIO INTERNO
    // ==========================================
    window.toggleGlossarioInterno = function(event, elemento) {
        event.stopPropagation();
        elemento.classList.toggle('ativo');
    };

    // ==========================================
    // 5. WIDGET DE ACESSIBILIDADE FLUTUANTE
    // ==========================================
    const btnAbrirMenu = document.getElementById('btnAbrirMenu');
    const painelAcessibilidade = document.getElementById('painelAcessibilidade');

    if (btnAbrirMenu && painelAcessibilidade) {
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
    }

    // Controles de Fonte do Texto
    let tamanhoAtualFonte = 100;
    const btnAumentar = document.getElementById('btnAumentarTexto');
    const btnDiminuir = document.getElementById('btnDiminuirTexto');
    const btnReset = document.getElementById('btnResetTexto');

    if (btnAumentar) {
        btnAumentar.addEventListener('click', () => {
            if (tamanhoAtualFonte < 140) {
                tamanhoAtualFonte += 10;
                document.documentElement.style.setProperty('--tamanho-base', `${tamanhoAtualFonte / 100}rem`);
            }
        });
    }

    if (btnDiminuir) {
        btnDiminuir.addEventListener('click', () => {
            if (tamanhoAtualFonte > 80) {
                tamanhoAtualFonte -= 10;
                document.documentElement.style.setProperty('--tamanho-base', `${tamanhoAtualFonte / 100}rem`);
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            tamanhoAtualFonte = 100;
            document.documentElement.style.setProperty('--tamanho-base', '1rem');
        });
    }

    // Modo Alto Contraste
    const btnTema = document.getElementById('btnTema');
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const temaAtual = document.documentElement.getAttribute('data-tema');
            if (temaAtual === 'dark') {
                document.documentElement.removeAttribute('data-tema');
            } else {
                document.documentElement.setAttribute('data-tema', 'dark');
            }
        });
    }

    // Leitura de Voz por API Nativa
    let leituraVozHabilitada = false;
    const btnToggleVoz = document.getElementById('btnToggleVoz');

    if (btnToggleVoz) {
        btnToggleVoz.addEventListener('click', () => {
            leituraVozHabilitada = !leituraVozHabilitada;
            btnToggleVoz.innerText = leituraVozHabilitada ? "🔊 Leitura por Voz: LIGADA" : "🔊 Ativar Leitura por Voz";
            if (!leituraVozHabilitada) {
                window.speechSynthesis.cancel();
                removerFocosLeitura();
            }
        });
    }

    function removerFocosLeitura() {
        document.querySelectorAll('.leitura-foco').forEach(el => el.classList.remove('leitura-foco'));
    }

    function falarTexto(texto) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        window.speechSynthesis.speak(utterance);
    }

    document.querySelectorAll('.texto-acessivel').forEach(elemento => {
        const dispararLeitura = () => {
            if (!leituraVozHabilitada) return;
            removerFocosLeitura();
            elemento.classList.add('leitura-foco');
            falarTexto(elemento.innerText || elemento.textContent);
        };
        elemento.addEventListener('mouseenter', dispararLeitura);
        elemento.addEventListener('click', dispararLeitura);
    });

    window.ouvirTextoExclusivo = function(idElemento) {
        const elemento = document.getElementById(idElemento);
        if (!elemento) return;
        falarTexto(elemento.innerText || elemento.textContent);
    };

    // ==========================================
    // 6. SIMULADOR HÍDRICO
    // ==========================================
    const btnCalcular = document.getElementById('btnCalcular');
    if (btnCalcular) {
        btnCalcular.addEventListener('click', () => {
            const inputHectares = document.getElementById('hectares');
            const resultadoBox = document.getElementById('resultado');
            const textoResultado = document.getElementById('textoResultado');

            if (inputHectares && inputHectares.value > 0) {
                const hectares = parseFloat(inputHectares.value);
                const economiaAgua = hectares * 15000;
                textoResultado.innerHTML = `Simulação Pronta! Em <strong>${hectares} hectares</strong>, economiza-se aproximadamente <strong>${economiaAgua.toLocaleString('pt-BR')} litros</strong> de água por ciclo usando gotejamento inteligente.`;
                resultadoBox.classList.remove('hidden');
            }
        });
    }

    // ==========================================
    // 7. QUIZ INTERATIVO AGRINHO
    // ==========================================
    const dadosQuiz = {
        pergunta: "Qual método assegura a longevidade ambiental e o ganho agrícola?",
        opcoes: ["A) Expansão de fronteiras com desmatamento.", "B) Monitoramento cirúrgico com sensores de precisão.", "C) Descontinuamento de toda tecnologia."],
        respostaCorreta: 1
    };

    function carregarQuiz() {
        const pQuiz = document.getElementById('pergunta-quiz');
        const botoesOpcao = document.querySelectorAll('.btn-opcao');

        if (pQuiz) pQuiz.innerText = dadosQuiz.pergunta;
        botoesOpcao.forEach((botao, idx) => {
            if(dadosQuiz.opcoes[idx]) {
                botao.innerText = dadosQuiz.opcoes[idx];
            }
        });
    }

    window.verificarResposta = function(indice) {
        const fb = document.getElementById('feedback-quiz'); 
        if(!fb) return;
        fb.classList.remove('hidden');
        if (indice === dadosQuiz.respostaCorreta) { 
            fb.innerText = "🎉 Resposta Exata!"; 
            fb.className = "correto"; 
        } else { 
            fb.innerText = "❌ Alternativa Errada."; 
            fb.className = "errado"; 
        }
    };

    carregarQuiz();
});

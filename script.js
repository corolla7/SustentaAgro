document.addEventListener("DOMContentLoaded", function() {
    
    const menuToggle = document.getElementById('menuToggle');
    const menuPrincipal = document.getElementById('menuPrincipal');
    
    if (menuToggle && menuPrincipal) {
        menuToggle.addEventListener('click', () => { 
            menuToggle.classList.toggle('active'); 
            menuPrincipal.classList.toggle('active'); 
        });
    }

    const trilho = document.getElementById('trilhoCarrossel');
    const slides = document.querySelectorAll('.carrossel-slide');
    const containerIndicadores = document.getElementById('indicadoresCarrossel');
    
    let slideIndice = 0;
    const totalSlides = slides.length;
    let intervaloCarrossel;

    if (trilho && containerIndicadores && totalSlides > 0) {
        containerIndicadores.innerHTML = ""; 

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

        iniciarAutoplay();
    }

    const btnAbrirMenu = document.getElementById('btnAbrirMenu') || document.querySelector('.btn-floating-acessibilidade');
    const painelAcessibilidade = document.getElementById('painelAcessibilidade') || document.querySelector('.menu-acessibilidade-painel');

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

    let tamanhoAtualFonte = 100;
    const btnAumentar = document.getElementById('btnAumentarTexto') || document.getElementById('btnaumentar-fonte');
    const btnDiminuir = document.getElementById('btnDiminuirTexto') || document.getElementById('btndiminuir-fonte');
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

    const btnTema = document.getElementById('btnTema') || document.getElementById('btn-alternar-tema');
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const temaAtual = document.documentElement.getAttribute('data-tema');
            if (temaAtual === 'dark') {
                document.documentElement.removeAttribute('data-tema');
                if(btnTema.tagName === "BUTTON") btnTema.textContent = "Alternar para Modo Escuro";
            } else {
                document.documentElement.setAttribute('data-tema', 'dark');
                if(btnTema.tagName === "BUTTON") btnTema.textContent = "Alternar para Modo Claro";
            }
        });
    }

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

    window.ouvirTextoExclusivo = function(idElemento) {
        const elemento = document.getElementById(idElemento);
        if (!elemento) return;
        falarTexto(elemento.innerText || elemento.textContent);
    };

    window.toggleAccordion = function(headerObjeto) {
        const itemAtual = headerObjeto.parentElement;
        itemAtual.classList.toggle('ativo');
    };

    window.toggleGlossarioInterno = function(event, elemento) {
        event.stopPropagation();
        elemento.classList.toggle('ativo');
    };

    const accordionHeadersOld = document.querySelectorAll(".accordion-header");
    accordionHeadersOld.forEach(header => {
        header.addEventListener("click", function() {
            const item = this.parentElement;
            item.classList.toggle("ativo");
        });
    });

    const glossarioItemsOld = document.querySelectorAll(".glossario-item");
    glossarioItemsOld.forEach(item => {
        item.addEventListener("click", function() {
            this.classList.toggle("ativo");
        });
    });

    const btnCalcular = document.getElementById('btnCalcular') || document.querySelector(".botao-formulario");
    if (btnCalcular) {
        btnCalcular.addEventListener('click', () => {
            const inputHectares = document.getElementById('hectares') || document.querySelector("input[type='number']");
            const resultadoBox = document.getElementById('resultado') || document.querySelector(".resultado-box");
            const textoResultado = document.getElementById('textoResultado') || resultadoBox;

            if (inputHectares && inputHectares.value > 0) {
                const hectares = parseFloat(inputHectares.value);
                const economiaAgua = hectares * 15000;
                textoResultado.innerHTML = `Simulação Pronta! Em <strong>${hectares} hectares</strong>, economiza-se aproximadamente <strong>${economiaAgua.toLocaleString('pt-BR')} litros</strong> de água por ciclo usando gotejamento inteligente.`;
                resultadoBox.classList.remove('hidden');
            }
        });
    }

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
            botao.setAttribute('data-index', idx);
        });
    }

    window.verificarResposta = function(indice) {
        const fb = document.getElementById('feedback-quiz') || document.querySelector(".feedback-quiz"); 
        if(!fb) return;
        fb.classList.remove('hidden');
        if (indice === dadosQuiz.respostaCorreta) { 
            fb.innerText = "🎉 Resposta Exata!"; 
            fb.className = "feedback-quiz correto"; 
        } else { 
            fb.innerText = "❌ Alternativa Errada."; 
            fb.className = "feedback-quiz errado"; 
        }
    };

    const botoesOpcaoQuiz = document.querySelectorAll(".btn-opcao");
    botoesOpcaoQuiz.forEach(botao => {
        botao.addEventListener("click", function() {
            const idxAttr = this.getAttribute('data-index');
            const idx = idxAttr !== null ? parseInt(idxAttr) : Array.from(this.parentNode.children).indexOf(this);
            verificarResposta(idx);
        });
    });

    carregarQuiz();
});

# 🌾 SustentaAgro

> Projeto focado em tecnologia e sustentabilidade no campo para o **Concurso Agrinho 2026**, desenvolvido em parceria com os conteúdos da **Alura**.

O **SustentaAgro** é uma aplicação web interativa projetada para conscientizar estudantes, produtores rurais e a comunidade sobre a importância da agricultura de precisão e das práticas sustentáveis no Paraná, alinhando a alta produtividade às metas globais da ONU.

---

## 🚀 Funcionalidades Principais

* **Acessibilidade Digital Universal:** Um widget flutuante moderno (com ícone universal inclusivo) que oferece:
    * Sintetizador de voz neural humano (removendo o tom robótico).
    * Ajuste fluído de fonte (método REM seguro que não quebra o layout).
    * Contraste de cores inteligente.
* **Simulador de Economia Hídrica:** Ferramenta interativa que calcula a economia diária de água ao adotar o gotejamento inteligente com base na área inserida.
* **Glossário Acadêmico:** Painel interativo estilo *accordion* para explicar termos complexos como ESG, Crédito de Carbono e Agricultura de Precisão.
* **Estatísticas Visuais:** Gráficos responsivos criados puramente com CSS que traduzem os dados reais do Censo Agropecuário do IBGE no Paraná.
* **Gamificação (Desafio Quiz):** Um quiz interativo para testar os conhecimentos adquiridos sobre sustentabilidade e ODS.

---

## 🎨 Identidade Visual e Cores

O projeto utiliza uma paleta de cores moderna extraída diretamente do *Coolors*, focada na estética do agro sustentável e otimizada para o Modo Claro e Modo Escuro:

| Cor | Código Hex | Função no Sistema |
| :--- | :--- | :--- |
| **Evergreen** | `#19381F` | Cor primária, cabeçalho e elementos principais |
| **Bright Lemon** | `#EEE82C` | Destaques, botões de ação e foco |
| **Yellow Green** | `#91CB3E` | Barras de progresso e transições de hover |
| **Medium Jungle** | `#53A548` | Elementos de suporte e bordas ativas |
| **Sea Green** | `#4C934C` | Divisores e fundos suaves |

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web puras (Vanilla), priorizando performance e leveza:

* **HTML5:** Estruturação semântica e tags de acessibilidade ARIA.
* **CSS3:** Layouts modernos com *Grid* e *Flexbox*, além de variáveis CSS (`:root`) para controle do tema escuro.
* **JavaScript (ES6):** Manipulação dinâmica do DOM, API de Síntese de Voz (`SpeechSynthesis`) e lógica de cálculo do simulador.

---

## 📂 Estrutura do Repositório

```text
├── index.html          # Página principal com a estrutura semântica do projeto
├── style.css           # Estilizações gerais, responsividade e variáveis de tema
├── script.js           # Mecanismos de acessibilidade, quiz, simulador e animações
└── README.md           # Documentação oficial do projeto

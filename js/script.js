$(document).ready(function() {
  var questions = [
    {
      question: "Qual é a melhor forma de economizar energia em casa?",
      options: [
        "Deixar as luzes acesas o tempo todo",
        "Desligar os aparelhos eletrônicos quando não estiverem em uso",
        "Tomar banhos demorados",
        "Deixar a torneira aberta enquanto escova os dentes"
      ],
      answer: 1
    },
    {
      question: "Qual das opções abaixo é uma forma de reduzir o consumo de água?",
      options: [
        "Lavar o carro com uma mangueira sem controle de vazão",
        "utilizar a máquina de lavar roupas no máximo em toda lavagem",
        "Deixar a torneira aberta enquanto ensaboa as mãos",
        "Regar as plantas no horário mais quente do dia"
      ],
      answer: 1
    },
    {
      question: "Qual das opções a seguir é uma prática de consumo sustentável?",
      options: [
        "Comprar produtos descartáveis em embalagens individuais",
        "Reutilizar sacolas plásticas em todas as compras",
        "Optar por produtos feitos com materiais reciclados",
        "Descartar todos os resíduos no lixo comum"
      ],
      answer: 2
    },
    {
      question: "Qual das seguintes ações ajuda a reduzir a emissão de gases de efeito estufa?",
      options: [
        "Andar de carro sozinho em todos os deslocamentos",
        "Utilizar o transporte público ou compartilhado sempre que possível",
        "Deixar o ar-condicionado ligado o tempo todo",
        "Utilizar energia gerada a partir de combustíveis fósseis"
      ],
      answer: 1
    },
    {
      question: "O que significa a sigla '3R' em relação à sustentabilidade?",
      options: [
        "Reabastecer, Reparar, Renovar",
        "Reduzir, Reutilizar, Reciclar",
        "Replantar, Reflorestar, Restaurar",
        "Remover, Recuperar, Resgatar"
      ],
      answer: 1
    },
    {
      question: "Qual é a importância da compostagem na redução de resíduos?",
      options: [
        "Ajuda a aumentar a produção de resíduos",
        "Contribui para a poluição do solo e da água",
        "Permite o reaproveitamento de resíduos orgânicos",
        "Não tem nenhum benefício para o meio ambiente"
      ],
      answer: 2
    },
    {
      question: "Qual é a principal vantagem do uso de energia solar?",
      options: [
        "Ela é mais barata do que outras formas de energia",
        "Não gera nenhum tipo de impacto ambiental",
        "Depende exclusivamente das condições climáticas",
        "É uma fonte de energia limitada e não renovável"
      ],
      answer: 1
    }
  ];

  var currentQuestion = 0;
  var score = 0;

  function displayQuestion() {
    var questionObj = questions[currentQuestion];
    $("#question").text(questionObj.question);
    var options = questionObj.options;
    var optionsContainer = $("#options");
    optionsContainer.empty();
    for (var i = 0; i < options.length; i++) {
      var option = $("<button>")
        .text(options[i])
        .addClass("btn btn-primary option")
        .data("option-index", i)
        .click(submitAnswer);
      optionsContainer.append(option);
    }
  }

  function submitAnswer() {
    var selectedOptionIndex = $(this).data("option-index");
    var questionObj = questions[currentQuestion];
    if (selectedOptionIndex === questionObj.answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }

  function displayResult() {
    $("#quiz-container").hide();
    var resultText = "Você respondeu corretamente " + score + " de " + questions.length + " perguntas.";
    $("#result-container").text(resultText);

    if (score <= 3) {
      var redirectMessage = "Infelizmente você não acertou o total recomendado, estaremos redirecionando para a página de dicas para melhor entendimento sobre o assunto.";
      $("#result-container").append("<br>" + redirectMessage);

      // Exibir pop-up antes do redirecionamento
      var confirmation = confirm(redirectMessage);
      if (confirmation) {
        window.location.href = "dicas.html";
      }
    } else if (score >= 4 && score <= 6) {
      var successMessage = "Está no caminho para ser o mestre ecológico, continue nesse caminho :D";
      $("#result-container").append("<br>" + successMessage);

      // Exibir pop-up
      alert(successMessage);
    } else if (score === 7) {
      var masterMessage = "Você se tornou um mestre no quesito ajudar o planeta, prossiga nesse caminho para ajudar nossas futuras gerações.";
      $("#result-container").append("<br>" + masterMessage);

      // Exibir pop-up
      alert(masterMessage);
    }
  }
  

  displayQuestion();
});

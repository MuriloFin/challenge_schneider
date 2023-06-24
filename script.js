function calcularPontuacao() {
    var pontos = 0;
    var radios = document.querySelectorAll('input[type="radio"]:checked');

    for (var i = 0; i < radios.length; i++) {
      if (radios[i].value === 'Sim') {
        pontos += 100;
      }
    }
    if (pontos >= 300){
        alert("Parabéns! Você está contribuindo para um mundo mais sustentável!");
    }else{
        alert("Confira a aba de Dicas para se tornar mais sustentável, e ajudar o mundo!")
    }
}
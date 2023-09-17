document.addEventListener("DOMContentLoaded", function () {
    const btnCalcular = document.getElementById("btn_simulator");
    
    

    btnCalcular.addEventListener("click", function (event) {
      const inputEnergyMonth = document.querySelectorAll(".input_energy_mounth");
      const selectedRadio = document.querySelector("input[name='tipo']:checked");
      console.log(inputEnergyMonth[0].value);

      const energyValues = [];

      inputEnergyMonth.forEach(function (input) {
        energyValues.push(parseFloat(input.value) || 0);
      });

      const sumEnergy = energyValues.reduce((acum, valor) => acum+valor, 0)
      const average = sumEnergy/energyValues.length;
      
      

      const radioValue = selectedRadio ? selectedRadio.value : "Residencial";

      console.log(energyValues);
      console.log(radioValue);
      const resultado = calcularResultado(radioValue, average);
      exibirResultado(resultado);
    });

    function calcularResultado(radioValue, avg) {
        const irradiacao = 4.33;
    const area = 2.5;
    const rendimento_por_m2 = 0.165
    const string_box = 1300;
    const eng_value = 4200;
    const micro_inversor = 2600; 
    const cabeamento = 240;
    const struct = 740;
    const taxs = 476;

      
  
      let epd = irradiacao * area * rendimento_por_m2;
      epd = epd * 0.8;

      const qnt_modules = avg/epd;

      const value_material = micro_inversor+cabeamento+struct+string_box+(qnt_modules*800);
      const values_extras = eng_value+taxs;
      const value_project = (qnt_modules*800)+eng_value+micro_inversor+cabeamento+struct+string_box+taxs;

      const tipoProjeto = radioValue;
      return { qnt_modules, tipoProjeto, value_project, value_material,  values_extras};
    }

    
    function exibirResultado(resultado) {
            const spanResultadoTipoProjeto = document.getElementById("span_result_1");
            const spanResultadoQuantidadePaineis = document.getElementById("span_result_2");
            const spanResultadoValueMaterial = document.getElementById("span_result_3");
            const spanResultadoValuesExtras = document.getElementById("span_result_4");
            const spanResultadoValueProject = document.getElementById("span_result_5");
        
            spanResultadoTipoProjeto.textContent = `Tipo de projeto: ${resultado.tipoProjeto}`;
            spanResultadoQuantidadePaineis.textContent = `Quantos painéis fotovoltaicos: ${resultado.qnt_modules.toFixed(2)}`;
            spanResultadoValueMaterial.textContent = `Custo de material: R$ ${resultado.value_material.toFixed(2)}`;
            spanResultadoValuesExtras.textContent = `Custo de projeto: R$ ${resultado.values_extras.toFixed(2)}`;
            spanResultadoValueProject.textContent = `Custo total: R$: ${resultado.value_project.toFixed(2)}`;
    }
    
});

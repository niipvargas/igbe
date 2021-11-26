var dados = [];

function BuscarDados() {
  dados = [['Década', 'Frequência']];
  var nome = document.getElementById("nome").value;
  axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}`)
  .then(response => {
    response.data[0].res.forEach(decada => {
      dados.push([
        decada.periodo.replaceAll("[","").replace(","," - "),
        decada.frequencia
      ])

      google.charts.load("current", {packages: ["corechart"]})
      google.charts.setOnLoadCallback(DesenharGrafico)
    });

  })
  .catch(error => {
    document.getElementById('grafico').innerHTML = "<center><h1>Não foi encontrado nada</h1></center>"
  })

}

function DesenharGrafico(){
  var dadosFormatados = google.visualization.arrayToDataTable(dados)

  var opcao = { 
    hAxis: { title: 'Nome ao longo das Décadas', titleTextStyle: { color: '#333' } },
    vAxis: { minValue: 100}
  }

  var grafico = new google.visualization.AreaChart(document.getElementById("grafico"))
  grafico.draw(dadosFormatados, opcao)
}
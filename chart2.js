fetch("https://api.covid19api.com/dayone/country/brazil/status/confirmed")
  .then((response) => response.json())
  .then((data) => {
    let Infeccoes = data.map((f) => f.Cases);
    let Datas = data.map((f) => new Date(f.Date).getTime()); 

    for (let i = 0; i < Infeccoes.length; i++) { 
      console.log(Infeccoes[i]);
    }

    var options = {
      series: [
        {
          name: "CASOS CONFIRMADOS",
          data: Infeccoes
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: {
        text: "Evolução das infecções por COVID 19 no Brasil",
        align: "left"
      },
      subtitle: { text: "Casos confirmados", align: "left" },
      labels: Datas,
      xaxis: {
        type: "datetime"
      },
      yaxis: { opposite: true },
      legend: { horizontalAlign: "left" }
    };

    let chartElement = document.querySelector("#chart2");
    if (chartElement) {
      var chart = new ApexCharts(chartElement, options);
      chart.render();
    } else {
      console.error("Elemento #chart2 não encontrado.");
    }
  })
  .catch((error) => console.error(error));

fetch("https://api.covid19api.com/dayone/country/brazil/status/deaths")
  .then((response) => response.json())

  .then((data) => {
    

    Infeccoes = data.map(function (f) {
      return f.Cases;
    });
 
    Datas = data.map(function (f) {
      return f.Date;
    });

    var result = [];

    Infeccoes.forEach(
      (casos, i) => (result[i] = Infeccoes[i] - Infeccoes[i - 1])
    );

    var Mortes_dia = result.filter(function (f) {
      return !Number.isNaN(f);
    });
    var options = {
      series: [
        {
          name: "Óbitos diários",

          data: Mortes_dia
        }
      ],

      chart: {
        type: "bar",

        height: 350,

        zoom: {
          enabled: true
        }
      },

      dataLabels: {
        enabled: false
      },

      stroke: {
        curve: "smooth",
        width: 0.25
      },

      title: {
        text: "Registros diários desde 26/02/2020",

        align: "left"
      },

      subtitle: {
        text: `+ ${Mortes_dia.slice(-1)[0]} mortes nas últimas 24h | Total : ${Infeccoes.slice(-1)[0]} | Última atualização :${Datas.slice(-1)[0]}`,
        align: "left"
      },

      labels: Datas,

      xaxis: {
        type: "datetime"
      },

      yaxis: {
        opposite: true
      },

      legend: {
        horizontalAlign: "left"
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  })

  .catch((error) => console.error(error));

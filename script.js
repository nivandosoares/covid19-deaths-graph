fetch("https://api.covid19api.com/dayone/country/brazil/status/deaths")
  .then((response) => response.json())

  .then((data) => {
    

    infeccoes = data.map(function (f) {
      return f.cases;
    });
 
    datas = data.map(function (f) {
      return f.date;
    });

    var result = [];

    infeccoes.forEach(
      (casos, i) => (result[i] = infeccoes[i] - infeccoes[i - 1])
    );

    var mortes_dia = result.filter(function (f) {
      return !Number.isNaN(f);
    });
    var options = {
      series: [
        {
          name: "Óbitos diários",

          data: mortes_dia
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
        text: `+ ${mortes_dia.slice(-1)[0]} mortes nas últimas 24h | Total : ${infeccoes.slice(-1)[0]} | Última atualização :${datas.slice(-1)[0]}`,
        align: "left"
      },

      labels: datas,

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

fetch("https://api.covid19api.com/dayone/country/brazil/status/confirmed")
  .then((response) => response.json())

  .then((data) => {
    //	 console.log(data)

    Infeccoes = data.map(function (f) {
      return f.Cases;
    });
    Datas = data.map(function (f) {
      return f.Date;
    });

    //  console.log(Infeccoes)
    var result = [];

 //   Infeccoes.forEach((casos, i) => (result[i] = Infeccoes[i] - Infeccoes[i-1]));

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
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Evolução das infecções por COVID 19 no Brasil",
        align: "left"
      },
      subtitle: {
        text: "Casos confirmados",
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

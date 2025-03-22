fetch("https://pomber.github.io/covid19/timeseries.json")
  .then((response) => response.json())
  .then((data) => {
   
    let brazilData = data["Brazil"];
    if (!brazilData) {
      console.error("Dados do Brasil não encontrados.");
      return;
    }

    // Map the data to get dates and confirmed cases
    let Infeccoes = brazilData.map((entry) => entry.confirmed);
    let Datas = brazilData.map((entry) => new Date(entry.date).getTime());

    // Log the confirmed cases
    Infeccoes.forEach((cases) => {
      console.log(cases);
    });

    // ApexCharts options
    var options = {
      series: [
        {
          name: "CASOS CONFIRMADOS",
          data: Infeccoes,
        },
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: {
        text: "Evolução das infecções por COVID-19 no Brasil",
        align: "left",
      },
      subtitle: { text: "Casos confirmados", align: "left" },
      labels: Datas,
      xaxis: {
        type: "datetime",
      },
      yaxis: { opposite: true },
      legend: { horizontalAlign: "left" },
    };

    // Render the chart
    let chartElement = document.querySelector("#chart2");
    if (chartElement) {
      var chart = new ApexCharts(chartElement, options);
      chart.render();
    } else {
      console.error("Elemento #chart2 não encontrado.");
    }
  })
  .catch((error) => console.error(error));

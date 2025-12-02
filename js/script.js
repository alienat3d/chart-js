const loadSP = async () => {
  // Т.к. напрямую данный API не позволяет получать данные, то нам нужно настроить прокси-сервер. (Надо зайти по ссылке и кликнуть на "Request temp demo server".)
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const url =
    proxy +
    'https://query1.finance.yahoo.com/v8/finance/chart/^GSPC?interval=1d&range=12mo';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    const result = data.chart.result[0];

    // Даты дней торгов акций S&P500
    const timestamp = result.timestamp;
    console.log('timestamp', timestamp);

    // Цены закрытия торгов акций S&P500
    const prices = result.indicators.quote[0].close;
    console.log('prices', prices);

		const labels
  } catch (error) {
    console.error(error.message);
  }
};

loadSP();

// https://www.chartjs.org/
/* const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    tension: 0.3,
    pointRadius: 0,
  },
}); */

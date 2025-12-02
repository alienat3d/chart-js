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

    // Цены закрытия торгов акций S&P500
    const prices = result.indicators.quote[0].close;

    // Чтобы перевести данные timestamp, которые у нас в получается с API в секундах, в даты нам нужно сперва перевести это в миллисекунды и для этого умножить на 1000. Пробежимся циклом по всему массиву и умножим каждое значение на 1000. А затем при помощи "toLocaleDateString" перевести всё это в локальное время.
    const labels = timestamp.map((t) =>
      new Date(t * 1000).toLocaleDateString('ru')
    );

    renderSPChart(labels, prices);
  } catch (error) {
    console.error(error.message);
  }
};

// https://www.chartjs.org/
const renderSPChart = (labels, prices) => {
  const ctx = document.getElementById('chart-sp');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'S&P 500',
          data: prices,
          borderWidth: 2,
        },
      ],
    },
    options: {
      tension: 0.3,
      pointRadius: 0,
    },
  });
};

const loadBitcoin = async () => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const url =
    proxy +
    'https://query1.finance.yahoo.com/v8/finance/chart/BTC-USD?interval=1d&range=12mo';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    const result = data.chart.result[0];

    const timestamp = result.timestamp;

    const prices = result.indicators.quote[0].close;

    const labels = timestamp.map((t) =>
      new Date(t * 1000).toLocaleDateString('ru')
    );

    renderBitcoinChart(labels, prices);
  } catch (error) {
    console.error(error.message);
  }
};

const renderBitcoinChart = (labels, prices) => {
  const ctx = document.getElementById('chart-bitcoin');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Bitcoin',
          data: prices,
          borderWidth: 2,
        },
      ],
    },
    options: {
      tension: 0.3,
      pointRadius: 0,
      fill: true,
      backgroundColor: 'rgb(51, 102, 255, .3)',
    },
  });
};

loadSP();
loadBitcoin();

const form = document.querySelector('#searchForm');
const res = document.querySelector('#tableResult');
var upd;
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (upd) {
    clearTimeout(upd);
  }

  const coinType = form.elements.coinType.value;
  const targetCurrency = form.elements.targetCurrency.value;

  fetchPrice(coinType, targetCurrency);
});

const fetchPrice = async (coinType, targetCurrency) => {
  const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${coinType}?currency=${targetCurrency}`);
  const coinData = r.data.coin;
  const price = coinData.price;
  const volume = coinData.volume;
  const change = coinData.priceChange1d;
  const base = coinData.name;


  res.innerHTML = `
    <thead>
        <tr>
            <th style="    background: #0d6efd;
            color: white; width: 35%" scope="col" >Property</th>
            <th  style="    background: #0f5bcc;
            color: white; width: 65%"scope="col">Value</th>
        </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" style="    background: #3e4c5c;
              color:#b3ebff;">${base}</th>
              <td style="    background: #5d6b7d;
              color: #b3ebff;">${price} <b>${targetCurrency}</b></td>
            </tr>
            <tr>
              <th scope="row" style="background: #3e4c5c;
              color: #fff9c4;">Volume</th>
              <td style="    background: #5d6b7d;
              color: #fff9c4;">${volume}</td>
            </tr>
            <tr>
              <th scope="row" style="    background: #3e4c5c;
              color: #ffc4c4;">Change</th>
              <td style="background: #5d6b7d;
              color: #ffc4c4;">${change}</td>
            </tr>
          </tbody>
     `
  upd = setTimeout(() => fetchPrice(ctype), 10000);
}
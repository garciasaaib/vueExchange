const url = 'https://api.coincap.io/v2'

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then(res => res.json())
    .then(res => res.data)
}

function getAsset(coin) {
  return fetch(`${url}/assets/${coin}`)
    .then(res => res.json())
    .then(res => res.data)
}

function getAssetHistory(coin) {
  const now = new Date() //create current time and save it in a var
  const end = now.getTime() //current time
  now.setDate(now.getDate() - 1) //it gets a day before
  const start = now.getTime() //a day less current time

  //interva = 1hora y datos de inicio y termino en variables
  return fetch(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
    .then(res => res.json())
    .then(res => res.data)
}

export default {
  getAssets,
  getAsset,
  getAssetHistory
}

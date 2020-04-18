new Vue({
  el: '#app',
  data () {
    return {
      title: 'Bitcoin',
      image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
      changePercent: 0,
      pricesByDay: [
        {day: 'Monday', value: 8000},
        {day: 'Tuesday', value: 8200},
        {day: 'Wednesday', value: 8400},
        {day: 'Thursday', value: 8600},
        {day: 'Friday', value: 8800},
        {day: 'Saturday', value: 9000},
        {day: 'Sunday', value: 10000},
      ]
    }
  }
})
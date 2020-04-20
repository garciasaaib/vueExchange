Vue.component("CoinDetail", {
  //datos del componente padre que necesita este componente
  props: ["coin"],

  data() {
    //datos del componente
    return {
      showPrices: false,
      value: 0,
    };
  },

  methods: {
    //metodos del componente
    toggleShowPrices() {
      this.showPrices = !this.showPrices;

      //para avisar al padre que hemos cambiado este dato
      this.$emit("change-color", this.showPrices ? "FF96C8" : "d3d3d3");
    },
  },

  computed: {
    convertedValue() {
      if (!this.value) {
        return 0;
      } else {
        return this.value / this.coin.currentPrice;
      }
    },
    title() {
      return `${this.coin.name} ${this.coin.symbol}`;
    },
  },
  created() {
    console.log("component Created..."); //sirve en apis
  },
  mounted() {
    console.log("component Mounted..."); //dom disponible
  },
  template: `
  <div>
    <img 
      v-on:mouseover="toggleShowPrices" 
      v-on:mouseout="toggleShowPrices"
      v-bind:src="coin.image" 
      alt="coin.name">
    <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
      {{title}}
      <span v-if="coin.changePercent > 0">👍</span>
      <span v-else-if="coin.changePercent < 0">👎</span>
      <span v-else>🤞</span>
      <span v-on:click="toggleShowPrices">
        {{showPrices ? '🙉' : '🙈' }}
      </span>
    </h1>
    <input type="number" v-model="value">
    <span>{{convertedValue}}</span>

    <slot name="text"></slot>
    <slot name="url"></slot>

    <ul v-show="showPrices">
    <li 
      class="uppercase"
      v-for="(price, i) in coin.pricesByDay" 
      v-bind:key="i" 
      v-bind:class="{ orange: price.value === coin.currentPrice,red: price.value < coin.currentPrice, green: price.value > coin.currentPrice }">
      {{i}} - {{price.day}} - {{price.value}}
    </li>
  </ul>
  </div>
  `,
});

Vue.component("Modal", {
  props: ["title"],

  template: `
  <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-head">
            <h2>{{title}}</h2>
          </div>
          <slot name="modal-body"></slot>
          <button class="btn" v-on:click="closeModal">Cerrar</button>
        </div>
      </div>
    </div>
  `,
  methods: {
    //metodos del componente
    closeModal() {
      //para avisar al padre que hemos cambiado este dato
      this.$emit("close-modal");
    },
  },
});

new Vue({
  el: "#app",
  data() {
    return {
      btc: {
        name: "Bitcoin",
        symbol: "BTC",
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
        changePercent: -1,
        currentPrice: 8600,
        pricesByDay: [
          { day: "Monday", value: 8000 },
          { day: "Tuesday", value: 8200 },
          { day: "Wednesday", value: 8400 },
          { day: "Thursday", value: 8600 },
          { day: "Friday", value: 8800 },
          { day: "Saturday", value: 9000 },
          { day: "Sunday", value: 10000 },
        ],
      },
      color: "a4a4a4",
      value: 0,
      modal: false,
      title: "Bitcoin será el nuevo peso mexicano",
    };
  },
  created() {
    console.log("Created..."); //sirve en apis
  },
  mounted() {
    console.log("Mounted..."); //dom disponible
  },
  methods: {
    //eventos de la vista
    updateColor(color) {
      //metodo para cambiar los colores
      this.color =
        color ||
        this.color
          .split("") //crea un array con los char del string
          .reverse() //reversa el array
          .join(""); //vuelve a concatenar el string
    },
    toggleModal() {
      this.modal = !this.modal;
    },
  },
});

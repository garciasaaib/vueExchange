<template>
  <div class="flex-col">
    <template v-if="asset.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Current Proce</b>
              <span></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Lowest Price</b>
              <span></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Highest Price</b>
              <span></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Average Price</b>
              <span></span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">24 hrs variation</b>
              <span></span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cambiar
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                type="number"
                id="convertValue"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'CoinDetail',
  data() {
    return {
      asset: {}
    }
  },
  created() {
    //al crear el componente se llama a getCoin
    this.getCoin()
  },
  methods: {
    getCoin() {
      //esta linea declara que queremos obtener el id desde la ruta
      const id = this.$route.params.id

      //llama al metodo de la api con el id como parametro
      //luego guarda lo que retorna en asset
      api.getAsset(id).then(asset => (this.asset = asset))
    }
  }
}
</script>

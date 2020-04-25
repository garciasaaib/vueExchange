<template>
  <table>
    <thead>
      <tr class="bg-green-400 border-b-2 border-gray-400">
        <th>Coin</th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span @click="changeSortOrder" class="underline cursor">
            Ranking
          </span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td>
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="asset in filteredAssets"
        :key="asset.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-{rgba(84, 89, 89, 0.65)}"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
          />
        </td>
        <td>
          <b>#{{ asset.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600" 
            :to="{ name: 'coin-detail', params: { id: asset.id } }"
          >
            {{ asset.name }}
          </router-link>
          <small class="ml-1 text-gray-500">
            {{ asset.symbol }}
          </small>
        </td>
        <td>{{ asset.priceUsd | dollar }}</td>
        <td>{{ asset.marketCapUsd | dollar }}</td>
        <td
          :class="
            asset.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ asset.changePercent24Hr | percent }}
        </td>
        <td class=" sm:block">
          <px-button @click="goToCoin(asset.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from '@/components/PxButton'
export default {
  name: 'PxAssetsTable',
  components: { PxButton },

  data() {
    return {
      filter: '', //este sera el v-model del filter
      sortOrder: 1 //v-model para ordenar el string de filter
    }
  },

  computed: {
    filteredAssets() { //aqui declararemos el contenido del filter
      /*if (!this.filter) {
        return this.assets
      } *///si filter es vacio regresamos this.assets

      const altOrder = this.sortOrder === 1 ? -1 : 1

      return this.assets.filter(
        a => //si no
        //regresa un array que filtra los datos si incluye el string qu eesta en name o symbol
        a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
        a.name.toLowerCase().includes(this.filter.toLowerCase())
      )
      .sort((a, b) => { //para ordenar
        //transforma rank a tipo number y los acomoda del mayor a menor
        if (parseInt(a.rank) > parseInt(b.rank)) {
          return this.sortOrder
        }

        return altOrder
      })
    }
  },

  props: {
    //prop enviada por el padre
    assets: {
      //obtiene con este nombre
      type: Array, //sera un array
      default: () => [] //y por default estara vacio pero se puede llenar
    }
  },

  methods: {
    goToCoin(id) {
      //this.$router.push me permite navegar dentro del codigo
      this.$router.push({ name: 'coin-detail', params: { id } })
    },

    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    }
  }
}
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>

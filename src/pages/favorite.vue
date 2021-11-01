<template>
  <div v-if="totalFav > 0">
    <ListPokemon class="mt-8" :data="favorites" :favorites="favorites" @add:fav="addFavorite" @remove:fav="removeFavorite" :isFavorite="true"/>
  </div>
  <div v-else>
    <div class="flex justify-center items-center  mt-8">
      <span class="text-1xl font-medium">No data Found</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from "vuex"
import ListPokemon from '../components/list-pokemon.vue'

export default {
  components: {
    ListPokemon
  },
  setup() {
    const store = useStore();
    const favorites = computed(() => store.state.favorites);
    const totalFav = computed(() => store.getters.totalFavorite);

    const addFavorite = (data) => {
      store.dispatch("saveFavorite", data);
    }

    const removeFavorite = (id) => {
      store.dispatch("removeFavorite", id);
    }

    return { addFavorite, removeFavorite, favorites, totalFav }
  },
}
</script>

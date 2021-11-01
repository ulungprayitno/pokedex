<template>
  <div v-if="!state.fetchingFilter" ref="scrollComponent">
    <div class="flex justify-end  mt-4">
      <select v-model="selectedType" @change="selectType" class="w-48 bg-gray-200 rounded-md p-2 border-black-500">
        <option disabled value="null">Please select one</option>
        <option value="all">All</option>
        <option v-for="(type, idx) in state.types" :key="idx">{{type.name}}</option>
      </select>
    </div>
    
    <ListPokemon class="mt-8" :data="state.response" :favorites="favorites" @add:fav="addFavorite" @remove:fav="removeFavorite" :isFavorite="false"/>
  </div>
  <div v-else>
    <div class="flex justify-center items-center  mt-8">
      <span class="text-1xl font-medium">Loading....</span>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, onUnmounted, computed } from 'vue'
import useFetch from '../services/use-fetch'
import { useStore } from "vuex";
import ListPokemon from '../components/list-pokemon.vue'

export default {
  components: {
    ListPokemon
  },
  setup() {
    const { state, fetchData, fetchMore, getTypes, fetchDataFilter } = useFetch()
    const scrollComponent = ref(null)
    const selectedType = ref(null)
    const store = useStore();
    const favorites = computed(() => store.state.favorites);

    onBeforeMount(async () => {
        await fetchData()
        await getTypes()
    })

    onMounted(() => {
			window.addEventListener("scroll", handleScroll)
		})

		onUnmounted(() => {
			window.removeEventListener("scroll", handleScroll)
		})

    const handleScroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight | state.filter) return;
      fetchMore();
		}

    const selectType = () => {
      if (selectedType.value === 'all' ) fetchData();
      else fetchDataFilter(selectedType.value)
    }

    const addFavorite = (data) => {
      store.dispatch("saveFavorite", data);
    }

    const removeFavorite = (id) => {
      store.dispatch("removeFavorite", id);
    }

    return { state, scrollComponent, selectedType, selectType, addFavorite, removeFavorite, favorites }
  },
}
</script>

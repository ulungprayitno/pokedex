<template>
  <div v-if="!state.fetchingFilter">
    <div class="flex justify-end  mt-4">
      <select v-model="selectedType" @change="selectType" class="w-48 bg-gray-200 rounded-md p-2 border-black-500">
        <option disabled value="null">Please select one</option>
        <option value="all">All</option>
        <option v-for="(type, idx) in state.types" :key="idx">{{type.name}}</option>
      </select>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8" ref="scrollComponent">
      <div class="bg-gray-300 rounded-2xl" v-for="x in state.response" :key="x">
        <router-link :to="'/pokemon/' + x.name">
          <div class="mx-4 mt-2 text-4xl font-medium cursor-pointer">
          {{x.name}}
          </div>
        </router-link>

          <div>
            <span v-for="(item, i) in x.types" :key="i" class="ml-4 bg-gray-600 py-1 px-2 rounded text-xs text-white">{{item.type.name}}</span>
          </div>

          <div class="flex items-end justify-between h-24">
            <div class="mx-4 my-2">
              <button v-if="!favorite.find(fav => fav.id === x.id)" type="button" class="bg-green-600 rounded-lg text-xs px-2 py-1 text-white" @click="addFavorite(x)">Add to Favorite</button>
              <button v-else type="button" class="bg-red-600 rounded-lg text-xs px-2 py-1 text-white" @click="removeFavorite(x.id)">Remove from Favorite</button>
            </div>
            <div class="bg-gray-200 rounded-full my-2 p-4 lg:w-auto w-24 cursor-pointer">
              <router-link :to="'/pokemon/' + x.name">
                <img :src="x.sprites.front_default"/>
              </router-link>
              </div>
          </div>
      </div>
    </div>
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

export default {
  setup() {
    const { state, fetchData, fetchMore, getTypes, fetchDataFilter } = useFetch()
    const scrollComponent = ref(null)
    const selectedType = ref(null)
    const store = useStore();
    const favorite = computed(() => store.state.favorites);

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

    return { state, scrollComponent, selectedType, selectType, addFavorite, removeFavorite, favorite }
  },
}
</script>

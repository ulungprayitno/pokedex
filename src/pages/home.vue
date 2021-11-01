<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8" ref="scrollComponent">
    <div class="bg-gray-300 rounded-2xl cursor-pointer" v-for="x in state.response" :key="x">
      <router-link :to="'/pokemon/' + x.name">
        <div class="mx-4 mt-2 text-4xl font-medium">
        {{x.name}}
        </div>

        <div>
          <span v-for="(item, i) in x.types" :key="i" class="ml-4 bg-green-300 py-1 px-2 rounded text-xs">{{item.type.name}}</span>
        </div>

        <div class="flex items-end justify-end h-24">
          <img :src="x.sprites.front_default" class="w-auto"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
import useFetch from '../services/use-fetch'

export default {
  setup() {
    const { state, fetchData, fetchMore } = useFetch()
    const scrollComponent = ref(null)

    onBeforeMount(async () => {
        await fetchData()
    })

    onMounted(() => {
			window.addEventListener("scroll", handleScroll)
		})

		onUnmounted(() => {
			window.removeEventListener("scroll", handleScroll)
		})

    const handleScroll = (e) => {
			if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      fetchMore();
		}

    return { state, scrollComponent }
  },
}
</script>

<template>
  <div class="bg-gray-300 rounded-md mt-4">
    <!-- {{state.detail.name}} -->
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';
import useFetch from '../services/use-fetch'
import { useRoute } from 'vue-router';

export default {
  setup() {
    const { state, getById } = useFetch()
    const route = useRoute();

  onBeforeMount(() => {
    getById(route.params.name)
  })

    return { state }
  },
}
</script>

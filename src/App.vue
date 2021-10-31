<template>
  <Navbar />
  <div class="px-4 py-20">
    <router-view />
  </div>
</template>

<script>
  import Navbar from './components/navbar.vue'

  export default {
    components: {
      Navbar
    }

  }
</script>
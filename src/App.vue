<template>
  <Navbar />
  <div class="mx-16 py-20">
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
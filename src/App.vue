<template>
  <header>
    <NavBar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

export default defineComponent({
  name: "App",
  components: { NavBar },
  setup() {

  }

});

</script>
<!-- <RouterLink to="/">Home</RouterLink> -->
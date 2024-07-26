<template>
    <nav class="NavBar">

        <RouterLink to="/" class="NavTitle">
            <img src="/favicon.ico" alt="icon" />
            <span class="NavTitleText">MicroLibrary</span>
        </RouterLink>

        <div class="block md:hidden">
            <button @click="ToggleMenu"
                class="MenuButton">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>

        <div :class="open ? 'block' : 'hidden md:block'" class="MenuDisplay">
            <div class="MenuContainer" @click="ToggleMenu">
                <RouterLink to="/"
                    class="MenuItem">
                    Home
                </RouterLink>
                <RouterLink to="/Search" 
                    class="MenuItem">
                    Search
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import '../assets/NavBar.css';

export default defineComponent({
    name: "NavBar",
    components: { RouterLink },
    setup() {
        const open = ref<boolean>(false);

        return { open };
    },
    methods: {
        ToggleMenu() {
            this.open = !this.open;
        }
    }

});

</script>
<template>
    <main class="p-3">
        <BookCategory v-if="category != ''" :category="category" :limit="-1" />
    </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BookCategory from '@/components/Books/BookCategory.vue';
import { useRoute } from 'vue-router'



export default defineComponent({
    name: "Category",
    components: {
        BookCategory
    },
    setup() {
        const route = useRoute()
        const category = ref<string>("");
        return { category, route };
    },
    mounted() {
        //once its ready we can access the query params
        this.category = (this.route.params.category as string).toLowerCase();
    },
    methods: {

    }

});

</script>
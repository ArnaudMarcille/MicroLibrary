<template>
  <main class="p-3">
      <BookCategory  v-for="category in categories" :category="category" :limit="5" />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BookCategory from '@/components/Books/BookCategory.vue';

export default defineComponent({
  name: "Home",
  components: {
    BookCategory
  },
  setup() {
    const categories = ref<string[]>([
      "mystery_and_detective_stories",
      "thriller",
      "romance",
      "science_fiction",
      "fantasy",
      "history",
      "business",
      "entrepreneurship",
      "young_adult_fiction",
      "juvenile_literature",
      "picture_books",
    ]);

    return { categories };
  },
  methods: {

  }

});

</script>
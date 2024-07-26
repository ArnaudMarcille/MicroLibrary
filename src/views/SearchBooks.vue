<template>
    <div ref="container">
        <div class='w-full px-3 py-4'>
            <form @submit.prevent="Search(false)" class="grid sm:grid-flow-col justify-center gap-4">
                <select v-model="selectedContent" id="pricingType" name="pricingType"
                    class="w-full md:w-80 h-10 border border-black focus:outline-none focus:border-black text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                    <option v-for="opt in filters" v-bind:value="opt.key">{{ opt.value }}</option>
                </select>
                <div class="flex w-full">
                    <input v-model="searchContent" type="text" placeholder="Search"
                        class="w-full md:w-80 px-3 h-10 rounded-l border border-black focus:outline-none focus:border-black">
                    <button type="submit"
                        class="bg-black hover:bg-black text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
                </div>
            </form>
        </div>
        <div v-if="totalResults > 0" class="px-4 py-4">
            <p>
                Total results {{ totalResults }} ({{ Items.length }} loaded)
            </p>
        </div>
        <div class="content-center">
            <div
                class="mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 place-content-center">
                <div v-for="item in Items" class="TileItem">
                    <RouterLink :to="{ name: 'book', params: { id: item.key.replace('/works/', '') } }">
                        <div class="TileImgContainer">
                            <img v-if="item.cover_i != null" class="TileImg"
                                v-bind:src="'https://covers.openlibrary.org/b/id/' + item.cover_i + '-L.jpg'" alt="" />
                            <img v-if="item.cover_i == null" class="TileImg" src="/default_cover.png" alt="" />
                        </div>
                        <div class="TileContentDetail">
                            <h5 class="TileTitle">
                                {{ item.title }} ({{ item.first_publish_year }})</h5>
                            <p class="TileDetail">
                                {{ item.author_name?.join(", ") }}
                            </p>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
    <div v-if="Loading" class="text-center p-4">
        <div>
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import BookService from '@/Services/BookService';
import type { Doc } from '@/Core/API/Search/Search';

interface KeyValuePair {
    key: string;
    value: string;
}

export default defineComponent({
    name: "Search",
    components: {
        RouterLink
    },
    setup() {
        const container = ref(null)
        const Loading = ref<boolean>(false);
        const Items = ref<Doc[]>([]);
        const searchContent = ref<string>("");
        const selectedContent = ref<string>("");
        const totalResults = ref<number>(0);
        const filters = ref<KeyValuePair[]>([
            { key: "book", value: "Books" },
            { key: "author", value: "Authors" },
        ])

        selectedContent.value = filters.value[0].key;

        return {
            container,
            Loading,
            searchContent,
            selectedContent,
            totalResults,
            filters,
            Items
        };
    },
    async mounted() {
        window.addEventListener("scroll", this.handleScroll)
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        async Search(searchMore: boolean) {
            if (this.Loading || this.Items.length > this.totalResults) {
                return;
            }

            this.Loading = true;

            if (!searchMore) {
                this.Items = []
            }

            let result = await BookService.Search(this.searchContent, this.selectedContent, this.Items.length);

            if (result.numFound < 1) {
                this.Loading = false;
                return;
            }

            this.totalResults = result.numFound;
            console.log(result);
            result.docs.forEach(item => {
                this.Items.push(item);
            })

            this.Loading = false;
        },
        handleScroll(e: any) {
            if (this.container == null || this.Loading) {
                return;
            }

            let element: HTMLElement = this.container as HTMLElement;

            if (element.getBoundingClientRect().bottom <= window.innerHeight) {
                if (this.Items.length > 0) {
                    this.Search(true);
                }
            }
        }
    }

});

</script>
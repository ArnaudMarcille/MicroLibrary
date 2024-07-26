<template>
    <section class="text-gray-700 body-font overflow-hidden bg-white">
        <div class="container px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <img alt="ecommerce"
                    class="lg:w-1/2 h-96 w-full object-contain object-center rounded border border-gray-200"
                    v-bind:src="ImgSrc">
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ Title }}</h1>
                    <h2 class="text-sm title-font text-gray-500 tracking-widest">{{ Authors }} - {{ ReleaseDate }}</h2>
                    <div class="flex mb-4">
                        <span class="flex items-center">
                            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                                </path>
                            </svg>
                            <span class="text-gray-600 ml-3">{{ Rating }} ({{ RatingCount }} Reviews)</span>
                        </span>
                    </div>
                    <p class="leading-relaxed">{{ Description }}</p>
                </div>
            </div>
        </div>
    </section>
    <div class="content-center">
        <div>
            <div class="CategoryTitle">
                <p class="CategoryTitleContent">Subjects</p>
            </div>
            <p class="py-2 mx-4 my-4 text-black items-center leading-relaxed">
                {{ Subjects }}
            </p>
        </div>
        <div class="CategoryTitle">
            <p class="CategoryTitleContent">Found {{ EditionsEntries.length }} editions</p>
        </div>
        <div
            class="mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4 place-content-center">
            <div v-for="entry in EditionsEntries" class="TileItem">
                <div class="TileImgContainer">
                    <img v-if="entry.covers != null" class="TileImg"
                        v-bind:src="'https://covers.openlibrary.org/b/id/' + entry.covers + '-L.jpg'" alt="" />
                    <img v-if="entry.covers == null" class="TileImg" src="/default_cover.png" alt="" />
                </div>
                <div class="TileContentDetail">
                    <h5 class="TileTitle">
                        {{ entry.full_title == null ? entry.title : entry.full_title }} ({{
                            entry.publish_date }})</h5>
                    <p class="TileDetail">
                        {{ entry.publishers?.join(", ") }}
                    </p>
                    <p class="TileDetail">
                        {{ entry.languages?.map(l => l.key.replace("/languages/", "")).join("/ ") }}
                    </p>
                </div>
            </div>
        </div>
    </div>


</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router'
import BookService from '@/Services/BookService';
import type { BookResult, Author, RatingResult, KeyValue } from '@/Core/API/Book/Book';
import type { AuthorResult } from '@/Core/API/Book/Authors';
import type { EditionResult, Entry } from '@/Core/API/Book/Editions';

export default defineComponent({
    name: "BookDetail",
    components: {
    },
    setup() {
        const route = useRoute()
        const bookId = ref<string>("");
        const content = ref<string>("");


        const Title = ref<string>("");
        const Description = ref<string>("");
        const ReleaseDate = ref<string>("");
        const Authors = ref<string>("");
        const ImgSrc = ref<string>("");
        const Subjects = ref<string>("");

        const Rating = ref<string>("-");
        const RatingCount = ref<string>("-");

        const EditionsEntries = ref<Entry[]>([]);

        return {
            bookId,
            route,
            content,
            Title,
            Description,
            ReleaseDate,
            Authors,
            ImgSrc,
            Subjects,
            Rating,
            RatingCount,
            EditionsEntries
        };
    },
    async mounted() {
        //once its ready we can access the query params
        this.bookId = this.route.params.id as string;
        if (this.bookId == null || this.bookId == "") {
            return;
        }

        let bookpromise = await this.GetBookDetails();

        if (bookpromise instanceof String) {
            alert(bookpromise);
            return;
        }

        let result = bookpromise as BookResult;

        // Get Author details 
        this.LoadAuthors(result.authors);

        // Get Rating
        this.LoadRatings();

        // Get editions
        this.LoadEditions();
    },
    methods: {
        /**
         * Format cover id to api url
         * @param coverId Coverid from api
         */
        FormatImageUrl(coverId: string) {
            const ImgSrc: string = "https://covers.openlibrary.org/b/id/{TOREPLACE}-L.jpg";
            return ImgSrc.replace("{TOREPLACE}", String(coverId));
        },
        /**
         * Get book details
         */
        async GetBookDetails(): Promise<BookResult | string> {
            // Get book details    
            let book = await BookService.GetById(this.bookId);
            if (book instanceof String) {
                return book;
            }

            let result: BookResult = book as BookResult;
            this.content = String(result);

            this.Title = result.title;

            if (result.description == undefined) {
                this.Description = "no provided description";
            }
            else if (result.description instanceof String) {
                this.Description = result.description as string;
            } else {
                this.Description = (result.description as KeyValue).value;
            }

            this.ReleaseDate = result.first_publish_date;
            if (result.covers.length > 0) {
                this.ImgSrc = this.FormatImageUrl(String(result.covers[0]));
            }

            this.Subjects = result.subjects.join(" | ");

            return book;
        },
        /**
         * Get authors infos
         * @param authors Authors list
         */
        async LoadAuthors(authors: Author[]) {
            let authorResults: AuthorResult[] = [];
            for (let i = 0; i < authors.length; i++) {
                let author: Author = authors[i];
                let authorResult = await BookService.GetAuthors((author.author.key as string).replace("/authors/", ""));
                if (authorResult instanceof String) {
                    continue;
                } else {
                    authorResults.push(authorResult as AuthorResult);
                }
            }

            this.Authors = authorResults.map(a => a.name).join(", ");
        },
        /**
         * Load book rating
         */
        async LoadRatings() {
            let rating = await BookService.GetRating(this.bookId);
            if (rating instanceof String) {
                return;
            }

            let ratingResult: RatingResult = rating as RatingResult;

            this.Rating = Intl.NumberFormat("en-US", { maximumFractionDigits: 2 })
                .format(ratingResult.summary.average);
            this.RatingCount = String(ratingResult.summary.count);
        },
        /**
         * Load book editions
         */
        async LoadEditions() {
            let editionsResults = await BookService.GetEditions(this.bookId);
            if (editionsResults instanceof String) {
                return;
            }
            let editions: EditionResult = editionsResults as EditionResult;
            editions.entries.forEach((entry) => {
                let res = this.EditionsEntries.find(ent => {
                    return ent.publish_date == entry.publish_date &&
                        ent.title == entry.title &&
                        ent.publishers?.join("-") == entry.publishers?.join("-");
                });

                if (res == null) {
                    this.EditionsEntries.push(entry);
                }

            });
        }
    }

});

</script>
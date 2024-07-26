import axios from "axios";
import type { BookResult, RatingResult } from "@/Core/API/Book/Book";
import type { EditionResult } from "@/Core/API/Book/Editions";
import type { AuthorResult } from "@/Core/API/Book/Authors";
import type { SearchResult } from "@/Core/API/Search/Search";


export default new class BookService {

    //#region Private properties

    #_workUrl: string = "https://openlibrary.org/works/{TOREPLACE}.json";
    #_editionsUrl: string = "https://openlibrary.org/works/{TOREPLACE}/editions.json";
    #_ratingUrl: string = "https://openlibrary.org/works/{TOREPLACE}/ratings.json";
    #_authorsUrl: string = "https://openlibrary.org/authors/{TOREPLACE}.json";
    #_searchUrl: string = "https://openlibrary.org/search.json?{FILTER}={QUERY}";



    //#endregion

    async GetById(id: string): Promise<BookResult | string> {
        let url: string = this.#FormatUrl(this.#_workUrl, id);
        let result = await axios.get<BookResult>(url);

        if (result.status != 200) {
            return Promise.resolve("An Error have occured while calling the api");
        }

        return Promise.resolve(result.data);
    }


    async GetAuthors(id: string): Promise<AuthorResult | string> {
        let url: string = this.#FormatUrl(this.#_authorsUrl, id);
        let result = await axios.get<AuthorResult>(url);

        if (result.status != 200) {
            return Promise.resolve("An Error have occured while calling the api");
        }

        return Promise.resolve(result.data);
    }

    async GetRating(id: string): Promise<RatingResult | string> {
        let url: string = this.#FormatUrl(this.#_ratingUrl, id);
        let result = await axios.get<RatingResult>(url);

        if (result.status != 200) {
            return Promise.resolve("An Error have occured while calling the api");
        }

        return Promise.resolve(result.data);
    }

    async GetEditions(id: string): Promise<EditionResult | string> {
        let url: string = this.#FormatUrl(this.#_editionsUrl, id);
        let result = await axios.get<EditionResult>(url);

        if (result.status != 200) {
            return Promise.resolve("An Error have occured while calling the api");
        }

        return Promise.resolve(result.data);
    }

    async Search(content: string, filter: string, offset?: number): Promise<SearchResult> {
        let queryKey: string = "q";
        if (filter == "author") {
            queryKey = "author";
        }

        // Construct url
        let url: string = this.#_searchUrl.replace("{FILTER}", queryKey);
        url = url.replace("{QUERY}", content)

        // Add offset
        if (offset != undefined && offset > 0) {
            url += "&offset=" + String(offset);
        }

        // Call api
        let result = await axios.get<SearchResult>(url);

        if (result.status != 200) {
            return Promise.resolve({
                numFound: -1,
                start: -1,
                numFoundExact: false,
                docs: [],
                num_found: -1,
                q: "",
                offset: 0,
            })
        }

        return result.data;
    }


    //#region Private Methods

    /**
     * Format url for quering
     * @param category 
     * @returns formated url
     */
    #FormatUrl(url: string, content: string): string {
        return url.replace("{TOREPLACE}", content);
    }

    //#endregion
}
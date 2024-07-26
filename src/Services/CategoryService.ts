import axios from "axios";
import type { CategorySearch } from '@/Core/API/Category/Category';
import { BookModel } from "@/Core/Models/BookModel";
import { CategoryModel } from "@/Core/Models/CategoryModel";


export default new class CategoryService {

    //#region Private properties

    #_baseURL: string = "http://openlibrary.org/subjects/{TOREPLACE}.json";

    //#endregion

    /**
     * Get books for a category
     * @param category category name
     * @param maxQuantity maximum quantity, not mandatory
     * @returns return a category model containing formated books
     */
    async GetByCategory(category: string, maxQuantity?: number, offset?: number): Promise<CategoryModel> {
        let url: string = this.#FormatUrl(category);

        // Add limit

        let finished: boolean = true;
        let page: number = 1;

        if (maxQuantity != undefined && maxQuantity != -1) {
            url += "?limit="  + String(maxQuantity);
        }

        if(offset != undefined && offset > 0){
            url += "?offset="  + String(offset);
        }

        let result = await axios.get<CategorySearch>(url);

        let books: BookModel[] = [];

        if (result.status != 200) {
            return Promise.resolve(new CategoryModel("", "Not found", []));
        }

        for(let item of result.data.works){
            books.push(new BookModel(item));
        }

        let categoryModel: CategoryModel = new CategoryModel(result.data.key, result.data.name, books);
        return Promise.resolve(categoryModel);
    }

    //#region Private Methods

    /**
     * Format url for quering
     * @param category 
     * @returns formated url
     */
    #FormatUrl(category: string): string {
        return this.#_baseURL.replace("{TOREPLACE}", category);
    }

    //#endregion
}
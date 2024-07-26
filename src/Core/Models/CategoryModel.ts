import type { BookModel } from "./BookModel";

export class CategoryModel {
    Id:string ="";
    Name: string = "";
    Books : BookModel[] = [];

    constructor(id:string, name:string, Books:BookModel[]) {
        this.Id = id;
        this.Name = name;
        this.Books = Books;
    }
}
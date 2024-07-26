import type { Work } from '@/Core/API/Category/Category';

export class BookModel {
    Id:string ="";
    Title: string = "";
    Authors: string = "";
    ImgSrc:string="https://covers.openlibrary.org/b/id/{TOREPLACE}-L.jpg";
    PublicationYear :string = "";

    constructor(book: Work) {
        this.Title = book.title;
        this.Authors = book.authors.map(a => a.name).join(", ");
        this.Id = book.key.replace("/works/","");
        this.ImgSrc = this.ImgSrc.replace("{TOREPLACE}", String(book.cover_id));
        this.PublicationYear = String(book.first_publish_year);
    }
}
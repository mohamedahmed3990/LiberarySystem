import { Author } from "./author.js";

export function Book(bName, price, authorName, authorEmail) {
    this.bookName = bName;
    this.bookPrice = price;
    this.author = new Author(authorName, authorEmail);
}
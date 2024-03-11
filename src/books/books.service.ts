import { Injectable } from "@nestjs/common";
import { Book } from "./interfaces/book.interface";

@Injectable()
export class BooksService {
    private readonly book: Book[] = [];


    getAll() {
        return this.book;
    }
} 
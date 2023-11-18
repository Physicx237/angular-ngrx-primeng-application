import { Observable } from "rxjs";

export interface BookPort {
    addBook(book: any): void,
    getBooks(): Observable<any>
}
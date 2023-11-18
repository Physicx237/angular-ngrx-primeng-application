import { Observable } from "rxjs";

export interface AuthorPort {
    addAuthor(author: any): void,
    getAuthors(): Observable<any>
}
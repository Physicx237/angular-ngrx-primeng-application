import { Injectable } from '@angular/core';
import { Book } from '../domain/models/book.type';
import { of } from 'rxjs';
import { BookPort } from '../domain/ports/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService implements BookPort {
  addBook(book: Omit<Book, 'id'>) {
    const data = localStorage.getItem('books');
    const bookId = Number(Math.random().toString(10).slice(2));

    if (data) {
      const newBooks: Book[] = [];
      const books = JSON.parse(data);

      newBooks.push(...books, { id: bookId, ...book });
      localStorage.setItem('books', JSON.stringify(newBooks));

      return;
    }

    const books: Book[] = [];

    books.push({ id: bookId, ...book });
    localStorage.setItem('books', JSON.stringify(books));
  }

  getBooks() {
    const data = localStorage.getItem('books');

    if (data) {
      const books = JSON.parse(data);

      return of(books);
    }

    return of([]);
  }
}

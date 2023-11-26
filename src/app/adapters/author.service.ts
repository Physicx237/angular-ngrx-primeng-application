import { Injectable } from '@angular/core';
import { Author } from '../domain/models/author.type';
import { of } from 'rxjs';
import { AuthorPort } from '../domain/ports/author.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorService implements AuthorPort {
  addAuthor(author: Omit<Author, 'id'>) {
    const data = localStorage.getItem('authors');
    const authorId = Number(Math.random().toString(10).slice(2));

    if (data) {
      const newAuthors: Author[] = [];
      const authors = JSON.parse(data);

      const arrayOfAuthorsValidate = authors.every(
        (authorData: Author) =>
          authorData.lastName !== author.lastName ||
          authorData.firstName !== author.firstName ||
          authorData.patronymic !== author.patronymic ||
          authorData.dateOfBirth !== author.dateOfBirth
      );

      if (arrayOfAuthorsValidate) {
        newAuthors.push(...authors, { id: authorId, ...author });
        localStorage.setItem('authors', JSON.stringify(newAuthors));
      }

      return;
    }

    const authors: Author[] = [];

    authors.push({ id: authorId, ...author });
    localStorage.setItem('authors', JSON.stringify(authors));
  }

  getAuthors() {
    const data = localStorage.getItem('authors');

    if (data) {
      const authors = JSON.parse(data);

      return of(authors);
    }

    return of([]);
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { BookService } from 'src/app/adapters/book.service';
import * as GetBooksActions from 'src/app/domain/store/actions/get-books.action';

@Injectable()
export class BooksEffect {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBooksActions.getBooksEffect),
      exhaustMap(() =>
        this.bookService.getBooks().pipe(
          map((books) => GetBooksActions.getBooks({ payload: books })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) {}
}

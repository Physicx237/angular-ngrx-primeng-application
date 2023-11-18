import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthorService } from 'src/app/adapters/author.service';
import * as GetAuthorsActions from 'src/app/domain/store/actions/get-authors.action';

@Injectable()
export class AuthorsEffect {
  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAuthorsActions.getAuthorsEffect),
      exhaustMap(() =>
        this.authorService.getAuthors().pipe(
          map((authors) => GetAuthorsActions.getAuthors({ payload: authors })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authorService: AuthorService
  ) {}
}

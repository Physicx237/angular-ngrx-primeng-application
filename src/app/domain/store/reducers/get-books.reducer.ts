import { createReducer, on } from '@ngrx/store';
import * as GetBooksActions from 'src/app/domain/store/actions/get-books.action';
import { BookState } from '../../interfaces/book.state';

export const initialState: BookState = {
  books: [],
};

export const getBooksReducer = createReducer(
  initialState,
  on(GetBooksActions.getBooks, (state, { payload }) => ({
    ...state,
    books: payload,
  }))
);

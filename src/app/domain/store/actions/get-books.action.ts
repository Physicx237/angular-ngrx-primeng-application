import { createAction, props } from '@ngrx/store';
import { Book } from '../../models/book.type';

export const getBooksEffect = createAction('[Book Form Page] Get Books');
export const getBooks = createAction(
  '[Books API] Books Loaded Success',
  props<{ payload: Book[] }>()
);
import { createAction, props } from '@ngrx/store';
import { Author } from '../../models/author.type';

export const getAuthorsEffect = createAction('[Author Form Page] Get Authors');
export const getAuthors = createAction(
  '[Authors API] Authors Loaded Success',
  props<{ payload: Author[] }>()
);


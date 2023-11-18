import { createSelector } from '@ngrx/store';
import { Book } from '../../models/book.type';

export interface FeatureState {
  books: Book[];
}

export interface AppState {
  books: FeatureState;
}

export const selectFeature = (state: AppState) => state.books;

export const selectFeatureBooks = createSelector(
  selectFeature,
  (state: FeatureState) => state.books
);
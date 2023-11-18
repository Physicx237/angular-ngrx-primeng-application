import { createSelector } from '@ngrx/store';
import { Author } from '../../models/author.type';

export interface FeatureState {
  authors: Author[];
}

export interface AppState {
  authors: FeatureState;
}

export const selectFeature = (state: AppState) => state.authors;

export const selectFeatureAuthors = createSelector(
  selectFeature,
  (state: FeatureState) => state.authors
);

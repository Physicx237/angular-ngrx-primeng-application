import { createReducer, on } from '@ngrx/store';
import * as GetAuthorsActions from 'src/app/domain/store/actions/get-authors.action';
import { AuthorState } from '../../interfaces/author.state';

export const initialState: AuthorState = {
  authors: [],
};

export const getAuthorsReducer = createReducer(
  initialState,
  on(GetAuthorsActions.getAuthors, (state, { payload }) => ({
    ...state,
    authors: payload,
  }))
);

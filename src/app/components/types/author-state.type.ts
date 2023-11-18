import { Author } from 'src/app/domain/models/author.type';

export type AuthorStateType = {
  authors: {
    authors: Author[];
  };
};

import { Book } from 'src/app/domain/models/book.type';

export type BookStateType = {
  books: {
    books: Book[];
  };
};

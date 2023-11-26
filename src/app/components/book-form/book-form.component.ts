import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import * as GetAuthorsActions from 'src/app/domain/store/actions/get-authors.action';
import * as GetBooksActions from 'src/app/domain/store/actions/get-books.action';
import { selectFeatureAuthors } from 'src/app/domain/store/selectors/author.selector';
import { AuthorStateType } from '../types/author-state.type';
import { BookPort } from 'src/app/domain/ports/book.interface';
import { BOOK_SERVICE } from '../app.config';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CommonModule,
    InputMaskModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormComponent implements OnInit {
  bookForm = new FormGroup({
    author: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    title: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ],
      nonNullable: true,
    }),
    bookmaker: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ],
      nonNullable: true,
    }),
    year: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  authors$: Observable<any>;

  constructor(
    @Inject(BOOK_SERVICE) private bookService: BookPort,
    private store: Store<AuthorStateType>
  ) {
    this.authors$ = this.store
      .select(selectFeatureAuthors)
      .pipe(
        map((authors) =>
          authors.map(
            (author) =>
              `${author.lastName} ${author.firstName} ${author.patronymic}`
          )
        )
      );
  }

  get author() {
    return this.bookForm.get('author');
  }

  get title() {
    return this.bookForm.get('title');
  }

  get bookmaker() {
    return this.bookForm.get('bookmaker');
  }

  get year() {
    return this.bookForm.get('year');
  }

  onSubmit() {
    const bookForm = this.bookForm.getRawValue();

    if (this.bookForm.valid) {
      this.bookService.addBook(bookForm);
    }

    this.store.dispatch(GetAuthorsActions.getAuthorsEffect());
    this.store.dispatch(GetBooksActions.getBooksEffect());
  }

  ngOnInit() {
    this.store.dispatch(GetAuthorsActions.getAuthorsEffect());
  }
}

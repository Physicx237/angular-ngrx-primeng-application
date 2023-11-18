import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookFormComponent } from '../book-form/book-form.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Observable, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import * as GetBooksActions from 'src/app/domain/store/actions/get-books.action';
import { selectFeatureBooks } from 'src/app/domain/store/selectors/book.selector';
import { BookStateType } from '../types/book-state.type';
import { Book } from 'src/app/domain/models/book.type';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css'],
  standalone: true,
  imports: [BookFormComponent, TableModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookTableComponent implements OnInit {
  books!: Book[];

  cols!: Column[];

  constructor(private store: Store<BookStateType>) {}

  ngOnInit() {
    this.store
      .select(selectFeatureBooks)
      .pipe(filter((books) => books.length !== 0))
      .subscribe((books) => {
        this.books = books.map((book) => {
          return { ...book };
        });
      });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'author', header: 'Автор' },
      { field: 'title', header: 'Название' },
      { field: 'bookmaker', header: 'Издатель' },
      { field: 'year', header: 'Год' },
    ];

    this.store.dispatch(GetBooksActions.getBooksEffect());
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthorFormComponent } from '../author-form/author-form.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { OperatorFunction, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import * as GetAuthorsActions from 'src/app/domain/store/actions/get-authors.action';
import { selectFeatureAuthors } from 'src/app/domain/store/selectors/author.selector';
import { AuthorStateType } from '../types/author-state.type';
import { Author } from 'src/app/domain/models/author.type';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.css'],
  standalone: true,
  imports: [AuthorFormComponent, TableModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorTableComponent implements OnInit {
  authors!: Author[];

  cols!: Column[];

  constructor(private store: Store<AuthorStateType>) {}

  ngOnInit() {
    this.store
      .select(selectFeatureAuthors)
      .pipe(filter((authors) => authors.length !== 0))
      .subscribe((authors) => {
        this.authors = authors.map((author) => {
          return { ...author };
        });
      });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'lastName', header: 'Фамилия' },
      { field: 'firstName', header: 'Имя' },
      { field: 'patronymic', header: 'Отчество' },
      { field: 'dateOfBirth', header: 'Дата Рождения' },
    ];

    this.store.dispatch(GetAuthorsActions.getAuthorsEffect());
  }
}

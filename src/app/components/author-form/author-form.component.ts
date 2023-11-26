import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { Store } from '@ngrx/store';
import * as GetAuthorsActions from 'src/app/domain/store/actions/get-authors.action';
import { AuthorStateType } from '../types/author-state.type';
import { AUTHOR_SERVICE } from '../app.config';
import { AuthorPort } from 'src/app/domain/ports/author.interface';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
  ],
})
export class AuthorFormComponent {
  authorForm = new FormGroup({
    lastName: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ],
      nonNullable: true,
    }),
    firstName: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ],
      nonNullable: true,
    }),
    patronymic: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ],
      nonNullable: true,
    }),
    dateOfBirth: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    @Inject(AUTHOR_SERVICE) private authorService: AuthorPort,
    private store: Store<AuthorStateType>
  ) {
    this.store.select((state) => state.authors.authors);
  }

  get lastName() {
    return this.authorForm.get('lastName');
  }

  get firstName() {
    return this.authorForm.get('firstName');
  }

  get patronymic() {
    return this.authorForm.get('patronymic');
  }

  get dateOfBirth() {
    return this.authorForm.get('dateOfBirth');
  }

  onSubmit() {
    const authorForm = this.authorForm.getRawValue();

    if (this.authorForm.valid) {
      this.authorService.addAuthor(authorForm);
      this.store.dispatch(GetAuthorsActions.getAuthorsEffect());
    }
  }
}

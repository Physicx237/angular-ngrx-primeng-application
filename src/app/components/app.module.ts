import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthorFormComponent } from './author-form/author-form.component';
import { BookFormComponent } from './book-form/book-form.component';
import { AuthorTableComponent } from './author-table/author-table.component';
import { BookTableComponent } from './book-table/book-table.component';
import { AuthorService } from '../adapters/author.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthorsEffect } from '../domain/store/effects/author.effect';
import { getAuthorsReducer } from '../domain/store/reducers/get-authors.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { getBooksReducer } from '../domain/store/reducers/get-books.reducer';
import { BooksEffect } from '../domain/store/effects/book.effect';
import { BookService } from '../adapters/book.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ authors: getAuthorsReducer, books: getBooksReducer }),
    EffectsModule.forRoot(AuthorsEffect, BooksEffect),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HeaderComponent,
    AuthorFormComponent,
    BookFormComponent,
    AuthorTableComponent,
    BookTableComponent,
  ],
  providers: [AuthorService, BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}

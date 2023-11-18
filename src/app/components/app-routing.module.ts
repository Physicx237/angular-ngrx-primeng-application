import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorTableComponent } from './author-table/author-table.component';
import { BookTableComponent } from './book-table/book-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/authors', pathMatch: 'full' },
  { path: 'authors', component: AuthorTableComponent },
  { path: 'books', component: BookTableComponent },
  { path: '**', redirectTo: '/authors', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

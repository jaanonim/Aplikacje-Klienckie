import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { EntryComponent } from './entry/entry.component';
import { YearComponent } from './year/year.component';

const routes: Routes = [
  { path: '', component: EntryComponent },
  {
    path: ':category',
    component: CategoryComponent,
    children: [{ path: ':year', component: YearComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

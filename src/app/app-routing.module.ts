import {TodoDetailComponent} from './todo-detail/todo-detail.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoCreateComponent} from './todo-create/todo-create.component';

export const routes: Routes = [
  {path: '', component: TodoListComponent, pathMatch: 'full'},
  {path: 'todos/:id', component: TodoDetailComponent},
  {path: 'new', component: TodoCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

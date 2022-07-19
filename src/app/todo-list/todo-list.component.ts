import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {selectTodosSortedByClosingDate} from '../store/selectors';
import {changeTodoStateAction, loadTodosAction} from '../store/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectTodosSortedByClosingDate);
  }

  ngOnInit(): void {
     this.store.dispatch(loadTodosAction());
  }

  changeTodoState(todo: Todo): void {
    const updatedClosed = !todo.isClosed;
    const updatedTodo: Todo = {
      ...todo,
      isClosed: updatedClosed,
      // If Todo is not closed, reset its closingDate attribute
      closingDate: (updatedClosed) ? new Date() : undefined
    };
    console.log(`Change state for '${updatedTodo.title}' from ${todo.isClosed} to ${updatedTodo.isClosed}`);
    this.store.dispatch(changeTodoStateAction({todo: updatedTodo}));
  }

}

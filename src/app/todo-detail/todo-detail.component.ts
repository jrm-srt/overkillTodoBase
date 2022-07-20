import { switchMap } from 'rxjs/operators';
import { selectSelectedTodo } from './../store/selectors';
import { changeTodoStateAction, getTodoByIdAction } from './../store/actions';
import { Todo } from './../models/todo';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo$: Observable<Todo | undefined> = EMPTY;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.todo$ = this.store.select(selectSelectedTodo);
  }

  ngOnInit(): void {
    // Retrieve Todo from back-end based on the ID in the URL params
    this.route.paramMap.pipe(
      switchMap(params => {
        return of(Number(params.get('id')));
      })
    ).subscribe(
      {
        next: (id) => this.store.dispatch(getTodoByIdAction({id}))
      }
    );
  }

  changeState(todo: Todo): void {
    const updatedClosed = !todo.isClosed;
    const updatedTodo: Todo = {
      ...todo,
      isClosed: updatedClosed,
      // If Todo is not closed, reset its closingDate attribute
      closingDate: (updatedClosed) ? new Date() : undefined
    };
    console.log(`Change state for '${updatedTodo.title}' from  ${todo.isClosed} to  ${updatedTodo.isClosed}`);
    this.store.dispatch(changeTodoStateAction({todo: updatedTodo}));
  }

}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  loadTodosAction, loadTodosFailedAction, loadTodosSuccessAction,
  changeTodoStateAction, changeTodoStateSuccessAction, changeTodoStateFailedAction,
  getTodoByIdAction, getTodoByIdSuccessAction, getTodoByIdFailedAction,
  createTodoAction, createTodoSuccessAction, createTodoFailedAction
} from './actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {TodoService} from '../services/todo.service';
import {Router} from '@angular/router';

@Injectable()
export class Effects {
  loadTodosEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodosAction),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccessAction({todos})),
          catchError(() => [loadTodosFailedAction()])
        )
      )
    )
  );

  changeTodoStateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeTodoStateAction),
      mergeMap(action =>
        this.todoService.update(action.todo).pipe(
          map((todo) => changeTodoStateSuccessAction({todo})),
          catchError(() => [changeTodoStateFailedAction()])
        )
      )
    )
  );

  getTodoByIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodoByIdAction),
      mergeMap(action =>
        this.todoService.getById(action.id).pipe(
          map((todo) => getTodoByIdSuccessAction({todo})),
          catchError(() => [getTodoByIdFailedAction()])
        )
      )
    )
  );

  createTodoEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodoAction),
      mergeMap(action =>
        this.todoService.create(action.todo).pipe(
          map((todo) => createTodoSuccessAction({todo})),
          catchError(() => [createTodoFailedAction()])
        )
      )
    )
  );

  createTodoSuccessEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(createTodoSuccessAction),
        tap(action => {
          this.router.navigate(['/todos', action.todo.id]);
        })
      );
    },
    {dispatch: false}
  );

  // TODO: I was forced to make router public in order to use it in tests...
  constructor(private actions$: Actions, private todoService: TodoService, public router: Router) {
  }
}

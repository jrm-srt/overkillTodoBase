import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodosAction, loadTodosFailedAction, loadTodosSuccessAction, changeTodoStateAction, changeTodoStateSuccessAction, changeTodoStateFailedAction, getTodoByIdAction, getTodoByIdSuccessAction, getTodoByIdFailedAction } from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

@Injectable()
export class Effects {
  loadTodosEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodosAction),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccessAction({ todos })),
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
          map((todo) => changeTodoStateSuccessAction({ todo })),
          catchError(() => [changeTodoStateFailedAction()])
        )
      )
    )
  );

  getTodoByIdEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodoByIdAction),
      mergeMap(action =>
        this.todoService.get(action.id).pipe(
          map((todo) => getTodoByIdSuccessAction({ todo })),
          catchError(() => [getTodoByIdFailedAction()])
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}

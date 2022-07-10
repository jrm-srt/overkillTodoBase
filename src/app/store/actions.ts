import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

// Load Todos
export const loadTodosAction = createAction('[Todos] Load todos');

export const loadTodosSuccessAction = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailedAction = createAction('[Todos] Load todos failed');



// Change Todo state
export const changeTodoStateAction = createAction(
  '[Todos] Change todo state',
  props<{ todo: Todo }>()
);

export const changeTodoStateSuccessAction = createAction(
  '[Todos] Change todo state success',
  props<{ todo: Todo }>()
);

export const changeTodoStateFailedAction = createAction('[Todos] Change todo state failed');



// Get Todo
export const getTodoByIdAction = createAction(
  '[Todos] Get Todo',
  props<{ id: number}>()
);

export const getTodoByIdSuccessAction = createAction(
  '[Todos] Get todo success',
  props<{ todo: Todo }>()
);

export const getTodoByIdFailedAction = createAction('[Todos] Get todo failed');

import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {loadTodosSuccessAction} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
}

export const initialState: State = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccessAction,
    (state, { todos }) => ({
      ...state,
      todos
    })
  ),
);

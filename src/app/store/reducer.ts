import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import { loadTodosSuccessAction, changeTodoStateSuccessAction, getTodoByIdSuccessAction } from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
  selectedTodo?: Todo;
}

export const initialState: State = {
  todos: [],
  selectedTodo: undefined
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
  // Update store with the new value for the updated TODO without requesting back-end for complete TODO list
  on(
    changeTodoStateSuccessAction,
    (state, { todo }) =>
      {
        const index = state.todos.findIndex(t => t.id === todo.id);
        const updatedTodos = [...state.todos];
        updatedTodos[index] = todo;

        return ({
        ...state,
        todos: updatedTodos
      });
    }
  ),
  // Select TODO
  on(
    getTodoByIdSuccessAction,
    (state, { todo }) => ({
      ...state,
      selectedTodo: todo
    })
  )
);


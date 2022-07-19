import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {
  loadTodosSuccessAction,
  changeTodoStateSuccessAction,
  getTodoByIdSuccessAction,
  createTodoSuccessAction
} from './actions';
import {selectSelectedTodo} from './selectors';

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
    // Update store with list of all available Todos
    loadTodosSuccessAction,
    (state, {todos}) => ({
      ...state,
      todos,
      // Reset selected Todo everytime we request the list of Todos.
      // It allows us to avoid displaying information about the previously selected Todo, when we select a new one.
      selectedTodo: undefined
    })
  ),
  // Update store with the new value for the updated Todo without requesting back-end for complete Todo list
  on(
    changeTodoStateSuccessAction,
    (state, {todo}) => {
      const index = state.todos.findIndex(t => t.id === todo.id);
      const updatedTodos = [...state.todos];
      updatedTodos[index] = todo;

      return ({
        ...state,
        todos: updatedTodos
      });
    }
  ),
  // Select a Todo
  on(
    getTodoByIdSuccessAction,
    (state, {todo}) => ({
      ...state,
      selectedTodo: todo
    })
  ),
  // Create a Todo
  on(
    createTodoSuccessAction,
    (state, {todo}) => {
      const updatedTodos = [todo, ...state.todos];

      return ({
        ...state,
        todos: updatedTodos,
        selectedTodo: todo
      });
    }
  )
);


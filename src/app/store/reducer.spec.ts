import * as fromReducer from './reducer';
import { State } from './reducer';
import { loadTodosSuccessAction, changeTodoStateSuccessAction, getTodoByIdSuccessAction } from './actions';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccessAction action', () => {
    it('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = { todos: [{ id: 1, title: 'aTitle', isClosed: false }], selectedTodo: undefined };
      const action = loadTodosSuccessAction({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('changeTodoStateSuccessAction action', () => {
    it('should update the state with the returned todo', () => {
      const closedDate = new Date();
      const updatedTodo = { id: 1, title: 'new title', isClosed: true, closedDate: closedDate };
      const initialState = { todos: [{ id: 1, title: 'initial title', isClosed: false }], selectedTodo: undefined };
      const newState: State = { todos: [updatedTodo], selectedTodo: undefined };
      const action = changeTodoStateSuccessAction({
        todo: updatedTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('getTodoByIdSuccessAction action', () => {
    it('should update the selected todo with the returned todo', () => {
      const closedDate = new Date();
      const retrievedTodo = { id: 1, title: 'new title', isClosed: true, closedDate: closedDate };
      const initialTodos = [{ id: 1, title: 'initial title', isClosed: false }];
      const initialState = { todos: initialTodos, selectedTodo: undefined };
      const newState: State = { todos: initialTodos, selectedTodo: retrievedTodo };
      const action = getTodoByIdSuccessAction({
        todo: retrievedTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});

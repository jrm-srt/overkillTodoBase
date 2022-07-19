import * as fromReducer from './reducer';
import {State} from './reducer';
import {
  loadTodosSuccessAction,
  changeTodoStateSuccessAction,
  getTodoByIdSuccessAction,
  createTodoSuccessAction
} from './actions';
import {Todo} from '../models/todo';

describe('Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const {initialState} = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadTodosSuccessAction action', () => {
    it('should retrieve all todos and update the state', () => {
      const {initialState} = fromReducer;
      const newState: State = {
        todos: [{id: 1, title: 'aTitle', creationDate: new Date(), isClosed: false}],
        selectedTodo: undefined
      };

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
      const closingDate = new Date();
      const updatedTodo: Todo = {id: 1, title: 'new title', creationDate: new Date(), isClosed: true, closingDate};
      const initialState: State = {
        todos: [{id: 1, title: 'initial title', creationDate: new Date(), isClosed: false}],
        selectedTodo: undefined
      };
      const newState: State = {todos: [updatedTodo], selectedTodo: undefined};

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
      const closingDate = new Date();
      const retrievedTodo: Todo = {id: 1, title: 'new title', creationDate: new Date(), isClosed: true, closingDate};
      const initialTodos: Todo[] = [{id: 1, title: 'initial title', creationDate: new Date(), isClosed: false}];
      const initialState: State = {todos: initialTodos, selectedTodo: undefined};
      const newState: State = {todos: initialTodos, selectedTodo: retrievedTodo};

      const action = getTodoByIdSuccessAction({
        todo: retrievedTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe('createTodoSuccessAction action', () => {
    it('should update the selected todo with the returned todo and update the todos list', () => {
      const creationDate = new Date();
      const createdTodo: Todo = {id: 2, title: 'new title', isClosed: true, creationDate};
      const initialTodos: Todo[] = [{id: 1, title: 'initial title', creationDate: new Date(), isClosed: false}];
      const updatedTodos: Todo[] = [
        {id: 2, title: 'new title', isClosed: true, creationDate},
        {id: 1, title: 'initial title', creationDate: new Date(), isClosed: false}
      ];
      const initialState: State = {todos: initialTodos, selectedTodo: undefined};
      const newState: State = {todos: updatedTodos, selectedTodo: createdTodo};

      const action = createTodoSuccessAction({
        todo: createdTodo,
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});

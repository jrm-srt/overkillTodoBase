import { Todo } from '../models/todo';
import {State} from './reducer';
import { selectTodos, selectTodosSortedByClosedDate } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
    {id: 1, title: 'todo1Title', isClosed: true, closedDate: new Date('2022-06-02T10:00:00.000Z')},
    {id: 2, title: 'todo2Title', isClosed: false},
    {id: 3, title: 'todo3Title', isClosed: true, closedDate: new Date('2022-06-01T10:00:00.000Z')},
    {id: 4, title: 'todo4Title', isClosed: false},
   ]
  };

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select todos list sorted closedDate', () => {
    const sortedTodos: Todo[] = [
      {id: 2, title: 'todo2Title', isClosed: false},
      {id: 4, title: 'todo4Title', isClosed: false},
      {id: 3, title: 'todo3Title', isClosed: true, closedDate: new Date('2022-06-01T10:00:00.000Z')},
      {id: 1, title: 'todo1Title', isClosed: true, closedDate: new Date('2022-06-02T10:00:00.000Z')},
    ];
    const result = selectTodosSortedByClosedDate.projector(initialState);
    expect(result).toEqual(sortedTodos);
  });
});

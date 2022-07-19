import {State} from './reducer';
import {selectTodos, selectTodosSortedByClosingDate} from './selectors';
import * as mocks from '../../../tests/spec/mocks/selectors-mocks';

describe('Selectors', () => {
  const initialState: State = mocks.SelectorsMocks.mockInitialState;

  it('should select todos list', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });

  it('should select todos list sorted by creationDate for open todos and closingDate for closed todos', () => {
    const result = selectTodosSortedByClosingDate.projector(initialState);
    expect(result).toEqual(mocks.SelectorsMocks.mockSortedTodos);
  });
});

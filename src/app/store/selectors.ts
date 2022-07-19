import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Todo } from '../models/todo';
import {featureKey, State} from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

/**
 * Selector used to retrieve Todos sorted by status and closingDate.
 */
export const selectTodosSortedByClosingDate = createSelector(
  getState,
  (state: State) => state.todos.slice().sort(sortByClosingDate),
);

/**
 * Get the selected Todo (for the "details" view).
 * @returns the selected Todo.
 */
export const selectSelectedTodo = createSelector(
  getState,
  (state: State) => state.selectedTodo
);

/**
 * Sort Todos by closingDate.
 * - Open Todos will be first, sorted by ID.
 * - Then closed Todos, ordered by closingDate (meaning the last closed Todo will be at the end of the list).
 *
 * @param a first item to compare.
 * @param b second item to compare.
 * @returns a positive number if a > b, a negative number if a < b, 0 if a == b.
 */
function sortByClosingDate(a: Todo, b: Todo): number {
  // TODO: Step 4 - Filter by CreationDate if isClosed == false
  let result: number;

  if (!a.closingDate && !b.closingDate) {
    result = (a.creationDate > b.creationDate) ? -1 : 1;
    // result = a.id - b.id;
  } else if (!a.closingDate){
    result = -1;
  } else if (!b.closingDate) {
    result = 1;
  } else if (a.closingDate && b.closingDate) {
    result = new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime();
  } else {
    result = 2;
  }

  return result;
}

import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Todo } from '../models/todo';
import {featureKey, State} from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

/**
 * Selector used to retrieve Todos sorted by status and closedDate.
 */
export const selectTodosSortedByClosedDate = createSelector(
  getState,
  (state: State) => state.todos.slice().sort(sortByClosedDate),
);

/**
 * Get the selected TODO (for the "details" view).
 * @returns the selected TODO.
 */
export const selectSelectedTodo = createSelector(
  getState,
  (state: State) => state.selectedTodo
)

/**
 * Sort Todos by closedDate.
 * - Open Todos will be first, sorted by ID.
 * - Then closed Todos, ordered by closedDate (meaning the last closed Todo will be at the end of the list).
 *
 * @param a first item to compare.
 * @param b second item to compare.
 * @returns a positive number if a > b, a negative number if a < b, 0 if a == b.
 */
function sortByClosedDate(a: Todo, b: Todo): number {
  let result = 0;

  if (!a.closedDate && !b.closedDate){
    result = a.id - b.id;
  } else if (!a.closedDate){
    result = -1;
  } else if (!b.closedDate) {
    result = 1;
  } else if (a.closedDate && b.closedDate) {
    result = new Date(a.closedDate).getTime() - new Date(b.closedDate).getTime();
  } else {
    result = 2;
  }

  return result;
}

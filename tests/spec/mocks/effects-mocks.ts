import {Todo} from '../../../src/app/models/todo';

export abstract class EffectsMocks {
  static mockedTodos: Todo[] = [{id: 1, title: 'aTitle', creationDate: new Date(), isClosed: false}];
  static mockedTodo: Todo = {id: 1, title: 'aTitle', creationDate: new Date(), isClosed: false};
}

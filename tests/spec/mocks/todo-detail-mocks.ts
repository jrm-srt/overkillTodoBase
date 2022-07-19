import {Todo} from '../../../src/app/models/todo';

export abstract class TodoDetailMocks {
  static mockSelectedTodo: Todo = {
    id: 1,
    title: 'todo 1',
    creationDate: new Date(),
    isClosed: false,
    description: 'any description'
  };
}

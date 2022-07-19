import {Todo} from '../../../src/app/models/todo';

export abstract class TodoListMocks {
  static mockSelectTodos: Todo[] = [
    {id: 1, title: 'todo 1', creationDate: new Date(), isClosed: false},
    {id: 2, title: 'todo 2', creationDate: new Date(), isClosed: true},
  ];

  static mockSelectTodosSortedByClosingDate: Todo[] = [
    {id: 2, title: 'todo 2', creationDate: new Date(), isClosed: false},
    {id: 4, title: 'todo 4', creationDate: new Date(), isClosed: false},
    {
      id: 3,
      title: 'todo 3',
      creationDate: new Date(),
      isClosed: true,
      closingDate: new Date('2022-06-01T10:00:00.000Z')
    },
    {
      id: 1,
      title: 'todo 1',
      creationDate: new Date(),
      isClosed: true,
      closingDate: new Date('2022-06-02T10:00:00.000Z')
    },
  ];
}

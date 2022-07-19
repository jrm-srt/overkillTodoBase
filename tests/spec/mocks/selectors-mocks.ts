import {State} from '../../../src/app/store/reducer';
import {Todo} from '../../../src/app/models/todo';

export abstract class SelectorsMocks {
  static mockInitialState: State = {
    todos: [
      {
        id: 1,
        title: 'todo1Title',
        creationDate: new Date('2022-01-01T10:00:00'),
        isClosed: true,
        closingDate: new Date('2022-06-02T10:00:00.000Z')
      },
      {
        id: 2,
        title: 'todo2Title',
        creationDate: new Date('2022-01-02T10:00:00'),
        isClosed: false
      },
      {
        id: 3,
        title: 'todo3Title',
        creationDate: new Date('2022-01-03T10:00:00'),
        isClosed: true,
        closingDate: new Date('2022-06-01T10:00:00.000Z')
      },
      {
        id: 4,
        title: 'todo4Title',
        creationDate: new Date('2022-01-04T10:00:00'),
        isClosed: false
      },
    ]
  };

  static mockSortedTodos: Todo[] = [
    {
      id: 4,
      title: 'todo4Title',
      creationDate: new Date('2022-01-04T10:00:00'),
      isClosed: false
    },
    {
      id: 2,
      title: 'todo2Title',
      creationDate: new Date('2022-01-02T10:00:00'),
      isClosed: false
    },
    {
      id: 3,
      title: 'todo3Title',
      creationDate: new Date('2022-01-03T10:00:00'),
      isClosed: true,
      closingDate: new Date('2022-06-01T10:00:00.000Z')
    },
    {
      id: 1,
      title: 'todo1Title',
      creationDate: new Date('2022-01-01T10:00:00'),
      isClosed: true,
      closingDate: new Date('2022-06-02T10:00:00.000Z')
    },
  ];
}

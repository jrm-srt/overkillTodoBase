import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { id: 1, title: 'todo in memory 1', isClosed: false, description: 'First thing to do in the morning is to wake up... Hardest thing on earth...' },
      { id: 2,title: 'todo in memory 2', isClosed: false, description: 'Take a shower' },
      { id: 3,title: 'todo in memory 3', isClosed: true, closedDate: new Date('2022-06-01T10:00:00.000Z'), description: 'Take breakfast' },
      { id: 4,title: 'todo in memory 4', isClosed: false, description: 'Take over the world' },
    ];
    return { todos };
  }

}

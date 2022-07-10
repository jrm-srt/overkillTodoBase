import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Effects } from './effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { todosReducer } from './reducer';
import { TodoService } from '../services/todo.service';
import { cold, hot } from 'jasmine-marbles';
import { loadTodosAction, loadTodosFailedAction, loadTodosSuccessAction, changeTodoStateAction, changeTodoStateSuccessAction, changeTodoStateFailedAction } from './actions';
import { Todo } from '../models/todo';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', ['list', 'update']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ todosStore: todosReducer })],
      providers: [
        Effects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });

    effects = TestBed.inject(Effects);
  });

  describe('loadTodosEffect$', () => {
    it('should dispatch loadTodosSuccessAction action when todoService.list returns a result', () => {
      const mockedTodos: Todo[] = [{ id: 1, title: 'aTitle', isClosed: false }];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: loadTodosAction(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccessAction({ todos: mockedTodos }),
      });

      expect(effects.loadTodosEffect$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailedAction action when todoService.list fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: loadTodosAction(),
      });
      const expected = cold('-b-', {
        b: loadTodosFailedAction(),
      });

      expect(effects.loadTodosEffect$).toBeObservable(expected);
    });
  });

  describe('changeTodoStateEffect$', () => {
    it('should dispatch changeTodoStateAction action when todoService.update returns a result', () => {
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: false };
      todoService.update.and.returnValue(of(mockedTodo));

      actions = hot('-a-', {
        a: changeTodoStateAction({ todo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: changeTodoStateSuccessAction({ todo: mockedTodo }),
      });

      expect(effects.changeTodoStateEffect$).toBeObservable(expected);
    });

    it('should dispatch changeTodoStateFailed action when todoService.update fails', () => {
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: false };
      todoService.update.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: changeTodoStateAction({ todo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: changeTodoStateFailedAction(),
      });

      expect(effects.changeTodoStateEffect$).toBeObservable(expected);
    });
  });

  describe('changeTodoStateSuccessEffect$', () => {
    it('should dispatch loadTodosSuccessAction action when todoService.list returns a result', () => {
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: false };
      const mockedTodos: Todo[] = [mockedTodo];
      todoService.list.and.returnValue(of(mockedTodos));

      actions = hot('-a-', {
        a: changeTodoStateSuccessAction({ todo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccessAction({ todos: mockedTodos }),
      });

      expect(effects.changeTodoStateSuccessEffect$).toBeObservable(expected);
    });

    it('should dispatch loadTodosFailedAction action when todoService.list fails', () => {
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: false };
      todoService.list.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: changeTodoStateSuccessAction({ todo: mockedTodo }),
      });
      const expected = cold('-b-', {
        b: loadTodosFailedAction(),
      });

      expect(effects.changeTodoStateSuccessEffect$).toBeObservable(expected);
    });
  });
});

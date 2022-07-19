import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {Effects} from './effects';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';
import {Actions} from '@ngrx/effects';
import {todosReducer} from './reducer';
import {TodoService} from '../services/todo.service';
import {cold, hot} from 'jasmine-marbles';
import {
  loadTodosAction, loadTodosFailedAction, loadTodosSuccessAction,
  changeTodoStateAction, changeTodoStateSuccessAction, changeTodoStateFailedAction,
  getTodoByIdAction, getTodoByIdSuccessAction, getTodoByIdFailedAction,
  createTodoAction, createTodoFailedAction, createTodoSuccessAction
} from './actions';

import * as mocks from '../../../tests/spec/mocks/effects-mocks';
import {ActivatedRoute, convertToParamMap, Router, RouterModule, RouterOutlet} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import Spy = jasmine.Spy;
import {MockBuilder, MockedComponentFixture, MockRender} from 'ng-mocks';

describe('Effects', () => {
  let effects: Effects;
  let actions: Observable<Actions>;
  let router: Router;

  const todoService = jasmine.createSpyObj<TodoService>(
    'TodoService',
    ['list', 'update', 'create', 'getById']
  );
  /*let routerSpyOn: Spy;*/
  const routerSpy = jasmine.createSpyObj(
    'Router',
    ['navigate']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({todosStore: todosReducer}),
        RouterTestingModule
      ],
      providers: [
        Effects,
        // TODO: required or not?
        Router,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: todoService,
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ],
    }).compileComponents();

    effects = TestBed.inject(Effects);
    router = TestBed.inject(Router);
    /*routerSpyOn = spyOn(router, 'navigate');*/
  });

  describe('loadTodosEffect$', () => {
    it('should dispatch loadTodosSuccessAction action when todoService.list returns a result', () => {
      todoService.list.and.returnValue(of(mocks.EffectsMocks.mockedTodos));

      actions = hot('-a-', {
        a: loadTodosAction(),
      });
      const expected = cold('-b-', {
        b: loadTodosSuccessAction({todos: mocks.EffectsMocks.mockedTodos}),
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
    it('should dispatch changeTodoStateSuccessAction action when todoService.update returns a result', () => {
      todoService.update.and.returnValue(of(mocks.EffectsMocks.mockedTodo));

      actions = hot('-a-', {
        a: changeTodoStateAction({todo: mocks.EffectsMocks.mockedTodo}),
      });
      const expected = cold('-b-', {
        b: changeTodoStateSuccessAction({todo: mocks.EffectsMocks.mockedTodo}),
      });

      expect(effects.changeTodoStateEffect$).toBeObservable(expected);
    });

    it('should dispatch changeTodoStateFailedAction action when todoService.update fails', () => {
      todoService.update.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: changeTodoStateAction({todo: mocks.EffectsMocks.mockedTodo}),
      });
      const expected = cold('-b-', {
        b: changeTodoStateFailedAction(),
      });

      expect(effects.changeTodoStateEffect$).toBeObservable(expected);
    });
  });

  describe('getTodoByIdEffect$', () => {
    it('should dispatch getTodoByIdSuccessAction action when todoService.getById returns a result', () => {
      todoService.getById.and.returnValue(of(mocks.EffectsMocks.mockedTodo));

      actions = hot('-a-', {
        a: getTodoByIdAction({id: 1}),
      });
      const expected = cold('-b-', {
        b: getTodoByIdSuccessAction({todo: mocks.EffectsMocks.mockedTodo}),
      });

      expect(effects.getTodoByIdEffect$).toBeObservable(expected);
    });

    it('should dispatch getTodoByIdFailedAction action when todoService.getById fails', () => {
      todoService.getById.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: getTodoByIdAction({id: 1}),
      });
      const expected = cold('-b-', {
        b: getTodoByIdFailedAction(),
      });

      expect(effects.getTodoByIdEffect$).toBeObservable(expected);
    });
  });

  describe('createTodoEffect$', () => {
    it('should dispatch createTodoSuccessAction action when todoService.create returns a result', () => {
      todoService.create.and.returnValue(of(mocks.EffectsMocks.mockedTodo));

      actions = hot('-a-', {
        a: createTodoAction({todo: mocks.EffectsMocks.mockedTodo}),
      });
      const expected = cold('-b-', {
        b: createTodoSuccessAction({todo: mocks.EffectsMocks.mockedTodo}),
      });

      expect(effects.createTodoEffect$).toBeObservable(expected);
    });

    it('should dispatch createTodoFailedAction action when todoService.create fails', () => {
      todoService.create.and.returnValue(cold('#'));

      actions = hot('-a-', {
        a: createTodoAction({todo: mocks.EffectsMocks.mockedTodo}),
      });
      const expected = cold('-b-', {
        b: createTodoFailedAction(),
      });

      expect(effects.createTodoEffect$).toBeObservable(expected);
    });
  });


  describe('createTodoSuccessEffect$', () => {
    it('should navigate to the details page of the created todo', () => {
      todoService.create.and.returnValue(of(mocks.EffectsMocks.mockedTodo));

      actions = hot('-a-', {
        a: createTodoSuccessAction({todo: mocks.EffectsMocks.mockedTodo}),
      });

      // TODO: I was forced to make router public in order to use it in tests...
      expect(routerSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/todos', mocks.EffectsMocks.mockedTodo.id]);
      expect(effects.router.navigate).toHaveBeenCalled();
    });
  });
});

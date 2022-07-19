import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { first } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list todos', (done: DoneFn) => {
    const mockedTodoList: Todo[] = [{ id: 1, title: 'todoTitle', creationDate: new Date(), isClosed: true }];

    service
      .list()
      .pipe(first())
      .subscribe((res: Todo[]) => {
        expect(res).toEqual(mockedTodoList);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTodoList);
  });

  it('should update todos', (done: DoneFn) => {
    const closingDate: Date = new Date();
    const updatedTodo: Todo = {id: 1, title: 'new todoTitle', creationDate: new Date(), isClosed: true, closingDate};

    service
      .update(updatedTodo)
      .pipe(first())
      .subscribe((res: Todo) => {
        expect(res).toEqual(updatedTodo);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos`
    );
    expect(req.request.method).toEqual('PUT');

    req.flush(updatedTodo);
  });

  it('should retrieve a todo by its ID', (done: DoneFn) => {
    const mockedTodo: Todo = { id: 1, title: 'todoTitle', creationDate: new Date(), isClosed: false, description: 'any description' };

    service
      .getById(1)
      .pipe(first())
      .subscribe((res: Todo) => {
        expect(res).toEqual(mockedTodo);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos/1`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTodo);
  });

  it('should create a new todo', (done: DoneFn) => {
    const closingDate: Date = new Date();
    const todoToCreate: Todo = {id: 5, title: 'new todo title', creationDate: new Date(), isClosed: true, closingDate};

    service
      .create(todoToCreate)
      .pipe(first())
      .subscribe((res: Todo) => {
        expect(res).toEqual(todoToCreate);
        done();
      }, done.fail);

    const req = httpMock.expectOne(
      (r) => r.url === `${environment.baseUrl}/api/todos`
    );
    expect(req.request.method).toEqual('POST');

    req.flush(todoToCreate);
  });
});

import { selectTodosSortedByClosedDate } from './../store/selectors';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';
import { selectTodos } from '../store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MockComponents, MockedComponent} from 'ng-mocks';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let mockTodosSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MockComponents(
          MatCheckbox,
          MatListItem,
          MatList,
          MatCardContent,
          MatCardTitle,
          MatCard
        ),
      ],
      imports: [MatRippleModule, FormsModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      { id: 1, title: 'todo 1', isClosed: false },
      { id: 2, title: 'todo 2', isClosed: true },
    ]);
    mockTodosSelector = store.overrideSelector(selectTodosSortedByClosedDate, [
      {id: 2, title: 'todo 2', isClosed: false},
      {id: 4, title: 'todo 4', isClosed: false},
      {id: 3, title: 'todo 3', isClosed: true, closedDate: new Date('2022-06-01T10:00:00.000Z')},
      {id: 1, title: 'todo 1', isClosed: true, closedDate: new Date('2022-06-02T10:00:00.000Z')},
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual(
      'Todos'
    );
  });

  it('should display todos sorted by closedDate', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(4);
    expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain('todo 2');
    expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain('todo 4');
    expect(todoElements[2].query(By.css('h4')).nativeElement.innerText).toContain('todo 3');
    expect(todoElements[3].query(By.css('h4')).nativeElement.innerText).toContain('todo 1');

    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
      expect(todoCheckboxes[0].checked).toBeFalse();
      expect(todoCheckboxes[1].checked).toBeFalse();
      expect(todoCheckboxes[2].checked).toBeTrue();
      expect(todoCheckboxes[3].checked).toBeTrue();
  });

  it('should cross-out closed todos', () => {
    const closedTodoElements = fixture.debugElement.queryAll(By.css('.done'));
    expect(closedTodoElements.length).toEqual(2);
    expect(closedTodoElements[0].nativeElement.innerText).toContain('todo 3');
    expect(closedTodoElements[1].nativeElement.innerText).toContain('todo 1');
  });


  // TODO: check "todo 2" checkBox and assert that it is displayed at the bottom of the list
  // it('should move checked Todo at the bottom of the list', () => {
  //   const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
  //   expect(todoElements.length).toEqual(4);
  //   expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain('todo 2');
  //   expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain('todo 4');
  //   expect(todoElements[2].query(By.css('h4')).nativeElement.innerText).toContain('todo 3');
  //   expect(todoElements[3].query(By.css('h4')).nativeElement.innerText).toContain('todo 1');

  //   const todoCheckboxes: MockedComponent<MatCheckbox>[] =
  //     todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
  //     expect(todoCheckboxes[0].checked).toBeFalse();
  //     expect(todoCheckboxes[1].checked).toBeFalse();
  //     expect(todoCheckboxes[2].checked).toBeTrue();
  //     expect(todoCheckboxes[3].checked).toBeTrue();
  // });
});

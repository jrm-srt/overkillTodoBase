import {selectTodosSortedByClosingDate} from './../store/selectors';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {State} from '../store/reducer';
import {selectTodos} from '../store/selectors';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatList, MatListItem} from '@angular/material/list';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MockComponents, MockedComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';

import * as mocks from '../../../tests/spec/mocks/todo-list-mocks';

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
      imports: [
        MatRippleModule,
        FormsModule
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, mocks.TodoListMocks.mockSelectTodos);
    mockTodosSelector = store.overrideSelector(selectTodosSortedByClosingDate, mocks.TodoListMocks.mockSelectTodosSortedByClosingDate);

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

  // Step 2 tests: Change a Todo state
  it('should display todos sorted by closingDate', () => {
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

  it('should dispatch changeTodoStateAction when checking a Todo', async () => {
    // TODO: to be implemented
  });

  it('should dispatch changeTodoStateAction when unchecking a Todo', async () => {
    // TODO: to be implemented
  });

  // TODO: check "todo 2" checkBox and assert that it is displayed at the bottom of the list?
  it('should move checked Todo at the bottom of the list', () => {
    // TODO: to be implemented
  });

  // Step 3 tests: Detail a Todo
  // Check icon + new URL when clicking ?
  it('should have clickable todos', () => {
    // TODO: to be implemented
    /*const clickableElements = fixture.debugElement.queryAll(By.css('a'));
    expect(clickableElements.length).toEqual(4);
    expect(clickableElements[0].nativeElement.innerText).toContain('todo 2');
    expect(clickableElements[0].nativeElement.getAttribute('routerLink')).toEqual('/api/todos/2');
    expect(clickableElements[1].nativeElement.innerText).toContain('todo 4');
    expect(clickableElements[0].nativeElement.getAttribute('routerLink')).toEqual('/api/todos/4');
    expect(clickableElements[2].nativeElement.innerText).toContain('todo 3');
    expect(clickableElements[0].nativeElement.getAttribute('routerLink')).toEqual('/api/todos/3');
    expect(clickableElements[3].nativeElement.innerText).toContain('todo 1');
    expect(clickableElements[0].nativeElement.getAttribute('routerLink')).toEqual('/api/todos/1');*/
  });

  it('should redirect to the selected Todo details', () => {
    // TODO: to be implemented
  });
});

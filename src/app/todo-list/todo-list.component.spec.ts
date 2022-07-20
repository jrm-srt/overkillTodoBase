import {selectTodos, selectTodosSortedByClosingDate} from '../store/selectors';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {State} from '../store/reducer';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MockedComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';

import * as mocks from '../../../tests/spec/mocks/todo-list-mocks';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatCheckboxHarness} from '@angular/material/checkbox/testing';
import {changeTodoStateAction} from '../store/actions';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let mockTodosSelector;
  let mockSelectTodosSorted;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        /*MockComponents(
          MatListItem,
          MatList,
          MatCardContent,
          MatCardTitle,
          MatCard,
          MatCheckbox
        ),*/
      ],
      imports: [
        /*MatRippleModule,*/
        MatCheckboxModule,
        FormsModule
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(async () => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, mocks.TodoListMocks.mockSelectTodos);
    mockSelectTodosSorted = store.overrideSelector(selectTodosSortedByClosingDate, mocks.TodoListMocks.mockSelectTodosSorted);

    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
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
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2022-06-01T10:01:02'));

    const checkbox = await loader.getHarness(MatCheckboxHarness);

    expect(await checkbox.isChecked()).toBe(false);
    await checkbox.check();
    expect(await checkbox.isChecked()).toBe(true);

    const updatedTodo = {
      id: 2,
      title: 'todo 2',
      creationDate: new Date('2022-06-01T10:01:02'),
      isClosed: true,
      closingDate: new Date('2022-06-01T10:01:02')
    };
    expect(dispatchSpy).toHaveBeenCalledWith(changeTodoStateAction({todo: updatedTodo}));
  });

  it('should dispatch changeTodoStateAction when unchecking a Todo', async () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2022-06-01T10:01:02'));

    const checkbox = await loader.getHarness(MatCheckboxHarness.with({selector: '#cb-1'}));

    expect(await checkbox.isChecked()).toBe(true);
    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBe(false);

    const updatedTodo = {
      id: 1,
      title: 'todo 1',
      creationDate: new Date('2022-06-04T10:01:02'),
      isClosed: false,
      closingDate: undefined
    };
    expect(dispatchSpy).toHaveBeenCalledWith(changeTodoStateAction({todo: updatedTodo}));
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

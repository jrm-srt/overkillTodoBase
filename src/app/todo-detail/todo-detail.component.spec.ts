import { of } from 'rxjs';
import { selectSelectedTodo } from './../store/selectors';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MockComponents } from 'ng-mocks';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from './../store/reducer';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailComponent } from './todo-detail.component';
import { MatChip, MatChipList } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;
  let store: MockStore<State>;
  let mockTodoSelector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoDetailComponent,
        MockComponents(
          MatCardContent,
          MatCardTitle,
          MatCard,
          MatChip,
          MatChipList,
          MatCardActions,
          MatButton
        ),
      ],
      imports: [
        MatRippleModule,
        FormsModule
      ],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({id: 1})) }
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;

    mockTodoSelector = store.overrideSelector(
      selectSelectedTodo,
      { id: 1, title: 'todo 1', isClosed: false, description: 'any description' }
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoCreateComponent} from './todo-create.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {State} from '../store/reducer';
import {MockComponents} from 'ng-mocks';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoCreateComponent,
        MockComponents(
          MatCardContent,
          MatCardTitle,
          MatCard,
          MatCardActions,
          MatButton
        )],
      imports: [
        MatRippleModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: add tests
});

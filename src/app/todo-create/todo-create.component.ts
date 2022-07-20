import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {createTodoAction} from '../store/actions';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent {

  createForm: FormGroup = this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('')
    }
  );

  constructor(private store: Store, private formBuilder: FormBuilder) {
  }

  get title(): FormControl {
    return this.createForm.get('title') as FormControl;
  }

  createTodo(): void {
    const todo: Todo = {
      // TODO: send without ID
      id: null,
      title: this.createForm.value.title,
      isClosed: false,
      creationDate: new Date(),
      description: this.createForm.value.description
    };

    this.store.dispatch(createTodoAction({todo}));
  }
}

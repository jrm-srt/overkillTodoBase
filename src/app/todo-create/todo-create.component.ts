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
export class TodoCreateComponent implements OnInit {

  createForm!: FormGroup;
  title!: FormControl;

  constructor(private store: Store, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.title = this.formBuilder.control('', [Validators.required]);

    this.createForm = this.formBuilder.group({
        title: this.title,
        description: this.formBuilder.control('')
      }
    );
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

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Todo} from './todo';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {OwnerValidator} from "./owner.validator";

@Component({
  selector: 'add-todo.component',
  templateUrl: 'add-todo.component.html',
})
export class AddTodoComponent implements OnInit {

  addTodoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { todo: Todo }, private fb: FormBuilder) {
  }

  // not sure if this owner is magical and making it be found or if I'm missing something,
  // but this is where the red text that shows up (when there is invalid input) comes from
  add_todo_validation_messages = {
    'owner': [
      {type: 'required', message: 'Owner is required'},
      {type: 'minlength', message: 'Owner must be at least 2 characters long'},
      {type: 'maxlength', message: 'Owner cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Owner must contain only numbers and letters'},
      {type: 'existingOwner', message: 'Owner has already been taken'}
    ],

    'status': [
      {type: 'pattern', message: 'status must be a boolean'},
      {type: 'required', message: 'Status is required'}
    ],

    'category': [
      {type: 'required', message: 'Category is required'},
      {type: 'minlength', message: 'Category must be at least 2 characters long'},
      {type: 'maxlength', message: 'Category cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Category must contain only numbers and letters'}
    ],
  };

  createForms() {

    // add todo form validations
    this.addTodoForm = this.fb.group({
      // We allow alphanumeric input and limit the length for owner.
      owner: new FormControl('owner', Validators.compose([
        OwnerValidator.validOwner,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?'),
        Validators.required
      ])),

      // Since this is for a company, we need workers to be old enough to work, and probably not older than 200.
      status: new FormControl('status', Validators.compose([
        Validators.pattern('^([Tt]+[Rr]+[Uu]+[Ee]|[Ff]+[Aa]+[Ll]+[Ss]+[Ee])$'),
        Validators.min(15),
        Validators.max(200),
        Validators.required
      ])),

      // We don't care much about what is in the company field, so we just add it here as part of the form
      // without any particular validation.
      body: new FormControl('body'),

      // Our category validator is exactly the same as owner
      category: new FormControl('category', Validators.compose([
        OwnerValidator.validOwner,
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?'),
        Validators.required
      ])),
    })


  }

  ngOnInit() {
    this.createForms();
  }

}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './users/user.component';
import {UserListComponent} from './users/user-list.component';
import {UserListService} from './users/user-list.service';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';
import {AddUserComponent} from './users/add-user.component';

//our new components
import {TodoListComponent} from "./todos/todo-list.component";
import {TodoComponent} from "./todos/todo.component";
import {AddTodoComponent} from "./todos/add-todo.component";
import {TodoListService} from "./todos/todo-list.service";

import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
    MatRadioModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserComponent,
    AddUserComponent,

    //our new declarations
    TodoListComponent,
    TodoComponent,
    AddTodoComponent,

  ],
  providers: [
    UserListService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
    TodoListService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
  ],
  entryComponents: [
    AddUserComponent,
    AddTodoComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TodoComponent } from './todo/todo.component';
import { TodolistComponent } from './todo/todolist/todolist.component';
import { TodokillerComponent } from './todo/todokiller/todokiller.component';
import { CompletedTodosComponent } from './todo/completed-todos/completed-todos.component';
import { TodoMessageService } from './todo/todo-message.service';
import { MatIconModule } from '@angular/material/icon';
import { EliminatedTodosComponent } from './todo/eliminated-todos/eliminated-todos.component';
import {FocusModule} from 'angular2-focus';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TodoComponent,
    TodolistComponent,
    TodokillerComponent,
    CompletedTodosComponent,
    EliminatedTodosComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    FocusModule.forRoot()
  ],
  providers: [
    TodoMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

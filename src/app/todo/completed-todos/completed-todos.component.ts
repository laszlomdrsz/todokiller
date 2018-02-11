import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TodoMessageService } from '../todo-message.service';
import { Todo } from '../../model/todo';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-completed-todos',
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.css']
})
export class CompletedTodosComponent implements OnInit {

  completedTodosSub: Subscription;

  completedTodos: Todo[] = [];

  constructor(
    private todoMessageService: TodoMessageService
  ) {
    this.completedTodosSub = this.todoMessageService.getCompletedTodos().subscribe(result => this.completedTodos = result);
   }


  uncompleteTodo(todo) {
    this.completedTodos.splice(this.completedTodos.indexOf(todo), 1);
    // Ez megakadályozza, hogy visszakerüléskor lenyitott állapotban legyen a listában
    todo._open = false;
    this.todoMessageService.uncompletedTodo.next(todo);
  }

  ngOnInit() {
  }

}

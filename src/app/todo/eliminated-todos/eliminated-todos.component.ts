import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TodoMessageService } from '../todo-message.service';
import { Todo } from '../../model/todo';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-eliminated-todos',
  templateUrl: './eliminated-todos.component.html',
  styleUrls: ['./eliminated-todos.component.css']
})
export class EliminatedTodosComponent implements OnInit {

  eliminatedTodosSub: Subscription;

  eliminatedTodos: Todo[] = [];

  constructor(
    private todoMessageService: TodoMessageService
  ) {
    this.eliminatedTodosSub = this.todoMessageService.getEliminatedTodos().subscribe(result => this.eliminatedTodos = result);
   }


  uneliminateTodo(todo) {
    this.eliminatedTodos.splice(this.eliminatedTodos.indexOf(todo), 1);
    // Ez megakadályozza, hogy visszakerüléskor lenyitott állapotban legyen a listában
    todo._open = false;
    this.todoMessageService.uneliminatedTodo.next(todo);
  }

  ngOnInit() {
  }

}

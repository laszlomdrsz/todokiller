import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../../model/todo';
import { TodoMessageService } from '../todo-message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodolistComponent implements OnInit {

  todos: Todo[] = [];
  newTodo: Todo = new Todo();

  showButtonArea = true;

  completedTodos: Todo[] = [];
  eliminatedTodos: Todo[] = [];

  uncompletedTodoSub: Subscription;
  uneliminatedTodoSub: Subscription;


  constructor(
    private todoMessageService: TodoMessageService
  ) {
    this.uncompletedTodoSub = this.todoMessageService.getUncompletedTodo().subscribe(result => this.todos.push(result));
    this.uneliminatedTodoSub = this.todoMessageService.getUneliminatedTodo().subscribe(result => this.todos.push(result));
   }


  addTodo() {
    this.todos.push(this.newTodo);
    this.newTodo.history = this.newTodo.title;
    this.newTodo = new Todo();
  }

  deleteTodo(todo) {
    const i = this.todos.indexOf(todo);
    if (i !== -1) {
      this.todos.splice(i, 1);
    }
  }

  eliminateTodo(todo) {
    todo.history += ' <span class="history-tag">Eliminated</span>';
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.eliminatedTodos.push(todo);
    this.refreshEliminatedTodos();
  }

  completeTodo(todo) {
    todo.history += ' <span class="history-tag">Completed</span>';
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.completedTodos.push(todo);
    this.refreshCompletedTodos();
  }

  simplifyingTodo(todo) {
    this.showButtonArea = false;
    // Megszünteti a többi szerkésztést
    todo._automatingTodo = false;
    todo._delegatingTodo = false;
    todo._simplifyingTodo = true;
    todo._editText = '';
  }

  simplifyTodo(todo) {
    todo.title = todo._editText;
    todo.history += ' <span class="history-tag">Simplified</span> ' + todo._editText;
    this.showButtonArea = true;
    todo._simplifyingTodo = false;
  }

  automatingTodo(todo) {
    this.showButtonArea = false;
    // Megszünteti a többi szerkésztést
    todo._simplifyingTodo = false;
    todo._delegatingTodo = false;
    todo._automatingTodo = true;
    todo._editText = '';
  }

  automateTodo(todo) {
    todo.title = todo._editText;
    todo.history += ' <span class="history-tag">Automated</span> ' + todo._editText;
    this.showButtonArea = true;
    todo._automatingTodo = false;
  }

  delegatingTodo(todo) {
    this.showButtonArea = false;
    // Megszünteti a többi szerkésztést
    todo._automatingTodo = false;
    todo._simplifyingTodo = false;
    todo._delegatingTodo = true;
    todo._editText = '';
  }

  delegateTodo(todo) {
    todo.title = todo._editText;
    todo.history += ' <span class="history-tag">Delegated</span> ' + todo._editText;
    this.showButtonArea = true;
    todo._delegatingTodo = false;
  }

  openTodo(todo) {
    this.todos.forEach(element => {
      element._open = false;
    });
    todo._open = true;
  }

  toggleOpenTodo(todo) {

    if (todo._open === false) {
      this.todos.forEach(element => {
        element._open = false;
      });
      todo._open = true;
    } else {
      todo._open = false;
    }

  }

  // Ezzel megkapja a todoMessageService a változásokat
  refreshCompletedTodos() {
    this.todoMessageService.completedTodos.next(this.completedTodos);
  }

  refreshEliminatedTodos() {
    this.todoMessageService.eliminatedTodos.next(this.eliminatedTodos);
  }




  ngOnInit() {
  }

}

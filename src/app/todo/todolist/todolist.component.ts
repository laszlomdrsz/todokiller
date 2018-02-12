import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../../model/todo';
import { TodoMessageService } from '../todo-message.service';
import { Subscription } from 'rxjs/Subscription';
import { SedaMessageData } from '../../data/seda-message-data';

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

  emptyTodoInit = true;

  completedTodos: Todo[] = [];
  eliminatedTodos: Todo[] = [];

  uncompletedTodoSub: Subscription;
  uneliminatedTodoSub: Subscription;


  constructor(
    private todoMessageService: TodoMessageService,
    private sedaMessageData: SedaMessageData
  ) {
    this.uncompletedTodoSub = this.todoMessageService.getUncompletedTodo().subscribe(result => this.todos.push(result));
    this.uneliminatedTodoSub = this.todoMessageService.getUneliminatedTodo().subscribe(result => this.todos.push(result));
   }


  addTodo() {
    this.todos.unshift(this.newTodo);
    this.newTodo.history = this.newTodo.title;
    this.newTodo = new Todo();
    this.emptyTodoCheck();
  }

  emptyTodoCheck() {
    if (this.todos.length === 1) {
      this.randomSedaMessage();
    }
  }

  emptyTodoInitCheck() {
    if (this.emptyTodoInit) {
      this.randomSedaMessage();
    }
  }


  deleteTodo(todo) {
    let sedaCheck = false;
    if (todo._sedaMessage) {
      sedaCheck = true;
    }


    const i = this.todos.indexOf(todo);
    if (i !== -1) {
      this.todos.splice(i, 1);
    }

    if (sedaCheck && this.todos.length > 0) {
      this.randomSedaMessage();
    }


  }

  eliminateTodo(todo) {
    todo.history += ' <span class="history-tag">Eliminated</span>';
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.eliminatedTodos.unshift(todo);
    this.refreshEliminatedTodos();
    this.clearSeda(todo);
    this.emptyTodoCheck();
  }

  completeTodo(todo) {
    todo.history += ' <span class="history-tag">Completed</span>';
    this.completedTodos.unshift(todo);
    this.refreshCompletedTodos();
    if (todo._sedaMessage) {
      this.randomSedaMessage();
    }
    this.clearSeda(todo);
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.emptyTodoCheck();
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
    this.emptyTodoInitCheck();
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
    this.emptyTodoInitCheck();
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
    this.emptyTodoInitCheck();
  }

  sedaMessageAction(todo, sedaType) {
    switch (sedaType) {
      case 'Simplify':
        this.simplifyingTodo(todo);
        this.emptyTodoInit = true;
        break;
      case 'Eliminate':
        this.eliminateTodo(todo);
        this.emptyTodoInit = true;
        break;
      case 'Delegate':
        this.delegatingTodo(todo);
        this.emptyTodoInit = true;
        break;
      case 'Automate':
        this.automatingTodo(todo);
        this.emptyTodoInit = true;
    }
      this.clearSeda(todo);
  }

  cancelSeda(todo) {
    todo._automatingTodo = false;
    todo._simplifyingTodo = false;
    todo._delegatingTodo = false;
    this.showButtonArea = true;
    this.emptyTodoInitCheck();
  }

  clearSeda(todo) {
    todo._sedaMessage = null;
    todo._sedaMessageType = null;
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

  randomSedaMessage(): void {
    const smd = this.sedaMessageData;
    const todo = this.todos[Math.floor(Math.random() * this.todos.length)];
    const sedaType = smd.sedaTypes[Math.floor(Math.random() * smd.sedaTypes.length)];
    let sedaMessage;
    switch (sedaType) {
      case 'Simplify':
        sedaMessage = smd.simplifyMessages[Math.floor(Math.random() * smd.simplifyMessages.length)];
        break;
      case 'Eliminate':
        sedaMessage = smd.eliminateMessages[Math.floor(Math.random() * smd.eliminateMessages.length)];
        break;
      case 'Delegate':
        sedaMessage = smd.delegateMessages[Math.floor(Math.random() * smd.delegateMessages.length)];
        break;
      case 'Automate':
        sedaMessage = smd.automateMessages[Math.floor(Math.random() * smd.automateMessages.length)];
    }

    todo._sedaMessage = sedaMessage;
    todo._sedaMessageType = sedaType;

    this.emptyTodoInit = false;

  }



  exitSedaMessage(todo) {
    todo._sedaMessage = null;
    todo._sedaMessageType = null;
    this.randomSedaMessage();
  }




  ngOnInit() {
    if (this.todos.length > 0) {
      this.randomSedaMessage();
    }

  }

}

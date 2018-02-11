import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TodoMessageService {

  completedTodos: Subject<Todo[]> = new Subject;
  uncompletedTodo: Subject<Todo> = new Subject;

  eliminatedTodos: Subject<Todo[]> = new Subject;
  uneliminatedTodo: Subject<Todo> = new Subject;

  constructor() { }

  // Továbbítja az elkészült todokat
  getCompletedTodos() {
    return this.completedTodos.asObservable();
  }

  // Továbbítja az elkészülés visszavonását
  getUncompletedTodo() {
    return this.uncompletedTodo.asObservable();
  }

    // Továbbítja az elkészült todokat
    getEliminatedTodos() {
      return this.eliminatedTodos.asObservable();
    }

    // Továbbítja az elkészülés visszavonását
    getUneliminatedTodo() {
      return this.uneliminatedTodo.asObservable();
    }

}

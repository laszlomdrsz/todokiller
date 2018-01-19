import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentView = 'todos';

  constructor() { }

  ngOnInit() {
  }

  changeView(view: string): void {
    this.currentView = view;
    console.log(this.currentView);
  }

}

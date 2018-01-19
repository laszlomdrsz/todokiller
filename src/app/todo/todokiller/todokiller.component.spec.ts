import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodokillerComponent } from './todokiller.component';

describe('TodokillerComponent', () => {
  let component: TodokillerComponent;
  let fixture: ComponentFixture<TodokillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodokillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodokillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

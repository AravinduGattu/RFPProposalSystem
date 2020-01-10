import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignprojacceptformComponent } from './assignprojacceptform.component';

describe('AssignprojacceptformComponent', () => {
  let component: AssignprojacceptformComponent;
  let fixture: ComponentFixture<AssignprojacceptformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignprojacceptformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignprojacceptformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

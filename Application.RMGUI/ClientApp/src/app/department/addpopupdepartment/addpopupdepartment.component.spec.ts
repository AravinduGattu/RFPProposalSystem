import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpopupdepartmentComponent } from './addpopupdepartment.component';

describe('AddpopupdepartmentComponent', () => {
  let component: AddpopupdepartmentComponent;
  let fixture: ComponentFixture<AddpopupdepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpopupdepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpopupdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

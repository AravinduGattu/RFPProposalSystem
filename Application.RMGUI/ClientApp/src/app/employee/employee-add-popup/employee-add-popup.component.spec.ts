import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddPopupComponent } from './employee-add-popup.component';

describe('EmployeeAddPopupComponent', () => {
  let component: EmployeeAddPopupComponent;
  let fixture: ComponentFixture<EmployeeAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

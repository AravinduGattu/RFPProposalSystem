import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpopupdesignationComponent } from './addpopupdesignation.component';

describe('AddpopupdesignationComponent', () => {
  let component: AddpopupdesignationComponent;
  let fixture: ComponentFixture<AddpopupdesignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpopupdesignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpopupdesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

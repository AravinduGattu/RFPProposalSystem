import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdesignationpopupComponent } from './editdesignationpopup.component';

describe('EditdesignationpopupComponent', () => {
  let component: EditdesignationpopupComponent;
  let fixture: ComponentFixture<EditdesignationpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdesignationpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdesignationpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProjMngtEditPopupComponent } from './emp-proj-mngt-edit-popup.component';

describe('EmpProjMngtEditPopupComponent', () => {
  let component: EmpProjMngtEditPopupComponent;
  let fixture: ComponentFixture<EmpProjMngtEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpProjMngtEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpProjMngtEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

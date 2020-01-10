import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPanelEditPopupComponent } from './assign-panel-edit-popup.component';

describe('AssignPanelEditPopupComponent', () => {
  let component: AssignPanelEditPopupComponent;
  let fixture: ComponentFixture<AssignPanelEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPanelEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPanelEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

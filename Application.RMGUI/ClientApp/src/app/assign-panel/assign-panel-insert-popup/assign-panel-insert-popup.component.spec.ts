import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPanelInsertPopupComponent } from './assign-panel-insert-popup.component';

describe('AssignPanelInsertPopupComponent', () => {
  let component: AssignPanelInsertPopupComponent;
  let fixture: ComponentFixture<AssignPanelInsertPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPanelInsertPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPanelInsertPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

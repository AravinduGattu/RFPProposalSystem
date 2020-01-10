import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInsertPopupComponent } from './panel-insert-popup.component';

describe('PanelInsertPopupComponent', () => {
  let component: PanelInsertPopupComponent;
  let fixture: ComponentFixture<PanelInsertPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelInsertPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelInsertPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

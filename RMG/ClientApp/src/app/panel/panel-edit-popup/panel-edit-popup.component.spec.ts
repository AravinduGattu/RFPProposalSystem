import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEditPopupComponent } from './panel-edit-popup.component';

describe('PanelEditPopupComponent', () => {
  let component: PanelEditPopupComponent;
  let fixture: ComponentFixture<PanelEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

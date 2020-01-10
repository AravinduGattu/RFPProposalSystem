import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeEditPopupComponent } from './coe-edit-popup.component';

describe('CoeEditPopupComponent', () => {
  let component: CoeEditPopupComponent;
  let fixture: ComponentFixture<CoeEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

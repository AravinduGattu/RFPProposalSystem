import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeAddPopupComponent } from './coe-add-popup.component';

describe('CoeAddPopupComponent', () => {
  let component: CoeAddPopupComponent;
  let fixture: ComponentFixture<CoeAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeAddPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPopupEditComponent } from './customer-popup-edit.component';

describe('CustomerPopupEditComponent', () => {
  let component: CustomerPopupEditComponent;
  let fixture: ComponentFixture<CustomerPopupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPopupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPopupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

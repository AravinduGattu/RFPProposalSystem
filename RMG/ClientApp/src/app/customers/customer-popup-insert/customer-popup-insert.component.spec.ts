import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPopupInsertComponent } from './customer-popup-insert.component';

describe('CustomerPopupInsertComponent', () => {
  let component: CustomerPopupInsertComponent;
  let fixture: ComponentFixture<CustomerPopupInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPopupInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPopupInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

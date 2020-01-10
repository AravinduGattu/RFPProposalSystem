import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEditPopUpComponent } from './vendor-edit-pop-up.component';

describe('VendorEditPopUpComponent', () => {
  let component: VendorEditPopUpComponent;
  let fixture: ComponentFixture<VendorEditPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorEditPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEditPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

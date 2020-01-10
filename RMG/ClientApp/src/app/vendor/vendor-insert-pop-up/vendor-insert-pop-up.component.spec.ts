import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInsertPopUpComponent } from './vendor-insert-pop-up.component';

describe('VendorInsertPopUpComponent', () => {
  let component: VendorInsertPopUpComponent;
  let fixture: ComponentFixture<VendorInsertPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorInsertPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInsertPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

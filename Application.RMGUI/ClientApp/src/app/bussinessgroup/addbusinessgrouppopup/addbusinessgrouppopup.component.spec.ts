import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbusinessgrouppopupComponent } from './addbusinessgrouppopup.component';

describe('AddbusinessgrouppopupComponent', () => {
  let component: AddbusinessgrouppopupComponent;
  let fixture: ComponentFixture<AddbusinessgrouppopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbusinessgrouppopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbusinessgrouppopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

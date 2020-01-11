import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessgroupComponent } from './bussinessgroup.component';

describe('BussinessgroupComponent', () => {
  let component: BussinessgroupComponent;
  let fixture: ComponentFixture<BussinessgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

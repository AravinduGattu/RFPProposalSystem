import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojectpopupComponent } from './addprojectpopup.component';

describe('AddprojectpopupComponent', () => {
  let component: AddprojectpopupComponent;
  let fixture: ComponentFixture<AddprojectpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprojectpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprojectpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

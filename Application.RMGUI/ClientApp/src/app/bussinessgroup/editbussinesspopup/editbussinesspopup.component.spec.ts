import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbussinesspopupComponent } from './editbussinesspopup.component';

describe('EditbussinesspopupComponent', () => {
  let component: EditbussinesspopupComponent;
  let fixture: ComponentFixture<EditbussinesspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbussinesspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbussinesspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

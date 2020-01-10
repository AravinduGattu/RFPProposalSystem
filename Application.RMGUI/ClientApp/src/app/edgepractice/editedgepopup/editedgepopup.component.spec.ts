import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditedgepopupComponent } from './editedgepopup.component';

describe('EditedgepopupComponent', () => {
  let component: EditedgepopupComponent;
  let fixture: ComponentFixture<EditedgepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditedgepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditedgepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

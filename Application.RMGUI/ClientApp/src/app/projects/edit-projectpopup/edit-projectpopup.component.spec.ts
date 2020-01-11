import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectpopupComponent } from './edit-projectpopup.component';

describe('EditProjectpopupComponent', () => {
  let component: EditProjectpopupComponent;
  let fixture: ComponentFixture<EditProjectpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

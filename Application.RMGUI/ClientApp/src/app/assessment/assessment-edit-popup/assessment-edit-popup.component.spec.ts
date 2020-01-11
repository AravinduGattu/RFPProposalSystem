import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEditPopupComponent } from './assessment-edit-popup.component';

describe('AssessmentEditPopupComponent', () => {
  let component: AssessmentEditPopupComponent;
  let fixture: ComponentFixture<AssessmentEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

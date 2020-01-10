import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentAddPopupComponent } from './assessment-add-popup.component';

describe('AssessmentAddPopupComponent', () => {
  let component: AssessmentAddPopupComponent;
  let fixture: ComponentFixture<AssessmentAddPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentAddPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

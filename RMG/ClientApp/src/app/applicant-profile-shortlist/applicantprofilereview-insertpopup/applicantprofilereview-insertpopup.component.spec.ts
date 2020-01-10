import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantprofilereviewInsertpopupComponent } from './applicantprofilereview-insertpopup.component';

describe('ApplicantprofilereviewInsertpopupComponent', () => {
  let component: ApplicantprofilereviewInsertpopupComponent;
  let fixture: ComponentFixture<ApplicantprofilereviewInsertpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantprofilereviewInsertpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantprofilereviewInsertpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

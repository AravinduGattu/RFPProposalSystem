import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantprofilereviewEditpopupComponent } from './applicantprofilereview-editpopup.component';

describe('ApplicantprofilereviewEditpopupComponent', () => {
  let component: ApplicantprofilereviewEditpopupComponent;
  let fixture: ComponentFixture<ApplicantprofilereviewEditpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantprofilereviewEditpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantprofilereviewEditpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

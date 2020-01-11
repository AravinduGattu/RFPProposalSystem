import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantProfileShortlistComponent } from './applicant-profile-shortlist.component';

describe('ApplicantProfileShortlistComponent', () => {
  let component: ApplicantProfileShortlistComponent;
  let fixture: ComponentFixture<ApplicantProfileShortlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantProfileShortlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantProfileShortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

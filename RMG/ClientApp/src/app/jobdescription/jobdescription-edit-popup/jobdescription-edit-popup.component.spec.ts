import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdescriptionEditPopupComponent } from './jobdescription-edit-popup.component';

describe('JobdescriptionEditPopupComponent', () => {
  let component: JobdescriptionEditPopupComponent;
  let fixture: ComponentFixture<JobdescriptionEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdescriptionEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdescriptionEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

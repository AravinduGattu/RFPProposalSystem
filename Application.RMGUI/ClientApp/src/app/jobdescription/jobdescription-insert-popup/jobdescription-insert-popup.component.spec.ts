import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdescriptionInsertPopupComponent } from './jobdescription-insert-popup.component';

describe('JobdescriptionInsertPopupComponent', () => {
  let component: JobdescriptionInsertPopupComponent;
  let fixture: ComponentFixture<JobdescriptionInsertPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobdescriptionInsertPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdescriptionInsertPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

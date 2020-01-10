import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetstemplateComponent } from './timesheetstemplate.component';

describe('TimesheetstemplateComponent', () => {
  let component: TimesheetstemplateComponent;
  let fixture: ComponentFixture<TimesheetstemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetstemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetstemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

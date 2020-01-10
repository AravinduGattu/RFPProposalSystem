import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSkillsetComponent } from './reports-skillset.component';

describe('ReportsSkillsetComponent', () => {
  let component: ReportsSkillsetComponent;
  let fixture: ComponentFixture<ReportsSkillsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsSkillsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsSkillsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjobrequirementComponent } from './newjobrequirement.component';

describe('NewjobrequirementComponent', () => {
  let component: NewjobrequirementComponent;
  let fixture: ComponentFixture<NewjobrequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewjobrequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjobrequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

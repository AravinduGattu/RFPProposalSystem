import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpopupedgepracticeComponent } from './addpopupedgepractice.component';

describe('AddpopupedgepracticeComponent', () => {
  let component: AddpopupedgepracticeComponent;
  let fixture: ComponentFixture<AddpopupedgepracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpopupedgepracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpopupedgepracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

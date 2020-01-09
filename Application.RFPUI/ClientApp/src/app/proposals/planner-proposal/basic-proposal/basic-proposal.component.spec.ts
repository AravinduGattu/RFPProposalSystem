import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicProposalComponent } from './basic-proposal.component';

describe('BasicProposalComponent', () => {
  let component: BasicProposalComponent;
  let fixture: ComponentFixture<BasicProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

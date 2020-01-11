import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterofexcellenceComponent } from './centerofexcellence.component';

describe('CenterofexcellenceComponent', () => {
  let component: CenterofexcellenceComponent;
  let fixture: ComponentFixture<CenterofexcellenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterofexcellenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterofexcellenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

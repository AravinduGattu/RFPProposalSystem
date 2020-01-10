import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgepracticeComponent } from './edgepractice.component';

describe('EdgepracticeComponent', () => {
  let component: EdgepracticeComponent;
  let fixture: ComponentFixture<EdgepracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgepracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgepracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

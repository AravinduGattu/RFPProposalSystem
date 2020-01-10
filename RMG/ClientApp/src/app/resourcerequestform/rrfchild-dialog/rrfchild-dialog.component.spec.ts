import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RRFChildDialogComponent } from './rrfchild-dialog.component';

describe('RRFChildDialogComponent', () => {
  let component: RRFChildDialogComponent;
  let fixture: ComponentFixture<RRFChildDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RRFChildDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RRFChildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcedialogComponent } from './resourcedialog.component';

describe('ResourcedialogComponent', () => {
  let component: ResourcedialogComponent;
  let fixture: ComponentFixture<ResourcedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

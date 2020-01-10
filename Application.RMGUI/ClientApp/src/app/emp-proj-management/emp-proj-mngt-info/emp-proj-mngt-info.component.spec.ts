import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProjMngtInfoComponent } from './emp-proj-mngt-info.component';

describe('EmpProjMngtInfoComponent', () => {
  let component: EmpProjMngtInfoComponent;
  let fixture: ComponentFixture<EmpProjMngtInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpProjMngtInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpProjMngtInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

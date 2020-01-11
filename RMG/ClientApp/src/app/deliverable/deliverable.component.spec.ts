import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProjManagementComponent } from './emp-proj-management.component';

describe('EmpProjManagementComponent', () => {
  let component: EmpProjManagementComponent;
  let fixture: ComponentFixture<EmpProjManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpProjManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpProjManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

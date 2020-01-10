import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdepartmentpopupComponent } from './editdepartmentpopup.component';

describe('EditdepartmentpopupComponent', () => {
  let component: EditdepartmentpopupComponent;
  let fixture: ComponentFixture<EditdepartmentpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdepartmentpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdepartmentpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

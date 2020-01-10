import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcerequestformComponent } from './resourcerequestform.component';

describe('ResourcerequestformComponent', () => {
  let component: ResourcerequestformComponent;
  let fixture: ComponentFixture<ResourcerequestformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcerequestformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcerequestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

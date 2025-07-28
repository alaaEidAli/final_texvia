import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DahboardJobManagementComponent } from './dahboard-job-management.component';

describe('DahboardJobManagementComponent', () => {
  let component: DahboardJobManagementComponent;
  let fixture: ComponentFixture<DahboardJobManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DahboardJobManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DahboardJobManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

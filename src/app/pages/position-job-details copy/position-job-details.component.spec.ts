import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionJobDetailsComponent } from './position-job-details.component';

describe('PositionJobDetailsComponent', () => {
  let component: PositionJobDetailsComponent;
  let fixture: ComponentFixture<PositionJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionJobDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

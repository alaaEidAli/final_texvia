import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashdoardContactSubmissionsComponent } from './dashdoard-contact-submissions.component';

describe('DashdoardContactSubmissionsComponent', () => {
  let component: DashdoardContactSubmissionsComponent;
  let fixture: ComponentFixture<DashdoardContactSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashdoardContactSubmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashdoardContactSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyDetailsComponent } from './anomaly-details.component';

describe('AnomalyDetailsComponent', () => {
  let component: AnomalyDetailsComponent;
  let fixture: ComponentFixture<AnomalyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnomalyDetailsComponent]
    });
    fixture = TestBed.createComponent(AnomalyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyItemComponent } from './anomaly-item.component';

describe('AnomalyItemComponent', () => {
  let component: AnomalyItemComponent;
  let fixture: ComponentFixture<AnomalyItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnomalyItemComponent]
    });
    fixture = TestBed.createComponent(AnomalyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

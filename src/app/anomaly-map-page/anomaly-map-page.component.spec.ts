import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyMapPageComponent } from './anomaly-map-page.component';

describe('AnomalyMapPageComponent', () => {
  let component: AnomalyMapPageComponent;
  let fixture: ComponentFixture<AnomalyMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnomalyMapPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnomalyMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyMapDetailsPageComponent } from './anomaly-map-details-page.component';

describe('AnomalyMapDetailsPageComponent', () => {
  let component: AnomalyMapDetailsPageComponent;
  let fixture: ComponentFixture<AnomalyMapDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnomalyMapDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnomalyMapDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

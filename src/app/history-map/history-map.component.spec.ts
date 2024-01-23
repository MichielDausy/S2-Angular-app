import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMapComponent } from './history-map.component';

describe('HistoryMapComponent', () => {
  let component: HistoryMapComponent;
  let fixture: ComponentFixture<HistoryMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

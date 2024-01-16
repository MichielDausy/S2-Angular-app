import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalypageComponent } from './anomalypage.component';

describe('AnomalypageComponent', () => {
  let component: AnomalypageComponent;
  let fixture: ComponentFixture<AnomalypageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnomalypageComponent]
    });
    fixture = TestBed.createComponent(AnomalypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionBridgeComponent } from './inspection-bridge.component';

describe('InspectionBridgeComponent', () => {
  let component: InspectionBridgeComponent;
  let fixture: ComponentFixture<InspectionBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionBridgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InspectionBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

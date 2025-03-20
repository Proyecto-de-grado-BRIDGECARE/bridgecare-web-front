import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBridgeComponent } from './inventory-bridge.component';

describe('InventoryBridgeComponent', () => {
  let component: InventoryBridgeComponent;
  let fixture: ComponentFixture<InventoryBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryBridgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

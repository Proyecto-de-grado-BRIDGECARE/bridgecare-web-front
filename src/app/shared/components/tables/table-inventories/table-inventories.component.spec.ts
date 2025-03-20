import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInventoriesComponent } from './table-inventories.component';

describe('TableInventoriesComponent', () => {
  let component: TableInventoriesComponent;
  let fixture: ComponentFixture<TableInventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInventoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableInventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

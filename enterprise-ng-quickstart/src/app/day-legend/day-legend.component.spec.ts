import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayLegendComponent } from './day-legend.component';

describe('DayLegendComponent', () => {
  let component: DayLegendComponent;
  let fixture: ComponentFixture<DayLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

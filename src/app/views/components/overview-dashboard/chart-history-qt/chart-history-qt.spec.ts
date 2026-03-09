import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHistoryQt } from './chart-history-qt';

describe('ChartHistoryQt', () => {
  let component: ChartHistoryQt;
  let fixture: ComponentFixture<ChartHistoryQt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartHistoryQt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHistoryQt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

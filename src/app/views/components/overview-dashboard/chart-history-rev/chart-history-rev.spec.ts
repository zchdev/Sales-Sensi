import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHistoryRev } from './chart-history-rev';

describe('ChartHistoryRev', () => {
  let component: ChartHistoryRev;
  let fixture: ComponentFixture<ChartHistoryRev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartHistoryRev]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHistoryRev);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

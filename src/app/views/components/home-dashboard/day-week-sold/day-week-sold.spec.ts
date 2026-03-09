import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayWeekSold } from './day-week-sold';

describe('DayWeekSold', () => {
  let component: DayWeekSold;
  let fixture: ComponentFixture<DayWeekSold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayWeekSold]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayWeekSold);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

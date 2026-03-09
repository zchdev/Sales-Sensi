import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSold } from './chart-sold';

describe('ChartSold', () => {
  let component: ChartSold;
  let fixture: ComponentFixture<ChartSold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSold]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSold);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

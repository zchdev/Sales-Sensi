import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredGraphMonthly } from './pred-graph-monthly';

describe('PredGraphMonthly', () => {
  let component: PredGraphMonthly;
  let fixture: ComponentFixture<PredGraphMonthly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredGraphMonthly]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredGraphMonthly);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

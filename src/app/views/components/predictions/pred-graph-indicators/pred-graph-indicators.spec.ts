import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredGraphIndicators } from './pred-graph-indicators';

describe('PredGraphIndicators', () => {
  let component: PredGraphIndicators;
  let fixture: ComponentFixture<PredGraphIndicators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredGraphIndicators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredGraphIndicators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

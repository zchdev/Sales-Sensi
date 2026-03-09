import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPerDayQt } from './graph-per-day-qt';

describe('GraphPerDayQt', () => {
  let component: GraphPerDayQt;
  let fixture: ComponentFixture<GraphPerDayQt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphPerDayQt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphPerDayQt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

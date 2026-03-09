import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPerDayRev } from './graph-per-day-rev';

describe('GraphPerDayRev', () => {
  let component: GraphPerDayRev;
  let fixture: ComponentFixture<GraphPerDayRev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphPerDayRev]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphPerDayRev);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

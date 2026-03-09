import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RampupQt } from './rampup-qt';

describe('RampupQt', () => {
  let component: RampupQt;
  let fixture: ComponentFixture<RampupQt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RampupQt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RampupQt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

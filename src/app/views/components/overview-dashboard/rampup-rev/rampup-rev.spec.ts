import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RampupRev } from './rampup-rev';

describe('RampupRev', () => {
  let component: RampupRev;
  let fixture: ComponentFixture<RampupRev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RampupRev]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RampupRev);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

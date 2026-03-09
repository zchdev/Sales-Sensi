import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredGraphDaily } from './pred-graph-daily';

describe('PredGraphDaily', () => {
  let component: PredGraphDaily;
  let fixture: ComponentFixture<PredGraphDaily>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredGraphDaily]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredGraphDaily);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

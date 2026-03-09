import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredTips } from './pred-tips';

describe('PredTips', () => {
  let component: PredTips;
  let fixture: ComponentFixture<PredTips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredTips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredTips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

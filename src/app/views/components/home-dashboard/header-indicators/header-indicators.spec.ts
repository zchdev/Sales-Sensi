import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIndicators } from './header-indicators';

describe('HeaderIndicators', () => {
  let component: HeaderIndicators;
  let fixture: ComponentFixture<HeaderIndicators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderIndicators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderIndicators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

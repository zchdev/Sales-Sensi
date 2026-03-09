import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenseiView } from './sensei-view';

describe('SenseiView', () => {
  let component: SenseiView;
  let fixture: ComponentFixture<SenseiView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenseiView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenseiView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10qtLST } from './top10qt-lst';

describe('Top10qtLST', () => {
  let component: Top10qtLST;
  let fixture: ComponentFixture<Top10qtLST>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top10qtLST]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top10qtLST);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

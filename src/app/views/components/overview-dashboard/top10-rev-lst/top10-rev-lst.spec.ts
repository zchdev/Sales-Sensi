import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10RevLST } from './top10-rev-lst';

describe('Top10RevLST', () => {
  let component: Top10RevLST;
  let fixture: ComponentFixture<Top10RevLST>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top10RevLST]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top10RevLST);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

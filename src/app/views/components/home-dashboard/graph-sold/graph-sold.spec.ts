import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSold } from './graph-sold';

describe('GraphSold', () => {
  let component: GraphSold;
  let fixture: ComponentFixture<GraphSold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphSold]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphSold);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

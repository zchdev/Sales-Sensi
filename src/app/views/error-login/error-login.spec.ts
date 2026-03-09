import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogin } from './error-login';

describe('ErrorLogin', () => {
  let component: ErrorLogin;
  let fixture: ComponentFixture<ErrorLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

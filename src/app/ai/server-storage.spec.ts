import { TestBed } from '@angular/core/testing';

import { ServerStorage } from './server-storage';

describe('ServerStorage', () => {
  let service: ServerStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CurrentOrderIdService } from './current-order-id.service';

describe('CurrentOrderIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentOrderIdService = TestBed.get(CurrentOrderIdService);
    expect(service).toBeTruthy();
  });
});

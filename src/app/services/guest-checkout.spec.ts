import { TestBed } from '@angular/core/testing';

import { GuestCheckoutService } from './guest-checkout';

describe('GuestCheckout', () => {
  let service: GuestCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

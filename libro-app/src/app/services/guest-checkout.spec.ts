import { TestBed } from '@angular/core/testing';

import { GuestCheckout } from './guest-checkout';

describe('GuestCheckout', () => {
  let service: GuestCheckout;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestCheckout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

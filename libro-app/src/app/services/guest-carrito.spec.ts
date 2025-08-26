import { TestBed } from '@angular/core/testing';

import { GuestCarrito } from './guest-carrito';

describe('GuestCarrito', () => {
  let service: GuestCarrito;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestCarrito);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

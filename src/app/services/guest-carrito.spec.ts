import { TestBed } from '@angular/core/testing';

import { GuestCarritoService } from './guest-carrito';

describe('GuestCarrito', () => {
  let service: GuestCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

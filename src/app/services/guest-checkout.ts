import { Injectable } from '@angular/core';

import { FactoryOrValue, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getCartToken } from '../core/cart-token';
import { environment } from '../../environments.ts/environments';

@Injectable({
  providedIn: 'root'
})
export class GuestCheckoutService {
  

    private base = `${environment.baseURL}/guest/checkout`;

    constructor(private http: HttpClient){ }



}

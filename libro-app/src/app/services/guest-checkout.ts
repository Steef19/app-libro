import { Injectable } from '@angular/core';
import { environmet } from '../../environments.ts/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../components/factura/factura';
import { getCartToken } from '../core/cart-token';

@Injectable({
  providedIn: 'root'
})
export class GuestCheckoutService {

  private base = `${environmet.baseURL}/guest/checkout`;

  constructor(private http: HttpClient){
    
    checkout(): Observable<Factura>{
        const params = new HttpParams().set('token',getCartToken());
        return this.http.post<Factura>(this.base , { },{params});
    }
  }
}

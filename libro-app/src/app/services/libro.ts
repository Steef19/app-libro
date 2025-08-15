import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../model/libro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  private baseUrl="http://localhost:8080/api/libros";

  constructor(private http: HttpClient){ }


  findAll(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.baseUrl);
  }


  findOne(id: number): Observable<Libro>{
      return this.http.get<Libro>(`${this.baseUrl}/${id}`);
  }
  
  save(cliente: Libro): Observable<Libro>{
    return this.http.post<Libro>(this.baseUrl, cliente);
  }

  update(id: number, cliente: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.baseUrl}/${id}`, cliente);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

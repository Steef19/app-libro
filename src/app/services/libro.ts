import { Observable } from 'rxjs';
import { Libro } from '../model/libro.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  private baseUrl="http://localhost:8080/api/libros";
  
  constructor(private http: HttpClient){}

findAll(): Observable<Libro[]>{
    return this.http.get<Libro[]>(this.baseUrl);
  }

  findOne(id: number): Observable<Libro>{
    return this.http.get<Libro>(`${this.baseUrl}/${id}`);

  }

  save(libro: Libro): Observable<Libro>{
    return this.http.post<Libro>(this.baseUrl, libro);
  }

  update(id: number, idCategoria: number, idAutor: number, libro: Libro) {
  return this.http.put(`http://localhost:8080/api/libros/${id}?idCategoria=${idCategoria}&idAutor=${idAutor}`, libro);
}

  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

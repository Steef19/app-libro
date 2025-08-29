import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro';
import { Libro } from '../../model/libro.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { GuestcarritoService } from '../../services/guest-carrito';

@Component({
  selector: 'app-libros-list',
  standalone: false,
  templateUrl: './libros-list.html',
  styleUrl: './libros-list.css'
})
export class LibrosListComponent implements OnInit {
  loading = false;
   libros : Libro[] = [];
  constructor(private carritoService: GuestcarritoService,
    private libroService: LibroService,
    private snack: MatSnackBar
  ){
    
  }


  ngOnInit(): void {
    
    this.loading = true;
    this.carritoService.createOrGet().subscribe();
    this.libroService.findAll().subscribe({
      next: res => {this.libros = res; this.loading = false;},
      error: _ =>{this.loading = false;}
    });
  }

  add(libro: Libro){
this.carritoService.additem(libro.idLibro,1).subscribe({ 
  next: _ => this.snack.open('Agregado al carrito','OK',{duration: 1500}),
  error: err => Swal.fire('Error',err?.error?.message || 'no se puede agregar','error')
 });
  }


}

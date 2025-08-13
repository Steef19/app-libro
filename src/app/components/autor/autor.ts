import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Autor } from '../../model/autor.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AutorService } from '../../services/autor';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-autor',
  standalone: false,
  templateUrl: './autor.html',
  styleUrls: ['./autor.css']
})
export class AutorComponent implements OnInit {

  autores: Autor[] = [];
  autor: Autor = {} as Autor;
  editar: boolean = false;
  idEditar: number | null = null;

  dataSource!: MatTableDataSource<Autor>;
  columnasMostrar: string[] = ['idAutor', 'nombre', 'apellido', 'pais', 'telefono', 'correo', 'acciones'];

  @ViewChild('formularioAutor') formularioAutor!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Autor>([]);
    this.findAll();
  }

  findAll(): void {
    this.autorService.findAll().subscribe(data => {
      console.log("Autores cargados: ", data);
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  save(): void {
    this.autorService.save(this.autor).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Autor guardado correctamente', 'success');
        this.autor = {} as Autor;
        this.findAll();
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo guardar el autor', 'error');
        console.error('Error al guardar:', err);
      }
    });
  }

  update(): void {
    if (this.idEditar !== null) {
      this.autorService.update(this.idEditar, this.autor).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Autor actualizado correctamente', 'success');
          this.autor = {} as Autor;
          this.editar = false;
          this.idEditar = null;
          this.findAll();
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo actualizar el autor', 'error');
          console.error(err);
        }
      });
    }
  }

  eliminarAutor(autor: Autor): void {
    Swal.fire({
      title: '¿Desea eliminar el autor?',
      text: `Está a punto de eliminar a ${autor.nombre} ${autor.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorService.delete(autor.idAutor).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El autor ha sido eliminado', 'success');
            this.findAll();
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar el autor', 'error');
            console.error(err);
          }
        });
      }
    });
  }

  editarAutor(autor: Autor): void {
    this.autor = { ...autor };
    this.idEditar = autor.idAutor;
    this.editar = true;

    setTimeout(() => {
      this.formularioAutor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  cancelarEdicion(form: NgForm): void {
    this.autor = {} as Autor;
    this.idEditar = null;
    this.editar = false;
    form.resetForm();
  }

  guardar(form: NgForm): void {
    if (form.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos requeridos', 'error');
      return;
    }

    if (this.editar && this.idEditar !== null) {
      this.update();
    } else {
      this.save();
    }
    form.resetForm();
  }

  filtrarAutores(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}

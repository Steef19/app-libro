import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../model/categoria.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoriaService } from '../../services/categoria';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: false,
  
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css']
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];
  categoria: Categoria = {} as Categoria;
  editar: boolean = false;
  idEditar: number | null = null;

  dataSource!: MatTableDataSource<Categoria>;
  mostrarColumnas: string[] = ['idCategoria', 'categoria', 'descripcion', 'acciones'];

  @ViewChild('formularioCategoria') formularioCategoria!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Categoria>([]);
    this.findAll();
  }

  findAll(): void {
    this.categoriaService.findAll().subscribe(data => {
      console.log("Categorías cargadas: ", data);
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
    this.categoriaService.save(this.categoria).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Categoría guardada correctamente', 'success');
        this.categoria = {} as Categoria;
        this.findAll();
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo guardar la categoría', 'error');
        console.error('Error al guardar:', err);
      }
    });
  }

  update(): void {
    if (this.idEditar !== null) {
      this.categoriaService.update(this.idEditar, this.categoria).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Categoría actualizada correctamente', 'success');
          this.categoria = {} as Categoria;
          this.editar = false;
          this.idEditar = null;
          this.findAll();
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo actualizar la categoría', 'error');
          console.error(err);
        }
      });
    }
  }

  eliminarCategoria(categoria: Categoria): void {
    Swal.fire({
      title: '¿Desea eliminar la categoría?',
      text: `Está a punto de eliminar "${categoria.categoria}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.delete(categoria.idCategoria).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La categoría ha sido eliminada', 'success');
            this.findAll();
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
            console.error(err);
          }
        });
      }
    });
  }

  editarCategoria(categoria: Categoria): void {
    this.categoria = { ...categoria };
    this.idEditar = categoria.idCategoria;
    this.editar = true;

    setTimeout(() => {
      this.formularioCategoria.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  cancelarEdicion(form: NgForm): void {
    this.categoria = {} as Categoria;
    this.idEditar = null;
    this.editar = false;
    form.resetForm();
  }

  guardar(form: NgForm): void {
    if (form.invalid) {
      Swal.fire('Error', 'Por favor complete el nombre de la categoría', 'error');
      return;
    }

    if (this.editar && this.idEditar !== null) {
      this.update();
    } else {
      this.save();
    }
    form.resetForm();
  }

  filtrarCategorias(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
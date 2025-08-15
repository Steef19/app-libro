import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Autor } from '../../model/autor.modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AutorService } from '../../services/autor';

@Component({
  selector: 'app-autor',
  standalone: false,
  templateUrl: './autor.html',
  styleUrls: ['./autor.css']
})
export class AutorComponent implements OnInit {
  editar: boolean = false;
  idEditar: number | null = null;

  autor: Autor = { } as Autor;
  autores: Autor[] = [];
 
  dataSource!: MatTableDataSource<Autor>;
  mostrarColumnas: string[] = ['idAutor', 'nombre', 'apellido', 'pais', 'direccion', 'telefono', 'correo', 'acciones'];

  @ViewChild('formularioAutor') formularioAutor!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.autorService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  save(): void {
    this.autorService.save(this.autor).subscribe(() => {
      this.autor = {} as Autor;
      this.findAll();
    });
  }

  update(): void {
    if (this.idEditar !== null) {
      this.autorService.update(this.idEditar, this.autor).subscribe(() => {
        this.autor = {} as Autor;
        this.editar = false;
        this.idEditar = null;
        this.findAll();
      });
    }
  }

  delete(): void {
    Swal.fire({
      title: '¿Desea eliminar el autor?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#00FF00',
      cancelButtonColor: '#f60000ff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorService.delete(this.autor.idAutor).subscribe(() => {
          this.findAll();
          this.autor = {} as Autor;
          Swal.fire('Eliminado', 'El autor ha sido eliminado', 'success');
        });
      }else{
        this.autor = {} as Autor;
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

  editarAutorCancelar(form: NgForm): void {
    this.autor = {} as Autor;
    this.idEditar = null;
    this.editar = false;
    form.resetForm();
  }

  guardar(form: NgForm): void {
    if (form.valid) {
      if (this.editar && this.idEditar !== null) {
        this.update();
      } else {
        this.save();
      }
      form.resetForm();
    }
  }

  filtroAutores(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
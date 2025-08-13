import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../services/cliente';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente = {} as Cliente;
  editar: boolean = false;
  idEditar: number | null = null;

  dataSource!: MatTableDataSource<Cliente>;
  mostrarColumnas: String[] = ['idCliente', 'cedula', 'nombre', 'apellido', 'direccion', 'telefono', 'correo', 'acciones'];

  @ViewChild('formularioCliente') formularioCliente!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Cliente>([]);
    this.findAll();
  }

  findAll(): void {
    this.clienteService.findAll().subscribe(data => {
      console.log("****************clientes: ", data)
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
    this.clienteService.save(this.cliente).subscribe(() => {
      console.log("***** cliente: ", this.cliente);
      this.cliente = { }as Cliente;
      this.findAll();
      // next: () => {
      //   Swal.fire('Éxito', 'Cliente guardado correctamente', 'success');
      //   this.cliente = {} as Cliente;
      //   this.findAll();
      // },
      // error: (err) => {
      //   Swal.fire('Error', 'No se pudo guardar el cliente', 'error');
      //   console.error('Error al guardar:', err);
      // }
    });
  }

  update(): void {
    if (this.idEditar !== null) {
      this.clienteService.update(this.idEditar, this.cliente).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Cliente actualizado correctamente', 'success');
          this.cliente = {} as Cliente;
          this.editar = false;
          this.idEditar = null;
          this.findAll();
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo actualizar el cliente', 'error');
          console.error(err);
        }
      });
    }
  }

  //delete(): void{
  //this.clienteService.delete(this.cliente.idCliente).subscribe(()=>{});
  //}

  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Desea eliminar el cliente?',
      text: `Está a punto de eliminar a ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.idCliente).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El cliente ha sido eliminado', 'success');
            this.findAll(); // Refrescar la lista
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
            console.error(err);
          }
        });
      }
    });
  }


  // interacción en la página Web
  editarCliente(cliente: Cliente): void {
    this.cliente = { ...cliente };
    this.idEditar = cliente.idCliente;
    this.editar = true;

    setTimeout(() => {
      this.formularioCliente.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

  }

  editarClienteCancelar(form: NgForm): void {
    this.cliente = {} as Cliente;
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

  filtroClientes(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

}

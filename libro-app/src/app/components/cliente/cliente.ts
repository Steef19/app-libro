import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../services/cliente';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
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
  mostrarColumnas: String[] = ['idCliente', 'cedula', 'nombre', 'apellido', 'telefono', 'direccion', 'correo', 'acciones'];

  @ViewChild('formularioCliente') formularioCliente!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.clienteService.findAll().subscribe(data => {
      //this.clientes = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  save(): void {
    this.clienteService.save(this.cliente).subscribe(() => {
      this.cliente = {} as Cliente;
      this.findAll();
    });
  }

  update(): void {
    if (this.idEditar !== null) {
      this.clienteService.update(this.idEditar, this.cliente).subscribe(() => {
        this.cliente = {} as Cliente;
        this.idEditar = null;
        this.editar = false;
        this.findAll();
      });
    }
  }

  //delete(): void{
  //this.clienteService.delete(this.cliente.idCliente).subscribe(()=>{});
  //}

  delete(): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este cliente?',
      text: 'No podrás recuperar este cliente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d63030ff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(this.cliente.idCliente).subscribe(() => {
          this.findAll();
          this.cliente = {} as Cliente;
          Swal.fire('Eliminado', 'El cliente ha sido eliminado', 'success');
        });
      } else {
        this.cliente = {} as Cliente;
      }
    });
  }

  //INTERACCION EN LA PAGINA WEB
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

  guardar(form: NgForm):void{
    if(this.editar && this.idEditar !== null){
      this.update();
      form.resetForm();
  }else{
    this.save();
    form.resetForm();
  }

}



filtroClientes(event : Event){
  const filtro = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filtro.trim().toLowerCase();

}




}

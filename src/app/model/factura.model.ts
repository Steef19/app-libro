import { Cliente } from './cliente.model';

export interface Factura {
  idFactura: number;
  numFactura: String;
  fecha: Date;
  totalNeto: number;
  iva: number;
  total: number;
  cliente: Cliente;
}

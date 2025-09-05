import { Factura } from './factura.model';
import { Libro } from './libro.model';

export interface FacturaDetalle {
  idFacturaDetalle: number;
  cantidad: number;
  subtotal: number;
  factura: Factura;
  libro: Libro;
}

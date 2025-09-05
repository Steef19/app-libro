import { Libro } from './libro.model';

export interface CarritoItem {
  idCarritoItem?: number;
  libro: Libro;
  cantidad: number;
  precioUnitario: number;
  total: number;
}

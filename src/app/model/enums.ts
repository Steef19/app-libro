export type EstadoPedido =
  | 'CREADO'
  | 'PAGADO'
  | 'EN_PREPARACION'
  | 'ENVIADO'
  | 'ENTREGADO'
  | 'CANCELADO';
export type MetodoPago =
  | 'TARJETA'
  | 'TRANSFERENCIA'
  | 'PAYPAL'
  | 'CONTRA_ENTREGA';

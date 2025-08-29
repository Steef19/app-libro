import { Component, OnInit } from '@angular/core';
import { Carrito } from '../../model/carrito.model';
import { GuestcarritoService } from '../../services/guest-carrito';
import { GuestCheckoutService } from '../../services/guest-checkout';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Factura } from '../../model/factura.model';


@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit {

  carrito?: Carrito;
    displayed = ['titulo','precio','cantidad','total','acciones'];
    loading = false;

    constructor(private carritoService: GuestcarritoService,
      private checkoutService: GuestCheckoutService,
      private snack: MatSnackBar
    ){

    }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  reload(){
    this.loading = true;
    this.carritoService.get().subscribe({
      next: c => {this.carrito = c; this.loading = false;},
        error: _ => this.loading = false
      
    });
  }

updateCantidad(idItem: number, cantidad: number){
  if(cantidad < 0 ) return;
  this.carritoService.updateItem(idItem, cantidad).subscribe({
    next: c => {this.carrito = c; this.snack.open('Cantidad actualizada','OK',{ duration: 1200})},
    error: err => Swal.fire('Error', err?.error?.message || 'No se puede actualizar', 'error')
  });
}

remove(idItem: number){
  Swal.fire({ 
    title:'Quitar item',
    text: '¿Seguro que deseas quitar este item',
    icon: 'warning', showCancelButton: true, confirmButtonText:'si, quitar'
  }).then(res =>{ 
    if(res.isConfirmed){
      this.carritoService.removeItem(idItem).subscribe({
        next: _ => this.reload()
      });
    }
  });
}

clear(){
  Swal.fire({
    title: 'Vaciar carrito',
    text: 'Se eliminaran todos los items',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Vaciar'
   }).then( r => { if(r.isConfirmed)this.carritoService.clear().subscribe({
    next: _ => this.reload()
   })});

}

checkout(){
  Swal.fire({ 
    title: 'Procesando...',
    didOpen: () => Swal.showLoading(), 
    allowOutsideClick: false
  });

  this.checkoutService.checkout().subscribe({ 
    next: ( fac: Factura) =>{ 
      Swal.close();
      Swal.fire('!Compora realizada',
        ` Factura: ${fac.numFactura}\nTotal: $${fac.total.toFixed(2)} `,
        'success'
      );
      this.reload();

    },
    error: (err: any ) => {
      Swal.close();
      Swal.fire('Error', err?.error?.message || 'No se puede procesar el check out', 'error');
    }
    
    
   });

}




}

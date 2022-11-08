import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartService } from 'src/app/cart/servicio/cart.service';

import { ModificarProductoPage } from './modificar-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CartService]
})
export class ModificarProductoPageRoutingModule {}

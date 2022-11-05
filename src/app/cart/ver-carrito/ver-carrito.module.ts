import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCarritoPageRoutingModule } from './ver-carrito-routing.module';

import { VerCarritoPage } from './ver-carrito.page';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../servicio/cart.service';
import { SvProductoService } from 'src/app/producto/services/sv-producto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerCarritoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [VerCarritoPage],
  providers: [CartService, SvProductoService]
})
export class VerCarritoPageModule {}

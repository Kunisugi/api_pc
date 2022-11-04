import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerProductoPageRoutingModule } from './ver-producto-routing.module';

import { VerProductoPage } from './ver-producto.page';
import { HttpClientModule } from '@angular/common/http';
import { SvProductoService } from '../services/sv-producto.service';
import { CartService } from 'src/app/cart/servicio/cart.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerProductoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [VerProductoPage],
  providers: [SvProductoService, CartService]
})
export class VerProductoPageModule {}

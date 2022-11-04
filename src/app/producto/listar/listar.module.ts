import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarPageRoutingModule } from './listar-routing.module';

import { ListarPage } from './listar.page';
import { HttpClientModule } from '@angular/common/http';
import { SvProductoService } from '../services/sv-producto.service';
import { CartService } from 'src/app/cart/servicio/cart.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarPage],
  providers: [SvProductoService, CartService]
})
export class ListarPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasPageRoutingModule } from './compras-routing.module';

import { ComprasPage } from './compras.page';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../servicio/cart.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprasPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ComprasPage],
  providers: [CartService]
})
export class ComprasPageModule {}

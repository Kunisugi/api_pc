import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarProductoPageRoutingModule } from './agregar-producto-routing.module';

import { AgregarProductoPage } from './agregar-producto.page';
import { HttpClientModule } from '@angular/common/http';
import { SvProductoService } from 'src/app/producto/services/sv-producto.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarProductoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AgregarProductoPage],
  providers: [SvProductoService]
})
export class AgregarProductoPageModule {}

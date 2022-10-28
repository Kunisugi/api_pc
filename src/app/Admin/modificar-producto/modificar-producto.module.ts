import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarProductoPageRoutingModule } from './modificar-producto-routing.module';

import { ModificarProductoPage } from './modificar-producto.page';
import { HttpClientModule } from '@angular/common/http';
import { SvProductoService } from 'src/app/producto/services/sv-producto.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModificarProductoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModificarProductoPage],
  providers: [SvProductoService]
})
export class ModificarProductoPageModule {}

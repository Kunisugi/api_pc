import { Component, OnInit } from '@angular/core';
import { IProductoConId } from './../modelo/i-producto';
import { SvProductoService } from './../services/sv-producto.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  public listarProductos: Array<IProductoConId>= [];

  constructor(private api:SvProductoService ) { }

  ngOnInit() {
    this.api.listarProductos$.subscribe(data => {
      this.listarProductos = data;
    })
    this.api.listarPrimerosProductos();
  }
  public cargarMasProductos(){
    this.api.obtenerMasProductos();
  }



}

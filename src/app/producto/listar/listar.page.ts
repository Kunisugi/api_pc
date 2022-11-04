import { Component, OnInit, ViewChild } from '@angular/core';
import { IProductoConId } from './../modelo/i-producto';
import { SvProductoService } from './../services/sv-producto.service';
import { Router } from '@angular/router';
import { UsuarioConId } from './../../usuario/modelo/user';
import { IonInfiniteScroll } from '@ionic/angular';
import { CartService } from './../../cart/servicio/cart.service';
@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  public listarProductos: Array<IProductoConId>= [];
  public usuarioLinea: UsuarioConId;
  public finProductos: string;

  constructor(private api:SvProductoService, private router: Router, private cart : CartService) { }

  ngOnInit() {
    this.api.listarProductos$.subscribe(data => {
      this.listarProductos = data
      });

    const per = localStorage.getItem('user');
    this.api.listarPrimerosProductos();
    this.usuarioLinea = JSON.parse(localStorage.getItem("user"))}

  public cargarMasProductos(){
    this.api.obtenerMasProductos();
    if(this.scroll){
      this.scroll.complete();
      console.log('productos cargados..')
    }
  }
  public logout(){
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })
  }








}

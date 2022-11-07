import { Component, OnInit } from '@angular/core';
import { CartService } from './../../cart/servicio/cart.service';
import { UsuarioConId } from './../../usuario/modelo/user';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  public listarCompras: Array<any> = [];
  public usuarioLinea: UsuarioConId;
  public comprasUser: Array<any> = [];
  public carritoVacio: number;

  constructor(private cart : CartService) {
  }

  ngOnInit() {
    this.cart.listarCompras$.subscribe(data => {
      this.listarCompras = data;
    })
    this.cart.getCompras();
    this.usuarioLinea = JSON.parse(localStorage.getItem("user"));
  }

  ngDoCheck() {
    this.comprasUser = this.listarCompras.filter(listarCompra =>
      listarCompra.idUser === this.usuarioLinea.id //Valida si hay compras que tengan el mismo id que nuestro user
    )





  }

}

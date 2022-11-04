import { Component, OnInit } from '@angular/core';
import { CartService } from './../../cart/servicio/cart.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  public listarCompras: Array<any> = [];

  constructor(private cart : CartService) {
  }

  ngOnInit() {
    this.cart.listarCompras$.subscribe(data => {
      this.listarCompras = data;
      console.log(this.listarCompras);
    })
    this.cart.getCompras();

  }

}

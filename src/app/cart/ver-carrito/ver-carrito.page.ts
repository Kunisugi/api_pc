import { Component, OnInit } from '@angular/core';
import { CartService } from './../servicio/cart.service';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.page.html',
  styleUrls: ['./ver-carrito.page.scss'],
})
export class VerCarritoPage implements OnInit {
  public carrito : Array<any> = [];
  public index: number = 0;

  constructor( private cart : CartService) { }

  ngOnInit() {
    this.carrito = this.cart.getCarrito()
    console.log('estoy en carrito --->',this.carrito)
    this.index = this.carrito.length

  }

}

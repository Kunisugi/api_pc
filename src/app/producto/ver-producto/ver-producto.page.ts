import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SvProductoService } from './../services/sv-producto.service';//Llamamos al servicios
import { IProducto} from './../modelo/i-producto'; //Llamamos a la Interfaz de producto
import { CartService  } from './../../cart/servicio/cart.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.page.html',
  styleUrls: ['./ver-producto.page.scss'],
})
export class VerProductoPage implements OnInit {
  public id : number;
  public producto : IProducto;
  public cantidadCart = 0;
  public precioCarrito = 0;


  constructor(private activedRoute : ActivatedRoute, private api: SvProductoService, private cart : CartService) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.queryParams['id']; //Recibimos la id

    this.api.getProducto(this.id).subscribe(data => { //Hacemos un get con la id
      this.producto = data; //le damos el valor a producto con el producto rescatado
    })
  }

  addItem(){
    if(this.cantidadCart >= 0){
      this.cantidadCart = this.cantidadCart + 1;
      this.precioCarrito = this.producto.precio * this.cantidadCart;
    }
  }

  restarItem(){
    if(this.cantidadCart > 0){
      this.cantidadCart = this.cantidadCart - 1;
      this.precioCarrito = this.producto.precio * this.cantidadCart;
    }
  }

  AddCart(){
    const cart = {
    nombre : this.producto.nombre,
    total : this.precioCarrito,
    cantidad : this.cantidadCart,
    idProducto: this.id,
    precio : this.producto.precio,
    foto: this.producto.img
    }
    this.cart.addCarro(cart);
  }

  verArray(){
    this.cart.getCarrito();

  }
}

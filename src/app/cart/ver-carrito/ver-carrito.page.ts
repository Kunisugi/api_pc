import { Component, OnInit } from '@angular/core';
import { CartService } from './../servicio/cart.service';
import { UsuarioConId } from './../../usuario/modelo/user';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.page.html',
  styleUrls: ['./ver-carrito.page.scss'],
})
export class VerCarritoPage implements OnInit {
  public compra:any;
  public carrito : Array<any> = [];
  public totalCompra = 0;
  public usuario : UsuarioConId;
  constructor( private cart : CartService, private router : Router) { }

  ngOnInit() {
    this.carrito = this.cart.getCarrito()
    this.carrito.forEach(cart => {
      this.totalCompra = cart.total + this.totalCompra
    })

  }


  public eliminarProducto(carrito){
    const index = this.carrito.findIndex(cart =>
      cart.idProducto === carrito.idProducto
      )
      console.log(index)
      this.carrito.splice(index,1)
      this.totalCompra = this.totalCompra - carrito.total;
      localStorage.setItem("carrito", JSON.stringify(this.carrito));


  }
  restarCarrito(carrito){
    if(carrito.cantidad > 1){
      carrito.cantidad = carrito.cantidad - 1;
      carrito.total = carrito.precio * carrito.cantidad;
      this.totalCompra = this.totalCompra - carrito.precio;
      const index = this.carrito.findIndex(cart =>
        cart.idProducto === carrito.idProducto)
        console.log(index)
        const nuevoCarrito = {
          ...carrito,
          total: carrito.total,
          cantidad: carrito.cantidad
        }
        this.carrito.splice(index, 1, nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(this.carrito));

    }
    else{
      const index = this.carrito.findIndex(cart =>
        cart.idProducto === carrito.idProducto
        )
        console.log(index)
        this.carrito.splice(index,1)
        this.totalCompra = this.totalCompra - carrito.precio;
        localStorage.setItem("carrito", JSON.stringify(this.carrito))


    }
  }

  sumarCarrito(carrito){
    carrito.cantidad = carrito.cantidad + 1;
    carrito.total = carrito.precio * carrito.cantidad;
    this.totalCompra= this.totalCompra + carrito.precio;
    const index = this.carrito.findIndex(cart =>
      cart.idProducto === carrito.idProducto)
      const nuevoCarrito = {
        ...carrito,
        cantidad: carrito.cantidad,
        total: carrito.total
      }
      this.carrito.splice(index, 1, nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(this.carrito))
    }

  pagarTotalCarrito(){
    this.usuario =  JSON.parse(localStorage.getItem("user"))
    console.log(this.usuario)
    this.cart.postCompra({
      nombre : this.usuario.user,
      idUser: this.usuario.id,
      cart: this.carrito,
      fecha: formatDate(new Date(), 'dd/MM/yyyy', 'en') ,
      total: this.totalCompra
    }).subscribe(data => {
    })
    localStorage.setItem("carrito", '[]');
    this.router.navigate(['home/compras']).then(() => {
      window.location.reload()
    })


  }



}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Array<any> = [];
  constructor() {this.cart = JSON.parse(localStorage.getItem("carrito")) }

  public addCarro(carrito){
    const existe = this.cart.find(existe => {
      return existe.idProducto === carrito.idProducto
    });
    if (existe){
      console.log("producto ya existe -->", existe)
      const nuevoCantidad = {
        nombre : existe.nombre,
        total: (existe.cantidad + carrito.cantidad) * carrito.precio,
        cantidad : existe.cantidad + carrito.cantidad,
        idProducto: existe.idProducto,
        precio: existe.precio,
        foto : existe.foto

      }
      const index = this.cart.findIndex(carrito =>
          carrito.idProducto === existe.idProducto
        )
        console.log(index)
        this.cart.splice(index, 1)
      console.log('Debería agregar en cantidad')
      this.cart.push(nuevoCantidad);
      localStorage.setItem("carrito", JSON.stringify(this.cart))

    }else{
      console.log('No hago nda')
      this.cart.push(carrito)
      localStorage.setItem("carrito", JSON.stringify(this.cart))
    }
  }

  public getCarrito(){
    return this.cart
  }



}

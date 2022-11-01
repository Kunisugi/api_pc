import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = [];
  constructor() {}

  public addCarro(carrito){
    const existe = this.cart.find(existe => {
      return existe.idProducto === carrito.idProducto
    });
    if (existe){
      console.log("producto ya existe -->", existe)
      const nuevoCantidad = {
        cantidad : existe.cantidad + carrito.cantidad,
        total: (existe.cantidad + carrito.cantidad) * carrito.precio,
        idProducto: existe.idProducto,
        nombre : existe.nombre,
        foto : existe.foto,
        precio: existe.precio
      }
      this.cart.pop();
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

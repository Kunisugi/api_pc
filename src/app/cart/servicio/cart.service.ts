import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private api_compra = 'http://localhost:3000/compras/';
  private cart: Array<any> = [];
  constructor(
    private http:HttpClient
  ) {this.cart = JSON.parse(localStorage.getItem("carrito")) }

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
      console.log('Añado al carrito')
      this.cart.push(carrito)
      localStorage.setItem("carrito", JSON.stringify(this.cart))
    }
  }

  public getCarrito(){
    return this.cart
  }

  public postCompra(nuevaCompra : any): Observable<any>{
    return this.http.post(this.api_compra, nuevaCompra, {
      headers:
      {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

}

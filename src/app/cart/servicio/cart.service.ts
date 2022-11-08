import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IcarroConId } from './../modelo/icarro';
import { UsuarioConId } from 'src/app/usuario/modelo/user';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private api_compra = 'http://localhost:3000/compras/';
  private api_producto = 'http://localhost:3000/productos/';
  private api_carrito = 'http://localhost:3000/carritos/';

  private cart: Array<any> = [];
  public usuarioLinea: UsuarioConId;
  public carro: any;
  public carritoListar: Array<any> = [];

  public carritoViejo: Array<any> = [];

  private comportamientoListar = new BehaviorSubject<Array<any>>([]);
  public listarCompras$ = this.comportamientoListar.asObservable();

  private comportamientoListarCarrito = new BehaviorSubject<Array<any>>([]);
  public listarCarrito$ = this.comportamientoListarCarrito.asObservable();

  constructor(
    private http:HttpClient
  ) {//JSON.parse(localStorage.getItem("carrito"))

  }


  public llenarCarrito(caart){
    this.cart.push(caart);
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
  public getCompras(){
    this.http.get<Array<any>>(this.api_compra).subscribe(data => {
      this.comportamientoListar.next(data);
    })
  }
  public getCarritos(){ //Retorna todos los carritos existentes
    this.http.get<Array<any>>(this.api_carrito).subscribe(data => {
      this.comportamientoListarCarrito.next(data);

    })
  }

  public crearCarrito(nuevoCarrito : any): Observable<any>{ //Creara un carrito si el usuario no tiene
    return this.http.post(this.api_carrito, nuevoCarrito, {
      headers:
      {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public obtenerCarrito(id):Observable<IcarroConId>{
    let direccion = this.api_carrito + id;
    return this.http.get<IcarroConId>(direccion);
  }

  public modificarCarrito(carrito, id): Observable<any>{
    let direccion = this.api_carrito + id;
    return this.http.patch(direccion, carrito)
  }







}

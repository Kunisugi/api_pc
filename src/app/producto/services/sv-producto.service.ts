import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProductoConId, IProducto } from '../modelo/i-producto';

@Injectable({
  providedIn: 'root'
})
export class SvProductoService {
  private api_producto = 'http://localhost:3000/productos/';
  private paginaActual = 1;
  private comportamientoListar = new BehaviorSubject<Array<IProductoConId>>([]);
  public listarProductos$ = this.comportamientoListar.asObservable();

  constructor(private http: HttpClient) { }

  public listarPrimerosProductos(){
    this.http.get<Array<IProductoConId>>(`${this.api_producto}?_page=1&_limit=10`).subscribe(data => {
      this.paginaActual = this.paginaActual + 1;
      this.comportamientoListar.next(data);
    })
  }
  public obtenerMasProductos(){
    this.http.get<Array<IProductoConId>>(`${this.api_producto}?_page=${this.paginaActual}&_limit=10`).subscribe(data => {
      if(data){
        this.paginaActual = this.paginaActual + 1;
        this.comportamientoListar.next(this.comportamientoListar.getValue().concat(data));
      }
    })
  }
  public getProducto(id):Observable<IProducto>{
    let direccion = this.api_producto + id ;
    return this.http.get<IProducto>(direccion)
  }



}

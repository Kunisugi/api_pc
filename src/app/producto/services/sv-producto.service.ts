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
  public getProducto(id):Observable<IProducto>{ //Obtener un producto por id
    let direccion = this.api_producto + id ;
    return this.http.get<IProducto>(direccion)
  }

  public patchProducto(producto, id){ //Modificar producto
    let direccion = this.api_producto + id;
    return this.http.patch(direccion, producto);
  }

  public deleteProducto(id){ //Eliminar producto
    let direccion = this.api_producto + id;
    return this.http.delete(direccion);
  }

  public postProducto(nuevoProducto:IProducto): Observable<any>{
    return this.http.post(this.api_producto, nuevoProducto, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

}

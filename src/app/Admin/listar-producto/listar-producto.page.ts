import { Component, OnInit, ViewChild  } from '@angular/core';
import { IProductoConId} from './../../producto/modelo/i-producto';
import { SvProductoService} from './../../producto/services/sv-producto.service';
import { Router } from '@angular/router';
import { UsuarioConId } from './../../usuario/modelo/user';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.page.html',
  styleUrls: ['./listar-producto.page.scss'],
})
export class ListarProductoPage implements OnInit {
  public listarProductos: Array<IProductoConId>= [];
  public usuarioLinea: UsuarioConId;
  @ViewChild(IonInfiniteScroll)
  public scroll: IonInfiniteScroll;
  constructor(private api:SvProductoService, private router: Router) { }

  ngOnInit() {
    this.api.listarProductos$.subscribe(data => {
      this.listarProductos = data;
    })
    this.api.listarPrimerosProductos();
    this.usuarioLinea = JSON.parse(localStorage.getItem("user"))
  }
  public cargarMasProductos(){
    this.api.obtenerMasProductos();
    if(this.scroll){
      this.scroll.complete();
      console.log('productos cargados..')
    }

  }
  public logout(){
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })


  }

}

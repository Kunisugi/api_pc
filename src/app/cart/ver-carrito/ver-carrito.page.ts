import { Component, OnInit } from '@angular/core';
import { CartService } from './../servicio/cart.service';
import { UsuarioConId } from './../../usuario/modelo/user';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { SvProductoService } from './../../producto/services/sv-producto.service';
import { IProducto } from './../../producto/modelo/i-producto';
import { IcarroConId } from './../modelo/icarro';



@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.page.html',
  styleUrls: ['./ver-carrito.page.scss'],
})
export class VerCarritoPage implements OnInit {
  public carrito :IcarroConId;
  public totalCompra :  number = 0;
  public usuario : UsuarioConId;
  public product : IProducto;
  public carritoVacio: number;
  public usuarioLinea: UsuarioConId;
  public carro: any;
  public carritoListar: Array<any> = [];

  public carritoVerHtml: Array<any> = [];

  constructor( private cart : CartService, private router : Router, private apiProducto : SvProductoService) { this.cart.getCarritos();  this.totalCompra = 0}

  ngOnInit() {
    //this.carrito = this.cart.getCarrito()

    this.cart.listarCarrito$.subscribe(data => {
      this.carritoListar = data;
    });
  }

  ionViewDidEnter(){
    this.usuarioLinea = JSON.parse(localStorage.getItem("user"));
    console.log(this.usuarioLinea, 'Soy usuario en linea :D')
    this.carro = this.carritoListar.find(elemento => {
      return elemento.idUser === this.usuarioLinea.id
    })

    if(this.carro){
      console.log(this.carro, ' ----> Soy this.carro ');
      this.totalCompra = 0;
    this.cart.obtenerCarrito(this.carro.id).subscribe(data => {
      this.carritoVerHtml = data.carrito;
      console.log(data.carrito);
      this.carritoVerHtml.forEach(cart => {
        this.totalCompra  += cart.precio;
        console.log(cart.precio);
      })
    });
    }else{
      console.log('Bug Identificado')
      this.router.navigate(['home/ver-carrito']).then(m => {
        window.location.reload()
      })
    }
  }


  public eliminarProducto(carrito){
    const index = this.carritoVerHtml.findIndex(cart =>
      cart.idProducto === carrito.idProducto
      )
      console.log(index)
      this.carritoVerHtml.splice(index, 1);

      this.totalCompra = this.totalCompra - carrito.precio
      this.cart.modificarCarrito({carrito: this.carritoVerHtml},this.carro.id).subscribe(data => {
        console.log(data, '---------> Soy data dsp de patch')
        console.log('Producto Eliminado del carrito');
            });
  }

  public pagar(){
    this.cart.postCompra({
      idUser: this.usuarioLinea.id,
      cart: this.carritoVerHtml,
      fecha: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
      total: this.totalCompra
    }).subscribe(m => {
    let length = this.carritoVerHtml.length;
    this.carritoVerHtml.splice(0, length);
    this.cart.modificarCarrito({carrito: this.carritoVerHtml}, this.carro.id).subscribe(data => {
      this.router.navigate(['home/compras'])
      console.log('Carrito pagado correctamente')
    })

    })
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SvProductoService } from './../services/sv-producto.service';//Llamamos al servicios
import { IProducto} from './../modelo/i-producto'; //Llamamos a la Interfaz de producto
import { CartService  } from './../../cart/servicio/cart.service';
import { UsuarioConId } from 'src/app/usuario/modelo/user';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.page.html',
  styleUrls: ['./ver-producto.page.scss'],
})
export class VerProductoPage implements OnInit {
  public id : number;
  public producto : IProducto;
  public cantidadCart = 1;
  public precioCarrito = 0;
  public carritoListar: Array<any> = [];
  public usuarioLinea: UsuarioConId;
  public mensaje: string;

  public carro: any;
  public carritoViejo: Array<any> = [];

  constructor(
    private activedRoute : ActivatedRoute,
    private api: SvProductoService,
    private cart : CartService,
    private router : Router ) {

    }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.queryParams['id']; //Recibimos la id
    this.api.getProducto(this.id).subscribe(data => { //Hacemos un get con la id
      this.producto = data; //le damos el valor a producto con el producto rescatado
      this.precioCarrito = this.precioCarrito + this.producto.precio

    })
    console.log(this.carritoViejo, '---> Soy carrito viejo de init')
    this.cart.getCarritos();
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
    console.log(this.carro, ' ----> Soy this.carro ');
    this.cart.obtenerCarrito(this.carro.id).subscribe(data => {
      this.carritoViejo = data.carrito;
      console.log(data.carrito);
    });
  }



  AddCart(){
    console.log(this.carritoViejo, '---> Soy carrito de ADDCART');
    const cart = {
    nombreProducto : this.producto.nombre,
    precio : this.precioCarrito,
    idProducto: this.id,
    img: this.producto.img
    }
    let validacion = this.carritoViejo.find(elemento => {
      return elemento.idProducto === this.id
    })
    if(!validacion){
      this.carritoViejo.push(cart);
      this.cart.modificarCarrito({carrito: this.carritoViejo},this.carro.id).subscribe(data => {
        this.router.navigate(['home'])

            });
    }else{
      this.mensaje = 'Ya tienes este producto en tu carrito :D'
      console.log('Ya existe no se puede agregar D:');

    }

    }




}






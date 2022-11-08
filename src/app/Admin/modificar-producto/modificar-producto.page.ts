import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SvProductoService } from '../../producto/services/sv-producto.service';
import { IProducto } from './../../producto/modelo/i-producto';
import { ActivatedRoute, Router} from '@angular/router';
import { CartService } from './../../cart/servicio/cart.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit {
  public formulario : FormGroup;
  public id: number;
  public producto: IProducto;
  public imagenBase64 = '';
  public carritoListar: Array<any> = [];
  public productoCarrito: Array<any> = [];
  public asd: any;
  public asdddd: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private api: SvProductoService,
    private activateRouter : ActivatedRoute,
    private router :Router,
    private cart : CartService
    ) { this.form();}

  public form(){this.formulario= this.fb.group({
    nombreProducto: new FormControl(''),
    img: new FormControl(''),
    cantidad: new FormControl(''),
    precio: new FormControl (''),
    ram: new FormControl (''),
    procesador: new FormControl (''),
    discoDuro: new FormControl (''),
    placaMadre: new FormControl (''),
    gabinete: new FormControl (''),
    tarjetaGrafica: new FormControl (''),
    gama: new FormControl (''),
  })}

  ngOnInit() {
    this.id = this.activateRouter.snapshot.queryParams['id'];
    this.api.getProducto(this.id).subscribe(data => {
      this.producto = data;
      this.imagenBase64 = data.img;
      this.formulario.setValue({
        'nombreProducto' : this.producto.nombre,
        'img': this.imagenBase64,
        'cantidad': this.producto.cantidad,
        'precio': this.producto.precio,
        'ram': this.producto.ram,
        'procesador':this.producto.procesador,
        'discoDuro':this.producto.discoDuro ,
        'placaMadre': this.producto.placaMadre,
        'gabinete':this.producto.gabinete ,
        'tarjetaGrafica':this.producto.tarjetaGrafica ,
        'gama': this.producto.gama
      })
    })
    this.cart.listarCarrito$.subscribe(data => {
      this.carritoListar = data;
      console.log(this.carritoListar)
    })
    this.cart.getCarritos();

  }

  public leerArchivo(evento : Event){
    const elemento = evento.target as HTMLInputElement;
    const archivo = elemento.files[0]

    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      this.imagenBase64 = reader.result as string;
    }
  }

  public guardarDatos(guardar){
    const update = {
      nombre : guardar.nombreProducto,
      img: this.imagenBase64,
      cantidad : guardar.cantidad,
      precio: guardar.precio,
      ram: guardar.ram,
      procesador:guardar.pprocesador,
      discoDuro:guardar.discoDuro ,
      placaMadre: guardar.placaMadre,
      gabinete:guardar.gabinete ,
      tarjetaGrafica:guardar.tarjetaGrafica ,
      gama: guardar.gama
    };
    this.api.patchProducto(update, this.id).subscribe(personaje => {
      this.router.navigate(['listar-producto']).then(() => {
        window.location.reload();
      })
    })
  }


  eliminarPersonaje(){



    this.api.deleteProducto(this.id).subscribe(() =>
    alert('eliminado :('));
    this.router.navigate(['listar-producto']).then(() => {
      window.location.reload();
    })









      console.log(this.asdddd)
      //console.log(productoCarrito)

  }



  }



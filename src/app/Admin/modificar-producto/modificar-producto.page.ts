import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SvProductoService } from '../../producto/services/sv-producto.service';
import { IProducto } from './../../producto/modelo/i-producto';
import { ActivatedRoute, Router} from '@angular/router';

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

  constructor(private fb: FormBuilder, private api: SvProductoService, private activateRouter : ActivatedRoute, private router :Router ) { this.form();}

  public form(){this.formulario= this.fb.group({
    nombreProducto: new FormControl(''),
    img: new FormControl(''),
    cantidad: new FormControl('')
  })}

  ngOnInit() {
    this.id = this.activateRouter.snapshot.queryParams['id'];
    this.api.getProducto(this.id).subscribe(data => {
      this.producto = data;
      this.imagenBase64 = data.img;
      this.formulario.setValue({
        'nombreProducto' : this.producto.nombre,
        'img': this.imagenBase64,
        'cantidad': this.producto.cantidad
      })
    })
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
      cantidad : guardar.cantidad
    };
    this.api.patchProducto(update, this.id).subscribe(personaje => {
      this.router.navigate(['listar-producto']).then(() => {
        window.location.reload();
      })
    })
  }

  eliminarPersonaje():void{
    this.api.deleteProducto(this.id).subscribe(() =>
    alert('eliminado :('));
    this.router.navigate(['listar-producto']).then(() => {
      window.location.reload();
    })
  }

  }

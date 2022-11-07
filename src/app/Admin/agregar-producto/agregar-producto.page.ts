import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SvProductoService } from './../../producto/services/sv-producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  public formulario : FormGroup;
  public imagenBase64 = '';

  constructor(private fb: FormBuilder, private api: SvProductoService, private router: Router ) {this.form(); }

  public form( ){this.formulario = this.fb.group({
    nombre: new FormControl('', Validators.required),
    cantidad : new FormControl ('', Validators.required),
    img: new FormControl (''),
    precio: new FormControl ('', Validators.required),
    ram: new FormControl ('', Validators.required),
    procesador: new FormControl ('', Validators.required),
    discoDuro: new FormControl ('', Validators.required),
    placaMadre: new FormControl ('', Validators.required),
    gabinete: new FormControl ('', Validators.required),
    tarjetaGrafica: new FormControl ('', Validators.required),
    gama: new FormControl ('', Validators.required),
  })
  }

  ngOnInit() {}

  public leerArchivo(evento : Event){
    const archivo = (evento.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload= () => {
      this.imagenBase64 = reader.result as string;
    }
  }

  public guardarDatos(){
    this.api.postProducto({
      ...this.formulario.value,
      img : this.imagenBase64
    }).subscribe(data => {
      this.router.navigate(['listar-producto']).then(() =>{
        window.location.reload();
      });
    })
  }
}

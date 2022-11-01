import { Component, OnInit } from '@angular/core';
import { UsuarioConId } from './../modelo/user';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { UserServiceService } from './../servicio/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public listaUsuarios: Array<UsuarioConId> = [];
  public user : UsuarioConId;
  public formulario : FormGroup;


  constructor( private fb : FormBuilder, private api: UserServiceService, private router: Router) { this.form();}
  public form(){
    this.formulario = this.fb.group({
      user: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit() {
    this.api.listarUser$.subscribe(datos => {
      this.listaUsuarios = datos;
      console.log(this.listaUsuarios)
    })
    this.api.getPersona(); //Se llama a la funcion para llenar los datos de arriba
  }

  public login(){
    this.user = this.listaUsuarios.find(elemento => {
      const usuario = this.formulario.value.user
      console.log(usuario)
      return elemento.user === usuario
    })
    if(this.user){
      if(this.user.password== this.formulario.value.password){//Validación de contraseña
        if(this.user.rol == 'user'){ //Si es usuario normal mandalo al home
          alert('Excelente puede pasar')
          localStorage.setItem("user", JSON.stringify(this.user))
          this.router.navigate(['home'])
          localStorage.setItem("carrito", '[]');
        }else{ // Si es administrador mandalo al listar Producto
          alert('Excelente puede pasar')
          localStorage.setItem("user", JSON.stringify(this.user))
          this.router.navigate(['listar-producto'])
        }
      }else{
        alert('Contraseña erronea, porfavor vuelva a intentar')//Si la contraseña no es igual
      }
    }
    else{
      alert('No se encuentro usuario') //Si no se encuentra el usuario
      localStorage.clear()
    }
  }
}

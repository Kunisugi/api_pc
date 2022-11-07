import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UserServiceService } from './../servicio/user-service.service';
import { Router } from '@angular/router';
import { UsuarioConId } from '../modelo/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public listaUsuarios: Array<UsuarioConId> = [];
  public formulario: FormGroup;
  public user: UsuarioConId;

  constructor(private fb: FormBuilder, private api:UserServiceService, private router :Router) {this.form();}

  public form(){this.formulario = this.fb.group({
    user: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\ ]+$/)]),
    password: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    rol: new FormControl('')

  })}

  ngOnInit() {
    this.api.listarUser$.subscribe(datos => {
      this.listaUsuarios = datos;
      //console.log(this.listaUsuarios)
    })
    this.api.getPersona(); //Se llama a la funcion para llenar los datos de arriba


  }
  public registrar(){
    this.user = this.listaUsuarios.find(elemento => {
      const usuario = this.formulario.value.user
      console.log(usuario)
      return elemento.user === usuario
    })
    if(this.user){
      alert('Usuario existe porfavor intente con otro user');
    }else{
      if(this.formulario.value.rol == 'JDLF1234'){
        this.api.postUsuario({
          ...this.formulario.value,
          rol: 'admin',
        }).subscribe(data => {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          })
        })
      }else{
        this.api.postUsuario({
          ...this.formulario.value,
          rol: 'user',
        }).subscribe(data => {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          })
        })

      }

    }











  }

}


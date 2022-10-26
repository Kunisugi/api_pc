import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { UserServiceService } from './../servicio/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public formulario: FormGroup;

  constructor(private fb: FormBuilder, private api:UserServiceService, private router :Router) {this.form();}

  public form(){this.formulario = this.fb.group({
    user: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\ ]+$/)]),
    password: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(3)]),

  })}

  ngOnInit() {
  }
  public registrar(){
    this.api.postUsuario({
      ...this.formulario.value
    }).subscribe(data => {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      })

    })
  }

}


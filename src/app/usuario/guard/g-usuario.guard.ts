import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioConId } from 'src/app/usuario/modelo/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GUsuarioGuard implements CanActivate {
  constructor(private router : Router ){}
  public user: UsuarioConId;

  noLogin(): any {
    this.router.navigate(['']);
}
devolverloHome(): any {
  this.router.navigate(['listar-producto']);
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user){
          if(this.user.rol == 'user')
            return true //puede ver todas las vistas permitidas a su rol
          else{
              this.devolverloHome(); // Devolvemos al ADM a su HOME
            return false
          }
      }else{
        this.noLogin(); // Redirccionamos al iniciar-sesion, ya q no esta registrado
        return false
      }

  }

}

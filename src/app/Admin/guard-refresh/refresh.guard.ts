import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioConId } from 'src/app/usuario/modelo/user';

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanActivate {
  public user: UsuarioConId;
  constructor(private router : Router ){}

  siLoginUser():any{
    this.router.navigate(['/home'])
}
siLoginAdm():any{
  this.router.navigate(['/listar-producto'])
}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user){
          if(this.user.rol == 'user'){
              this.siLoginUser(); //Si esta logueado no puede ver la vista del login
            return false
        }else{
            this.siLoginAdm(); //Si esta logueado no puede ver la vista del login
            return false
          }
      }else{
        return true //Si no esta logueado puede ver la vista de login
      }
  }

}

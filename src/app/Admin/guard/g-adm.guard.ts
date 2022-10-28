import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioConId } from 'src/app/usuario/modelo/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GAdmGuard implements CanActivate {
  constructor(private router : Router ){}
  public user: UsuarioConId;

  noLogin(): any {
    this.router.navigate(['']);
}
devolverloHome(): any {
  this.router.navigate(['/home']);
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user){
          if(this.user.rol == 'admin')
            return true // Puede pasar, pq es admin 8)
          else{
              this.devolverloHome() // Redireccionamos al user a SU HOME
            return false // No puede pasar, pq no es admin :(
          }
      }else{
        this.noLogin()
        return false // Ni siquiera estas logueado
      }


  }

}

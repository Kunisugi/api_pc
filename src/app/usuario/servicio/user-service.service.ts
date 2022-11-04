import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioConId, User } from './../modelo/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private api_user = 'http://localhost:3000/user';
  private comportamientoListar = new BehaviorSubject<Array<UsuarioConId>>([]);
  public listarUser$ = this.comportamientoListar.asObservable();

  constructor(private http : HttpClient) { }

  public postUsuario(nuevoUser: User): Observable<any>{
    return this.http.post(this.api_user, nuevoUser,{
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public getPersona(){
    this.http.get<Array<UsuarioConId>>(this.api_user).subscribe(data => {
      this.comportamientoListar.next(data);
    })
  }

}

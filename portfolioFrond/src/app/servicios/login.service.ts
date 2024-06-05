import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userList: Usuario[] = [];

  currentUserLoginOn: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({id:0, email:''});

  constructor(private httpClient:HttpClient) { }

  urlBase = "http://localhost:8080/user/";

  public buscarUsuario(userLogin:LoginRequest):Observable<Usuario>{

    let url: string;
    url = this.urlBase + userLogin.email + '/' + userLogin.password;
    return  this.httpClient.get<Usuario>(url).pipe(
      tap((userData:Usuario)=>{

            this.currentUserLoginOn.next(true);
            this.currentUserData.next(userData);

      }),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error("Se ha producido un error", error.error);
    }
    else{
      console.error("El backend retorno el codigo de estado", error.status, error.error);
    }
    return throwError(()=> new Error("Algo fallo, por favor intente de nuevo"));
  }

  
  get userData():Observable<Usuario>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}

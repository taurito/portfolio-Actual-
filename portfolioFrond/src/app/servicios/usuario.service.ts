import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient:HttpClient) { }

  urlBase = "http://localhost:8080/user/";

  public listar(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.urlBase + 'listar')
  }

  public getUserById(id:number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.urlBase + `detail/${id}`)
  }

  public agregarUsuario(usuario:Usuario): Observable<any>{
    return this.httpClient.post(this.urlBase + 'create', usuario);
  }

  public actualizarUsuario(id: number, usuario:Usuario): Observable<any>{
    return this.httpClient.put<any>(this.urlBase + `update/${id}`, usuario);
  }

  public eliminarUsuario(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.urlBase + `delete/${id}`);
  }

}

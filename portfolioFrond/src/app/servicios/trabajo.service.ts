import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajo } from '../models/trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  constructor(private httpClient:HttpClient) { }

  urlBase = "http://localhost:8080/card/";

  public listarTrabajos(): Observable<Trabajo[]>{
      return this.httpClient.get<Trabajo[]>(this.urlBase + 'lista');
  }

  public getTrajajoById(id:number): Observable<Trabajo>{
      return this.httpClient.get<Trabajo>(this.urlBase + `detail/${id}`);
  }

  public agregarTrabajo(trabajo:Trabajo): Observable<any>{
      return this.httpClient.post<any>(this.urlBase + 'create', trabajo);
  }

  public actualizarTrabajo(id:number, trabajo:Trabajo): Observable<any>{
      return this.httpClient.put<any>(this.urlBase + `update/${id}`, trabajo);
  }

  public eliminarTrabajo(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.urlBase + `delete/${id}`);
  }

}

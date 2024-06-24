import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trabajo } from '../models/trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {
  private urlBase = "http://localhost:8080/card/";

  private trabajoSubject:BehaviorSubject<Trabajo> = new BehaviorSubject<Trabajo>({idCardWock:0, titulo:'', image:'', descripcion:'', referencia:''});

  constructor(private httpClient:HttpClient) { }



  public listarTrabajos(): Observable<Trabajo[]>{
      return this.httpClient.get<Trabajo[]>(this.urlBase + 'lista');
  }

  public getTrajajoById(id:number): Observable<Trabajo>{
      return this.httpClient.get<Trabajo>(this.urlBase + `detail/${id}`);
  }

  public agregarTrabajo(trabajo:FormData): Observable<any>{
      return this.httpClient.post<any>(`${this.urlBase}create`, trabajo,  {
        headers: new HttpHeaders({
          'enctype': 'multipart/form-data'
        })
      });
  }

  public cargarTrabajo(trabajo:Trabajo){
    this.trabajoSubject.next(trabajo);
  }

  get trabajoObs(){
    return this.trabajoSubject.asObservable();
  }

  public actualizarTrabajo(id:number, trabajo:FormData): Observable<any>{
      return this.httpClient.put<any>(this.urlBase + `update/${id}`, trabajo);
  }

  public eliminarTrabajo(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.urlBase + `delete/${id}`);
  }

  public getImage(image:String){
    return `${this.urlBase + "imagen/"}${image}`;

  }

}

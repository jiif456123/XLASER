import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class ConsultarhorarioService {
    urlEndPoint: string = environment.endpoint.concat('/domicilio/consultarhorario');
  
    constructor(private http: HttpClient) {}
  
       listar(){
           return this.http.get<any>(this.urlEndPoint);
       }
       registrar(query: any){
           return this.http.post<any>(this.urlEndPoint,query);
       }
       actualizar(id: string, query: any){
           return this.http.put(`${this.urlEndPoint}/${id}`,query)
       }
        eliminar(id: string){
            return this.http.delete(`${this.urlEndPoint}/${id}`)
        }

/*
       getPacientes(): Observable<any> {
         return this.http.get(this.url);  
       } 
  
       eliminarPacientes(id: string): Observable<any> {
         return this.http.delete(this.url + id);
       }
  
       guardarPacientes(paciente: Paciente): Observable<any>{
        return this.http.post(this.url, paciente);
      }
  
       obtenerPacientes(id: string): Observable<any>{
        return this.http.get(this.url + id);
      }
      
       editarPacientes(id: string,paciente: Paciente): Observable<any>{
        return this.http.put(this.url + id, paciente);
      }
      */
  }
  
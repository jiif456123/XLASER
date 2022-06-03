import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  urlEndPoint: string = environment.endpoint.concat('/virtual/cita');

  //localhost:3000/citas/cita

  
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any>(this.urlEndPoint);
  }

  registrar(query: any) {
    return this.http.post<any>(this.urlEndPoint, query);
  }

  actualizar(id: string, query: any) {
    return this.http.put<any>(`${this.urlEndPoint}/${id}`, query);
  }

  citasByDoctorName(nombre: string){
    return this.http.get<any>(`${this.urlEndPoint}/${nombre}`);
  }
}
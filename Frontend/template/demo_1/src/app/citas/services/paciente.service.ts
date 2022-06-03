import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  urlEndPoint: string = environment.endpoint.concat('/virtual/paciente');

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

  getPacienteById(id: string){
    return this.http.get<any>(`${this.urlEndPoint}/${id}`);
  }
}
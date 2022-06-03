import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  urlEndPoint: string = environment.endpoint.concat('/domicilio/caja');

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any>(this.urlEndPoint);
  }

  actualizar(id: string, query: any) {
    return this.http.put<any>(`${this.urlEndPoint}/${id}`, query);
  }
}

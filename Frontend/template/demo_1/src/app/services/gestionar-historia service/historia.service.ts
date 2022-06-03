import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {
  urlEndPoint: string = environment.endpoint.concat('/domicilio/historia');

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

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RectaMedicaService {

  urlEndPoint: string = environment.endpoint.concat('/domicilio/receta-medica');

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any>(this.urlEndPoint);
  }

  listarId(id) {
    return this.http.get<any>(this.urlEndPoint+ '/'+ id);
  }

  registrar(query: any) {
    return this.http.post<any>(this.urlEndPoint, query);
  }
}

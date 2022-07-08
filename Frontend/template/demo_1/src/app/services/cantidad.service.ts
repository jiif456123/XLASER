import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cantidad } from '../models/cantidad.model';
@Injectable({
    providedIn: 'root'
  })
  export class CantidadService {
    selectedCantidad : Cantidad;
    cantidad: Cantidad[];

  url_API: string = environment.endpoint.concat('/domicilio/cantidad');
  cantidadCambio = new Subject<any>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient){ }

  listar() {
    return this.http.get<any>(`${this.url_API}`);
  };

  getEquipoR(){
    return this.http.get<Cantidad[]>(this.url_API);
  }

  registrarEquipoR(cantidad: any){
    return this.http.post<Cantidad[]>(this.url_API, cantidad);
  }

  actualizarEquipoR(cantidad: Cantidad) {
    return this.http.put(this.url_API + `/${cantidad._id}`, cantidad);
  }
  listarEquipoRId(id: string){
    return this.http.get<any>(`${this.url_API}/${id}`);
  }
  eliminar(_id: string) {
    return this.http.delete<any>(`${this.url_API}/${_id}`);
  };
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { EquipoR } from '../models/equipoR.model';
@Injectable({
    providedIn: 'root'
  })
  export class EquipoRService {
    selectedEquipoR : EquipoR;
    equipoR: EquipoR[];

  url_API: string = environment.endpoint.concat('/domicilio/equipo');
  equipoRTCambio = new Subject<any>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient){ }

  listar() {
    return this.http.get<any>(`${this.url_API}`);
  };

  getEquipoR(){
    return this.http.get<EquipoR[]>(this.url_API);
  }

  registrarEquipoR(equipoR: any){
    return this.http.post<EquipoR[]>(this.url_API, equipoR);
  }

  actualizarEquipoR(equipoR: EquipoR) {
    return this.http.put(this.url_API + `/${equipoR._id}`, equipoR);
  }
  listarEquipoRId(id: string){
    return this.http.get<any>(`${this.url_API}/${id}`);
  }
  eliminar(_id: string) {
    return this.http.delete<any>(`${this.url_API}/${_id}`);
  };
}

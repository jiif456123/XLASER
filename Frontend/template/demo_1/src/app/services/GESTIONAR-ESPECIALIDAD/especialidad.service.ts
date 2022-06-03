import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Especialidad } from '../../models/especialiadad.model';


@Injectable({
    providedIn: 'root'
  })
  export class EspecialidadService {
    selectedEspecialidad : Especialidad;
    especialidad: Especialidad[];

  url_API: string = environment.endpoint.concat('/domicilio/gestionar-especialidad');
  especialidadCambio = new Subject<any>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient){ }

  listar() {
    return this.http.get<any>(`${this.url_API}`);
  };

  getEspecialidad(){
    return this.http.get<Especialidad[]>(this.url_API);
  }

  registrarEspecialidad(especialidad: any){
    return this.http.post<Especialidad[]>(this.url_API, especialidad);
  }

  actualizarEspecialidad(Especialidad: Especialidad) {
    return this.http.put(this.url_API + `/${Especialidad._id}`, Especialidad);
  }
  listarEspacialidadId(id: string){
    return this.http.get<any>(`${this.url_API}/${id}`);
  }
  eliminar(_id: string) {
    return this.http.delete<any>(`${this.url_API}/${_id}`);
  };
}

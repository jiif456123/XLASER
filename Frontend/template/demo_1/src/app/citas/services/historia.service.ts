import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Historia } from '../models/historia.model';

@Injectable({
  providedIn: 'root'
})

export class HistoriaService {


    selectedHistoria: Historia={
        medico: '',
        especialidad: '',
        fecha: null, 
        peso: null,
        altura: null,
        tension: null,
        alergias: null,
        antecedentes: null,
        historia: null,
        diagnostico: null,
        paciente: ''
     };

  urlEndPoint: string = environment.endpoint.concat('/virtual/historia');
  //endpoint: "http://localhost:3000/virtual/historia/"
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

  //buscar historia con id del paciente
  getHistoriaByPacienteIDS(pacienteID: string){
    return this.http.get<any>(this.urlEndPoint+ '/getHistoriaByPaciente/' + `${pacienteID}`);
  }

  
}
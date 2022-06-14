import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ReporteT } from '../models/registrotecnico.model';
@Injectable({
    providedIn: 'root'
  })
  export class ReporteTService {
    selectedReporteT : ReporteT;
    reporteT: ReporteT[];

  url_API: string = environment.endpoint.concat('/domicilio/reportet');
  reporteTCambio = new Subject<any>();
  mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient){ }

  listar() {
    return this.http.get<any>(`${this.url_API}`);
  };

  getReporteT(){
    return this.http.get<ReporteT[]>(this.url_API);
  }

  registrarReporteT(reporteT: any){
    return this.http.post<ReporteT[]>(this.url_API, reporteT);
  }

  actualizarReporteT(reporteT: ReporteT) {
    return this.http.put(this.url_API + `/${reporteT._id}`, reporteT);
  }
  listarReporteTId(id: string){
    return this.http.get<any>(`${this.url_API}/${id}`);
  }
  eliminar(_id: string) {
    return this.http.delete<any>(`${this.url_API}/${_id}`);
  };
}

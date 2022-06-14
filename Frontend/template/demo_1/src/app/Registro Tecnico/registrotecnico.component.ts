import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReporteT } from '../models/registrotecnico.model';
import { ReporteTService } from '../services/reporteT.service';

@Component({
  selector: 'app-registro-tecnico',
  templateUrl: './registrotecnico.component.html',
  styleUrls: ['./registrotecnico.component.scss'],
  providers: [DatePipe]
})
export class RegistroTecnicoComponent implements OnInit {
  id:string;
  registroReporteT: ReporteT[]=[];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private reporteTService: ReporteTService,
  ) { }

  ngOnInit() {
    this.reporteTService.listar().subscribe(data =>{
      this.registroReporteT = data.data;
      console.log(data.data);
    })

}

eliminarEspecialidad( _id: string ){
  Swal.fire({
   text: '¿Está seguro que desea elimnar la este registro tecnico?',
   icon: 'warning',
   showCancelButton: true,
   cancelButtonText: 'Cancelar',
   confirmButtonColor:'Aceptar'
  }).then((willDelete)=>{
    if(willDelete.isConfirmed){
      this.reporteTService.eliminar(_id).pipe(switchMap(()=>{
        return this.reporteTService.listar();
      }))
      .subscribe(data =>{
        this.registroReporteT=data.data;
        Swal.fire('El registro se eliminó correctamente');
      });
    } else{
      Swal.fire('El registro no ha sido eliminado'),
      {icon: 'info'}
    }
  })
  this.router.navigate(['/registro-tecnico']);
};

}
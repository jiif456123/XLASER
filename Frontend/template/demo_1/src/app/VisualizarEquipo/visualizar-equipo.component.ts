import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EquipoR } from '../models/equipoR.model';
import { EquipoRService } from '../services/equipoR.service';

@Component({
  selector: 'app-visualizar-equipo',
  templateUrl: './visualizar-equipo.component.html',
  styleUrls: ['./visualizar-equipo.component.scss'],
  providers: [DatePipe]
})
export class VisualizarEquipoComponent implements OnInit {
  id:string;
  registroEquipoR: EquipoR[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private equipoRService: EquipoRService,
  ) { }

  ngOnInit() {
    this.equipoRService.listar().subscribe(data =>{
      this.registroEquipoR = data.data;
      console.log(data.data);
    })

}

eliminar( _id: string ){
  Swal.fire({
   text: '¿Está seguro que desea elimnar este equipo?',
   icon: 'warning',
   showCancelButton: true,
   cancelButtonText: 'Cancelar',
   confirmButtonColor:'Aceptar'
  }).then((willDelete)=>{
    if(willDelete.isConfirmed){
      this.equipoRService.eliminar(_id).pipe(switchMap(()=>{
        return this.equipoRService.listar();
      }))
      .subscribe(data =>{
        this.equipoRService=data.data;
        Swal.fire('El registro se eliminó correctamente');
      });
    } else{
      Swal.fire('El registro no ha sido eliminado'),
      {icon: 'info'}
    }
  })
  this.router.navigate(['/visualizar-equipo']);
};

}
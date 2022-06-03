import { Component, OnInit, NgModule } from '@angular/core';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';

import { Especialidad } from '../models/especialiadad.model';
import { EspecialidadService } from '../services/GESTIONAR-ESPECIALIDAD/especialidad.service';
import { switchMap } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  id:string;
 
  public especialidad:  Especialidad = new Especialidad();

  registroEspecialidad: Especialidad[]=[];

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private EspecialidadService: EspecialidadService,
  ) { }

  ngOnInit() {
    this.EspecialidadService.listar().subscribe(data =>{
      this.registroEspecialidad = data.data;
      console.log(data.data);
    })

}

eliminarEspecialidad( _id: string ){
  Swal.fire({
   text: '¿Está seguro que desea elimnar la especialidad?',
   icon: 'warning',
   showCancelButton: true,
   cancelButtonText: 'Cancelar',
   confirmButtonColor:'Aceptar'
  }).then((willDelete)=>{
    if(willDelete.isConfirmed){
      this.EspecialidadService.eliminar(_id).pipe(switchMap(()=>{
        return this.EspecialidadService.listar();
      }))
      .subscribe(data =>{
        this.registroEspecialidad=data.data;
        Swal.fire('El registro se eliminó correctamente');
     
      });
    } else{
      Swal.fire('El registro no ha sido eliminado'),
      {icon: 'info'}
    }
  })
  this.router.navigate(['/citas/gestionar-especialidad']);
};


} 
  
  


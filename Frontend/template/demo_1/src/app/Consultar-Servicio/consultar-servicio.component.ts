import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Prueba } from '../models/prueba.model';
import Swal from 'sweetalert2'
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultarService } from '../services/Consultar-servicio/consultar-servicio.service';
@Component({
  selector: 'app-consultar-servicio',
  templateUrl: './consultar-servicio.component.html',
  styleUrls: ['./consultar-servicio.component.scss'],
  providers: [DatePipe]
})
export class consultarserviciocomponent implements OnInit {
  @ViewChild('modalRegistrar') modalRegistrar: ElementRef;
  @ViewChild('modalModificar') modalModificar: ElementRef;
  @ViewChild('modalDetalle') modalDetalle: ElementRef;

  formPaciente: FormGroup;
  formPacienteModificar: FormGroup;

  filtro = "";

  pruebas: Prueba[] = []
  pruebaSeleccionado: Prueba;
  constructor(
    private consultarService: ConsultarService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  async ngOnInit(): Promise<void> {
    var data = await this.consultarService.listar().toPromise();
    this.pruebas = data.data
  }

  abrirModal() {
    this.modalRegistrar.nativeElement.click();
  }

  abrirModalDetalle(row: Prueba) {
    this.modalDetalle.nativeElement.click();
    this.pruebaSeleccionado = row;
  }

  eliminarEspecialidad( _id: string ){
    Swal.fire({
     text: 'Ingresar la contraseña del administrador',
     icon: 'warning',
     showCancelButton: true,
     cancelButtonText: 'Cancelar',
     confirmButtonColor:'Aceptar',
     input: 'password',
      inputPlaceholder: 'Contraseña',
      inputValidator: nombre => {
        if (nombre === '123') {
          return undefined;
        }
        else {
          return "Por favor ingrese la contraseña para validar la acción";
        }
      }
    }).then((willDelete)=>{
      if(willDelete.isConfirmed){
        this.consultarService.eliminar(_id).pipe(switchMap(()=>{
          return this.consultarService.listar();
        }))
        .subscribe(data =>{
          this.pruebas=data.data;
          Swal.fire('Se eliminó correctamente');
       
        });
      } else{
        Swal.fire('El registro no ha sido eliminado'),
        {icon: 'info'}
      }
    })
    this.router.navigate(['/citas/gestionar-especialidad']);
  };

}

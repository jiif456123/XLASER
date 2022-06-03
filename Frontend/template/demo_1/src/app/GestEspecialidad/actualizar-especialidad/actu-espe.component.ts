import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Especialidad } from '../../models/especialiadad.model';
import { EspecialidadService } from '../../services/GESTIONAR-ESPECIALIDAD/especialidad.service';

@Component({
    selector:'app-actualizar-especialidad',
    templateUrl:'./actu-espe.component.html',
    styleUrls: ['./actu-espe.component.css']
})

export class EspecialidadActualizadoComponent implements OnInit{
    descripcion = [ {
        des:'Dermatología',
        },{
        des:'Oftalmología',
        },{
        des:'Pediatría',
        },{
        des:'Medicina General',
        },
        {
        des:'Cardiología',
        },{
        des:'Gastroenterología',
        }
      ]
    
    estado=[{
          est:'No Disponible',
      },{
          est:'Disponible'
      }]
  
  id: string;
  editar: boolean;

  especialidad: Especialidad;
  registrarEspecialidad: Especialidad;

  formEspecialidad: FormGroup;
  especialidades: Especialidad[];
  objEspecialidad: Especialidad = null;
  
  descripcionAux: boolean;
  doctorAux: boolean;
  estadoAux: boolean;
  fechaHoraAux: boolean;
  fechaFinAux: boolean;


  constructor(
      private especialidadService: EspecialidadService,
      private router: Router,
      private activateRouter: ActivatedRoute,
  ){}

  ngOnInit(){
          this.especialidades =[];
          this.especialidadService.listar().subscribe(data => {
              this.especialidades = data.data;
          }) 
    this.formEspecialidad = new FormGroup({
        '_id':new FormControl(''),
        'descripcion':new FormControl('', Validators.required),
        'doctor': new FormControl('',Validators.required),
        'estado':new FormControl('Disponible',Validators.required),
        'fechaHora':new FormControl('',Validators.required),
        'fechaFin':new FormControl('',Validators.required),
    });

    this.activateRouter.params.subscribe((params:Params ) => {
        this.id=params['id'];
        this.editar=params['id'] != null;
        this.cargarForm();
    })
  }

  public invalid(field:any){
      return this.formEspecialidad.get(field).invalid && this.formEspecialidad.get(field).touched;
  };

  operar(){
    console.log(this.formEspecialidad.valid)
    console.log(this.formEspecialidad.invalid)
    console.log(this.formEspecialidad.value)
      if(this.editar){
          this.formEspecialidad.value;
          this.especialidadService.actualizarEspecialidad(this.formEspecialidad.value).pipe(switchMap(()=> {
              return this.especialidadService.listar();
          })).subscribe(data => {
              this.especialidadService.especialidadCambio.next(data);
              this.especialidadService.mensajeCambio.next('Se registró correctamente');
          });
      } else {
          this.especialidadService.registrarEspecialidad(this.formEspecialidad.value).pipe(switchMap(() => {
                return this.especialidadService.listar();
          })).subscribe(data => {
              this.especialidadService.especialidadCambio.next(data);
              this.especialidadService.mensajeCambio.next('Nuevo registro exitoso');
          })
      }
      this.router.navigate(['/citas/gestionar-especialidad']);
  }

  cargarForm(){
    if(this.editar){
        this.especialidadService.listarEspacialidadId(this.id).subscribe(data => {
            this.especialidad = data.data;
            this.formEspecialidad = new FormGroup({

                '_id': new FormControl(this.especialidad._id, Validators.required),
                'descripcion': new FormControl(this.especialidad.descripcion, Validators.required),
                'doctor': new FormControl(this.especialidad.doctor, Validators.required),
                'estado': new FormControl(this.especialidad.estado, Validators.required),
                'fechaHora':new FormControl(this.especialidad.fechaHora,Validators.required),
                'fechaFin':new FormControl(this.especialidad.fechaFin,Validators.required)
            });
        });
    }
  }
}
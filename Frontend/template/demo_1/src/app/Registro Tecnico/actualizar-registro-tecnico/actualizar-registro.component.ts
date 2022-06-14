import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReporteT } from '../../models/registrotecnico.model';
import { ReporteTService } from '../../services/reporteT.service';

@Component({
    selector:'app-actualizar-registro',
    templateUrl:'./actualizar-registro.component.html',
    styleUrls: ['./actualizar-registro.component.scss']
})

export class ActualizarRegistroTecnicoComponent implements OnInit{
    motivo = [ {
        mot:'Incidencia',
    },{
        mot:'Reparacion',
    },{
        mot:'Reparacion o Sin Reparo',
    },
  ]

  estado=[{
      est:'Reparada',
  },{
      est:'Mantenimiento'
  },{
      est:'Sin reparo o irreparable'
  }]

  id: string;
  editar: boolean;

  reportet: ReporteT;
  registrarReporteT: ReporteT;

  formReporteT: FormGroup;
  reportesT: ReporteT[];
  objReporteT: ReporteT = null;

  motivoAux: boolean;
  codigomaquinaAux: boolean;
  descripcionAux: boolean;
  estadomaquinaAux: boolean;
  nombretecnicoAux: boolean;
  fechaAux: boolean;

  constructor(
      private reporteTService: ReporteTService,
      private router: Router,
      private activateRouter: ActivatedRoute,
  ){}

  ngOnInit(){
          this.reportesT =[];
          this.reporteTService.listar().subscribe(data => {
              this.reportesT = data.data;
          })
    this.formReporteT = new FormGroup({
        '_id':new FormControl(''),
        'motivo':new FormControl('Incidencia', Validators.required),
        'codigomaquina': new FormControl('',Validators.required),
        'descripcion':new FormControl('',Validators.required),
        'estadomaquina':new FormControl('Reparada',Validators.required),
        'nombretecnico':new FormControl('',Validators.required),
        'fecha':new FormControl('',Validators.required),
    });

    this.activateRouter.params.subscribe((params:Params ) => {
        this.id=params['id'];
        this.editar=params['id'] != null;
        this.cargarForm();
    })
  }

  public invalid(field:any){
      return this.formReporteT.get(field).invalid && this.formReporteT.get(field).touched;
  };

  operar(){
    console.log(this.formReporteT.valid)
    console.log(this.formReporteT.invalid)
    console.log(this.formReporteT.value)
      if(this.editar){
          this.formReporteT.value;
          this.reporteTService.actualizarReporteT(this.formReporteT.value).pipe(switchMap(()=> {
              return this.reporteTService.listar();
          })).subscribe(data => {
              this.reporteTService.reporteTCambio.next(data);
              this.reporteTService.mensajeCambio.next('Se registró correctamente');
          });
      } else {
          this.reporteTService.registrarReporteT(this.formReporteT.value).pipe(switchMap(() => {
                return this.reporteTService.listar();
          })).subscribe(data => {
              this.reporteTService.reporteTCambio.next(data);
              this.reporteTService.mensajeCambio.next('Nuevo registro exitoso');
          })
      }
      this.router.navigate(['/registro-tecnico']);
  }

  cargarForm(){
    if(this.editar){
        this.reporteTService.listarReporteTId(this.id).subscribe(data => {
            this.reportet = data.data;
            this.formReporteT = new FormGroup({

                '_id': new FormControl(this.reportet._id, Validators.required),
                'motivo': new FormControl(this.reportet.motivo, Validators.required),
                'codigomaquina': new FormControl(this.reportet.codigomaquina, Validators.required),
                'descripcion': new FormControl(this.reportet.descripcion, Validators.required),
                'estadomaquina': new FormControl(this.reportet.estadomaquina, Validators.required),
                'nombretecnico': new FormControl(this.reportet.nombretecnico, Validators.required),
                'fecha':new FormControl(this.reportet.fecha,Validators.required),
            });
        });
    }
  }
}
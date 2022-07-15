import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EquipoR } from '../../models/equipoR.model';
import { EquipoRService } from '../../services/equipoR.service';

@Component({
    selector:'app-registrar-reporte-seguimiento',
    templateUrl:'./registrar-reporte-seguimiento.component.html',
    styleUrls: ['./registrar-reporte-seguimiento.component.scss']
})

export class RegistrarReporteSeguimientoComponent implements OnInit{
    codigo = [
        {
          cod:'ADVANCE 8786I',
        },
        {
          cod:'MF-429X 220V',
        },{
          cod:'WG7550F',
        },{
          cod:'ENTERPISE MFP M776DN',
        },{
          cod:'B235V_DNI',
        },
      ]
    
      tipo=[
        {
        tip:'Impresora',
        },
        {
        tip:'Fotocopiadora',
        },{
        tip:'Copiadora',
        }]
    
      marca=[
        {
         marc:'Epson',
         },
          {
         marc:'HP',
        },{
         marc:'Lenovo',
          }]
    
      funcionalidad=[
          {
         fun:'Monofuncional',
           },
           {
         fun:'Multifuncional',
           }]
    
      color=[
            {
         co:'Monocromática',
             },
             {
         co:'Policromática',
             }]
    
      wifi=[
            {
         wi:'Si',
            },
           {
         wi:'No',
           }]
    
      impresion=[
           {
           imp:'Láser',
           },
           {
           imp:'Inkjet',
           }]
    
      estado=[
           {
           es:'Disponible',
           },
           {
           es:'Reparando',
           },{
           es:'Asignado',
           }]
    
      id: string;
      editar: boolean;
    
      equipoR: EquipoR;
    
      registrarEquipoR: EquipoR;
    
    
      formEquipoR: FormGroup;
      equiposR: EquipoR[];
      objEquipoR: EquipoR = null;
    
      codigoAux: boolean;
      tipoAux: boolean;
      marcaAux: boolean;
      funcionalidadAux: boolean;
      colorAux: boolean;
      wifiAux: boolean;
      impresionAux: boolean;
      descripcionAux: boolean;
      constructor(
        private equipoRService: EquipoRService,
        private router: Router,
        private activateRouter: ActivatedRoute,
      ){}
      ngOnInit() {
        this.equiposR = [];
        this.equipoRService.listar().subscribe(data => {
          this.equiposR = data.data;
        })
    
    this.formEquipoR = new FormGroup({
      '_id':new FormControl(''),
      'codigo':new FormControl('',Validators.required),
      'cliente': new FormControl(''),
      'tecnico':new FormControl(''),
      'tipo':new FormControl('',Validators.required),
      'marca':new FormControl('',Validators.required),
      'descripcion':new FormControl('',Validators.required),
      'funcionalidad':new FormControl('',Validators.required),
      'color':new FormControl('',Validators.required),
      'wifi':new FormControl('',Validators.required),
      'impresion':new FormControl('',Validators.required),
      'fechaI':new FormControl('14-07-2022',Validators.required),
      'estado':new FormControl('Disponible',Validators.required),
    });
    
    this.activateRouter.params.subscribe((params:Params ) => {
      this.id=params['id'];
      this.editar=params['id'] != null;
      this.cargarForm();
    })
    }
    
    public invalid(field:any){
    return this.formEquipoR.get(field).invalid && this.formEquipoR.get(field).touched;
    };
    
    operar(){
    console.log(this.formEquipoR.valid)
    console.log(this.formEquipoR.invalid)
    console.log(this.formEquipoR.value)
    if(this.editar){
        this.formEquipoR.value;
        this.equipoRService.actualizarEquipoR(this.formEquipoR.value).pipe(switchMap(()=> {
            return this.equipoRService.listar();
        })).subscribe(data => {
            this.equipoRService.equipoRTCambio.next(data);
            this.equipoRService.mensajeCambio.next('Se registró correctamente');
        });
    } else {
        this.equipoRService.registrarEquipoR(this.formEquipoR.value).pipe(switchMap(() => {
              return this.equipoRService.listar();
        })).subscribe(data => {
            this.equipoRService.equipoRTCambio.next(data);
            this.equipoRService.mensajeCambio.next('Nuevo registro exitoso');
        })
    }
    this.router.navigate(['/reporte-seguimiento']);
    }
    
    cargarForm(){
    if(this.editar){
      this.equipoRService.listarEquipoRId(this.id).subscribe(data => {
          this.equipoR = data.data;
          this.formEquipoR = new FormGroup({
    
              '_id': new FormControl(this.equipoR._id, Validators.required),
              'codigo': new FormControl(this.equipoR.codigo, Validators.required),
              'cliente': new FormControl(this.equipoR.cliente),
              'tecnico': new FormControl(this.equipoR.tecnico),
              'tipo': new FormControl(this.equipoR.tipo, Validators.required),
              'marca': new FormControl(this.equipoR.marca, Validators.required),
              'descripcion':new FormControl(this.equipoR.descripcion,Validators.required),
              'funcionalidad': new FormControl(this.equipoR.funcionalidad, Validators.required),
              'color': new FormControl(this.equipoR.color, Validators.required),
              'wifi': new FormControl(this.equipoR.wifi, Validators.required),
              'impresion': new FormControl(this.equipoR.impresion, Validators.required),
              'fechaI':new FormControl(this.equipoR.fechaI),
              'estado':new FormControl(this.equipoR.estado),
          });
      });
    }
    }
    
    }
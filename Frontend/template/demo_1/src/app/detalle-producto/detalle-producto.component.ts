import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReporteT } from '../models/registrotecnico.model';
import { ReporteTService } from '../services/reporteT.service';
import { Cantidad } from '../../app/models/cantidad.model';
import { CantidadService } from '../services/cantidad.service';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
  providers: [DatePipe]
})
export class DetalleProductoComponent implements OnInit {
    SUM1:number;
    SUM2:number;
    SUM3:number;
    SUM4:number;
    SUM5:number;

    suma = [
        {
            sum:'1',
        },
        {
            sum:'2',
        },{
            sum:'3',
        },{
            sum:'4',
        },
        {
            sum:'5',
        },
      ]

      id: string;
      editar: boolean;
    
      reportet: ReporteT;
      cantidad: Cantidad;
      registrarcantidad: ReporteT;
    
      formcantidad: FormGroup;
      reportesT: ReporteT[];
      cantidades: Cantidad[];
      objReporteT: ReporteT = null;
      objCantidad: Cantidad = null;

      cantidadAux: boolean;
    
      constructor(
          private reporteTService: ReporteTService,
          private cantidadService: CantidadService,
          private router: Router,
          private activateRouter: ActivatedRoute,
      ){}
    
      ngOnInit(){
              this.reportesT =[];
              this.cantidades = [];
              this.cantidadService.listar().subscribe(data => {
                  this.cantidades = data.data;
              })
        this.formcantidad = new FormGroup({
            '_id':new FormControl(''),
            'cantidad':new FormControl('', Validators.required),
        });
    
        this.activateRouter.params.subscribe((params:Params ) => {
            this.id=params['id'];
            this.editar=params['id'] != null;
            this.cargarForm();
        })
      }
    
      public invalid(field:any){
          return this.formcantidad.get(field).invalid && this.formcantidad.get(field).touched;
      };
    
      operar(){
        console.log(this.formcantidad.valid)
        console.log(this.formcantidad.invalid)
        console.log(this.formcantidad.value)
              this.cantidadService.registrarEquipoR(this.formcantidad.value).pipe(switchMap(() => {
                    return this.cantidadService.listar();
              })).subscribe(data => {
                  this.cantidadService.cantidadCambio.next(data);
                  this.cantidadService.mensajeCambio.next('Se agrego de manera correcta');
              })
              this.cantidades.filter(x => {
                if (x.cantidad == 2) {
                  console.log(x.cantidad)
                  this.SUM1 = 2 * 1200
                }
                if (x.cantidad == 1) {
                  console.log(x.cantidad)
                  this.SUM1 = 1 * 1200
                }
                if (x.cantidad == 3) {
                  console.log(x.cantidad)
                  this.SUM1 = 3 * 1200
                }
                if (x.cantidad == 4) {
                  console.log(x.cantidad)
                  this.SUM1 = 4 * 1200
                }
                if (x.cantidad == 5) {
                  console.log(x.cantidad)
                  this.SUM1 = 5 * 1200
                }
              })
              console.log('El precio es: ', this.SUM1)
          this.router.navigate(['/detalle-producto']);
      }
    
      cargarForm(){
        if(this.editar){
            this.cantidadService.listarEquipoRId(this.id).subscribe(data => {
                this.cantidad = data.data;
                this.formcantidad = new FormGroup({
    
                    '_id': new FormControl(this.cantidad._id, Validators.required),
                    'cantidad': new FormControl(this.cantidad.cantidad, Validators.required),
                });
            });
        }
      }

      MantPre() {
        this.cantidades.filter(x => {
          if (x.cantidad == 2) {
            console.log(x.cantidad)
            this.SUM1 = 2 * 1200
          }
          if (x.cantidad == 1) {
            console.log(x.cantidad)
            this.SUM1 = 1 * 1200
          }
          if (x.cantidad == 3) {
            console.log(x.cantidad)
            this.SUM1 = 3 * 1200
          }
          if (x.cantidad == 4) {
            console.log(x.cantidad)
            this.SUM1 = 4 * 1200
          }
          if (x.cantidad == 5) {
            console.log(x.cantidad)
            this.SUM1 = 5 * 1200
          }
        })
        console.log('El precio es: ', this.SUM1)
      }

      Resultado(){
        this.SUM2= 2*1200
      }
    }
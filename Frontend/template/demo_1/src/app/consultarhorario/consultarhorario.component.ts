import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Consultarhorario } from './models/consultarhorario.module';
import {ConsultarhorarioService } from '../consultarhorario/services/consultarhorario.services';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-consultarhorario',
  templateUrl: './consultarhorario.component.html',
  styleUrls: ['./consultarhorario.component.css'],
  providers: [DatePipe]
})
export class ConsultarhorarioComponent implements OnInit {

  especialidad = [{
    des: 'Dermatología',
  }, {
    des: 'Oftalmología',
  }, {
    des: 'Pediatría',
  }, {
    des: 'Medicina General',
  },
  {
    des: 'Cardiología',
  }, {
    des: 'Gastroenterología',
  }
  ]

  @ViewChild('modalRegistrar') modalRegistrar: ElementRef;
  @ViewChild('modalModificar') modalModificar: ElementRef;
  @ViewChild('modalDetalle') modalDetalle: ElementRef;


  formHorarios: FormGroup;
  formHorariosModificar: FormGroup;

  formFiltrar: FormGroup;
  filtro:"";
  horarios: Consultarhorario[] = [];

  public horario: Consultarhorario = new Consultarhorario();
 
  hoarioSeleccionado: Consultarhorario;
  /*public horario : Consultarhorario = new Consultarhorario()*/

  constructor( 
    private ConsultarhorarioService: ConsultarhorarioService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
     )
    {}
    async ngOnInit(): Promise<void>{
      var data=await this.ConsultarhorarioService.listar().toPromise();
      this.horarios = data.data;
/*
     this.formDate = this.fb.group({
      fecha: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
     })
  */

      this.formHorarios = this.fb.group({
        especialidad: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        fecha: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        horario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        doctor: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],

    })

    this.formHorariosModificar = this.fb.group({
      especialidad: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      fecha: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      horario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      doctor: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],

  })

  this.formFiltrar = this.fb.group({
    fecha: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
  })

    }

    abrirModalFiltrar(row: Consultarhorario){
      this.modalModificar.nativeElement.click();
        this.hoarioSeleccionado = row;
        this.formHorariosModificar.controls.especialidad.setValue(row.especialidad);
        this.formHorariosModificar.controls.fecha.setValue(this.datePipe.transform(row.fecha, 'yyyy-MM-dd'));
        this.formHorariosModificar.controls.horario.setValue(row.horario);
        this.formHorariosModificar.controls.doctor.setValue(row.doctor);
      } 


    abrirModal() {
      this.modalRegistrar.nativeElement.click();
    }
    abrirModalDetalle(row: Consultarhorario) {
      this.modalDetalle.nativeElement.click();
      this.hoarioSeleccionado = row;
    }
    
    abrirModalModificar(row: Consultarhorario) {
      this.modalModificar.nativeElement.click();
      this.hoarioSeleccionado = row;
      this.formHorariosModificar.controls.especialidad.setValue(row.especialidad);
      this.formHorariosModificar.controls.fecha.setValue(this.datePipe.transform(row.fecha, 'yyyy-MM-dd'));
      this.formHorariosModificar.controls.horario.setValue(row.horario);
      this.formHorariosModificar.controls.doctor.setValue(row.doctor);
    }

    transformarFecha(fecha: Date) {
      return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
    }

    async registrar() {
      /*
      if (this.formHorarios.invalid) {
        Swal.fire('Advertencia', 'Revise los campos.', 'warning')
        return;
      }*/

      let datos = this.formHorarios.value

      var fecha1 = new Date( datos.fecha );
      var dias = 0 ;
      fecha1.setDate(fecha1.getDate());

      let query = {
        
        especialidad: datos.especialidad,
        fecha: fecha1,
        horario: datos.horario,
        doctor: datos.doctor,
      }
     
      let especialidad = query.especialidad;
      if(especialidad==""){
        Swal.fire('Advertencia', 'Dejo la especialidad vacia.', 'warning')
        return;
      }
      //la fecha actual
      var TuFecha = new Date();
     //formato de salida para la fecha

     // TuFecha = (TuFecha.getDate() + '/' + (TuFecha.getMonth() + 1) + '/' + TuFecha.getFullYear() );
    
    if(fecha1<=TuFecha){
        Swal.fire('Advertencia', 'No puedes poner una fecha que ya paso o minimo hoy dia', 'warning')
        return;
    }


      //igualar dias
      /*
      var dias = 1; // Número de días a agregar
      fecha.setDate(fecha.getDate() + dias);*/

       
      let horario = query.horario;
      if(horario==""){
        Swal.fire('Advertencia', 'Dejo el horario vacio.', 'warning')
        return;
      }
      if(horario.length>20){
        Swal.fire('Advertencia', 'nombre muy de horario largo especifique maximo 20 caracteres.', 'warning')
        return;
      }
      let doctor = query.doctor;
      if(doctor==""){
        Swal.fire('Advertencia', 'Dejo el nombre del doctor vacio.', 'warning')
        return;
      }
      if(doctor.length>30){
        Swal.fire('Advertencia', 'el nombre del doctor muy largo especifique maximo 30 caracteres.', 'warning')
        return;
      }

      try {
 
        Swal.fire('Correcto', 'Se registro correctamente', 'success')
        let response = await this.ConsultarhorarioService.registrar(query).toPromise();
        this.formHorarios.reset();
       this.ConsultarhorarioService.listar().toPromise();

       console.log(''+query)

      } catch (err) {
        console.log(err);
      }
      var data=await this.ConsultarhorarioService.listar().toPromise();
      this.horarios = data.data
    }

 //   async filtrar(){
  //    let datos = this.formHorariosModificar.value
 //   }

    async modificar() {

      let datos = this.formHorariosModificar.value
      var fecha1 = new Date( datos.fecha );
      var dias =0 ;
      fecha1.setDate(fecha1.getDate());

      let query = {
        especialidad: datos.especialidad,
        fecha: fecha1,
        horario: datos.horario,
        doctor: datos.doctor,
      }
      let especialidad = query.especialidad;
      if(especialidad==""){
        Swal.fire('Advertencia', 'Dejo la especialidad vacia.', 'warning')
        return;
      }
      var TuFecha = new Date();
      //formato de salida para la fecha
 
      // TuFecha = (TuFecha.getDate() + '/' + (TuFecha.getMonth() + 1) + '/' + TuFecha.getFullYear() );
     
   //  if(fecha1>=TuFecha){
    //     Swal.fire('Advertencia', 'No puedes poner una fecha que ya paso o minimo hoy dia', 'warning')
    //     return;
   //  }
       
      let horario = query.horario;
      if(horario==""){
        Swal.fire('Advertencia', 'Dejo el horario vacio.', 'warning')
        return;
      }
      if(horario.length>20){
        Swal.fire('Advertencia', 'nombre muy de horario largo especifique maximo 20 caracteres.', 'warning')
        return;
      }
      let doctor = query.doctor;
      if(doctor==""){
        Swal.fire('Advertencia', 'Dejo el nombre del doctor vacio.', 'warning')
        return;
      }
      if(doctor.length>30){
        Swal.fire('Advertencia', 'el nombre del doctor muy largo especifique maximo 30 caracteres.', 'warning')
        return;
      }
      try {
        Swal.fire('Correcto', 'Se actualizo correctamente', 'success')
        let response = await this.ConsultarhorarioService.actualizar(this.hoarioSeleccionado._id,query).toPromise();
        await this.ConsultarhorarioService.listar().toPromise();
      } catch (err) {
        console.log(err);
      }
      var data=await this.ConsultarhorarioService.listar().toPromise();
      this.horarios = data.data
    }


    async eliminar(_id){
      var data=await this.ConsultarhorarioService.listar().toPromise();
      this.horarios = data.data
  try {
    Swal.fire({
      title: '¿Estás seguro que desea eliminar?',
      text: "Este horario no se podra recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy de acuerdo!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        this.ConsultarhorarioService .eliminar(_id).subscribe(async (data)=>{
          var data1= await this.ConsultarhorarioService.listar().toPromise();
          this.horarios = data1.data
        })
        Swal.fire(
          'Horaraio eliminado!',
          'Se elimino el horario correctamente.',
          'success'
        )
      }
  
    })
  } catch (error) {
    Swal.fire('Error Gerente', 'Error interno', 'warning')
  }finally{
    var data=await this.ConsultarhorarioService.listar().toPromise();
    this.horarios = data.data
  }
 
     
    }
     
  }

    


  

  

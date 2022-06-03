import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Serviciospo } from '../models/serviciospo.model';
import { ServiciosService } from '../services/servicios.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-gestionar-servicios',
  templateUrl: './gestionar-servicios.component.html',
  styleUrls: ['./gestionar-servicios.component.css'],
  providers: [DatePipe]
})
export class GestionarServiciosComponent implements OnInit {

  imagenJA="http://localhost:3000/uploads/1638942271703-Cs go 3.png";
  public urlImagenServicio="";
  public avanzar=0;
  urlImagenMostrarWeb="";
  @ViewChild('modalRegistrar') modalRegistrar: ElementRef;
  @ViewChild('modalModificar') modalModificar: ElementRef;
  @ViewChild('modalDetalle') modalDetalle: ElementRef;
  @ViewChild('fileInput', {static:false}) fileInput: ElementRef;
  @ViewChild('fileInput2', {static:false}) fileInput2: ElementRef;

  @ViewChild('botonUploadImage') botonUploadImagen: ElementRef;
  formPaciente: FormGroup;
  formPacienteModificar: FormGroup;
//http://localhost:3000/uploads/serviceImg/1638948243613-wUZ5RnCOXr.jpg
  filtro = "";
  
  servicios: Serviciospo[] = []
  servicioSeleccionado: Serviciospo;
  constructor(
    private servicioService: ServiciosService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private http: HttpClient
  ) { }

  async ngOnInit(): Promise<void> {
    var data = await this.servicioService.listar().toPromise();
    this.servicios = data.data
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      descripcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      medico: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      precio: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(1), Validators.maxLength(3)]],
      fecha: ['', [Validators.required]],
    })

    this.formPacienteModificar = this.fb.group({
        nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        descripcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        medico: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        precio: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(1), Validators.maxLength(3)]],
        fecha: ['', [Validators.required]],
    })

  }
////http://localhost:3000/uploads/serviceImg/1638948243613-wUZ5RnCOXr.jpg


/*
setTimeout(() => {

      this.onFileUpload();
    }, 2000);
*/
   onFileUpload(){
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);
      this.http.post('http://localhost:3000/virtual/imagen',file).subscribe(response =>{
      this.urlImagenServicio= "http://localhost:3000/uploads/serviceImg/"+response["data2"];
      console.log(response);
    })
  }
  onFileUpload2(){
    const imageBlob = this.fileInput2.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);
      this.http.post('http://localhost:3000/virtual/imagen',file).subscribe(response =>{
      this.urlImagenServicio= "http://localhost:3000/uploads/serviceImg/"+response["data2"];
      console.log(response);
    })
  }
  abrirModal() {
    this.modalRegistrar.nativeElement.click();
  }

  abrirModalDetalle(row: Serviciospo) {
    this.modalDetalle.nativeElement.click();
    this.servicioSeleccionado = row;
    this.urlImagenMostrarWeb= row.fotoUrl;
  }

  abrirModalModificar(row: Serviciospo) {
    this.modalModificar.nativeElement.click();
    this.servicioSeleccionado = row;
    this.formPacienteModificar.controls.nombre.setValue(row.nombre);
    this.formPacienteModificar.controls.descripcion.setValue(row.descripcion);
    this.formPacienteModificar.controls.medico.setValue(row.medico);
    this.formPacienteModificar.controls.precio.setValue(row.precio);
    this.urlImagenMostrarWeb= row.fotoUrl;
    this.formPacienteModificar.controls.fecha.setValue(this.datePipe.transform(row.fecha, 'yyyy-MM-dd'));
  }

  transformarFecha(fecha: Date) {
    return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
  }



  async registrar() {
   // this.botonUploadImagen.nativeElement.click();

    if (this.formPaciente.invalid) {
      Swal.fire('Advertencia', 'Revise los campos.', 'warning')
      return;
    }
    let datos = this.formPaciente.value
    
    let fechaNac= new Date(datos.fecha)
    let fechaHoy = new Date()

    if(fechaNac>fechaHoy){
      Swal.fire('Advertencia', 'La fecha no puede ser mayor que la fecha actual.', 'warning')
      return;
    }
    


 
    if(this.urlImagenServicio==""){
      Swal.fire('Advertencia', 'Ingrese una imagen para el servicio', 'warning')
      return;
    }
    let query = {
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      medico: datos.medico,
      precio: datos.precio,
      fecha: datos.fecha,
      fotoUrl: this.urlImagenServicio
    }
    
    try {
      
      let response = await this.servicioService.registrar(query).toPromise();
      Swal.fire('Correcto', 'Se registro correctamente', 'success')

      this.formPaciente.reset();
      var dataMovimientoCaja = await this.servicioService.listar().toPromise();
      this.servicios = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  
    
  
  }

  
  registarConFoto(){
    this.onFileUpload();

    setTimeout(() => {

      this.registrar();
      
    }, 1000);
  }

  

  async modificar() {
    if (this.formPacienteModificar.invalid) {
      Swal.fire('Advertencia', 'Revise los campos.', 'warning')
      return;
    }
    let datos = this.formPacienteModificar.value

    let fechaNac= new Date(datos.fecha)
    let fechaHoy = new Date()

    if(fechaNac>fechaHoy){
      Swal.fire('Advertencia', 'La fecha no puede ser mayor que la fecha actual.', 'warning')
      return;
    }

   
    let query = {
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        medico: datos.medico,
        precio: datos.precio,
        fecha: datos.fecha,
        fotoUrl: this.urlImagenServicio
    }

    try {

      let response = await this.servicioService.actualizar(this.servicioSeleccionado._id, query).toPromise();
      Swal.fire('Correcto', 'Se actualizo correctamente', 'success')
      var dataMovimientoCaja = await this.servicioService.listar().toPromise();
      this.servicios = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }
   modificarConFoto(){
    this.onFileUpload2();

    setTimeout(() => {

      this.modificar();
      
    }, 1000);
  }
  async cambiarEstado(estado: number, id: string) {
    let query = {
      estado: estado
    }

    try {

      let response = await this.servicioService.actualizar(id, query).toPromise();
      this.formPaciente.reset();
      var dataMovimientoCaja = await this.servicioService.listar().toPromise();
      this.servicios = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }



}
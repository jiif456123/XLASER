import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Serviciospo } from '../citas/models/serviciospo.model';
import { ServiciosService } from '../citas/services/servicios.service';
import { Paciente } from '../models/paciente.model';
import { PacienteService } from '../../app/services/gestionar-paciente service/paciente.service';
@Component({
  selector: 'app-presentar-home',
  templateUrl: './presentar-home.component.html',
  styleUrls: ['./presentar-home.component.scss'],
  providers: [DatePipe]
})
export class PresentarHomeComponent implements OnInit {
  @ViewChild('modalRegistrar') modalRegistrar: ElementRef;
  @ViewChild('modalModificar') modalModificar: ElementRef;
  @ViewChild('modalDetalle') modalDetalle: ElementRef;

  formPaciente: FormGroup;
  formPacienteModificar: FormGroup;

  filtro = "";
  servicios: Serviciospo[] = []
  servicioSeleccionado: Serviciospo;
  pacientes: Paciente[] = []
  pacienteSeleccionado: Paciente;
  constructor(
    private pacienteService: PacienteService,
    private servicioService: ServiciosService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  async ngOnInit(): Promise<void> {
    var data = await this.servicioService.listar().toPromise();
    this.servicios = data.data
    var data = await this.pacienteService.listar().toPromise();
    this.pacientes = data.data
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(8), Validators.maxLength(8)]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      nombreFamiliar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      dniFamiliar: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(8), Validators.maxLength(8)]],
      parentesco: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      celularFamiliar: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    })

    this.formPacienteModificar = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(8), Validators.maxLength(8)]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      nombreFamiliar: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      dniFamiliar: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(8), Validators.maxLength(8)]],
      parentesco: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      celularFamiliar: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    })

  }

  abrirModal() {
    this.modalRegistrar.nativeElement.click();
  }

  abrirModalDetalle(row: Paciente) {
    this.modalDetalle.nativeElement.click();
    this.pacienteSeleccionado = row;
  }

  abrirModalModificar(row: Paciente) {
    this.modalModificar.nativeElement.click();
    this.pacienteSeleccionado = row;
    this.formPacienteModificar.controls.nombre.setValue(row.nombre);
    this.formPacienteModificar.controls.apellidoMaterno.setValue(row.apellidoMaterno);
    this.formPacienteModificar.controls.apellidoPaterno.setValue(row.apellidoPaterno);
    this.formPacienteModificar.controls.dni.setValue(row.dni);
    this.formPacienteModificar.controls.celular.setValue(row.celular);
    this.formPacienteModificar.controls.email.setValue(row.email);
    this.formPacienteModificar.controls.fechaNacimiento.setValue(this.datePipe.transform(row.fechaNaciemineto, 'yyyy-MM-dd'));
    this.formPacienteModificar.controls.direccion.setValue(row.direccion);
    this.formPacienteModificar.controls.nombreFamiliar.setValue(row.nombreFamiliar);
    this.formPacienteModificar.controls.dniFamiliar.setValue(row.dniFamiliar);
    this.formPacienteModificar.controls.parentesco.setValue(row.parentesco);
    this.formPacienteModificar.controls.celularFamiliar.setValue(row.celularFamiliar);
  }

  transformarFecha(fecha: Date) {
    return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
  }

  async registrar() {

    if (this.formPaciente.invalid) {
      Swal.fire('Advertencia', 'Revise los campos.', 'warning')
      return;
    }
    let datos = this.formPaciente.value

    let fechaNac= new Date(datos.fechaNacimiento)
    let fechaHoy = new Date()

    if(fechaNac>fechaHoy){
      Swal.fire('Advertencia', 'La fecha Nacimiento no puede ser mayor que la fecha actual.', 'warning')
      return;
    }

    let query = {
      nombre: datos.nombre,
      apellidoPaterno: datos.apellidoPaterno,
      apellidoMaterno: datos.apellidoMaterno,
      dni: datos.dni,
      celular: datos.celular,
      email: datos.email,
      fechaNaciemineto: datos.fechaNacimiento,
      direccion: datos.direccion,
      estado: 1,
      nombreFamiliar: datos.nombreFamiliar,
      dniFamiliar: datos.dniFamiliar,
      parentesco: datos.parentesco,
      celularFamiliar: datos.celularFamiliar,
    }

    try {

      let response = await this.pacienteService.registrar(query).toPromise();
      Swal.fire('Correcto', 'Se registro correctamente', 'success')

      this.formPaciente.reset();
      var dataMovimientoCaja = await this.pacienteService.listar().toPromise();
      this.pacientes = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }

  async modificar() {
    if (this.formPacienteModificar.invalid) {
      Swal.fire('Advertencia', 'Revise los campos.', 'warning')
      return;
    }
    let datos = this.formPacienteModificar.value

    let fechaNac= new Date(datos.fechaNacimiento)
    let fechaHoy = new Date()

    if(fechaNac>fechaHoy){
      Swal.fire('Advertencia', 'La fecha Nacimiento no puede ser mayor que la fecha actual.', 'warning')
      return;
    }

    let query = {
      nombre: datos.nombre,
      apellidoPaterno: datos.apellidoPaterno,
      apellidoMaterno: datos.apellidoMaterno,
      dni: datos.dni,
      celular: datos.celular,
      email: datos.email,
      fechaNaciemineto: datos.fechaNacimiento,
      direccion: datos.direccion,
      nombreFamiliar: datos.nombreFamiliar,
      dniFamiliar: datos.dniFamiliar,
      parentesco: datos.parentesco,
      celularFamiliar: datos.celularFamiliar,
    }

    try {

      let response = await this.pacienteService.actualizar(this.pacienteSeleccionado._id, query).toPromise();
      Swal.fire('Correcto', 'Se actualizo correctamente', 'success')
      var dataMovimientoCaja = await this.pacienteService.listar().toPromise();
      this.pacientes = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }

  async cambiarEstado(estado: number, id: string) {
    let query = {
      estado: estado
    }

    try {

      let response = await this.pacienteService.actualizar(id, query).toPromise();
      this.formPaciente.reset();
      var dataMovimientoCaja = await this.pacienteService.listar().toPromise();
      this.pacientes = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }

  async prueba() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modalRegistrar.nativeElement.click();
      }
    })
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DetalleRecetaMedica } from 'src/app/models/detalle-receta-medica.model';
import { RectaMedicaService } from 'src/app/services/recta-medica.service';
import Swal from 'sweetalert2';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/gestionar-paciente service/paciente.service';

@Component({
  selector: 'app-reg-gestionar-receta-medica',
  templateUrl: './reg-gestionar-receta-medica.component.html',
  styleUrls: ['./reg-gestionar-receta-medica.component.css']
})
export class RegGestionarRecetaMedicaComponent implements OnInit {

  medicamentos: DetalleRecetaMedica[] = [];

  formRegistrar: FormGroup;
  formMedicina: FormGroup;

  pacientes: Paciente[] = [];
  idPaciente: string = '';

  @ViewChild('modalMedicina') modalMedicina: ElementRef;
  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private recMedicaService: RectaMedicaService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.formRegistrar = this.fb.group({
      dni: ['', [Validators.required]],
      nombrePaciente: [''],
      indicacion: [''],
    })

    this.formMedicina = this.fb.group({
      nombre: ['', [Validators.required]],
      forma: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      dosis: ['', [Validators.required]],
      indicacion: ['', [Validators.required]],
    })

    var dataPacientes = await this.pacienteService.listar().toPromise();
    this.pacientes = dataPacientes.data
    this.pacientes = this.pacientes.filter(item => item.estado == 1);

  }

  buscarPaciente() {
    var dni = this.formRegistrar.controls.dni.value;
    if (dni == null || dni == '') {
      this.idPaciente = '';
      return;
    }

    var paciente = this.pacientes.find(item => item.dni?.trim() == dni.trim());

    if (paciente) {
      this.idPaciente = paciente._id;
      this.formRegistrar.controls.nombrePaciente.setValue(paciente.nombre + ' ' + paciente.apellidoPaterno);
    } else {
      this.idPaciente = '';

    }
  }

  abrirModal() {
    this.modalMedicina.nativeElement.click();
  }

  agregar() {
    if (this.formMedicina.invalid) {
      Swal.fire('Advertencia', 'Revise los campos.', 'warning')
      return;
    }

    this.medicamentos.push(this.formMedicina.value)
    this.formMedicina.reset();
  }

  async registrar() {
    if (this.formRegistrar.invalid) {
      Swal.fire('Advertencia', 'Revise los campos.', 'warning')
      return;
    }

    if (this.idPaciente == '') {
      Swal.fire('Advertencia', 'Seleccione un paciente', 'warning')
      return;
    }

    if (this.medicamentos.length == 0) {
      Swal.fire('Advertencia', 'Agregue al menos un medicamento.', 'warning')
      return;
    }

    let query = {
      paciente: this.idPaciente,
      indicacion: '',
      medicina: this.medicamentos
    }

    try {

      let response = await this.recMedicaService.registrar(query).toPromise();
      Swal.fire('Correcto', 'Se registro correctamente', 'success')
      this.router.navigate(['/gestionar-receta-medica'])
    } catch (err) {
      console.log(err);
    }
  }
}

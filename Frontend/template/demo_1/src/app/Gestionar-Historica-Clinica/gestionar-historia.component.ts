import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Historia } from '../models/historia.model';
import { HistoriaService } from '../../app/services/gestionar-historia service/historia.service';
import { Paciente } from '../models/paciente.model';
import { PacienteService } from '../../app/services/gestionar-paciente service/paciente.service';
@Component({
  selector: 'app-gestionar-historia',
  templateUrl: './gestionar-historia.component.html',
  styleUrls: ['./gestionar-historia.component.scss'],
  providers: [DatePipe]
})
export class gestionarhistoriaComponent implements OnInit {

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

  formHistoria: FormGroup;
  formHistoriaModificar: FormGroup;

  filtro = "";
  pacientes: Paciente[] = [];

  idPaciente: string = '';
  historias: Historia[] = []
  historiaSeleccionada: Historia;
  public historia: Historia = new Historia();
  constructor(
    private historiaService: HistoriaService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private pacienteService: PacienteService,

  ) { }

  async ngOnInit(): Promise<void> {
    var data = await this.historiaService.listar().toPromise();
    this.historias = data.data
    this.formHistoria = this.fb.group({
      medico: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      peso: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      altura: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      tension: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      alergias: ['', [Validators.required]],
      antecedentes: ['', [Validators.required]],
      historia: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      nombrePaciente: [''],
    })

    this.formHistoriaModificar = this.fb.group({
        medico: ['', [Validators.required]],
        especialidad: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        peso: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        altura: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        tension: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        alergias: ['', [Validators.required]],
        antecedentes: ['', [Validators.required]],
        historia: ['', [Validators.required]],
        diagnostico: ['', [Validators.required]],
    })
    var data = await this.pacienteService.listar().toPromise();
    this.pacientes = data.data
  }

  abrirModal() {
    this.modalRegistrar.nativeElement.click();
  }
  buscarPaciente() {
    var dni = this.formHistoria.controls.dni.value;
    if (dni == null || dni == '') {
      this.idPaciente = '';
      return;
    }

    var paciente = this.pacientes.find(item => item.dni?.trim() == dni.trim());

    if (paciente) {
      this.idPaciente = paciente._id;
      this.formHistoria.controls.nombrePaciente.setValue(paciente.nombre + ' ' + paciente.apellidoPaterno);
    } else {
      this.idPaciente = '';

    }
  }
  abrirModalModificar(row: Historia) {
    this.modalModificar.nativeElement.click();
    this.historiaSeleccionada = row;
    this.formHistoriaModificar.controls.medico.setValue(row.medico);
    this.formHistoriaModificar.controls.especialidad.setValue(row.especialidad);
    this.formHistoriaModificar.controls.fecha.setValue(this.datePipe.transform(row.fecha, 'yyyy-MM-dd'));
    this.formHistoriaModificar.controls.peso.setValue(row.peso);
    this.formHistoriaModificar.controls.altura.setValue(row.altura);
    this.formHistoriaModificar.controls.tension.setValue(row.tension);
    this.formHistoriaModificar.controls.alergias.setValue(row.alergias);
    this.formHistoriaModificar.controls.antecedentes.setValue(row.antecedentes);
    this.formHistoriaModificar.controls.historia.setValue(row.historia);
    this.formHistoriaModificar.controls.diagnostico.setValue(row.diagnostico);

  }

  transformarFecha(fecha: Date) {
    return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
  }

  async registrar() {

    if (this.formHistoria.invalid) {
      return;
    }
    let datos = this.formHistoria.value
    let query = {
      medico: datos.medico,
      especialidad: datos.especialidad,
      fecha: datos.fecha,
      peso: datos.peso,
      altura: datos.altura,
      tension: datos.tension,
      alergias: datos.alergias,
      antecedentes: datos.antecedentes,
      historia: datos.historia,
      diagnostico: datos.diagnostico,
      paciente: this.idPaciente
    }

    debugger;
    try {

      let response = await this.historiaService.registrar(query).toPromise();
      this.formHistoria.reset();
      var dataMovimientoCaja = await this.historiaService.listar().toPromise();
      this.historias = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }

  async modificar() {
    if (this.formHistoriaModificar.invalid) {
      return;
    }
    let datos = this.formHistoriaModificar.value
    let query = {
        medico: datos.medico,
        especialidad: datos.especialidad,
        fecha: datos.fecha,
        peso: datos.peso,
        altura: datos.altura,
        tension: datos.tension,
        alergias: datos.alergias,
        antecedentes: datos.antecedentes,
        historia: datos.historia,
        diagnostico: datos.diagnostico
    }

    try {

      let response = await this.historiaService.actualizar(this.historiaSeleccionada._id, query).toPromise();
      this.formHistoria.reset();
      var dataMovimientoCaja = await this.historiaService.listar().toPromise();
      this.historias = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }
}

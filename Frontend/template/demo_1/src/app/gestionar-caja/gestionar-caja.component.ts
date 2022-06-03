import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Caja } from '../models/caja.model';
import { Motivo } from '../models/motivo.model';
import { MovimientoCaja } from '../models/movimientoCaja.model';
import { Paciente } from '../models/paciente.model';
import { CajaService } from '../services/caja.service';
import { MotivoService } from '../services/motivo.service';
import { MovimientoCajaService } from '../services/movimiento-caja.service';
import { PacienteService } from '../services/paciente.service';
import Swal from 'sweetalert2'
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-gestionar-caja',
  templateUrl: './gestionar-caja.component.html',
  styleUrls: ['./gestionar-caja.component.css']
})
export class GestionarCajaComponent implements OnInit {

  filtro = "";

  caja: Caja;
  movimientos: MovimientoCaja[] = [];
  pacientes: Paciente[] = [];
  motivos: Motivo[] = [];
  movCajaImprimir: MovimientoCaja;
  @ViewChild('modalOperacion') modalOperacion: ElementRef;
  @ViewChild('butonImprimir') butonImprimir: ElementRef;

  idPaciente: string = '';
  formMovimiento: FormGroup;

  fechaActual = new Date();
  constructor(
    private pacienteService: PacienteService,
    private motivoService: MotivoService,
    private movCajaService: MovimientoCajaService,
    private cajaService: CajaService,
    private fb: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    var dataPacientes = await this.pacienteService.listar().toPromise();
    this.pacientes = dataPacientes.data
    this.pacientes = this.pacientes.filter(item => item.estado == 1);
    var dataMovimientoCaja = await this.movCajaService.listar().toPromise();
    this.movimientos = dataMovimientoCaja.data;
    this.operacionesDia();

    var dataMotivo = await this.motivoService.listar().toPromise();
    this.motivos = dataMotivo.data;

    var dataCaja = await this.cajaService.listar().toPromise();
    this.caja = dataCaja.data[0];

    this.formMovimiento = this.fb.group({
      motivo: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      nombrePaciente: [''],
      precio: [0, [Validators.min(0), Validators.required]],
      montoRecibido: [0, [Validators.min(0), Validators.required]],
      montoDevolver: [0, Validators.min(0)]
    })

  }

  abrirModal() {

    this.modalOperacion.nativeElement.click();

  }

  async registrar() {
    if (this.formMovimiento.invalid) {
      this.formMovimiento.markAllAsTouched();
      Swal.fire('Advertencia', 'Revise los campos.', 'warning')
      return;
    }

    if (this.idPaciente == '') {
      Swal.fire('Advertencia', 'Seleccione un paciente', 'warning')
      return;
    }

    let datos = this.formMovimiento.value;

    let query = {
      nIdPaciente: this.idPaciente,
      nIdMotivo: datos.motivo,
      precio: datos.precio,
      montoRecibido: datos.montoRecibido,
    }
    try {

      let response = await this.movCajaService.registrar(query).toPromise();
      this.formMovimiento.reset();
      Swal.fire('Correcto', 'Se registro correctamente', 'success')

      var dataMovimientoCaja = await this.movCajaService.listar().toPromise();
      this.movimientos = dataMovimientoCaja.data;
      this.operacionesDia();

    } catch (err) {
      console.log(err);
    }
  }

  generarMontoDevuelto() {
    const montoRecibido = this.formMovimiento.controls.montoRecibido.value;
    const precio = this.formMovimiento.controls.precio.value;

    this.formMovimiento.controls.montoDevolver.setValue(montoRecibido - precio);
  }

  async estadoCaja(numero: number) {
    let query = {
      abierto: numero
    }
    await this.cajaService.actualizar(this.caja._id, query).toPromise();
    var dataCaja = await this.cajaService.listar().toPromise();
    this.caja = dataCaja.data[0];
  }

  buscarPaciente() {
    var dni = this.formMovimiento.controls.dni.value;
    if (dni == null || dni == '') {
      this.idPaciente = '';
      return;
    }

    var paciente = this.pacientes.find(item => item.dni?.trim() == dni.trim());

    if (paciente) {
      this.idPaciente = paciente._id;
      this.formMovimiento.controls.nombrePaciente.setValue(paciente.nombre + ' ' + paciente.apellidoPaterno);
    } else {
      this.idPaciente = '';
    }
  }

  operacionesDia() {
    let hoy = new Date();
    this.movimientos = this.movimientos.filter(item => this.filtrarHoy(item, hoy));
  }

  filtrarHoy(item: MovimientoCaja, fechaHoy: Date) {
    let fechaHora = new Date(item.fechaHora)
    if (fechaHora.getFullYear() == fechaHoy.getFullYear() && fechaHora.getMonth() == fechaHoy.getMonth() && fechaHora.getDate() == fechaHoy.getDate()) {
      return true;
    } else {
      return false;
    }
  }

  async imprimir(moviemiento: MovimientoCaja) {
    this.movCajaImprimir = moviemiento;
    this.fechaActual = new Date();
    await timer(500).pipe(take(1)).toPromise(); //timer para renderize el componente
    this.butonImprimir.nativeElement.click();
  }

  valorPrecio(id: string) {
    let motivo = this.motivos.find(item => item._id == id)
    if (motivo) {
      this.formMovimiento.controls.precio.setValue(motivo.precio ?? 0);
    }
  }
}

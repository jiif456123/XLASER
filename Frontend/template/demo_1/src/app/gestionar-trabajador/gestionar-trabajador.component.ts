import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-gestionar-trabajador',
  templateUrl: './gestionar-trabajador.component.html',
  styleUrls: ['./gestionar-trabajador.component.css'],
  providers: [DatePipe]
})
export class GestionarTrabajadorComponent implements OnInit {
  @ViewChild('modalRegistrar') modalRegistrar: ElementRef;
  @ViewChild('modalModificar') modalModificar: ElementRef;
  @ViewChild('modalDetalle') modalDetalle: ElementRef;

  formUsuario: FormGroup;
  formUsuarioModificar: FormGroup;

  filtro = '';

  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario;
  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  async ngOnInit(): Promise<void> {
    const data = await this.usuarioService.listar().toPromise();
    this.usuarios = data.data;
    this.formUsuario = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(8), Validators.maxLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      correo: ['', [Validators.required]],
      direcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z-0-9]*$/)]],
      rol: ['', [Validators.required]],
    });

    this.formUsuarioModificar = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
        password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
        nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
        apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
        dni: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(8), Validators.maxLength(8)]],
        telefono: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        correo: ['', [Validators.required]],
        direcion: ['', [Validators.required, Validators.pattern(/^[a-zA-Z-0-9]*$/)]],
        rol: ['', [Validators.required]],
      });

  }

  abrirModal() {
    this.modalRegistrar.nativeElement.click();
  }

  abrirModalDetalle(row: Usuario) {
    this.modalDetalle.nativeElement.click();
    this.usuarioSeleccionado = row;
  }

  abrirModalModificar(row: Usuario) {
    this.modalModificar.nativeElement.click();
    this.usuarioSeleccionado = row;
    this.formUsuarioModificar.controls.username.setValue(row.username);
    this.formUsuarioModificar.controls.password.setValue(row.password);
    this.formUsuarioModificar.controls.nombre.setValue(row.nombre);
    this.formUsuarioModificar.controls.apellido.setValue(row.apellido);
    this.formUsuarioModificar.controls.dni.setValue(row.dni);
    this.formUsuarioModificar.controls.telefono.setValue(row.telefono);
    this.formUsuarioModificar.controls.correo.setValue(row.correo);
    this.formUsuarioModificar.controls.direccion.setValue(row.direccion);
    this.formUsuarioModificar.controls.rol.setValue(row.rol);
  }

  async registrar() {

    if (this.formUsuario.invalid) {
      Swal.fire('Advertencia', 'Revise los campos.', 'warning');
      return;
    }
    const datos = this.formUsuario.value;
    const query = {
      username: datos.nombre,
      password: datos.password,
      nombre: datos.nombre,
      apellido: datos.apellido,
      dni: datos.dni,
      telefono: datos.telefono,
      coreo: datos.coreo,
      direccion: datos.direccion,
      rol: datos.rol,
    };

    try {

      const response = await this.usuarioService.registrar(query).toPromise();
      Swal.fire('Correcto', 'Se registro correctamente', 'success');

      this.formUsuario.reset();
      const dataMovimientoCaja = await this.usuarioService.listar().toPromise();
      this.usuarios = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }

  async modificar() {
    if (this.formUsuarioModificar.invalid) {
      Swal.fire('Advertencia', 'Revise los campos.', 'warning');
      return;
    }
    const datos = this.formUsuarioModificar.value;

    const query = {
        username: datos.nombre,
        password: datos.password,
        nombre: datos.nombre,
        apellido: datos.apellido,
        dni: datos.dni,
        telefono: datos.telefono,
        coreo: datos.coreo,
        direccion: datos.direccion,
        rol: datos.rol,
    };

    try {

      const response = await this.usuarioService.actualizar(this.usuarioSeleccionado._id, query).toPromise();
      Swal.fire('Correcto', 'Se actualizo correctamente', 'success');
      const dataMovimientoCaja = await this.usuarioService.listar().toPromise();
      this.usuarios = dataMovimientoCaja.data;

    } catch (err) {
      console.log(err);
    }
  }
}
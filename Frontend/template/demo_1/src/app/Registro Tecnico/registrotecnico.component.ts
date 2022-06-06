import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-gestionar-trabajador',
  templateUrl: './registrotecnico.component.html',
  styleUrls: ['./registrotecnico.component.scss'],
  providers: [DatePipe]
})
export class RegistroTecnicoComponent implements OnInit {
    async ngOnInit(): Promise<void> {}
}
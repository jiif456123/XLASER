import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { EquipoR } from '../models/equipoR.model';
import { EquipoRService } from '../services/equipoR.service';
@Component({
  selector: 'app-visualizar-productos',
  templateUrl: './visualizarproductos.component.html',
  styleUrls: ['./visualizarproductos.component.scss'],
  providers: [DatePipe]
})
export class VisualizarProductosComponent implements OnInit {

  equipos: EquipoR[]=[]
  constructor(
    private router:Router,
    private equipoRService: EquipoRService,
    ) { }

  public nombreUsuario;
  public apellidoUsuario;
  public nombrePaciente;
  public rolUsuario;

  ngOnInit(){
    this.listarCitas();
    this.equipoRService.listar().subscribe(data =>{
      this.equipos = data.data;
      this.equipos = this.equipos.filter( item => item.cliente == 'Alonso')
      console.log(data.data);
    })
  }

  async listarCitas(){
      var dataEquipo =  await this.equipoRService.listar().toPromise();
      if(this.rolUsuario=="TECNICO"||this.rolUsuario=="tecnico"){

        this.equipos = dataEquipo.data.filter(item => item.tecnico=this.nombreUsuario)
      }

      if(this.rolUsuario=="CLIENTE"||this.rolUsuario=="cliente"){

        this.equipos = dataEquipo.data;

        this.equipos =this.equipos.filter(item => item.cliente=this.nombreUsuario);
      }

  }
}
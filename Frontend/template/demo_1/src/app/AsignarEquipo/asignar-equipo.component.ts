import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EquipoR } from '../models/equipoR.model';
import { EquipoRService } from '../services/equipoR.service';

@Component({
  selector: 'app-asignar-equipo',
  templateUrl: './asignar-equipo.component.html',
  styleUrls: ['./asignar-equipo.component.scss'],
  providers: [DatePipe]
})
export class AsignarEquipoComponent implements OnInit {
  id:string;
  registroEquipoR: EquipoR[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private equipoRService: EquipoRService,
  ) { }

  ngOnInit() {
    this.equipoRService.listar().subscribe(data =>{
      this.registroEquipoR = data.data;
      console.log(data.data);
    })

}

}
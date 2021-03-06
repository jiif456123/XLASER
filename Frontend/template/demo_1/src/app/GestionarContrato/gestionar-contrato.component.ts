import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReporteT } from '../models/registrotecnico.model';
import { ReporteTService } from '../services/reporteT.service';

@Component({
  selector: 'app-gestionar-contrato',
  templateUrl: './gestionar-contrato.component.html',
  styleUrls: ['./gestionar-contrato.component.scss'],
  providers: [DatePipe]
})
export class GestionarContratoComponent implements OnInit {

  constructor(
  ) {}
  ngOnInit() {
}

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DetalleRecetaMedica } from 'src/app/models/detalle-receta-medica.model';
import { RecetaMedica } from 'src/app/models/receta-medica.model';
import { RectaMedicaService } from 'src/app/services/recta-medica.service';
@Component({
  selector: 'app-detalle-gestionar-receta-medica',
  templateUrl: './detalle-gestionar-receta-medica.component.html',
  styleUrls: ['./detalle-gestionar-receta-medica.component.css']
})
export class DetalleGestionarRecetaMedicaComponent implements OnInit {

  id;
  formRegistrar: FormGroup;
  medicamentos: DetalleRecetaMedica[] = [];

  recetaMedica: RecetaMedica
  constructor(private route: ActivatedRoute,
    private recMedicaService: RectaMedicaService,
    private fb: FormBuilder,

    ) {}

  async ngOnInit(): Promise<void> {
    this.formRegistrar = this.fb.group({
      dni: ['', [Validators.required]],
      nombrePaciente: [''],
      indicacion: [''],
    })

    this.id = this.route.snapshot.paramMap.get('id');
    var dataPacientes = await this.recMedicaService.listarId(this.id).toPromise();
    this.recetaMedica = dataPacientes.data;
    this.medicamentos = this.recetaMedica.medicina;
    this.llenarForm();
  }

  llenarForm(){
    this.formRegistrar.controls.dni.setValue(this.recetaMedica.paciente.dni);
    this.formRegistrar.controls.nombrePaciente.setValue(this.recetaMedica.paciente.nombre + ' ' + this.recetaMedica.paciente.apellidoPaterno);
    this.formRegistrar.controls.indicacion.setValue(this.recetaMedica.indicacion);

  }

}

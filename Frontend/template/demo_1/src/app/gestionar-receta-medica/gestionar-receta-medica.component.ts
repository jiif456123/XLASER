import { Component, OnInit } from '@angular/core';
import { RecetaMedica } from '../models/receta-medica.model';
import { RectaMedicaService } from '../services/recta-medica.service';

@Component({
  selector: 'app-gestionar-receta-medica',
  templateUrl: './gestionar-receta-medica.component.html',
  styleUrls: ['./gestionar-receta-medica.component.css']
})
export class GestionarRecetaMedicaComponent implements OnInit {

  filtro = "";
  recetas: RecetaMedica[] = [];
  constructor(
    private recMedicaService: RectaMedicaService
  ) { }

  async ngOnInit(): Promise<void> {
    var dataCita = await this.recMedicaService.listar().toPromise();
    this.recetas = dataCita.data;
  }

  agregar() {

  }

  verDetalle() {

  }


}

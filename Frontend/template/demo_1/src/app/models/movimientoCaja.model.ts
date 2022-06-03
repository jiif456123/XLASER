import { Motivo } from "./motivo.model";
import { Paciente } from "./paciente.model";

export interface MovimientoCaja {
    _id: string
    paciente: Paciente
    motivo: Motivo
    precio: number
    montoRecibido: number
    fechaHora: Date
  }
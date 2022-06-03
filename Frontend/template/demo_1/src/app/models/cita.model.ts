import { Motivo } from "./motivo.model";
import { Paciente } from "./paciente.model";

export interface Cita {
    _id: string
    paciente: Paciente
    motivo: Motivo
    doctor: string
    especialidad: string
    fechaHora: Date
    estado: number
}
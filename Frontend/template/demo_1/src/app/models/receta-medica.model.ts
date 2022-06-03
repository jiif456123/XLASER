import { Paciente } from "./paciente.model";
import { DetalleRecetaMedica } from './detalle-receta-medica.model';

export interface RecetaMedica {
    _id: string
    paciente: Paciente
    indicacion: string
    medicina: DetalleRecetaMedica[]
}
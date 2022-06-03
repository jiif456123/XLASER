import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';

import { CitaVirtualComponent } from './domicilio/citaVirtual/citaVirtual.component';

import { VirtualRoomComponent } from './domicilio/virtualRoom/virtualRoom.component';

import { GestionarCitasComponent } from './citas/gestionar-citas/gestionar-citas.component';
import { GestionarHistoriaComponent } from './citas/gestionar-Historia Clinica/gestionar-historia.component'; 
import { LoginMComponent } from './iniciar-sesion/iniciar-sesion.component';
import { GestionarPacienteComponent } from './citas/gestionar-paciente/gestionar-paciente.component';
import { WelcomePage } from './welcome-page/welcom-page.component';
import { CambiarContraComponent } from './citas/cambiar-password/cambiarpassword.component';
import { GestionarServiciosComponent } from './citas/gestionar-servicios/gestionar-servicios.component';

import { GestionarRecetaMedicaComponent } from './gestionar-receta-medica/gestionar-receta-medica.component';
import { RegGestionarRecetaMedicaComponent } from './gestionar-receta-medica/reg-gestionar-receta-medica/reg-gestionar-receta-medica.component';
import { DetalleGestionarRecetaMedicaComponent } from './gestionar-receta-medica/detalle-gestionar-receta-medica/detalle-gestionar-receta-medica.component';
import { consultarserviciocomponent } from './Consultar-Servicio/consultar-servicio.component';
import { gestionarRecetaMedicaComponent } from './Cgestionar-receta-medica/gestionar-receta-medica.component';
import { EspecialidadComponent } from './GestEspecialidad/especialidad.component';
import { EspecialidadRegistradoComponent } from './GestEspecialidad/reg-especialidad/gest-especialidad.component';
import { EspecialidadActualizadoComponent } from './GestEspecialidad/actualizar-especialidad/actu-espe.component';
import { GestionarCajaComponent } from './gestionar-caja/gestionar-caja.component';
import { TicketCajaComponent } from './gestionar-caja/ticket-caja/ticket-caja.component';
import { GestionarTrabajadorComponent } from './gestionar-trabajador/gestionar-trabajador.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
 // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 //Pa que funcione la ruta :v 

 // { path:'', redirectTo:'/login', pathMatch: 'full'}, //Falla.... No elimina los elementos sidebar
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard],pathMatch: 'full'},

  { path: "cita-virtual", component:  CitaVirtualComponent , canActivate: [AuthGuard], pathMatch: 'full'},
  {path: "cita-virtual/:id", component:  VirtualRoomComponent , canActivate: [AuthGuard], pathMatch: 'full' },
  {path: "gestionar-citas", component:  GestionarCitasComponent , canActivate: [AuthGuard], pathMatch: 'full' },
  {path: "gestionar-paciente", component:  GestionarPacienteComponent , canActivate: [AuthGuard], pathMatch: 'full' },
  {path: "gestionar-historia", component:  GestionarHistoriaComponent , canActivate: [AuthGuard], pathMatch: 'full' },
  {path: "cambiarc", component:  CambiarContraComponent , canActivate: [AuthGuard], pathMatch: 'full' },
    
  {
    path: "gestionar-receta-medica", component: GestionarRecetaMedicaComponent,  canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: "gestionar-receta-medica/registrar", component: RegGestionarRecetaMedicaComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: "gestionar-receta-medica/:id", component: DetalleGestionarRecetaMedicaComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: "consultarservicio", component: consultarserviciocomponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: "gestionar-citas", component: GestionarCitasComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: "consultar-receta-medica", component: gestionarRecetaMedicaComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: 'gestionar-especialidad', component: EspecialidadComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: 'gestionar-especialidad/registrado', component: EspecialidadRegistradoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: 'gestionar-especialidad/actualizado/:id', component: EspecialidadActualizadoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: 'gestionar-caja', component: GestionarCajaComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
    path: 'gestionar-trabajador', component: GestionarTrabajadorComponent, canActivate: [AuthGuard], pathMatch: 'full' },

  {path: 'login', component: LoginMComponent , pathMatch: 'full'},
  {path: 'welcome-page', component: WelcomePage, pathMatch: 'full'},
  {path: "gestionar-servicios", component:  GestionarServiciosComponent , canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'presentarhome', loadChildren: ()=> import('./Presentar Home/presentar-home.module').then(m => m.PresentarHomeModule)},
  { path: 'laboratorio', loadChildren: ()=> import('./Laboratorio/laboratorio.module').then(m => m.LaboratorioModule)},
  { path: 'gestionar-historia', loadChildren: ()=> import('./Gestionar-Historica-Clinica/gestionar-historia.module').then(m => m.gestionarhistoriaModule)},
  { path: 'consultaragenda', loadChildren: ()=> import('./consultarhorario/consultarhorario.module').then(m => m.ConsultarhorarioModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

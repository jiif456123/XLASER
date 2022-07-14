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
import { VisualizarRTecnicoComponent } from './visualizarregistrotecnicos/visualizarregistrotecnicos.component';

import { VisualizarProductoComponent } from './visualizarproducto/visualizarproducto.component';

import { VisualizarEAsignadoComponent } from './VisualizarEquipoAsignado/visualizarequipo.component';

import { RegistroTecnicoComponent } from './Registro Tecnico/registrotecnico.component';
import { RegistrarRegistroTecnicoComponent } from './Registro Tecnico/registrar-registro-tecnico/registrar-registro-tecnico.component';
import { ActualizarRegistroTecnicoComponent } from './Registro Tecnico/actualizar-registro-tecnico/actualizar-registro.component';
import { AsignarEquipoComponent } from './AsignarEquipo/asignar-equipo.component';
import { GestionarContratoComponent } from './GestionarContrato/gestionar-contrato.component';
import { GestionarEstadoEquipoComponent } from './GestionarEstadoEquipo/gestionar-estado-equipo.component';
import { RealizarCotizacionComponent } from './RealizarCotizacion/realizar-cotizacion.component';
import { ReporteSeguimientoComponent } from './RealizarReporteSeguimiento/realizar-reporte-seguimiento.component';
import { RegistrarClienteComponent } from './RegistrarCliente/registrar-cliente.component';
import { VisualizarCotizacionComponent } from './VisualizarCotizacion/visualizar-cotizacion.component';
import { VisualizarEquipoComponent } from './VisualizarEquipo/visualizar-equipo.component';
import { RegistrarEquipoComponent } from './RegistrarEquipo/registrar-equipo.component';
import { VisualizarReporteSeguimientoComponent } from './VisualizarReporteSeguimiento/visualizar-reporte-seguimiento.component';
import { RegistrarTrabajadorComponent } from './citas/cambiar-password/registrar-trabajador/registrar-trabajador.component';
import { AsignarClienteComponent } from './AsignarEquipo/AsignarCliente/asignar-cliente.component';
import { AsignarTecnicoComponent } from './AsignarEquipo/AsignarTecnico/asignar-tecnico.component';
import { DetalleEquipoComponent } from './AsignarEquipo/VerDetalle/detalle-equipo.component';
import { DetalleEquipo2Component } from './VisualizarEquipo/Detalle/detalle-equipo2.component';
import { VisualizarProductosComponent } from './visualizarproductos/visualizarproductos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { Producto2Component } from './Producto2/producto2.component';
import { Producto3Component } from './Producto3/producto3.component';
import { Producto4Component } from './Producto4/producto4.component';
import { Producto5Component } from './Producto5/producto5.component';
import { Producto6Component } from './Producto6/producto6.component';
import { RegistrarReporteSeguimientoComponent } from './RealizarReporteSeguimiento/Registrar/registrar-reporte-seguimiento.component';
import { ActualizarReporteSeguimientoComponent } from './RealizarReporteSeguimiento/actualizar/actualizar-reporte-seguimiento.component';
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
  {
   path: 'visualizar-registro-tecnico', component: VisualizarRTecnicoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'visualizar-producto', component: VisualizarProductoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'visualizar-equipo-asignado', component: VisualizarEAsignadoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'registro-tecnico', component: RegistroTecnicoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'registro-tecnico/registrado', component: RegistrarRegistroTecnicoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'registro-tecnico/actualizado/:id', component: ActualizarRegistroTecnicoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'asignar-equipo', component: AsignarEquipoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'gestionar-contrato', component: GestionarContratoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'gestionar-estado-equipo', component: GestionarEstadoEquipoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'realizar-cotizacion', component: RealizarCotizacionComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'reporte-seguimiento', component: ReporteSeguimientoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'registrar-cliente', component: RegistrarClienteComponent, pathMatch: 'full' },
  {
   path: 'visualizar-cotizacion', component: VisualizarCotizacionComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'visualizar-equipo', component: VisualizarEquipoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'registrar-equipo', component: RegistrarEquipoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'visualizar-reporte-seguimiento', component: VisualizarReporteSeguimientoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'registrar-empleado/registrado', component: RegistrarTrabajadorComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'asignar-equipo-cliente/actualizado/:id', component: AsignarClienteComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'asignar-equipo-tecnico/actualizado/:id', component: AsignarTecnicoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  {
   path: 'detalle-equipo/visualizacion/:id', component: DetalleEquipoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'detalle-equipos/visualizacion/:id', component: DetalleEquipo2Component, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'visualizar-productos', component: VisualizarProductosComponent, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'detalle-producto', component: DetalleProductoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'producto2', component: Producto2Component, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'producto3', component: Producto3Component, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'producto4', component: Producto4Component, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'producto5', component: Producto5Component, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'producto6', component: Producto6Component, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'registrar-reporte/registrado', component: RegistrarReporteSeguimientoComponent, canActivate: [AuthGuard], pathMatch: 'full' },
   {
    path: 'actualizar-reporte/actualizado/:id', component: ActualizarReporteSeguimientoComponent, canActivate: [AuthGuard], pathMatch: 'full' },

  {path: 'cambiarc', component:  CambiarContraComponent , canActivate: [AuthGuard], pathMatch: 'full' },
  {path: 'login', component: LoginMComponent , pathMatch: 'full'},
  {path: 'welcome-page', component: WelcomePage, pathMatch: 'full'},
  {path: 'gestionar-servicios', component:  GestionarServiciosComponent , canActivate: [AuthGuard], pathMatch: 'full' },
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

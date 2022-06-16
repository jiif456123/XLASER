import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { FilterPipe } from 'ngx-filter-pipe';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPrintModule } from 'ngx-print';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SettingsPanelComponent } from './shared/settings-panel/settings-panel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
 //Pa que funcione la ruta :v 
import { Dashboard } from './dashboard/dashboard.component';
import { CitaVirtualComponent } from './domicilio/citaVirtual/citaVirtual.component';
import { VirtualRoomComponent } from './domicilio/virtualRoom/virtualRoom.component';

import { GestionarCitasComponent } from './citas/gestionar-citas/gestionar-citas.component';

import { GestionarHistoriaComponent } from './citas/gestionar-Historia Clinica/gestionar-historia.component'; 

import { LoginMComponent } from './iniciar-sesion/iniciar-sesion.component'; 

import { AuthGuard } from './auth.guard';

import { TokenInterceptorService } from './citas/services/token-interceptor.service';

import { GestionarPacienteComponent } from './citas/gestionar-paciente/gestionar-paciente.component';

import { GestionarServiciosComponent } from './citas/gestionar-servicios/gestionar-servicios.component';

import { GestionarTrabajadorComponent } from './gestionar-trabajador/gestionar-trabajador.component';

import { VisualizarRTecnicoComponent } from './visualizarregistrotecnicos/visualizarregistrotecnicos.component';

import { VisualizarProductoComponent } from './visualizarproducto/visualizarproducto.component';

import { VisualizarEAsignadoComponent } from './VisualizarEquipoAsignado/visualizarequipo.component';

import { RegistroTecnicoComponent } from './Registro Tecnico/registrotecnico.component';

import { AsignarEquipoComponent } from './AsignarEquipo/asignar-equipo.component';
import { GestionarContratoComponent } from './GestionarContrato/gestionar-contrato.component';
import { GestionarEstadoEquipoComponent } from './GestionarEstadoEquipo/gestionar-estado-equipo.component';
import { RealizarCotizacionComponent } from './RealizarCotizacion/realizar-cotizacion.component';
import { ReporteSeguimientoComponent } from './RealizarReporteSeguimiento/realizar-reporte-seguimiento.component';
import { RegistrarClienteComponent } from './RegistrarCliente/registrar-cliente.component';
import { VisualizarCotizacionComponent } from './VisualizarCotizacion/visualizar-cotizacion.component';
import { VisualizarEquipoComponent } from './VisualizarEquipo/visualizar-equipo.component';
import { VisualizarReporteSeguimientoComponent } from './VisualizarReporteSeguimiento/visualizar-reporte-seguimiento.component';
import { CambiarContraComponent } from './citas/cambiar-password/cambiarpassword.component';

// AoT requires an exported function for factories

//citaVirtual
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { WelcomePage } from './welcome-page/welcom-page.component';

//modulo lau
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
import { RegistrarRegistroTecnicoComponent } from './Registro Tecnico/registrar-registro-tecnico/registrar-registro-tecnico.component';
import { ActualizarRegistroTecnicoComponent } from './Registro Tecnico/actualizar-registro-tecnico/actualizar-registro.component'; 
import { RegistrarEquipoComponent } from './RegistrarEquipo/registrar-equipo.component';
import { RegistrarTrabajadorComponent } from './citas/cambiar-password/registrar-trabajador/registrar-trabajador.component';
const config: SocketIoConfig = {url: 'http://localhost:3000', options: {withCredentials: '*'}};

//import { BrowserModule  } from '@angular/platform-browser';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SettingsPanelComponent,
    FooterComponent,
    SpinnerComponent,
    ContentAnimateDirective,
     //Pa que funcione la ruta :v 
    Dashboard,
    CitaVirtualComponent,
    VirtualRoomComponent,
    GestionarCitasComponent,
    GestionarHistoriaComponent,
    LoginMComponent,
    GestionarPacienteComponent,
    WelcomePage,
    CambiarContraComponent,
    GestionarServiciosComponent,
    GestionarTrabajadorComponent,
    VisualizarRTecnicoComponent,
    VisualizarProductoComponent,
    VisualizarEAsignadoComponent,
    RegistroTecnicoComponent,
    GestionarRecetaMedicaComponent,
    RegGestionarRecetaMedicaComponent,
    DetalleGestionarRecetaMedicaComponent,
    consultarserviciocomponent,
    gestionarRecetaMedicaComponent,
    EspecialidadComponent,
    EspecialidadRegistradoComponent,
    EspecialidadActualizadoComponent,
    GestionarCajaComponent,
    TicketCajaComponent,
    RegistrarRegistroTecnicoComponent,
    ActualizarRegistroTecnicoComponent,
    AsignarEquipoComponent,
    GestionarContratoComponent,
    GestionarEstadoEquipoComponent,
    RealizarCotizacionComponent,
    ReporteSeguimientoComponent,
    RegistrarClienteComponent,
    VisualizarCotizacionComponent,
    VisualizarEquipoComponent,
    RegistrarEquipoComponent,
    VisualizarReporteSeguimientoComponent,
    RegistrarTrabajadorComponent,
  ],
  imports: [
    BrowserModule,
    FilterPipeModule,
    Ng2FilterPipeModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    //ChartsModule,
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    })
  ],
  providers: [FilterPipe, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

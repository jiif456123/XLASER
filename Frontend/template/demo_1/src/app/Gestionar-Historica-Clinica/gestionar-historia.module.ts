import { gestionarhistoriaComponent } from './gestionar-historia.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
const routes: Routes = [
  { path: '', component: gestionarhistoriaComponent },
]

@NgModule({
  declarations: [gestionarhistoriaComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FullCalendarModule,
  ]
})
export class gestionarhistoriaModule { }

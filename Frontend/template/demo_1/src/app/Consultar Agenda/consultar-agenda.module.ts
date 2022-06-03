import { ConsultarAgendaComponent } from './consultar-agenda.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ConsultarAgendaComponent },
]

@NgModule({
  declarations: [ConsultarAgendaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ConsultarAgendaModule { }

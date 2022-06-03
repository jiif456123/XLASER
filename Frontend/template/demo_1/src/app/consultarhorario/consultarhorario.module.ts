import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartistModule } from 'ng-chartist';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ConsultarhorarioComponent } from './consultarhorario.component';

import { Consultarhorario } from './models/consultarhorario.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { FilterPipe } from 'ngx-filter-pipe';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { Ng2SearchPipeModule } from "ng2-search-filter";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,  './assets/i18n/');
}

const routes: Routes = [
  { path: '', component: ConsultarhorarioComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ ConsultarhorarioComponent ],
  imports: [
    FilterPipeModule,
    Ng2FilterPipeModule,
    Ng2SearchPipeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ChartistModule,
    NgbModule,
    NgxMapboxGLModule,
    NgCircleProgressModule.forRoot({
      responsive: true,
      space: -10,
      innerStrokeColor: '#eee',
      innerStrokeWidth: 10,
      radius: 60,
      animation: true,
      animationDuration: 300,
      outerStrokeWidth: 10,
      title: 'auto',
      titleFontSize: '30px',
      titleFontWeight: 'bold',
      subtitleFontSize: '12px',
      subtitleColor: '#a7afb7',
      showUnits: false,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }})
  ],
  providers: [FilterPipe],
})
export class ConsultarhorarioModule { }
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Historia } from '../models/historia.model';
import { HistoriaService } from '../services/historia.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Paciente } from '../models/paciente.model';
import { PacienteService } from '../services/paciente.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
//import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-gestionar-historia',
  templateUrl: './gestionar-historia.component.html',
  styleUrls: ['./gestionar-historia.component.css'],
  providers: [DatePipe]
})
export class GestionarHistoriaComponent implements OnInit {

  especialidad = [{
    des: 'Dermatología',
  }, {
    des: 'Oftalmología',
  }, {
    des: 'Pediatría',
  }, {
    des: 'Medicina General',
  },
  {
    des: 'Cardiología',
  }, {
    des: 'Gastroenterología',
  }
  ]

  @ViewChild('modalRegistrar') modalRegistrar: ElementRef;
  @ViewChild('modalModificar') modalModificar: ElementRef;
  @ViewChild('modalDetalles') modalDetalles: ElementRef;

  formHistoria: FormGroup;
  formHistoriaModificar: FormGroup;
  formHistoriaDetalles: FormGroup;

  filtro = "";
  pacientes: Paciente[] = [];

  idPaciente: string = '';
  historias: Historia[] = []
  historiaSeleccionada: Historia;
  public historia: Historia = new Historia();
  constructor(
    private historiaService: HistoriaService,
    private pipe: FilterPipe,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private pacienteService: PacienteService,

  ) { }
  
  public dniActualizar;
  async ngOnInit(): Promise<void> {
    var data = await this.historiaService.listar().toPromise();
    this.historias = data.data
    this.formHistoria = this.fb.group({
      medico: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      peso: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
      altura: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
      tension: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      alergias: ['', [Validators.required]],
      antecedentes: ['', [Validators.required]],
      historia: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      nombrePaciente: [''],
    })

    this.formHistoriaModificar = this.fb.group({
        medico: ['', [Validators.required]],
        especialidad: ['', [Validators.required]],
        fecha: ['', [Validators.required]],
        peso: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
        altura: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
        tension: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        alergias: ['', [Validators.required]],
        antecedentes: ['', [Validators.required]],
        historia: ['', [Validators.required]],
        diagnostico: ['', [Validators.required]],
        pesoNum: [ ],
        nombrePaciente: [ ]
    })

    this.formHistoriaDetalles = this.fb.group({
      medico: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      peso: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
      altura: ['', [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]],
      tension: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      alergias: ['', [Validators.required]],
      antecedentes: ['', [Validators.required]],
      historia: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      pesoNum: [ ],
      nombrePaciente: [ ]
  })
    var data = await this.pacienteService.listar().toPromise();
    this.pacientes = data.data
  }

  abrirModal() {
    this.modalRegistrar.nativeElement.click();
  }
  buscarPaciente() {
    var dni = this.formHistoria.controls.dni.value;
    if (dni == null || dni == '') {
      this.idPaciente = '';
      return;
    }

    var paciente = this.pacientes.find(item => item.dni?.trim() == dni.trim());

    if (paciente) {
      this.idPaciente = paciente._id;
      this.formHistoria.controls.nombrePaciente.setValue(paciente.nombre + ' ' + paciente.apellidoPaterno);
    } else {
      this.idPaciente = '';

    }
  }

  buscarPacienteActualizar(id:string) {

    var dni = this.formHistoria.controls.dni.value;
    if (dni == null || dni == '') {
      this.idPaciente = '';
      return;
    }

    var paciente = this.pacientes.find(item => item.dni?.trim() == dni.trim());

    if (paciente) {
      this.idPaciente = paciente._id;
      this.formHistoria.controls.nombrePaciente.setValue(paciente.nombre + ' ' + paciente.apellidoPaterno);
    } else {
      this.idPaciente = '';

    }
  }

  abrirModalModificar(row: Historia) {
    this.modalModificar.nativeElement.click();
    this.historiaSeleccionada = row;
    
    //falta obetener el id y obtener el nombre y dni
    console.log(row.paciente);
    this.formHistoriaModificar.controls.medico.setValue(row.medico);
    this.formHistoriaModificar.controls.especialidad.setValue(row.especialidad);
    this.formHistoriaModificar.controls.fecha.setValue(this.datePipe.transform(row.fecha, 'yyyy-MM-dd'));
    this.formHistoriaModificar.controls.peso.setValue(row.peso);
    this.formHistoriaModificar.controls.altura.setValue(row.altura);
    this.formHistoriaModificar.controls.tension.setValue(row.tension);
    this.formHistoriaModificar.controls.alergias.setValue(row.alergias);
    this.formHistoriaModificar.controls.antecedentes.setValue(row.antecedentes);
    this.formHistoriaModificar.controls.historia.setValue(row.historia);
    this.formHistoriaModificar.controls.diagnostico.setValue(row.diagnostico);

   // this.buscarPaciente();

    this.pacienteService.getPacienteById(row.paciente).subscribe(

      (res) => {
        //console.log(res)

 
        this.formHistoriaModificar.controls.pesoNum.setValue(res.dni);
        this.formHistoriaModificar.controls.nombrePaciente.setValue(res.nombre);

      }
      ,
      (err) => console.log(err)
    );
    
  }
  
  //TODO: NEW MODAL
  public historiaDetallesGet;
  public nombrePacienteDetalles;
  public dniPacienteDetalles;
  public edadPacienteDetalles;
  public cellPacienteDetalles;
  public domicilioPacienteDetalles;
  abrirModalDetalles(row: Historia) {
    this.modalDetalles.nativeElement.click();
    this.historiaSeleccionada = row;
    this.historiaDetallesGet=row;
    //falta obetener el id y obtener el nombre y dni
    console.log(row.paciente);
    this.formHistoriaDetalles.controls.medico.setValue(row.medico);
    this.formHistoriaDetalles.controls.especialidad.setValue(row.especialidad);
    this.formHistoriaDetalles.controls.fecha.setValue(this.datePipe.transform(row.fecha, 'yyyy-MM-dd'));
    this.formHistoriaDetalles.controls.peso.setValue(row.peso);
    this.formHistoriaDetalles.controls.altura.setValue(row.altura);
    this.formHistoriaDetalles.controls.tension.setValue(row.tension);
    this.formHistoriaDetalles.controls.alergias.setValue(row.alergias);
    this.formHistoriaDetalles.controls.antecedentes.setValue(row.antecedentes);
    this.formHistoriaDetalles.controls.historia.setValue(row.historia);
    this.formHistoriaDetalles.controls.diagnostico.setValue(row.diagnostico);

   // this.buscarPaciente();

    this.pacienteService.getPacienteById(row.paciente).subscribe(

      (res) => {
        //console.log(res)

        this.nombrePacienteDetalles= res.apellidoPaterno + " " + res.apellidoMaterno + " " + res.nombre;
        this.dniPacienteDetalles= res.dni;
        this.formHistoriaDetalles.controls.pesoNum.setValue(res.dni);
        this.formHistoriaDetalles.controls.nombrePaciente.setValue(res.nombre);
        this.edadPacienteDetalles= res.fechaNaciemineto;
        this.cellPacienteDetalles=res.celular;
        this.domicilioPacienteDetalles= res.direccion;
        //TODO: ESTA MAL ESCRITO DEBE SER FECHANACIMIENTO
      }
      ,
      (err) => console.log(err)
    );
    
  }
  
  downloadPDF(/*row :Historia*/){
    
    //this.historiaSeleccionada = row;
    console.log(this.historiaDetallesGet.medico);
    console.log(this.historiaDetallesGet.especialidad);
    console.log(this.historiaDetallesGet.fecha);
    console.log(this.historiaDetallesGet.peso);
    console.log(this.historiaDetallesGet.altura);

    const doc = new jsPDF()
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
   // var strArr = doc.splitTextToSize("A longer title that might be split", 100)
    //doc.text(strArr, 50, 50);

    var img = new Image();
    img.src = '../../assets/images/logo/logo-medsalud.png';
    doc.addImage(img, 'png', 150, 0, 50, 30)
    doc.setTextColor("#34495e");
    doc.setFont("helvetica","bold");
    doc.text('HISTORIA CLINICA', width/2, 10, { align: 'center' });
    doc.line(77,12,130,12);
    doc.text('FICHA DE IDENTIFICACION', width/2, 20, { align: 'center' })
    doc.line(65,22,145,22);
  //  var splitTitle = doc.splitTextToSize("Nombre dkandklandklankldwankldnaklwdnklawndklwnakldnwaklndklwandklawnkldnawkldnklwandklwa", 100);
    //doc.text(splitTitle,20,40);
    //1ra Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Nombre ",20,40);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(this.nombrePacienteDetalles,45,40);
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Edad ",155,40);
    var d= new Date(this.edadPacienteDetalles)
    let timeDiff = Math.abs(Date.now() - d.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(""+age,180,40);
    //2da Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("DNI ",20,55);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(this.dniPacienteDetalles,45,55);
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Celular ",110,55);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(this.cellPacienteDetalles,160,55);
    //3ra Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Domilicio ",20,70);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    var splitTitle = doc.splitTextToSize(this.domicilioPacienteDetalles, 150);
    doc.text(splitTitle,60,70);
    //4ra Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#34495e");
    doc.text('CONSULTA', width/2, 85, { align: 'center' });
    doc.line(87,87,122,87);
    //5ta Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#34495e");
    doc.text('Fecha ' + this.datePipe.transform(this.historiaDetallesGet.fecha, 'yyyy-MM-dd') , width/2, 100, { align: 'center' });
    //6ta Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Medico ",20,115);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(this.historiaDetallesGet.medico,45,115);
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Especialidad ",85,115);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(this.historiaDetallesGet.especialidad,130,115);
    //7ta Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#34495e");
    doc.text('PACIENTE', width/2, 130, { align: 'center' });
    doc.line(87,132,122,132);

    //8va Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Peso ",20,145);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(""+this.historiaDetallesGet.peso,45,145);
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Altura ",70,145);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(""+this.historiaDetallesGet.altura, width/2, 145, { align: 'center' });
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Tension ",135,145);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    doc.text(""+this.historiaDetallesGet.tension,175,145);
    //9na Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Alergias ",20,160);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    var splitTitle = doc.splitTextToSize(this.historiaDetallesGet.alergias, 150);
    doc.text(splitTitle,60,160);
    //10ma Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#2980b9");
    doc.text("Antecedentes ",20,185);
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    var splitTitle = doc.splitTextToSize(this.historiaDetallesGet.antecedentes, 150);
    doc.text(splitTitle,75,185);
    //11va Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#34495e");
    doc.text('HISTORIA', width/2, 210, { align: 'center' });
    doc.line(87,212,122,212);
    //12va Fila
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    var splitTitle = doc.splitTextToSize(this.historiaDetallesGet.historia, 150);
    doc.text(splitTitle,20,220);
    //13va Fila
    doc.setFont("helvetica","bold");
    doc.setTextColor("#34495e");
    doc.text('DIAGNOSTICO', width/2, 250, { align: 'center' });
    doc.line(84,252,126,252);
    //14va Fila
    doc.setFont("helvetica","normal");
    doc.setTextColor("#000000");
    var splitTitle = doc.splitTextToSize(this.historiaDetallesGet.diagnostico, 150);
    doc.text(splitTitle,20,260);
    //doc.text(this.domicilioPacienteDetalles,45,70);
    //console.log(age);
    //doc.text("HISTORIA CLINICA", width/2, height/2);
    //doc.text("Hello world", 60, 60);
   // doc.text( row.medico,50,50);
    doc.save('historiaClinica'+ this.dniPacienteDetalles + ".pdf")
    
  }




  transformarFecha(fecha: Date) {
    return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
  }

  async registrar() {

    if (this.formHistoria.invalid) {
      Swal.fire('Verificar', 'Verifica los datos', 'warning')

      return;
    }

    let datos = this.formHistoria.value
    let query = {
      medico: datos.medico,
      especialidad: datos.especialidad,
      fecha: datos.fecha,
      peso: datos.peso,
      altura: datos.altura,
      tension: datos.tension,
      alergias: datos.alergias,
      antecedentes: datos.antecedentes,
      historia: datos.historia,
      diagnostico: datos.diagnostico,
      paciente: this.idPaciente
    }
    console.log(query);
    //debugger;

    try {

      let response = await this.historiaService.registrar(query).toPromise();
      Swal.fire('Correcto', 'Se Registro correctamente', 'success')

      this.formHistoria.reset();

      var dataMovimientoCaja = await this.historiaService.listar().toPromise();
      this.historias = dataMovimientoCaja.data;


    } catch (err) {
      Swal.fire('Error', 'Ocurrio un error', 'error')

      console.log(err);
    }
  }

  async modificar() {
    if (this.formHistoriaModificar.invalid) {
      Swal.fire('Verificar', 'Verifica los datos', 'warning')

      return;
    }
    let datos = this.formHistoriaModificar.value
    let query = {
        medico: datos.medico,
        especialidad: datos.especialidad,
        fecha: datos.fecha,
        peso: datos.peso,
        altura: datos.altura,
        tension: datos.tension,
        alergias: datos.alergias,
        antecedentes: datos.antecedentes,
        historia: datos.historia,
        diagnostico: datos.diagnostico
    }

    try {

      let response = await this.historiaService.actualizar(this.historiaSeleccionada._id, query).toPromise();
      Swal.fire('Correcto', 'Se Actualizo correctamente', 'success')

      this.formHistoria.reset();
      var dataMovimientoCaja = await this.historiaService.listar().toPromise();
      this.historias = dataMovimientoCaja.data;

    } catch (err) {
      Swal.fire('Error', 'Ocurrio un error', 'error')
      
      console.log(err);
    }
  }
}
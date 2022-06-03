import { Component, OnInit } from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import { Router } from '@angular/router';

import { CitaService } from 'src/app/citas/services/cita.service';
import { HistoriaService } from 'src/app/citas/services/historia.service';
import { Cita } from 'src/app/citas/models/cita.model';
import Swal from 'sweetalert2';
import { UserAllService } from 'src/app/citas/services/usersAll.service';
@Component({
  selector: 'app-categoriaM',
  templateUrl: './citaVirtual.component.html',
  styleUrls: [ './citaVirtual.component.css'],
  providers: []
})

export class CitaVirtualComponent implements OnInit {

  citas: Cita[] = []
  constructor(private router:Router, public citaService: CitaService, public historiaService: HistoriaService, private userAllService:UserAllService) { }

  public nombreUsuario;
  public apellidoUsuario;
  public nombrePaciente;

  public rolUsuario;

  ngOnInit(){//  NEW 
   this.getDataOfUser();
    this.listarCitas();
  }
  
  gotToRoom = ()=>{
    //this.router.navigate(['/', uuidv4()]);
  
   // this.router.navigate(['/farmacia/cita-virtual/', uuidv4()]); 
   //CADA VEZ QUE UNA PERSONA CREE UNA SALA SE AGREGA UN NUMERO AL FINAL PARA SEPARARLAS 
   //Y EL NUMERO DE LA SALA SE GUARDARA EN BD PARA QUE A LOS DOS USUARIOS CLIENTE O DOC SE CONECTEN A LA MISMA SALA
   this.router.navigate(['/cita-virtual/', uuidv4()]); 
  

  }

  gotToRoom2 = ()=>{
    //this.router.navigate(['/', uuidv4()]);
  
   // this.router.navigate(['/farmacia/cita-virtual/', uuidv4()]); 
   //CADA VEZ QUE UNA PERSONA CREE UNA SALA SE AGREGA UN NUMERO AL FINAL PARA SEPARARLAS 
   //Y EL NUMERO DE LA SALA SE GUARDARA EN BD PARA QUE A LOS DOS USUARIOS CLIENTE O DOC SE CONECTEN A LA MISMA SALA
   this.router.navigate(['/cita-virtual/', '5481']); 
  

  }

  async listarCitas(){

   /*
    this.citaService.listar().subscribe(
      res =>{
          res.filter(item => item.doctor==this.nombreUsuario);
          console.log(res);
      }, err=>{

      })*/
      //Filtro por nombre del doctor
      var dataCita = await this.citaService.listar().toPromise();
      if(this.rolUsuario=="Doctor"||this.rolUsuario=="Medico"||this.rolUsuario=="medico"||this.rolUsuario=="doctor"){
        
        //this.citas = dataCita.data;
        this.citas = dataCita.data.filter(item => item.doctor==this.nombreUsuario);
      }

      if(this.rolUsuario=="paciente"||this.rolUsuario=="Paciente"){
       
        this.citas = dataCita.data;

        this.citas =this.citas.filter(item => item.paciente.nombre==this.nombreUsuario);
      }
      

  }

  listarByDoctor(doctorName: string){
    

  }


  dirigirSala(sala: string, pacienteID: string){
  
    this.historiaService.getHistoriaByPacienteIDS(pacienteID).subscribe(
      res =>{

        var pos= res.length-1;
        if(res.length==0){
          Swal.fire('Error', 'Error al obtener los datos de la historia clinica', 'error')

        }
       
        console.log(res.length-1);
        console.log("GAAAAAAAAAA");
        console.log(res);
        console.log(res[0].medico);
        this.historiaService.selectedHistoria._id=res[pos]._id;
        this.historiaService.selectedHistoria.medico=res[pos].medico;
        this.historiaService.selectedHistoria.peso=res[pos].peso;
        this.historiaService.selectedHistoria.altura=res[pos].altura;
        this.historiaService.selectedHistoria.tension=res[pos].tension;
        this.historiaService.selectedHistoria.alergias=res[pos].alergias;
        this.historiaService.selectedHistoria.antecedentes=res[pos].antecedentes;
        this.historiaService.selectedHistoria.diagnostico=res[pos].diagnostico;
        this.historiaService.selectedHistoria.historia=res[pos].historia;
        this.historiaService.selectedHistoria.especialidad=res[pos].especialidad;
        this.historiaService.selectedHistoria.paciente=pacienteID;

        
      },
      err => {
        Swal.fire('Error', 'Error al obtener los datos de la historia clinica', 'error')
      }

    )
    this.router.navigate(['/cita-virtual/', sala]); 
  
    

  }

  llenarHistoria(citas: Cita){

    //obtener id del paciente en la cita
    //buscar la historia de acuerdo al id del paciente
    //llenar datos en la historia
       //citas.paciente._id
        

      /*

        citas.doctor= this.historiaService.selectedHistoria.medico;
        citas.especialidad= this.historiaService.selectedHistoria.especialidad;
        citas.fechaHora= this.historiaService.selectedHistoria.fecha;*/
       
  }

  getHistoriaByPacienteID(pacienteID: string){
  console.log("GAAAAAAAAAA");
    this.historiaService.getHistoriaByPacienteIDS(pacienteID).subscribe(
      res =>{
        console.log("GAAAAAAAAAA");
        console.log(res.length);


        console.log(res[0].medico);
        this.historiaService.selectedHistoria._id=res[0]._id;
        this.historiaService.selectedHistoria.medico=res[0].medico;
        this.historiaService.selectedHistoria.peso=res[0].peso;
        this.historiaService.selectedHistoria.altura=res[0].altura;
        this.historiaService.selectedHistoria.tension=res[0].tension;
        this.historiaService.selectedHistoria.alergias=res[0].alergias;
        this.historiaService.selectedHistoria.antecedentes=res[0].antecedentes;
        this.historiaService.selectedHistoria.diagnostico=res[0].diagnostico;
        this.historiaService.selectedHistoria.historia=res[0].historia;
        this.historiaService.selectedHistoria.especialidad=res[0].especialidad;
        this.historiaService.selectedHistoria.paciente=pacienteID;
      },
      err => console.error(err)

    )
  }

  getDataOfUser(){
    this.userAllService.getUserById(localStorage.getItem('idLoginUser')).subscribe(
      res =>{
        
        this.nombreUsuario=res.nombre;
        this.apellidoUsuario=res.apellidoPaterno;
        
        this.rolUsuario=res.rol;
        this.nombrePaciente= this.nombreUsuario + " " + this.apellidoUsuario;
      
      },
      err => console.error(err)
    )
  }

  
}